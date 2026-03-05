import { createClient } from '@supabase/supabase-js';
import { env } from '$env/dynamic/private';

const dbUrl = env.DB_URL?.trim();
const apiKey = env.API_KEY?.trim();
const hasValidSupabaseEnv = Boolean(dbUrl && apiKey);

export const supabase = hasValidSupabaseEnv ? createClient(dbUrl!, apiKey!) : null;
export const supabaseClientError = hasValidSupabaseEnv
	? null
	: 'Missing DB_URL or API_KEY environment variables.';