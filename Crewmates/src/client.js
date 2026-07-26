import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY || '';

// Initialize Supabase client if keys exist
export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseKey && 
  supabaseUrl !== 'https://your-supabase-project.supabase.co' &&
  !supabaseUrl.includes('your-supabase')
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseKey)
  : null;

// Initial mock data if database is disconnected
const INITIAL_CREWMATES = [
  {
    id: '1',
    created_at: new Date(Date.now() - 3600000 * 24 * 2).toISOString(),
    name: 'Captain Apex',
    color: 'Red',
    speed: 5,
    category: 'Command & Intel',
    role: 'Fleet Captain',
    weapon: 'Tactical Command Pad',
    bio: 'Veteran space captain with over 40 successful orbital missions. Known for decisive tactical instincts.'
  },
  {
    id: '2',
    created_at: new Date(Date.now() - 3600000 * 12).toISOString(),
    name: 'Sparky Nova',
    color: 'Cyan',
    speed: 8,
    category: 'Engineering & Tech',
    role: 'Warp Drive Engineer',
    weapon: 'Hydro-Spanner',
    bio: 'Hyper-active quantum engineer who can fix sub-light thrusters in under 3 minutes while drinking space coffee.'
  },
  {
    id: '3',
    created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
    name: 'Doc Pulse',
    color: 'Green',
    speed: 3,
    category: 'Medical & Bio',
    role: 'Trauma Specialist',
    weapon: 'Bio-Scanner',
    bio: 'Calm under extreme zero-gravity pressure. Specialized in extraterrestrial bio-pathology and field triage.'
  }
];

const LOCAL_STORAGE_KEY = 'galactic_crewmates_db_v1';

const getLocalData = () => {
  const data = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!data) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_CREWMATES));
    return INITIAL_CREWMATES;
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    return INITIAL_CREWMATES;
  }
};

const setLocalData = (crewmates) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(crewmates));
};

// CRUD API Abstractions using Supabase primary + LocalStorage fallback
export const api = {
  // READ ALL (Sorted by creation date, most recent first)
  async getCrewmates() {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('crewmates')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        return { data, error: null };
      } catch (err) {
        console.warn('Supabase fetch failed, falling back to local DB:', err.message);
      }
    }
    
    // Fallback or Local DB
    const list = getLocalData().sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    return { data: list, error: null };
  },

  // READ ONE
  async getCrewmateById(id) {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('crewmates')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        return { data, error: null };
      } catch (err) {
        console.warn('Supabase fetch single failed:', err.message);
      }
    }

    // Fallback
    const list = getLocalData();
    const item = list.find((c) => String(c.id) === String(id));
    if (!item) return { data: null, error: new Error('Crewmate not found') };
    return { data: item, error: null };
  },

  // CREATE
  async createCrewmate(crewmateData) {
    const payload = {
      ...crewmateData,
      created_at: new Date().toISOString()
    };

    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('crewmates')
          .insert([payload])
          .select();

        if (error) throw error;
        return { data: data[0], error: null };
      } catch (err) {
        console.error('Supabase create error:', err.message);
        return { data: null, error: err };
      }
    }

    // Fallback
    const newCrewmate = {
      ...payload,
      id: String(Date.now())
    };
    const list = getLocalData();
    list.unshift(newCrewmate);
    setLocalData(list);
    return { data: newCrewmate, error: null };
  },

  // UPDATE
  async updateCrewmate(id, updatedFields) {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('crewmates')
          .update(updatedFields)
          .eq('id', id)
          .select();

        if (error) throw error;
        return { data: data[0], error: null };
      } catch (err) {
        console.error('Supabase update error:', err.message);
        return { data: null, error: err };
      }
    }

    // Fallback
    const list = getLocalData();
    const index = list.findIndex((c) => String(c.id) === String(id));
    if (index === -1) return { data: null, error: new Error('Crewmate not found') };

    list[index] = { ...list[index], ...updatedFields };
    setLocalData(list);
    return { data: list[index], error: null };
  },

  // DELETE
  async deleteCrewmate(id) {
    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase
          .from('crewmates')
          .delete()
          .eq('id', id);

        if (error) throw error;
        return { error: null };
      } catch (err) {
        console.error('Supabase delete error:', err.message);
        return { error: err };
      }
    }

    // Fallback
    let list = getLocalData();
    list = list.filter((c) => String(c.id) !== String(id));
    setLocalData(list);
    return { error: null };
  }
};
