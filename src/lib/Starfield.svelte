<script>
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import * as THREE from 'three';
	import { spring } from 'svelte/motion';
	import { warpTick } from '$lib/starfieldStore';

	let container;
	let rafId;
	let renderer, scene, geometry, material, points;
	let streakGeometry, streakMaterial, streaks;
	let clock;
	let unsubWarp;

	// ── Warp tuning knobs ──
	const BASE_SPEED = 24;        // world units / sec (≈ 0.4/frame @ 60fps)
	const WARP_IN = 0.15;         // seconds to reach full warp
	const WARP_HOLD = 0.2;        // seconds at full warp
	const WARP_OUT = 0.15;        // seconds to return to idle
	const WARP_SPEED_MULT = 120;  // extra speed multiplier at full warp
	const WARP_STREAK_LEN = 250;  // max streak length in world units
	const BASE_FOV = 45;
	const WARP_FOV = 80;

	const STAR_COUNT = 2000;

	const camera = new THREE.PerspectiveCamera(BASE_FOV, 1, 1, 1000);

	let warpPhase = 'idle'; // idle | in | hold | out
	let warpTime = 0;
	let warp = 0;

	function smoothstep(x) {
		return x * x * (3 - 2 * x);
	}

	function startWarp() {
		if (warpPhase !== 'idle') return; // ignore re-trigger while active
		warpPhase = 'in';
		warpTime = 0;
	}

	function updateWarp(dt) {
		if (warpPhase === 'idle') return;
		warpTime += dt;
		if (warpPhase === 'in') {
			if (warpTime >= WARP_IN) {
				warpPhase = 'hold';
				warpTime = 0;
				warp = 1;
			} else {
				warp = smoothstep(warpTime / WARP_IN);
			}
		} else if (warpPhase === 'hold') {
			if (warpTime >= WARP_HOLD) {
				warpPhase = 'out';
				warpTime = 0;
			}
		} else if (warpPhase === 'out') {
			if (warpTime >= WARP_OUT) {
				warpPhase = 'idle';
				warpTime = 0;
				warp = 0;
			} else {
				warp = 1 - smoothstep(warpTime / WARP_OUT);
			}
		}
		camera.fov = BASE_FOV + warp * (WARP_FOV - BASE_FOV);
		camera.updateProjectionMatrix();
	}

	function init() {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		camera.position.z = 5;

		scene = new THREE.Scene();
		clock = new THREE.Clock();

		renderer = new THREE.WebGLRenderer({ antialias: false });
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		container.appendChild(renderer.domElement);

		// Single draw call: BufferGeometry + Points
		const positions = new Float32Array(STAR_COUNT * 3);
		const colors = new Float32Array(STAR_COUNT * 3);
		const sizes = new Float32Array(STAR_COUNT);

		// Subtle colour palette: white, warm, cool
		const palette = [
			[1.0, 1.0, 1.0],   // white
			[1.0, 0.95, 0.8],  // warm white
			[0.8, 0.9, 1.0],   // cool blue-white
			[1.0, 0.85, 0.7],  // warm amber
			[0.85, 0.85, 1.0], // soft lavender
		];

		for (let i = 0; i < STAR_COUNT; i++) {
			positions[i * 3]     = Math.random() * 1000 - 500;
			positions[i * 3 + 1] = Math.random() * 1000 - 500;
			positions[i * 3 + 2] = Math.random() * 2000 - 1000;

			const c = palette[Math.floor(Math.random() * palette.length)];
			colors[i * 3]     = c[0];
			colors[i * 3 + 1] = c[1];
			colors[i * 3 + 2] = c[2];

			sizes[i] = 1.5 + Math.random() * 3.5; // 1.5–5px
		}

		geometry = new THREE.BufferGeometry();
		geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
		geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
		geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

		material = new THREE.PointsMaterial({
			vertexColors: true,
			sizeAttenuation: true,
			size: 3,
			transparent: true,
			opacity: 0.9
		});
		points = new THREE.Points(geometry, material);
		scene.add(points);

		// Streak layer: 2 verts per star (head + tail). Hidden while warp = 0.
		const streakPositions = new Float32Array(STAR_COUNT * 2 * 3);
		const streakColors = new Float32Array(STAR_COUNT * 2 * 3);
		for (let i = 0; i < STAR_COUNT; i++) {
			const h = i * 6;
			streakColors[h]     = colors[i * 3];
			streakColors[h + 1] = colors[i * 3 + 1];
			streakColors[h + 2] = colors[i * 3 + 2];
			// tail vertex color stays black → fades out under additive blending
		}
		streakGeometry = new THREE.BufferGeometry();
		streakGeometry.setAttribute('position', new THREE.BufferAttribute(streakPositions, 3));
		streakGeometry.setAttribute('color', new THREE.BufferAttribute(streakColors, 3));
		streakMaterial = new THREE.LineBasicMaterial({
			vertexColors: true,
			transparent: true,
			opacity: 0.9,
			blending: THREE.AdditiveBlending,
			depthWrite: false
		});
		streaks = new THREE.LineSegments(streakGeometry, streakMaterial);
		streaks.visible = false;
		streaks.frustumCulled = false;
		scene.add(streaks);

		window.addEventListener('resize', onResize);
	}

	function onResize() {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
	}

	function animateStars(dt) {
		const speed = BASE_SPEED * (1 + warp * WARP_SPEED_MULT);
		const streakLen = warp * WARP_STREAK_LEN;
		const showStreaks = streakLen > 0.01;
		streaks.visible = showStreaks;

		const positions = geometry.attributes.position.array;
		const streak = streakGeometry.attributes.position.array;
		for (let i = 0; i < STAR_COUNT; i++) {
			const o = i * 3;
			positions[o + 2] += speed * dt;
			if (positions[o + 2] > 1000) positions[o + 2] -= 2000;

			if (showStreaks) {
				const h = o * 2;
				const t = h + 3;
				streak[h]     = positions[o];
				streak[h + 1] = positions[o + 1];
				streak[h + 2] = positions[o + 2];
				streak[t]     = positions[o];
				streak[t + 1] = positions[o + 1];
				streak[t + 2] = positions[o + 2] - streakLen;
			}
		}
		geometry.attributes.position.needsUpdate = true;
		if (showStreaks) streakGeometry.attributes.position.needsUpdate = true;
	}

	function render() {
		rafId = requestAnimationFrame(render);
		const dt = Math.min(clock.getDelta(), 0.05); // clamp tab-switch jumps
		updateWarp(dt);
		animateStars(dt);
		renderer.render(scene, camera);
	}

	onMount(() => {
		init();
		render();
		let lastTick = 0;
		unsubWarp = warpTick.subscribe((n) => {
			if (n !== lastTick) startWarp();
			lastTick = n;
		});
	});

	onDestroy(() => {
		if (!browser) return;
		unsubWarp?.();
		cancelAnimationFrame(rafId);
		window.removeEventListener('resize', onResize);
		geometry?.dispose();
		material?.dispose();
		streakGeometry?.dispose();
		streakMaterial?.dispose();
		renderer?.dispose();
	});

	const mousePan = spring({ x: 0, y: 0 }, { stiffness: 0.03, damping: 0.25, precision: 0.00001 });

	function panToPointer(event) {
		mousePan.set({
			x: -((event.clientX / window.innerWidth - 0.5) / 10),
			y: -((event.clientY / window.innerHeight - 0.5) / 10)
		});
	}

	$: if (camera) {
		camera.rotation.y = $mousePan.x;
		camera.rotation.x = $mousePan.y;
	}
</script>

<svelte:window on:mousemove={panToPointer} />

<div bind:this={container} class="fixed inset-0 opacity-80 pointer-events-none" style="z-index: 1;" />

