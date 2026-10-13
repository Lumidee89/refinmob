export const youtubeVideoId = (url?: string | null) => {
    if (!url) return null;
    const patterns = [
        /youtu\.be\/([\w-]{11})/,
        /youtube\.com\/(?:live|embed|shorts)\/([\w-]{11})/,
        /[?&]v=([\w-]{11})/,
    ];
    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match) return match[1];
    }
    return null;
};
