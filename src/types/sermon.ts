export interface Sermon {
    id: number;
    title: string;
    slug: string;
    speaker: string;
    description?: string;
    thumbnail?: string;
    audio_path?: string;
    youtube_url?: string;
    facebook_url?: string;
    type: 'audio' | 'video';
    published_at?: string;
}
