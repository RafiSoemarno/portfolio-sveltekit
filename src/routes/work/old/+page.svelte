<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from '../$types';
	import WorkCard from '../WorkCard.svelte';

	// export let data: PageData;

	let carousel: HTMLDivElement;
	var offset = -200;
	let cooldown = false;
	let focused = 0;
	var anim: Animation;

	interface Work {
		workId: number;
		img?: string;
		alt?: string;
		offset: number;
		focused?: boolean;
	}
	let works: Work[] = [
		{ workId: 0, offset: -200 },
		{ workId: 1, offset: -648 },
		{ workId: 2, offset: -1096 },
		{ workId: 3, offset: -1544 }
	];
	for (let i = 0; i < works.length; i++) {
		if (i == 0) {
			works[i].focused = true;
		} else {
			works[i].focused = false;
		}
	}

	// Detect the element/work closest to the middle of the viewport
	function closestElement(): Element {
		const hitTest = document.elementFromPoint(document.body.offsetWidth / 2, document.body.offsetHeight / 2);
		if (hitTest && (hitTest as HTMLElement).dataset.workId) return hitTest;
		var number = parseInt(carousel.dataset.offset!);
        var num = 0;
        for (var i = works.length - 1; i >= 0; i--) {
            if(Math.abs(number - works[i].offset) < Math.abs(number - works[num].offset)){
                num = i;
            }
        }
        return carousel.children[num];
	}

	// Change the offset of the carousel and which work is focused
	function changeFocus(focus: number) {
		carousel.children[focused].classList.remove('focused');
		carousel.children[focused].firstElementChild!.classList.remove('scale-x-50');
		focused = focus;
		offset = works[focused].offset;
		carousel.animate(
			{
				transform: `translate(${offset}px, -50%)`
			},
			{ duration: 300, fill: 'forwards' }
		);
		carousel.children[focused].classList.add('focused');
		carousel.children[focused].firstElementChild!.classList.add('scale-x-50');
	}

	function scroll(event: WheelEvent) {
		if (cooldown) return;
		cooldown = true;
		setTimeout(function () {
			cooldown = false;
		}, 200);
		if (event.deltaY > 0) {
			if (carousel.children[focused] === carousel.lastElementChild) return;
			changeFocus(focused + 1);
		} else {
			if (carousel.children[focused] === carousel.firstElementChild) return;
			changeFocus(focused - 1);
		}
	}

	function handleDown(event: MouseEvent | Touch) {
		cooldown = true;
		carousel.dataset.mouseDownAt = event.clientX.toString();
		carousel.children[focused].classList.remove('focused');
		carousel.children[focused].firstElementChild!.classList.remove('scale-x-50');
	}

	function handleUp() {
		setTimeout(function () {
			cooldown = false;
		}, 1200);
		const closest = closestElement();
		var closest2: Work;
			closest2 = works[parseInt((closest as HTMLElement).dataset.workId!)];
		carousel.dataset.mouseDownAt = '0';
		carousel.dataset.prevOffset = carousel.dataset.offset;
		changeFocus(closest2.workId);
	}

	function handleMove(event: MouseEvent | Touch) {
		if (carousel.dataset.mouseDownAt === '0') return;

		const mouseDelta = parseFloat(carousel.dataset.mouseDownAt!) - event.clientX;

		const maxDelta = carousel.offsetWidth / 2;
		const percentage = (mouseDelta / maxDelta) * -100,
			nextPercentageUnconstrained = parseFloat(carousel.dataset.prevOffset!) + percentage;

		const offsetAmount = Math.max(Math.min(nextPercentageUnconstrained!, 0), -80);

		if(offsetAmount < 0) {
			carousel.dataset.offset = offsetAmount.toString();
	
			carousel.animate(
				{
					transform: `translate(${offsetAmount}%, -50%)`
				},
				{ duration: 1200, fill: 'forwards' }
			);
		}
	}
</script>

<svelte:window
	on:wheel={scroll}
	on:mousedown={handleDown}
	on:mousemove={handleMove}
	on:mouseup={handleUp}
	on:touchstart={(e) => {
		handleDown(e.touches[0]);
	}}
	on:touchmove={(e) => {
		handleMove(e.touches[0]);
	}}
	on:touchend={handleUp}
/>

<div id="carousel" bind:this={carousel} data-mouse-down-at="0" data-prev-offset="0" data-offset="0">
	{#each works as work}
		<WorkCard {...work} />
	{/each}
</div>

<!-- <div id="center">X</div> -->

<style lang="postcss">
	#carousel {
		@apply flex absolute left-1/2 top-1/2 -translate-y-1/2 transition-all duration-300;
		gap: 48px;
		transform: translate(-200px, -50%);
	}

	#center {
		@apply absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2;
	}

	:global(.bounding-container:not(.focused)) {
		transform: translate(-200px);
	}

	:global(.focused) ~ :global(.bounding-container) {
		transform: translateX(200px);
	}
</style>
