import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://uqidqlwkgzvoxggsskfh.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVxaWRxbHdrZ3p2b3hnZ3Nza2ZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY0OTg3NDcsImV4cCI6MjA5MjA3NDc0N30.7QH9sVfOF45imQ74lmKJLWLfSY-Gqxf8Ec3IeilwBA8';

// Fallback warning if not configured
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase URL or Anon Key is missing. Please add them to your environment variables.');
}

export const supabase = createClient(supabaseUrl || 'https://placeholder.supabase.co', supabaseAnonKey || 'placeholder_key');
