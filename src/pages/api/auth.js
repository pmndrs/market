import { supabase } from '../../helpers/initSupabase'

export default function handler(req, res) {
  supabase.auth.api.setAuthCookie(req, res)
}
