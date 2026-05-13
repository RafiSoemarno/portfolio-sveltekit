<script lang="ts">
	import HomeSection from '$lib/components/HomeSection.svelte';
	import AboutSection from '$lib/components/AboutSection.svelte';
	import WorkSection from '$lib/components/WorkSection.svelte';
</script>

<section id="home" class="page-section">
	<HomeSection />
</section>

<section id="about" class="page-section">
	<AboutSection />
</section>

<section id="work" class="page-section work-section">
	<WorkSection />
</section>

<style lang="postcss">
	.page-section {
		@apply relative flex min-h-screen w-full items-center justify-center;
		scroll-margin-top: 120px;
	}

	.work-section {
		@apply overflow-hidden;
	}
</style>
