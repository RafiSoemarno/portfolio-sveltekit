<script>
	import '../app.css';
	import Starfield from '$lib/Starfield.svelte';
</script>

<svelte:head>
	<title>Rafi Soemarno</title>
	<meta name="description" content="Portfolio of Rafi Soemarno — developer building functional web experiences." />
	<meta property="og:title" content="Rafi Soemarno" />
	<meta property="og:description" content="Portfolio of Rafi Soemarno — developer building functional web experiences." />
	<meta property="og:type" content="website" />
	<link rel="stylesheet" href="/fonts/quicksand.css" />
	<link rel="stylesheet" href="/fonts/material-icons-round.css" />
	<link rel="stylesheet" href="/fonts/material-icons-outlined.css" />
	<link rel="stylesheet" href="/fonts/fa-brands.css" />
</svelte:head>

<header class="select-none">
	<a href="/#hero" class="title">Rafi Soemarno</a>
	<menu>
		<a href="/#about" class="link">About</a>
		<a href="/#work" class="link">Work</a>
	</menu>
	<div class="meta">
		<a href="mailto:soemarnorafi@gmail.com" target="_blank" rel="noopener noreferrer"
			><span class="material-icons-round align-middle contact">mail</span> soemarnorafi@gmail.com</a
		>
		<a href="https://github.com/RafiSoemarno" target="_blank" rel="noopener noreferrer"
			><span class="fab fa-github contact align-middle" /> RafiSoemarno</a
		>
		<a href="https://www.linkedin.com/in/rafi-soemarno/" target="_blank" rel="noopener noreferrer"
			><span class="fab fa-linkedin contact align-middle" /> Rafi Soemarno</a
		>
	</div>
</header>

<main>
	<slot />
</main>

<div class="base-background" aria-hidden="true" />
<div class="gradient-background" aria-hidden="true" />
<Starfield />

<style lang="postcss">
	main {
		@apply relative flex flex-col;
		z-index: 3;
	}

	header {
		@apply fixed top-0 left-0 right-0 flex w-full p-8 pl-12;
		z-index: 50;
		background: linear-gradient(to bottom, rgba(24,24,27,0.7) 0%, transparent 100%);
		backdrop-filter: none;
	}

	.title {
		@apply text-2xl text-zinc-100 font-bold;
	}

	.link {
		@apply text-xl text-zinc-100 self-end;
	}

	menu {
		@apply flex mx-16 gap-16;
	}

	.meta {
		@apply flex items-center text-zinc-100 self-end gap-6 ms-auto pr-10;
	}

	.contact {
		@apply align-middle;
	}

	.base-background {
		@apply fixed inset-0 bg-zinc-900;
		z-index: 0;
	}

	@property --deg {
		syntax: '<angle>';
		inherits: false;
		initial-value: 120deg;
	}

	.gradient-background {
		@apply fixed inset-0 opacity-20 pointer-events-none;
		z-index: 1;
		background: linear-gradient(var(--deg), #18181b 50%, #8ec5ff, #a3b3ff);
		background-size: 180% 180%;
		background-position: 50% 50%;
		animation: gradient-animation 9s linear 0s infinite alternate;
	}

	@keyframes gradient-animation {
		0%   { --deg: 120deg; }
		50%  { --deg: 170deg; }
		100% { --deg: 220deg; }
	}
</style>

