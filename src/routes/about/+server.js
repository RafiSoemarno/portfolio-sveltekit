import { supabase } from "$lib/server/supabaseClient";

export async function GET() {
  const { data: achievementRaw, error: achievementError } = await supabase.storage.from('about').download('achievements.json')
  const { data: skillRaw, error: skillError } = await supabase.storage.from('about').download('skills.json')
  const achievements = achievementRaw ? JSON.parse(await achievementRaw.text()) : []
  const skills = skillRaw ? JSON.parse(await skillRaw.text()) : []
  const data = {
    streamed: {
      achievements: achievements,
      skills: skills
    }
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });
  return new Response(blob);
}