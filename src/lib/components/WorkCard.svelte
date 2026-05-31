<script lang="ts">
	import type { Work } from '$lib/server/data';

	export let work: Work;
	export let index: number;

	$: imageRight = index % 2 !== 0;
</script>

<article class="work-card {imageRight ? 'image-right' : ''}">
	<div class="image-wrap">
		<img src={work.image} alt={work.title} />
	</div>
	<div class="content">
		<h2>{work.title}</h2>
		<p>{work.description}</p>
		{#if work.tech && work.tech.length > 0}
			<ul class="tech-list" aria-label="Technologies used">
				{#each work.tech as tag}
					<li>{tag}</li>
				{/each}
			</ul>
		{/if}
		{#if work.link}
			<a href={work.link} target="_blank" rel="noopener noreferrer" class="project-link">
				<span class="material-icons-round align-middle" aria-hidden="true">open_in_new</span>
				View project
			</a>
		{/if}
	</div>
</article>

<style lang="postcss">
	.work-card {
		@apply flex flex-row items-center gap-10 w-full max-w-4xl mx-auto;
	}

	.work-card.image-right {
		@apply flex-row-reverse;
	}

	.image-wrap {
		@apply flex-shrink-0 w-80 rounded-2xl overflow-hidden;
	}

	img {
		@apply w-full h-56 object-cover;
	}

	.content {
		@apply flex flex-col gap-4 flex-1;
	}

	h2 {
		@apply text-3xl font-semibold text-zinc-100;
	}

	p {
		@apply text-zinc-300 leading-relaxed;
	}

	.tech-list {
		@apply flex flex-wrap gap-2 list-none p-0 m-0;
	}

	.tech-list li {
		@apply text-sm text-zinc-300 bg-white bg-opacity-10 rounded-full px-3 py-1;
	}

	.project-link {
		@apply flex items-center gap-1 w-fit text-blue-300 hover:text-blue-200 transition-colors duration-200;
	}
</style>

