export type User = {
    id: string;
    username: string;
    email?: string;
    avatar_url?: string;
    bio?: string;
    created_at?: string;
    updated_at?: string;
    email_public?: boolean;
};

export type UserStats = {
    reviews_count?: number;
    collections_count?: number;
    media_count?: number;
    followers_count?: number;
    following_count?: number;
};

export type CollectionItem = {
    id: string;
    name: string;
    description?: string;
    media_type?: string;
    media_count?: number;
    is_public?: boolean;
    updated_at?: string;
};

export type ReviewItem = {
    id: string;
    rating: number;
    content: string;
    tags?: string[];
    likes_count: number;
    comments_count: number;
    user_liked?: boolean;
    created_at: string;
    media: { id: string; title: string; type: string; year?: number; poster_url?: string; }
};

export type MediaItem = {
    id: string;
    title: string;
    type: string;
    year?: number;
    poster_url?: string;
    is_favorite?: boolean;
    user_rating?: number;
    user_status?: string;
};

export type ActivityItem = {
    id: string;
    type: string;
    text: string;
    created_at: string;
};
