export interface ProjectContentBlock {
    type: 'heading' | 'paragraph' | 'image' | 'quote' | 'list' | 'code';
    id?: string;
    text?: string;
    url?: string;
    caption?: string;
    items?: string[];
    language?: string;
    code?: string;
}

export interface ProjectStats {
    stars: string;
    forks: string;
    contributors: string;
    issues: string;
}

export interface ProjectToc {
    id: string;
    label: string;
}

export interface Project {
    id: string;
    title: string;
    category: string;
    year: string;
    image: string;
    author?: string;
    version?: string;
    license?: string;
    repository?: string;
    summary?: string;
    techStack?: string[];
    categories?: string[];
    stats?: ProjectStats;
    gallery?: string[];
    toc?: ProjectToc[];
    content?: ProjectContentBlock[];
}
