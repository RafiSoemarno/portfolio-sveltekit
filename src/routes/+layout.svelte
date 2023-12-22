<script>
	import '../app.css';
</script>

<svelte:head>
	<link href="https://fonts.googleapis.com/css2?family=Quicksand&display=swap" rel="stylesheet" />
	<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
	<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons+Round" />
	<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined" />
	<link
		rel="stylesheet"
		href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta2/css/brands.min.css"
		integrity="sha512-lCU0XyQA8yobR7ychVxEOU5rcxs0+aYh/9gNDLaybsgW9hdrtqczjfKVNIS5doY0Y5627/+3UVuoGv7p8QsUFw=="
		crossorigin="anonymous"
		referrerpolicy="no-referrer"
	/>
</svelte:head>

<header class="select-none">
	<a href="/" class="title">Rafi Soemarno</a>
	<menu>
		<a href="/about" class="link">About</a>
		<a href="/work" class="link">Work</a>
	</menu>
	<div class="meta">
		<a href="mailto:soemarnorafi@gmail.com" target="_blank"
			><span class="material-icons-round align-middle contact">mail</span> soemarnorafi@gmail.com</a
		>
		<a href="https://github.com/RafiSoemarno" target="_blank"
			><span class="fab fa-github contact align-middle" /> RafiSoemarno</a
		>
		<a href="https://www.linkedin.com/in/rafi-soemarno/" target="_blank"
			><span class="fab fa-linkedin contact align-middle" /> Rafi Soemarno</a
		>
	</div>
</header>
<main>
	<slot />
</main>

<style lang="postcss">
	main {
		@apply flex h-screen;
	}

	header {
		@apply absolute flex w-full p-8 pl-12;
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
</style>
