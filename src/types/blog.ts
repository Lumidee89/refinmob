export interface Blog {
    id: number;
    title: string;
    slug: string;
    content?: string;
    excerpt?: string;
    featured_image?: string;
    created_at?: string;
    updated_at?: string;
}