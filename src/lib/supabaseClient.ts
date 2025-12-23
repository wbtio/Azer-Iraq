import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://fzajmuxhmvczocxalfrs.supabase.co'
const supabaseKey = 'sb_publishable_W2YXqwV4O-rSSYXM8KDWxQ_dvNKWvJ4'

export const supabase = createClient(supabaseUrl, supabaseKey)
