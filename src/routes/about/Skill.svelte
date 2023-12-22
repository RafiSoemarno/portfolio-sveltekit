<script lang="ts">
    export let icon: string;
    export let name: string;
    export let level: number;
    let dots: [boolean|null] = [null];

    for (let i = 0; i < 5; i++) {
        dots[i] = i < level ? true : false;
    }
</script>

<div class="flex justify-between gap-4 bg-white bg-opacity-10 rounded-full p-4 px-6">
    <div>
        <span class={icon} />
        <span class="ml-3 font-bold">{name}</span>
    </div>
    <div class="flex gap-1 items-center">
        {#each dots as dot}
            {#if dot}
                <span class="material-icons-round select-none">circle</span>
            {:else}
                <span class="material-icons-outlined select-none">circle</span>
            {/if}
        {/each}
    </div>
</div>

<style>
    .material-icons-round {
        font-size: 16px;
        vertical-align: middle;
    }
    .material-icons-outlined {
        font-size: 16px;
        vertical-align: middle;
    }
</style>
