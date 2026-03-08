import { Project } from '../types/project';
import projectsData from '../data/projects.json';

// --- SUPABASE PREPARATION ---
// 1. Uncomment and configure your Supabase client in lib/supabase.ts
// import { supabase } from '../lib/supabase';

// 2. The functions below simulate network requests. To switch to Supabase,
//    replace the simulated timeouts with real database queries.
// ----------------------------

/**
 * Fetch all projects (summary info)
 */
export async function getProjects(): Promise<Project[]> {
    // --- SUPABASE IMPLEMENTATION ---
    // const { data, error } = await supabase
    //   .from('projects')
    //   .select('id, title, category, year, image');
    // if (error) throw error;
    // return data;

    // Simulated network delay
    return new Promise((resolve) => {
        setTimeout(() => {
            // For the listing, we just need basic info, but we'll return all for now
            resolve(projectsData as Project[]);
        }, 500); // 500ms delay to simulate loading
    });
}

/**
 * Fetch a single project by ID with full details
 */
export async function getProjectById(id: string): Promise<Project | null> {
    // --- SUPABASE IMPLEMENTATION ---
    // const { data, error } = await supabase
    //   .from('projects')
    //   .select('*')
    //   .eq('id', id)
    //   .single();
    // if (error) throw error;
    // return data;

    return new Promise((resolve) => {
        setTimeout(() => {
            const project = (projectsData as Project[]).find(p => p.id === id);
            // Fallback to '01' if id not found (to maintain previous behavior)
            if (!project) {
                resolve((projectsData as Project[]).find(p => p.id === '01') || null);
            } else {
                resolve(project);
            }
        }, 500);
    });
}
