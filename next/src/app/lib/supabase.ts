import { createClient } from '@supabase/supabase-js';

const supabaseProjectUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Supabaseクライアントの初期化
export const supabase = createClient(supabaseProjectUrl, supabaseAnonKey);