<script lang="ts">
	interface Icon {
		class: string
		name: string
	};
	export let icon: Icon;
	export let name: string;
	export let date: string;
</script>

<div class="flex flex-row gap-5 bg-white bg-opacity-10 rounded-3xl p-4 px-6">
	<div class="flex flex-col justify-center">
		<span class="{icon.class} align-middle select-none">{icon.name}</span>
	</div>
	<div class="flex flex-col">
		<span>{@html name}</span>
		<span class="text-white opacity-50">{date}</span>
	</div>
</div>
