// import * as db from '$lib/server/supabaseClient';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
    return {
        // post: await db.getPost(params.slug)
        
    };
}) satisfies PageServerLoad;