import { supabase, supabaseClientError } from '$lib/server/supabaseClient';

const ABOUT_BUCKET = 'about';
const REQUEST_TIMEOUT_MS = 5000;

function withTimeout(promise, timeoutMs, resourceName) {
  return Promise.race([
    promise,
    new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error(`Request timed out while loading ${resourceName}.`));
      }, timeoutMs);
    })
  ]);
}

async function downloadAboutJson(path) {
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

    if (error) {
      return {
        ok: false,
        error: `Failed to connect while loading ${path}.`
      };
    }

    if (!data) {
      return {
        ok: false,
        error: `Failed to connect while loading ${path}.`
      };
    }

    return {
      ok: true,
      data: JSON.parse(await data.text())
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

export async function load() {
  const [achievements, skills] = await Promise.all([
    downloadAboutJson('achievements.json'),
    downloadAboutJson('skills.json')
  ]);

  return {
    streamed: {
      achievements: Promise.resolve(achievements),
      skills: Promise.resolve(skills)
    }
  };
}