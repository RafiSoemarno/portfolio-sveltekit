import { supabase } from "$lib/server/supabaseClient";

export async function load() {
  const { data: achievementRaw, error: achievementError } = await supabase.storage.from('about').download('achievements.json')
  const { data: skillRaw, error: skillError } = await supabase.storage.from('about').download('skills.json')
  const achievements = achievementRaw ? JSON.parse(await achievementRaw.text()) : []
  const skills = skillRaw ? JSON.parse(await skillRaw.text()) : []
  return {
    streamed: {
      achievements: new Promise((fulfil) => {
				setTimeout(() => {
					fulfil(achievements)
				}, 2000);
      }),
      skills: new Promise((fulfil) => {
				setTimeout(() => {
					fulfil(skills)
				}, 2000);
      })
    }
  };
}