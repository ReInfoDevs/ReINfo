import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

console.log('Connecting to Supabase...');

(async () => {
  try {
    // Attempt to retrieve an example data or test connection
    const { data, error } = await supabase.from('users').select('*').limit(1);

    if (error) {
      console.error('Error connecting to Supabase:', error.message);
    } else {
      console.log('Connected to Supabase successfully!');
    }
  } catch (err) {
    console.error('Connection error:', err);
  }
})();

export default supabase;
