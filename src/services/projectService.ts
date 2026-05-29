import { Project } from '../types/project';
import projectsData from '../data/projects.json';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

// Helper function to map database snake_case fields to frontend camelCase fields
function mapProject(p: any): Project {
    return {
        id: p.id,
        title: p.title,
        category: p.category,
        year: p.year,
        image: p.image,
        author: p.author || undefined,
        version: p.version || undefined,
        license: p.license || undefined,
        repository: p.repository || undefined,
        summary: p.summary || undefined,
        techStack: p.tech_stack || [],
        categories: p.categories || [],
        stats: p.stats || undefined,
        gallery: p.gallery || [],
        toc: p.toc || [],
        content: p.content || [],
    };
}

/**
 * Fetch all projects (summary info)
 */
export async function getProjects(): Promise<Project[]> {
    if (isSupabaseConfigured) {
        try {
            const { data, error } = await supabase
                .from('projects')
                .select('*')
                .eq('status', 'PUBLISHED')
                .order('id', { ascending: true });
                
            if (error) throw error;
            if (data && data.length > 0) {
                return data.map(mapProject);
            }
        } catch (err) {
            console.error('Supabase getProjects error, falling back to local JSON:', err);
        }
    }

    // Fallback to local JSON
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(projectsData as Project[]);
        }, 500); // 500ms delay to simulate network latency
    });
}

/**
 * Fetch a single project by ID with full details
 */
export async function getProjectById(id: string): Promise<Project | null> {
    if (isSupabaseConfigured) {
        try {
            const { data, error } = await supabase
                .from('projects')
                .select('*')
                .eq('id', id)
                .single();
                
            if (error) throw error;
            if (data) {
                return mapProject(data);
            }
        } catch (err) {
            console.error(`Supabase getProjectById(${id}) error, falling back to local JSON:`, err);
        }
    }

    // Fallback to local JSON
    return new Promise((resolve) => {
        setTimeout(() => {
            const project = (projectsData as Project[]).find(p => p.id === id);
            resolve(project || null);
        }, 500);
    });
}

/**
 * Submit a new project to Supabase
 */
export async function submitProject(project: Omit<Project, 'id' | 'stats' | 'gallery' | 'toc' | 'content'>): Promise<void> {
    if (isSupabaseConfigured) {
        const nextId = crypto.randomUUID();
        const { error } = await supabase
            .from('projects')
            .insert({
                id: nextId,
                title: project.title,
                category: project.category,
                year: project.year,
                author: project.author,
                repository: project.repository,
                summary: project.summary,
                tech_stack: project.techStack,
                status: 'PENDING', // Submissions require manual review/curation
                image: project.image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2000'
            });
            
        if (error) throw error;
        return;
    }
    
    // Non-configured fallback logs the request (omitted in production)
    return new Promise((resolve) => setTimeout(resolve, 1000));
}

