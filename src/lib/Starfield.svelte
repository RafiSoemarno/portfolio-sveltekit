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
		for (let i = 0; i < STAR_COUNT; i++) {
			positions[i * 3] = Math.random() * 1000 - 500;
			positions[i * 3 + 1] = Math.random() * 1000 - 500;
			positions[i * 3 + 2] = Math.random() * 2000 - 1000;
		}

		geometry = new THREE.BufferGeometry();
		geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

		material = new THREE.PointsMaterial({ color: 0xffffff, size: 1.5, sizeAttenuation: true });
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

<div bind:this={container} class="fixed inset-0 opacity-40 pointer-events-none" style="z-index: 2;" />

