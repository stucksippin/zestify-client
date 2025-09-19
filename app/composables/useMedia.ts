// composables/useMedia.ts - Логика работы с медиа

import type {
    Media,
    MediaFilters,
    LoadingState,
    TMDBMovie,
    RAWGGame,
    OpenLibraryBook
} from '@/types'

export const useMedia = () => {
    // ===== СОСТОЯНИЕ =====
    const media = ref<Media[]>([])
    const filters = ref<MediaFilters>({
        search: '',
        genre: '',
        year: '',
        rating: '',
        sortBy: 'popularity',
        sortOrder: 'desc'
    })

    const loadingState = ref<LoadingState>({
        isLoading: false,
        error: null,
        hasMore: true
    })

    // ===== КОНВЕРТЕРЫ =====
    const convertTMDBToMedia = (movie: TMDBMovie): Media => ({
        id: movie.id,
        title: movie.title,
        year: movie.release_date ? new Date(movie.release_date).getFullYear().toString() : '',
        type: 'movie',
        typeIcon: '🎬',
        rating: Math.round(movie.vote_average * 10) / 10,
        description: movie.overview,
        poster: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : undefined,
        backdrop: movie.backdrop_path ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}` : undefined,
        originalTitle: movie.original_title,
        releaseDate: movie.release_date
    })

    const convertRAWGToMedia = (game: RAWGGame): Media => ({
        id: game.id,
        title: game.name,
        year: game.released ? new Date(game.released).getFullYear().toString() : '',
        type: 'game',
        typeIcon: '🎮',
        rating: Math.round(game.rating * 10) / 10,
        description: game.description_raw,
        poster: game.background_image,
        backdrop: game.background_image,
        releaseDate: game.released,
        genre: game.genres?.map(g => g.name).slice(0, 3).join(', ')
    })

    const convertOpenLibraryToMedia = (book: OpenLibraryBook): Media => ({
        id: book.key ? parseInt(book.key.split('/').pop() || '0') : Math.random(),
        title: book.title,
        year: book.first_publish_year?.toString() || '',
        type: 'book',
        typeIcon: '📚',
        rating: book.ratings_average ? Math.round(book.ratings_average * 10) / 10 : 0,
        description: book.description,
        poster: book.cover_url,
        backdrop: book.cover_url,
        genre: book.subject?.slice(0, 3).join(', ')
    })

    // ===== МЕТОДЫ =====
    const updateFilters = (newFilters: MediaFilters) => {
        filters.value = newFilters
    }

    const setLoading = (isLoading: boolean) => {
        loadingState.value.isLoading = isLoading
    }

    const setError = (error: string | null) => {
        loadingState.value.error = error
    }

    const setMedia = (newMedia: Media[]) => {
        media.value = newMedia
    }

    const addMedia = (newMedia: Media[]) => {
        media.value.push(...newMedia)
    }

    const clearMedia = () => {
        media.value = []
    }

    return {
        // Состояние
        media: readonly(media),
        filters: readonly(filters),
        loadingState: readonly(loadingState),

        // Конвертеры
        convertTMDBToMedia,
        convertRAWGToMedia,
        convertOpenLibraryToMedia,

        // Методы
        updateFilters,
        setLoading,
        setError,
        setMedia,
        addMedia,
        clearMedia
    }
}

// composables/useUser.ts - Логика работы с пользователем

import type { User, UserStats, Collection, Review, UserMedia, Activity } from '@/types'

export const useUser = () => {
    // ===== СОСТОЯНИЕ =====
    const user = ref<User | null>(null)
    const userStats = ref<UserStats>({})
    const collections = ref<Collection[]>([])
    const reviews = ref<Review[]>([])
    const userMedia = ref<UserMedia[]>([])
    const activity = ref<Activity[]>([])

    // ===== COMPUTED =====
    const isAuthenticated = computed(() => !!user.value)

    // ===== МЕТОДЫ =====
    const setUser = (newUser: User) => {
        user.value = newUser
    }

    const setUserStats = (stats: UserStats) => {
        userStats.value = stats
    }

    const toggleLike = (reviewId: string) => {
        const review = reviews.value.find(r => r.id === reviewId)
        if (review) {
            review.user_liked = !review.user_liked
            review.likes_count += review.user_liked ? 1 : -1
        }
    }

    const toggleFavorite = (mediaId: string) => {
        const mediaItem = userMedia.value.find(m => m.id === mediaId)
        if (mediaItem) {
            mediaItem.is_favorite = !mediaItem.is_favorite
        }
    }

    return {
        // Состояние
        user: readonly(user),
        userStats: readonly(userStats),
        collections: readonly(collections),
        reviews: readonly(reviews),
        userMedia: readonly(userMedia),
        activity: readonly(activity),

        // Computed
        isAuthenticated,

        // Методы
        setUser,
        setUserStats,
        toggleLike,
        toggleFavorite
    }
}

// composables/useAPI.ts - API методы

export const useAPI = () => {
    // ===== TMDB API =====
    const searchMovies = async (query: string, page = 1) => {
        const { data } = await $fetch('/api/tmdb/search', {
            params: { query, page }
        })
        return data
    }

    const getPopularMovies = async (page = 1) => {
        const { data } = await $fetch('/api/tmdb/popular', {
            params: { page }
        })
        return data
    }

    // ===== RAWG API =====
    const searchGames = async (query: string, page = 1) => {
        const { data } = await $fetch('/api/rawg/search', {
            params: { query, page }
        })
        return data
    }

    const getPopularGames = async (page = 1) => {
        const { data } = await $fetch('/api/rawg/popular', {
            params: { page }
        })
        return data
    }

    // ===== Open Library API =====
    const searchBooks = async (query: string, page = 1) => {
        const { data } = await $fetch('/api/books/search', {
            params: { query, page }
        })
        return data
    }

    const getPopularBooks = async (page = 1) => {
        const { data } = await $fetch('/api/books/popular', {
            params: { page }
        })
        return data
    }

    return {
        // TMDB
        searchMovies,
        getPopularMovies,

        // RAWG
        searchGames,
        getPopularGames,

        // Open Library
        searchBooks,
        getPopularBooks
    }
}

// composables/useUtils.ts - Утилиты

import { STATUS_LABELS } from '@/types'

export const useUtils = () => {
    const formatDate = (dateString: string): string => {
        const date = new Date(dateString)
        return date.toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        })
    }

    const getStatusLabel = (status: string): string => {
        return STATUS_LABELS[status as keyof typeof STATUS_LABELS] || status
    }

    const formatRating = (rating: number): string => {
        return rating.toFixed(1)
    }

    const generateId = (): string => {
        return Math.random().toString(36).substr(2, 9)
    }

    const truncateText = (text: string, maxLength: number): string => {
        if (text.length <= maxLength) return text
        return text.slice(0, maxLength) + '...'
    }

    const debounce = <T extends (...args: any[]) => any>(
        func: T,
        wait: number
    ): ((...args: Parameters<T>) => void) => {
        let timeout: NodeJS.Timeout
        return (...args: Parameters<T>) => {
            clearTimeout(timeout)
            timeout = setTimeout(() => func(...args), wait)
        }
    }

    return {
        formatDate,
        getStatusLabel,
        formatRating,
        generateId,
        truncateText,
        debounce
    }
}