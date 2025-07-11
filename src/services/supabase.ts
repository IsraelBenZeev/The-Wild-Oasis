import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://lewxjknwwvanxnuxklgp.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxld3hqa253d3ZhbnhudXhrbGdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIxNzk3MjUsImV4cCI6MjA2Nzc1NTcyNX0._RkiuaTWlGAJ_s91_1J8dhtZuV7_C39Hxag5Y49vOyk';
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
