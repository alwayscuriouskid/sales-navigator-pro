import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const supabaseUrl = "https://biubjswsubgjvafvdloy.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpdWJqc3dzdWJnanZhZnZkbG95Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIxOTAwOTEsImV4cCI6MjA0Nzc2NjA5MX0.o5UHSeNFlHlqr0W00BsflFSr42O2fJ19pH9yAG0jaFQ";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});