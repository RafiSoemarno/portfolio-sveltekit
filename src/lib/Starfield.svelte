<script>
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import * as THREE from 'three';
	import { spring } from 'svelte/motion';

	let container;
	let rafId;
	let renderer, scene, geometry, material, points;

	const STAR_COUNT = 2000;

	const camera = new THREE.PerspectiveCamera(45, 1, 1, 1000);

	function init() {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		camera.position.z = 5;

		scene = new THREE.Scene();

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

		window.addEventListener('resize', onResize);
	}

	function onResize() {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
	}

	function animateStars() {
		const positions = geometry.attributes.position.array;
		for (let i = 0; i < STAR_COUNT; i++) {
			positions[i * 3 + 2] += 0.4;
			if (positions[i * 3 + 2] > 1000) positions[i * 3 + 2] -= 2000;
		}
		geometry.attributes.position.needsUpdate = true;
	}

	function render() {
		rafId = requestAnimationFrame(render);
		animateStars();
		renderer.render(scene, camera);
	}

	onMount(() => {
		init();
		render();
	});

	onDestroy(() => {
		if (!browser) return;
		cancelAnimationFrame(rafId);
		window.removeEventListener('resize', onResize);
		geometry?.dispose();
		material?.dispose();
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

