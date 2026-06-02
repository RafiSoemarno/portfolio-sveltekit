import type { PageServerLoad } from './$types';
import { getAchievements, getSkills, getWorks } from '$lib/server/data';

export const prerender = true;

export const load: PageServerLoad = async () => {
	return {
		works: await getWorks(),
		streamed: {
			achievements: getAchievements(),
			skills: getSkills()
		}
	};
};
