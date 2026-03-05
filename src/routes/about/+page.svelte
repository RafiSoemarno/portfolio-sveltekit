<script lang="ts">
	import Skill from './Skill.svelte';
	import Achievement from './Achievement.svelte';

	export let data;
</script>

<svelte:head />

<main class="bg-primary text-gray-300 ps-32 my-auto max-h-[70%]">
	<div class="flex flex-row justify-center gap-12">
		<div class="flex flex-col gap-5">
			<h2 class="text-3xl text-center">Status</h2>
			<div class="flex flex-col bg-white bg-opacity-10 rounded-3xl h-fit p-6 px-7 gap-5">
				<div class="detail">
					<span class="material-icons-round select-none">work</span>
					<span>Student at Binus International</span>
				</div>
				<div class="detail">
					<span class="material-icons-round select-none">biotech</span>
					<span>Business Information Systems</span>
				</div>
				<div class="detail">
					<span class="material-icons-round select-none">location_on</span>
					<span>Bogor, Indonesia</span>
				</div>
				<div class="detail">
					<span class="material-icons-round select-none">language</span>
					<span>English & Bahasa Indonesia</span>
				</div>
			</div>
		</div>
		<div class="flex flex-col gap-5">
			<h2 class="text-3xl text-center">Education</h2>
			<div class="grid grid-cols-1 gap-5">
				{#await data.streamed.achievements}
					<h1>Loading...</h1>
				{:then result}
					{#if result.ok}
						{#each result.data as achievement}
							<Achievement icon={achievement.icon} name={achievement.name} date={achievement.date} />
						{/each}
					{:else}
						<h1 class="load-error">{result.error}</h1>
					{/if}
				{/await}
			</div>
		</div>
		<div class="flex flex-col gap-5">
			<h2 class="text-3xl text-center">Skills</h2>
			<div class="grid grid-cols-2 gap-5">
				{#await data.streamed.skills}
					<h1>Loading...</h1>
				{:then result}
					{#if result.ok}
						{#each result.data as skill}
							<Skill icon={skill.icon} name={skill.name} level={skill.level} />
						{/each}
					{:else}
						<h1 class="load-error col-span-2">{result.error}</h1>
					{/if}
				{/await}
			</div>
		</div>
	</div>
</main>

<style lang="postcss">
	.material-icons-round.contact {
		font-size: 36px;
	}

	.fab.contact {
		font-size: 28px;
	}

	.detail {
		@apply flex items-center gap-2 text-2xl;
	}

	.load-error {
		@apply text-base text-red-300;
	}
</style>
