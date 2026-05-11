<script lang="ts">
import { onMount } from 'svelte';
import Achievement from '$lib/components/Achievement.svelte';
import Skill from '$lib/components/Skill.svelte';
import { supabase, supabaseClientError } from '$lib/supabaseClient';

const ABOUT_BUCKET = 'about';
const REQUEST_TIMEOUT_MS = 5000;

interface Icon {
class: string;
name: string;
}

interface AchievementData {
icon: Icon;
name: string;
date: string;
}

interface SkillData {
icon: string;
name: string;
level: number;
}

type LoadResult<T> = { ok: true; data: T } | { ok: false; error: string };

let achievements: LoadResult<AchievementData[]> | null = null;
let skills: LoadResult<SkillData[]> | null = null;

function withTimeout<T>(promise: Promise<T>, timeoutMs: number, resourceName: string): Promise<T> {
return Promise.race([
promise,
new Promise<T>((_, reject) => {
setTimeout(() => {
reject(new Error(`Request timed out while loading ${resourceName}.`));
}, timeoutMs);
})
]);
}

async function downloadAboutJson<T>(path: string): Promise<LoadResult<T>> {
if (!supabase) {
return {
ok: false,
error: supabaseClientError ?? 'Failed to connect to Supabase.'
};
}

try {
const { data, error } = await withTimeout(
supabase.storage.from(ABOUT_BUCKET).download(path),
REQUEST_TIMEOUT_MS,
path
);

if (error || !data) {
return {
ok: false,
error: `Failed to connect while loading ${path}.`
};
}

return {
ok: true,
data: JSON.parse(await data.text()) as T
};
} catch (caughtError) {
const message = caughtError instanceof Error ? caughtError.message : '';
return {
ok: false,
error: /timed out/i.test(message)
? `Request timed out while loading ${path}.`
: `Failed to connect while loading ${path}.`
};
}
}

onMount(async () => {
const [achievementResult, skillResult] = await Promise.all([
downloadAboutJson<AchievementData[]>('achievements.json'),
downloadAboutJson<SkillData[]>('skills.json')
]);

achievements = achievementResult;
skills = skillResult;
});
</script>

<div class="bg-primary text-gray-300 ps-32 my-auto max-h-[70%]">
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
{#if !achievements}
<h1>Loading...</h1>
{:else if achievements.ok}
{#each achievements.data as achievement}
<Achievement icon={achievement.icon} name={achievement.name} date={achievement.date} />
{/each}
{:else}
<h1 class="load-error">{achievements.error}</h1>
{/if}
</div>
</div>
<div class="flex flex-col gap-5">
<h2 class="text-3xl text-center">Skills</h2>
<div class="grid grid-cols-2 gap-5">
{#if !skills}
<h1>Loading...</h1>
{:else if skills.ok}
{#each skills.data as skill}
<Skill icon={skill.icon} name={skill.name} level={skill.level} />
{/each}
{:else}
<h1 class="load-error col-span-2">{skills.error}</h1>
{/if}
</div>
</div>
</div>
</div>

<style lang="postcss">
.detail {
@apply flex items-center gap-2 text-2xl;
}

.load-error {
@apply text-base text-red-300;
}
</style>
