import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://fdomucamrblcfecwptab.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_zGswUmfGCpq_3DeWYXd-wg_3dkUhpwF'; // sb_publishable_z...

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
