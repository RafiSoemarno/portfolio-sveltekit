<script lang="ts">
	interface Work {
		title: string;
		img: string;
		types: string[];
		roles: string[];
		link?: string;
		desc: string;
	}

	const works: Work[] = [
		{
			title: 'Placeholder',
			img: 'https://placehold.co/600x400',
			types: ['Placeholder Type'],
			roles: ['Placeholder Role'],
			desc: 'A placeholder project for illustrative purposes.'
		},
		{
			title: 'Placeholder',
			img: 'https://placehold.co/600x400',
			types: ['Placeholder Type'],
			roles: ['Placeholder Role'],
			desc: 'A placeholder project for illustrative purposes.'
		},
		{
			title: 'Placeholder',
			img: 'https://placehold.co/600x400',
			types: ['Placeholder Type'],
			roles: ['Placeholder Role'],
			desc: 'A placeholder project for illustrative purposes.'
		}
	];
</script>

<div id="carousel">
	{#each works as work}
		<div class="work-card">
			<img src={work.img} alt={work.title} />
			<div class="detail-overlay">
				<h1>{work.title}</h1>
				<div class="pill-list">
					{#each work.types as type}
						<span>{type}</span>
					{/each}
				</div>
				<div class="pill-list">
					{#each work.roles as role}
						<span>{role}</span>
					{/each}
				</div>
				{#if work.link}
					<span>{work.link}</span>
				{/if}
				<p>{work.desc}</p>
			</div>
		</div>
	{/each}
</div>

<style lang="postcss">
	#carousel {
		@apply flex gap-4 h-3/5 min-w-fit;
	}

	.work-card {
		@apply bg-green-600 relative min-w-fit hover:-translate-y-[10%];
	}

	.work-card:hover > .detail-overlay {
		@apply flex flex-col;
	}

	.work-card > img {
		@apply h-full object-cover min-w-fit;
	}

	.detail-overlay {
		@apply text-zinc-300 absolute z-10 bottom-0 bg-zinc-900 bg-opacity-50 hidden w-full;
	}
</style>
