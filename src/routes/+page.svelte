<div id="hero">
	<a id="hero-button" href="/work"
		>See my work.
		<h1 id="gradient">See my work.</h1></a
	>
	<h1 id="hero-header"><h1>I build functional web experiences.</h1></h1>
	<div class="carousel-head">
		<div>
			<img class="border-8 border-green-500" src="https://placehold.co/800x600" alt="alt" />
		</div>
		<div><img src="https://placehold.co/800x600" alt="alt" /></div>
		<div><img src="https://placehold.co/800x600" alt="alt" /></div>
		<div><img src="https://placehold.co/800x600" alt="alt" /></div>
		<div>
			<img class="border-8 border-green-500" src="https://placehold.co/800x600" alt="alt" />
		</div>
		<div><img src="https://placehold.co/800x600" alt="alt" /></div>
		<div><img src="https://placehold.co/800x600" alt="alt" /></div>
		<div><img src="https://placehold.co/800x600" alt="alt" /></div>
	</div>
</div>

<div id="cover" />

<style lang="postcss">
	#cover {
		@apply absolute w-full h-full -z-10 select-none;
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
		@apply relative text-4xl w-fit text-zinc-200 mx-auto p-4 rounded-2xl bg-zinc-900 hover:text-transparent hover:outline-transparent outline outline-4 outline-zinc-200 transition-all duration-500;
	}

	.carousel-head {
		@apply top-1/2 flex gap-8 opacity-0 transition duration-700 -z-20 scale-50 absolute;
		will-change: transform, opacity;
		animation: test 10s linear infinite;
	}

	.carousel-head img {
		@apply max-w-none;
		height: 600px;
	}

	#hero-button:hover ~ .carousel-head {
		@apply opacity-50;
	}

	@keyframes test {
		from {
			transform: translate(0, -50%);
		}
		to {
			transform: translate(-50.25%, -50%);
		}
	}

	#hero-button::before {
		content: '';
		position: absolute;
		z-index: -1;
		top: -3px;
		left: -3px;
		bottom: -3px;
		right: -3px;
		border-radius: 1.25rem;
		background: conic-gradient(
			from var(--a) at 50% 50%,
			#e8515c 0deg,
			#fe6ebd 45deg,
			#5cadfe 90deg,
			#75f5d8 150deg,
			#fdf175 225deg,
			#fe8564 290deg,
			#e8515c 1turn
		);
		will-change: auto;
		animation: a 1.5s linear infinite;
	}

	#hero-button::after {
		@apply transition-all duration-700;
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
		background: conic-gradient(
			from var(--a) at 50% 50%,
			#e8515c 0deg,
			#fe6ebd 45deg,
			#5cadfe 90deg,
			#75f5d8 150deg,
			#fdf175 225deg,
			#fe8564 290deg,
			#e8515c 1turn
		);
		will-change: auto;
		animation: a 1.5s linear infinite;
	}

	#hero-button:hover::after {
		opacity: 1;
	}

	#hero-header > h1 {
		@apply transition-all duration-700;
		will-change: transform, opacity;
	}

	#hero-button:hover + #hero-header > h1 {
		opacity: 0;
		transform: translateY(75%);
	}

	#gradient {
		@apply opacity-0 hover:opacity-100 text-transparent transition-all duration-500;
		position: absolute;
		z-index: 1;
		padding: calc(1rem + 3px) 1rem;
		top: -3px;
		left: -3px;
		bottom: -3px;
		right: -3px;
		border-radius: 1.25rem;
		background: conic-gradient(
			from var(--a) at 50% 50%,
			#e8515c 0deg,
			#fe6ebd 45deg,
			#5cadfe 90deg,
			#75f5d8 150deg,
			#fdf175 225deg,
			#fe8564 290deg,
			#e8515c 1turn
		);
		background-clip: text;
		will-change: auto;
		animation: a 1.5s linear infinite;
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
