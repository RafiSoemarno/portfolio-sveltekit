<script>
	import { onMount } from 'svelte';
	import { tweened, spring } from 'svelte/motion';
	import * as THREE from 'three';

	export let speed;

	const camera = new THREE.PerspectiveCamera();

	var container,
		renderer,
		scene,
		gap = 10;

	var stars = [];

	function init() {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.position.z = 5;

		scene = new THREE.Scene();

		renderer = new THREE.WebGLRenderer();
		renderer.setSize(window.innerWidth, window.innerHeight);
		container.appendChild(renderer.domElement);
	}

	function generateCoord() {
		var angle = Math.random() * 2 * Math.PI;
		var radius = Math.random() * 100 + 100;

		return {
			x: radius * Math.cos(angle),
			y: radius * Math.sin(angle)
		};
	}

	function generateStars(gap) {
		for (var z = -2000; z < 10; z += gap) {
			var geometry = new THREE.SphereGeometry(0.5, 32, 32);
			var material = new THREE.MeshBasicMaterial({ color: 0xffffff });
			var sphere = new THREE.Mesh(geometry, material);
			var target = generateCoord();
			sphere.position.x = target.x;
			sphere.position.y = target.y;
			sphere.position.z = z;
			sphere.scale.x = sphere.scale.y = 2;
			scene.add(sphere);
			stars.push(sphere);
		}
	}

	function animateStars() {
		for (var i = 0; i < stars.length; i++) {
			var star = stars[i];

			star.position.z += speed;

			if (star.position.z > 10) star.position.z -= 2010;
		}
	}

	function render() {
		requestAnimationFrame(render);

		renderer.render(scene, camera);
		animateStars();
	}

	function panToPointer(event) {
		mousePan.set({
			x: -((event.clientX / window.innerWidth - 0.5) / 10),
			y: -((event.clientY / window.innerHeight - 0.5) / 10)
		});
	}

	var mousePan = spring({ x: 0, y: 0 }, { stiffness: 0.03, damping: 0.25, precision: 0.00001 });
	$: camera.rotation.y = $mousePan.x;
	$: camera.rotation.x = $mousePan.y;

	onMount(async () => {
		init();

		generateStars(gap);

		render();
	});
</script>

<svelte:window on:mousemove={panToPointer} />

<div bind:this={container} class="absolute -z-10 opacity-40 w-full h-full" />
