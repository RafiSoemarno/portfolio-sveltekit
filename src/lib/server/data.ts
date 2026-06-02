import { createClient } from '@supabase/supabase-js';
import { DB_URL, API_KEY } from '$env/static/private';

import achievementsFallback from '$lib/data/achievements.json';
import skillsFallback from '$lib/data/skills.json';
import worksFallback from '$lib/data/works.json';

export interface AchievementIcon {
	class: string;
	name: string;
}

export interface Achievement {
	icon: AchievementIcon;
	name: string;
	date: string;
}

export interface Skill {
	icon: string;
	name: string;
	level: number;
}

export interface Work {
	title: string;
	description: string;
	image: string;
	tech?: string[];
	link?: string;
}

function getSupabase() {
	try {
		return createClient(DB_URL, API_KEY);
	} catch {
		return null;
	}
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function downloadJson<T>(supabase: ReturnType<typeof createClient<any>>, bucket: string, file: string): Promise<T[] | null> {
	const { data, error } = await supabase.storage.from(bucket).download(file);
	if (error || !data) return null;
	try {
		return JSON.parse(await data.text()) as T[];
	} catch {
		return null;
	}
}

export async function getAchievements(): Promise<Achievement[]> {
	const supabase = getSupabase();
	if (supabase) {
		const data = await downloadJson<Achievement>(supabase, 'about', 'achievements.json');
		if (data) return data;
	}
	return achievementsFallback as Achievement[];
}

export async function getSkills(): Promise<Skill[]> {
	const supabase = getSupabase();
	if (supabase) {
		const data = await downloadJson<Skill>(supabase, 'about', 'skills.json');
		if (data) return data;
	}
	return skillsFallback as Skill[];
}

export async function getWorks(): Promise<Work[]> {
	const supabase = getSupabase();
	if (supabase) {
		const data = await downloadJson<Work>(supabase, 'work', 'works.json');
		if (data) return data;
	}
	return worksFallback as Work[];
}
