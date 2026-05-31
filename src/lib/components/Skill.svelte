<script lang="ts">
	export let icon: string;
	export let name: string;
	export let level: number; // retained for data compatibility
</script>

<li class="skill" title="Proficiency: {level}/5" aria-label="{name}, proficiency {level} out of 5">
	<span class="{icon} skill-icon" aria-hidden="true" />
	<span class="skill-name">{name}</span>
	<span class="pip-row" aria-hidden="true">
		{#each Array(5) as _, i}
			<span class="pip {i < level ? 'filled' : ''}" />
		{/each}
	</span>
</li>

<style lang="postcss">
	.skill {
		@apply flex items-center gap-3 px-4 py-3 rounded-2xl bg-white bg-opacity-[0.07]
		       border border-white border-opacity-[0.08] list-none
		       transition-colors duration-200 hover:bg-opacity-[0.12];
	}

	.skill-icon {
		@apply text-zinc-300 flex-shrink-0;
		font-size: 18px;
		width: 20px;
		text-align: center;
	}

	.skill-name {
		@apply text-zinc-200 font-medium flex-1;
	}

	.pip-row {
		@apply flex gap-1 items-center flex-shrink-0;
	}

	.pip {
		@apply block w-1.5 h-1.5 rounded-full bg-white opacity-20 transition-opacity duration-200;
	}

	.pip.filled {
		@apply opacity-60;
	}
</style>

