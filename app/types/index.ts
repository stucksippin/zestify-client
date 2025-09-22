// types/index.ts - ЕДИНЫЙ файл со всеми типами проекта

// =============================================================================
// БАЗОВЫЕ ТИПЫ
// =============================================================================

export interface Author {
    name: string
    avatar: string
}

export type MediaType = 'movie' | 'game' | 'book'
export type MediaStatus = 'watched' | 'playing' | 'read' | 'planned' | 'dropped'

// =============================================================================
// МЕДИА ТИПЫ
// =============================================================================

export interface Media {
    id: number
    title: string
    year: string
    type: MediaType
    typeIcon: string
    rating: number
    description?: string
    poster?: string
    backdrop?: string
    releaseDate?: string
    originalTitle?: string
    genre?: string
    // Пользовательские данные
    status?: MediaStatus
    userRating?: number
    dateAdded?: string
    // Социальные данные
    reviewExcerpt?: string
    author?: Author
    likes?: number
    comments?: number
}

export interface MediaFilters {
    search: string
    genre: string
    year: string
    rating: string
    sortBy: 'popularity' | 'rating' | 'title' | 'year'
    sortOrder: 'asc' | 'desc'
}

export interface MediaTab {
    id: string
    label: string
    icon: string
    href: string
}

// =============================================================================
// API ТИПЫ
// =============================================================================

// TMDB API (фильмы)
export interface TMDBMovie {
    id: number
    title: string
    original_title: string
    overview: string
    poster_path: string | null
    backdrop_path: string | null
    release_date: string
    vote_average: number
    genre_ids: number[]
    popularity: number
}

export interface TMDBResponse {
    page: number
    results: TMDBMovie[]
    total_pages: number
    total_results: number
}

// RAWG API (игры)
export interface RAWGGame {
    id: number
    name: string
    slug: string
    description_raw?: string
    background_image: string | null
    released: string
    rating: number
    genres: Array<{ id: number; name: string }>
    platforms: Array<{ platform: { id: number; name: string } }>
    metacritic: number | null
}

export interface RAWGResponse {
    count: number
    next: string | null
    previous: string | null
    results: RAWGGame[]
}

// Open Library API (книги)
export interface OpenLibraryBook {
    key: string
    title: string
    author_name?: string[]
    first_publish_year?: number
    subject?: string[]
    cover_i?: number
    isbn?: string[]
    description?: string
    ratings_average?: number
    cover_url?: string | null
}

export interface OpenLibraryResponse {
    numFound: number
    start: number
    docs: OpenLibraryBook[]
}

// =============================================================================
// ПОЛЬЗОВАТЕЛЬ И ПРОФИЛЬ
// =============================================================================

export interface User {
    id: string
    username: string
    email?: string
    avatar_url?: string
    bio?: string
    created_at?: string
    updated_at?: string
    email_public?: boolean
}

export interface UserStats {
    reviews_count?: number
    collections_count?: number
    media_count?: number
    followers_count?: number
    following_count?: number
}

// =============================================================================
// КОЛЛЕКЦИИ
// =============================================================================

export interface Collection {
    id: string
    name: string
    description?: string
    media_type?: 'books' | 'movies' | 'games' | 'all'
    media_count?: number
    is_public?: boolean
    updated_at?: string
}

// Алиас для совместимости с профилем
export type CollectionItem = Collection

// =============================================================================
// РЕЦЕНЗИИ
// =============================================================================

export interface Review {
    id: string
    rating: number
    content: string
    tags?: string[]
    likes_count: number
    comments_count: number
    user_liked?: boolean
    created_at: string
    media: MediaBasic
}

// Алиас для совместимости с профилем
export type ReviewItem = Review

export interface MediaBasic {
    id: string
    title: string
    type: 'books' | 'movies' | 'games'
    year?: number
    poster_url?: string
}

// =============================================================================
// ПОЛЬЗОВАТЕЛЬСКОЕ МЕДИА
// =============================================================================

export interface UserMedia {
    id: string
    title: string
    type: 'books' | 'movies' | 'games'
    year?: number
    poster_url?: string
    is_favorite?: boolean
    user_rating?: number
    user_status?: 'completed' | 'playing' | 'reading' | 'watching' | 'want' | 'dropped'
}

// Алиас для совместимости с профилем
export type MediaItem = UserMedia

// =============================================================================
// АКТИВНОСТЬ
// =============================================================================

export interface Activity {
    id: string
    type: 'review_created' | 'collection_created' | 'media_added' | 'followed_user' | 'liked_review'
    text: string
    created_at: string
}

// Алиас для совместимости с профилем
export type ActivityItem = Activity

// =============================================================================
// ДОПОЛНИТЕЛЬНЫЕ ТИПЫ ДЛЯ ПРОФИЛЯ
// =============================================================================

export interface GenreStat {
    name: string
    count: number
}

export interface TopFollower {
    id: string
    username: string
    avatar_url?: string
    common_media: number
}

// =============================================================================
// СОСТОЯНИЯ И УТИЛИТЫ
// =============================================================================

export interface LoadingState {
    isLoading: boolean
    error: string | null
    hasMore: boolean
}

export interface Genre {
    id: string
    name: string
}

// =============================================================================
// КОМПОНЕНТНЫЕ ТИПЫ
// =============================================================================

export interface Feature {
    id: number
    icon: string
    iconClass: string
    title: string
    description: string
    stats: {
        main: string
        label: string
    }
}

// =============================================================================
// UI ТИПЫ И ФИЛЬТРЫ
// =============================================================================

// Профиль
export type ProfileTab = 'collections' | 'reviews' | 'media' | 'activity'
export type TabType = ProfileTab // Алиас для совместимости

export type CollectionsFilter = 'all' | 'public' | 'private' | 'books' | 'movies' | 'games'
export type ReviewsFilter = 'all' | 'books' | 'movies' | 'games' | 'recent' | 'top_rated'
export type ReviewsSort = 'newest' | 'oldest' | 'rating_desc' | 'rating_asc'
export type MediaFilter = 'all' | 'books' | 'movies' | 'games' | 'favorites'

// Виды отображения
export type ViewMode = 'grid' | 'list' | 'compact'
export type MediaView = 'grid' | 'list' // Алиас для совместимости

// =============================================================================
// API RESPONSE ТИПЫ
// =============================================================================

export interface ApiResponse<T> {
    data: T
    message?: string
    status: 'success' | 'error'
}

export interface PaginatedResponse<T> {
    data: T[]
    total: number
    page: number
    limit: number
    hasMore: boolean
}

// =============================================================================
// КОНСТАНТЫ
// =============================================================================

export const MEDIA_TYPES: Record<MediaType, { label: string; icon: string; href: string }> = {
    movie: { label: 'Фильмы', icon: '🎬', href: '/movies' },
    game: { label: 'Игры', icon: '🎮', href: '/games' },
    book: { label: 'Книги', icon: '📚', href: '/books' }
}

export const STATUS_LABELS: Record<MediaStatus, string> = {
    watched: 'Просмотрено',
    playing: 'Играю',
    read: 'Прочитано',
    planned: 'Запланировано',
    dropped: 'Брошено'
}