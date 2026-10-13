export interface Event {
    id: number;
    title: string;
    slug: string;
    description?: string;
    location?: string;
    banner?: string;
    event_date: string;
    event_time?: string;
}