import { writable } from 'svelte/store';

/** Increments each time a warp is requested; Starfield subscribes to this. */
export const warpTick = writable(0);

export function triggerWarp() {
	warpTick.update((n) => n + 1);
}
