<script lang="ts">
	interface Icon { class: string; name: string; }
	export let icon: Icon;
	export let name: string;
	export let date: string;
</script>

<li class="entry">
	<div class="icon-wrap">
		<span class="{icon.class} select-none" aria-hidden="true">{icon.name}</span>
	</div>
	<div class="content">
		<span class="name">{name}</span>
		<span class="date">{date}</span>
	</div>
</li>

<style lang="postcss">
	.entry {
		@apply flex items-start gap-4 relative list-none;
	}

	/* Timeline connector line */
	.entry:not(:last-child)::after {
		content: '';
		@apply absolute left-[19px] top-10 w-px bg-white opacity-10;
		height: calc(100% + 1.25rem);
	}

	.icon-wrap {
		@apply flex-shrink-0 w-10 h-10 rounded-xl bg-white bg-opacity-10 flex items-center justify-center;
		font-size: 20px;
	}

	.content {
		@apply flex flex-col pt-1 gap-0.5;
	}

	.name {
		@apply text-zinc-100 font-medium leading-snug;
	}

	.date {
		@apply text-sm text-zinc-500;
	}
</style>

