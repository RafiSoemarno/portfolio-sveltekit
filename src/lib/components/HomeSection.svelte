<div id="hero">
	<a id="hero-button" href="#work">See my work.</a>
	<h1 id="hero-header">I build functional web experiences.</h1>
</div>
<div id="cover" />

<style lang="postcss">
	#cover {
		@apply absolute w-full h-full -z-10 select-none opacity-50;
		background-image: radial-gradient(transparent, rgb(24, 24, 27) 90%);
	}

	#hero {
		@apply flex flex-col-reverse self-center w-full gap-12;
	}

	#hero-header,
	#hero-button {
		@apply font-semibold text-center;
	}

	#hero-header {
		@apply text-6xl text-zinc-100 overflow-hidden;
	}

	#hero-button {
		@apply relative text-4xl w-fit text-zinc-200 mx-auto p-4 rounded-2xl border-4 border-zinc-200 transition-all duration-500;
	}

	#hero-button:hover {
		@apply text-zinc-900 bg-zinc-200;
	}

	#hero-button::after {
		@apply transition-all duration-500 bg-blue-300;
		content: '';
		opacity: 0;
		position: absolute;
		z-index: -1;
		filter: blur(25px);
		top: -3px;
		left: -3px;
		bottom: -3px;
		right: -3px;
		border-radius: 1.25rem;
		will-change: auto;
		animation: a 1.5s linear infinite;
	}

	#hero-button:hover::after {
		opacity: 1;
	}

	@property --a {
		syntax: '<angle>';
		inherits: false;
		initial-value: 0deg;
		will-change: auto;
	}

	@keyframes a {
		from {
			--a: 0deg;
		}
		to {
			--a: 360deg;
		}
	}
</style>
