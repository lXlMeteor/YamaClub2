import { createClient } from '@supabase/supabase-js';

const supabaseProjectUrl = process.env.SUPABASE_PROJECT_URL || '';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || '';

// Supabaseクライアントの初期化
export const supabase = createClient(supabaseProjectUrl, supabaseAnonKey);