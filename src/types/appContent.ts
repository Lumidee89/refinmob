export type AppSection = 'home' | 'watch' | 'grow' | 'community' | 'connect' | 'give' | 'profile';

export interface AppContent {
    id: number;
    section: AppSection;
    category: string;
    title: string;
    summary?: string | null;
    body?: string | null;
    image_url?: string | null;
    media_type?: 'audio' | 'video' | 'link' | null;
    media_url?: string | null;
    action_url?: string | null;
    published_at?: string | null;
}

export interface AppContentResponse {
    sections: Partial<Record<AppSection, Record<string, AppContent[]>>>;
}
