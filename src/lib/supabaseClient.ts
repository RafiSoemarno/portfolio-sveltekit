import { createClient } from '@supabase/supabase-js';
import { env } from '$env/dynamic/public';

const dbUrl = env.PUBLIC_DB_URL?.trim();
const apiKey = env.PUBLIC_API_KEY?.trim();
const hasValidSupabaseEnv = Boolean(dbUrl && apiKey);

export const supabase = hasValidSupabaseEnv ? createClient(dbUrl!, apiKey!) : null;
export const supabaseClientError = hasValidSupabaseEnv
? null
: 'Missing PUBLIC_DB_URL or PUBLIC_API_KEY environment variables.';
