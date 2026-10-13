import { Sermon } from './sermon';
import { Event } from './event';
import { Blog } from './blog';
import { Livestream } from './livestream';

export interface HomeResponse {
    latestVideoSermons: Sermon[];
    latestAudioSermons: Sermon[];
    upcomingEvents: Event[];
    latestBlogs: Blog[];
    livestream: Livestream | null;
}