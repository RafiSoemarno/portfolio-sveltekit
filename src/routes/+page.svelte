<script lang="ts">
	import Skill from '$lib/components/Skill.svelte';
	import Achievement from '$lib/components/Achievement.svelte';
	import WorkCard from '$lib/components/WorkCard.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const status = [
		{ icon: 'school',      text: 'Binus International' },
		{ icon: 'biotech',     text: 'Business Information Systems' },
		{ icon: 'location_on', text: 'Bogor, Indonesia' },
		{ icon: 'language',    text: 'English & Bahasa Indonesia' }
	];

	function scrollTo(id: string) {
		document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
	}
</script>

<svelte:head>
	<title>Rafi Soemarno</title>
	<meta name="description" content="Portfolio of Rafi Soemarno — developer building functional web experiences." />
	<meta property="og:title" content="Rafi Soemarno" />
	<meta property="og:description" content="Portfolio of Rafi Soemarno — developer building functional web experiences." />
	<meta property="og:type" content="website" />
</svelte:head>

<!-- ══════════════════════════════════════════
     HERO
══════════════════════════════════════════ -->
<section id="hero">
	<div class="hero-content">
		<h1>I build functional web experiences.</h1>
		<button on:click={() => scrollTo('work')}>See my work.</button>
	</div>
</section>

<!-- ══════════════════════════════════════════
     ABOUT
══════════════════════════════════════════ -->
<section id="about">
	<div class="section-content">
		<div class="about-bio glass">
			<p class="greeting">Hi, I'm Rafi.</p>
			<p class="tagline">
				I'm a Business Information Systems student at Binus International, based in Bogor, Indonesia.
				I enjoy building clean, functional web experiences — from thoughtful UI to solid backends.
			</p>
			<ul class="status-list">
				{#each status as item}
					<li>
						<span class="material-icons-round status-icon select-none" aria-hidden="true">{item.icon}</span>
						<span>{item.text}</span>
					</li>
				{/each}
			</ul>
		</div>

		<section class="sub-section">
			<h2 class="section-heading">Education</h2>
			<ul class="timeline">
				{#await data.streamed.achievements}
					<li class="loading">Loading…</li>
				{:then achievements}
					{#each achievements as achievement}
						<Achievement icon={achievement.icon} name={achievement.name} date={achievement.date} />
					{/each}
				{:catch}
					<li class="error">Could not load education data.</li>
				{/await}
			</ul>
		</section>

		<section class="sub-section">
			<h2 class="section-heading">Skills</h2>
			<ul class="skill-grid">
				{#await data.streamed.skills}
					<li class="loading">Loading…</li>
				{:then skills}
					{#each skills as skill}
						<Skill icon={skill.icon} name={skill.name} level={skill.level} />
					{/each}
				{:catch}
					<li class="error">Could not load skills data.</li>
				{/await}
			</ul>
		</section>
	</div>
</section>

<!-- ══════════════════════════════════════════
     WORK
══════════════════════════════════════════ -->
<section id="work">
	<div class="section-content">
		<section class="sub-section">
			<h2 class="section-heading">Work</h2>
			<div class="work-list">
				{#each data.works as work, i}
					<WorkCard {work} index={i} />
				{/each}
			</div>
		</section>
	</div>
</section>

<style lang="postcss">
	/* ── Shared ── */
	section {
		@apply relative w-full flex-shrink-0;
	}

	/* ══ Hero ══ */
	#hero {
		@apply flex items-center justify-center;
		height: 100vh;
	}

	.hero-content {
		@apply flex flex-col gap-12 w-full max-w-4xl mx-auto;
	}

	h1 {
		@apply text-6xl font-semibold text-center text-zinc-100 overflow-hidden;
	}

	button {
		@apply relative text-4xl w-fit font-semibold text-zinc-200 mx-auto p-4 rounded-2xl
		       border-4 border-zinc-200 transition-all duration-500 cursor-pointer;
	}

	button:hover {
		@apply text-zinc-900 bg-zinc-200;
	}

	button::after {
		@apply transition-all duration-500 bg-blue-300;
		content: '';
		opacity: 0;
		position: absolute;
		z-index: -1;
		filter: blur(25px);
		inset: -3px;
		border-radius: 1.25rem;
		will-change: auto;
		animation: glow 1.5s linear infinite;
	}

	button:hover::after {
		opacity: 1;
	}

	@property --a {
		syntax: '<angle>';
		inherits: false;
		initial-value: 0deg;
	}

	@keyframes glow {
		from { --a: 0deg; }
		to   { --a: 360deg; }
	}

	/* ══ About ══ */
	#about {
		@apply flex flex-col;
		min-height: 100vh;
		padding: 6rem 2rem 0;
		gap: 3rem;
	}

	.section-content {
		@apply flex flex-col gap-8 w-full max-w-4xl mx-auto;
	}

	.about-bio {
		@apply flex flex-col gap-6 p-8;
	}

	.greeting {
		@apply text-5xl font-bold text-zinc-100;
	}

	.tagline {
		@apply text-zinc-400 leading-relaxed text-lg;
	}

	.status-list {
		@apply flex flex-col gap-3 p-0 m-0;
	}

	.status-list li {
		@apply flex items-center gap-3 text-zinc-300 list-none;
	}

	.status-icon {
		@apply text-zinc-500 flex-shrink-0;
		font-size: 20px;
	}

	.sub-section {
		@apply flex flex-col;
	}

	.section-heading {
		@apply text-xs font-semibold tracking-widest uppercase text-zinc-500 mb-5;
	}

	.timeline {
		@apply flex flex-col gap-5 p-0 m-0;
	}

	.skill-grid {
		@apply grid gap-3 p-0 m-0;
		grid-template-columns: repeat(auto-fill, minmax(175px, 1fr));
	}

	.loading {
		@apply text-zinc-600 text-sm list-none animate-pulse;
	}

	.error {
		@apply text-red-400 text-sm list-none;
	}

	/* ══ Work ══ */
	#work {
		@apply flex flex-col;
		min-height: 100vh;
		padding: 2rem 2rem 3rem;
		gap: 0;
	}

	.work-list {
		@apply flex flex-col gap-5;
	}
</style>

