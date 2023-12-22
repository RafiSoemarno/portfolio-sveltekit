<script lang="ts">
	export let workId: number;
	export let img: string = "https://placehold.co/800x600";
	export let alt: string = "placeholder";
	export let focused: boolean = false;
</script>

<div class="bounding-container {focused ? 'focused' : ''}" data-work-id={workId}>
	<img src={img} alt={alt} />
</div>

<style lang="postcss">
	.bounding-container {
		@apply flex justify-center overflow-clip border-green-500 border-4 transition-all duration-300 select-none;
		width: 400px;
	}

	img {
		@apply max-w-none bg-green-300 transition-all duration-500 pointer-events-none select-none;
		height: 600px;
	}

	.focused {
		transform: scaleX(2);
	}

	.focused > img {
		@apply scale-x-50;
	}

</style>
