<script>
	import { onMount } from 'svelte';
	import * as THREE from 'three';
	import { spring } from 'svelte/motion';

	var scene,
		renderer,
		container,
		stars = [],
		mousePan;

	const camera = new THREE.PerspectiveCamera(45, 1, 1, 1000);

	//assign three.js objects to each variable
	function init() {
		const width = window.innerWidth;
		const height = window.innerHeight;

		//camera
		camera.aspect = width / height;
		camera.updateProjectionMatrix();
		camera.position.z = 5;

		//scene
		scene = new THREE.Scene();

		//renderer
		renderer = new THREE.WebGLRenderer();
		//set the size of the renderer
		renderer.setSize(width, height);
		renderer.setPixelRatio(window.devicePixelRatio);

		container.appendChild(renderer.domElement);

		// Handle resize
		window.addEventListener('resize', () => {
			const width = window.innerWidth;
			const height = window.innerHeight;

			// Update camera
			camera.aspect = width / height;
			camera.updateProjectionMatrix();

			// Update renderer
			renderer.setSize(width, height);
			renderer.setPixelRatio(window.devicePixelRatio);
		});
	}

	function addSphere() {
		// The loop will move from z position of -1000 to z position 1000, adding a random particle at each position.
		for (var z = -1000; z < 1000; z += 5) {
			// Make a sphere (exactly the same as before).
			var geometry = new THREE.SphereGeometry(0.5, 32, 32);
			var material = new THREE.MeshBasicMaterial({ color: 0xffffff });
			var sphere = new THREE.Mesh(geometry, material);

			// This time we give the sphere random x and y positions between -500 and 500
			sphere.position.x = Math.random() * 1000 - 500;
			sphere.position.y = Math.random() * 1000 - 500;

			// Then set the z position to where it is in the loop (distance of camera)
			sphere.position.z = z;

			// scale it up a bit
			sphere.scale.x = 2;
			sphere.scale.y = 2;

			//add the sphere to the scene
			scene.add(sphere);

			//finally push it to the stars array
			stars.push(sphere);
		}
	}

	function animateStars() {
		// loop through each star
		for (var i = 0; i < stars.length; i++) {
			var star = stars[i];

			// and move it forward
			star.position.z += i / 50;

			// if the particle is too close move it to the back
			if (star.position.z > 1000) star.position.z -= 2000;
		}
	}

	function render() {
		//get the frame
		requestAnimationFrame(render);

		//render the scene
		renderer.render(scene, camera);
		animateStars();
	}

	onMount(async () => {
		init();
		addSphere();
		render();
	});

	mousePan = spring({ x: 0, y: 0 }, { stiffness: 0.03, damping: 0.25, precision: 0.00001 });

	function panToPointer(event) {
		mousePan.set({
			x: -((event.clientX / window.innerWidth - 0.5) / 10),
			y: -((event.clientY / window.innerHeight - 0.5) / 10)
		});
	}

	$: camera.rotation.y = $mousePan.x;
	$: camera.rotation.x = $mousePan.y;
</script>

<svelte:window on:mousemove={panToPointer} />

<div bind:this={container} class="absolute -z-20 opacity-40 w-full h-full" />
