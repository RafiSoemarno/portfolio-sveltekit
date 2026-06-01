<script>
	import '../app.css';
	import Starfield from '$lib/Starfield.svelte';

	let mobileMenuOpen = false;
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

<header class="select-none" class:menu-open={mobileMenuOpen}>
	<div class="header-inner">
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
	<button
		class="hamburger"
		on:click={() => (mobileMenuOpen = !mobileMenuOpen)}
		aria-label="Toggle navigation"
		aria-expanded={mobileMenuOpen}
	>
		<span class="material-icons-round">{mobileMenuOpen ? 'close' : 'menu'}</span>
	</button>
	</div>
</header>

{#if mobileMenuOpen}
<nav class="mobile-menu" aria-label="Mobile navigation">
	<a href="/#about" class="mobile-link" on:click={() => (mobileMenuOpen = false)}>About</a>
	<a href="/#work" class="mobile-link" on:click={() => (mobileMenuOpen = false)}>Work</a>
	<div class="mobile-meta">
		<a href="mailto:soemarnorafi@gmail.com" target="_blank" rel="noopener noreferrer" on:click={() => (mobileMenuOpen = false)}>
			<span class="material-icons-round contact">mail</span> soemarnorafi@gmail.com
		</a>
		<a href="https://github.com/RafiSoemarno" target="_blank" rel="noopener noreferrer" on:click={() => (mobileMenuOpen = false)}>
			<span class="fab fa-github contact" /> RafiSoemarno
		</a>
		<a href="https://www.linkedin.com/in/rafi-soemarno/" target="_blank" rel="noopener noreferrer" on:click={() => (mobileMenuOpen = false)}>
			<span class="fab fa-linkedin contact" /> Rafi Soemarno
		</a>
	</div>
</nav>
{/if}

<main>
	<slot />
</main>

<footer>
	<div class="footer-inner">
		<span class="footer-name">Rafi Soemarno</span>
		<div class="footer-links">
			<a href="mailto:soemarnorafi@gmail.com" target="_blank" rel="noopener noreferrer">
				<span class="material-icons-round contact">mail</span><span class="link-text"> soemarnorafi@gmail.com</span>
			</a>
			<a href="https://github.com/RafiSoemarno" target="_blank" rel="noopener noreferrer">
				<span class="fab fa-github contact" /><span class="link-text"> RafiSoemarno</span>
			</a>
			<a href="https://www.linkedin.com/in/rafi-soemarno/" target="_blank" rel="noopener noreferrer">
				<span class="fab fa-linkedin contact" /><span class="link-text"> Rafi Soemarno</span>
			</a>
		</div>
	</div>
</footer>

<div class="base-background" aria-hidden="true" />
<div class="gradient-background" aria-hidden="true" />
<Starfield />
<div id="cover" aria-hidden="true" />

<style lang="postcss">
	main {
		@apply relative flex flex-col;
		z-index: 10;
		max-width: 1600px;
		margin-inline: auto;
		width: 100%;
	}

	header {
		@apply fixed top-0 left-0 right-0 w-full;
		z-index: 50;
		background: linear-gradient(to bottom, rgba(24,24,27,0.7) 0%, transparent 100%);
		backdrop-filter: none;
		transition: background 0.2s ease, backdrop-filter 0.2s ease;
	}

	header.menu-open {
		background: rgba(24, 24, 27, 0.25);
		backdrop-filter: blur(6px);
	}

	.header-inner {
		@apply flex p-8 pl-12;
		max-width: 1600px;
		margin-inline: auto;
		width: 100%;
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

	.hamburger {
		@apply hidden items-center text-zinc-100 ms-auto text-3xl;
	}

	@media (max-width: 767px) {
		.header-inner {
			@apply p-4 pl-6;
		}

		menu {
			@apply hidden;
		}

		.meta {
			@apply hidden;
		}

		.hamburger {
			@apply flex;
		}
	}

	.mobile-menu {
		@apply fixed left-0 right-0 flex flex-col text-zinc-100;
		top: 64px;
		z-index: 49;
		background: rgba(24, 24, 27, 0.25);
		backdrop-filter: blur(6px);
		border-bottom: 1px solid rgba(255, 255, 255, 0.08);
	}

	.mobile-link {
		@apply text-2xl px-8 py-5 border-b border-zinc-800 transition-colors;
		&:hover { background: rgba(24, 24, 27, 0.4); }
	}

	.mobile-meta {
		@apply flex flex-col gap-5 px-8 py-6 text-zinc-400;
	}

	.mobile-meta a {
		@apply text-base hover:text-zinc-100 transition-colors flex items-center gap-2;
	}

	footer {
		@apply relative w-full;
		z-index: 10;
		background: rgba(255, 255, 255, 0.07);
		border-top: 1px solid rgba(255, 255, 255, 0.08);
		backdrop-filter: blur(6px);
	}

	.footer-inner {
		@apply flex items-center justify-between gap-6 px-12 py-8 text-zinc-400;
		max-width: 1600px;
		margin-inline: auto;
		width: 100%;
	}

	.footer-name {
		@apply text-zinc-100 font-bold text-lg;
	}

	.footer-links {
		@apply flex gap-6 text-sm;
	}

	.footer-links a {
		@apply flex items-center gap-2 hover:text-zinc-100 transition-colors;
	}

	@media (max-width: 767px) {
		.footer-inner {
			@apply px-6 py-5 justify-end;
		}

		.footer-name {
			@apply hidden;
		}
	}

	@media (max-width: 480px) {
		.link-text {
			@apply hidden;
		}

		.footer-links {
			@apply gap-5;
		}

		.footer-links a {
			@apply text-xl;
		}
	}

	.base-background {
		@apply fixed inset-0 bg-zinc-900;
		z-index: 0;
	}

	#cover {
		@apply fixed inset-0 select-none pointer-events-none opacity-50;
		background-image: radial-gradient(transparent, rgb(24, 24, 27) 90%);
		backdrop-filter: blur(4px);
		z-index: 2;
	}

	@property --deg {
		syntax: '<angle>';
		inherits: false;
		initial-value: 120deg;
	}

	.gradient-background {
		@apply fixed inset-0 opacity-20 pointer-events-none;
		z-index: 3;
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

