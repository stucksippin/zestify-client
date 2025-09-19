// composables/useMoviesAPI.ts

import type { MediaFilters, TMDBMovie, Media } from '@/types'
import { tmdbService } from '@/services/tmdb'

export const useMoviesAPI = () => {
    const {
        media,
        loadingState,
        genres,
        setLoading,
        setError,
        setMedia,
        addMedia,
        convertTMDBToMedia
    } = useMedia()

    // ===== ЗАГРУЗКА ЖАНРОВ =====
    const loadGenres = async () => {
        try {
            setLoading(true)
            const tmdbGenres = await tmdbService.getGenres()
            genres.value = tmdbGenres.map(g => ({
                id: g.id.toString(),
                name: g.name
            }))
        } catch (error) {
            setError('Ошибка загрузки жанров')
            console.error('Genres error:', error)
        } finally {
            setLoading(false)
        }
    }

    // ===== ПОИСК ФИЛЬМОВ =====
    const searchMovies = async (filters: MediaFilters, page = 1) => {
        try {
            setLoading(true)
            setError(null)

            const response = await tmdbService.searchMovies({
                query: filters.search,
                genre: filters.genre,
                year: filters.year,
                rating: filters.rating,
                sortBy: filters.sortBy,
                sortOrder: filters.sortOrder,
                page
            })

            const movies = response.results.map(convertTMDBToMedia)

            if (page === 1) {
                setMedia(movies)
            } else {
                addMedia(movies)
            }

            loadingState.value.hasMore = response.page < response.total_pages

        } catch (error) {
            setError('Ошибка поиска фильмов')
            console.error('Search error:', error)
        } finally {
            setLoading(false)
        }
    }

    // ===== ПОПУЛЯРНЫЕ ФИЛЬМЫ =====
    const getPopularMovies = async (page = 1) => {
        try {
            setLoading(true)
            setError(null)

            const response = await tmdbService.getPopular(page)
            const movies = response.results.map(convertTMDBToMedia)

            if (page === 1) {
                setMedia(movies)
            } else {
                addMedia(movies)
            }

            loadingState.value.hasMore = response.page < response.total_pages

        } catch (error) {
            setError('Ошибка загрузки популярных фильмов')
            console.error('Popular movies error:', error)
        } finally {
            setLoading(false)
        }
    }

    // ===== ТОП РЕЙТИНГ =====
    const getTopRatedMovies = async (page = 1) => {
        try {
            setLoading(true)
            setError(null)

            const response = await tmdbService.getTopRated(page)
            const movies = response.results.map(convertTMDBToMedia)

            if (page === 1) {
                setMedia(movies)
            } else {
                addMedia(movies)
            }

            loadingState.value.hasMore = response.page < response.total_pages

        } catch (error) {
            setError('Ошибка загрузки топ фильмов')
            console.error('Top rated movies error:', error)
        } finally {
            setLoading(false)
        }
    }

    // ===== ЗАГРУЗИТЬ ЕЩЕ =====
    const loadMore = async () => {
        if (!loadingState.value.hasMore || loadingState.value.isLoading) {
            return
        }

        // Здесь логика для определения следующей страницы
        // В зависимости от текущего режима (поиск/популярные/топ)
        const currentPage = Math.ceil(media.value.length / 20) + 1

        // Вызываем соответствующий метод для загрузки следующей страницы
        // Это можно улучшить, сохраняя текущий режим в состоянии
    }

    // ===== ДЕТАЛИ ФИЛЬМА =====
    const getMovieDetails = async (movieId: number) => {
        try {
            setLoading(true)
            const movie = await tmdbService.getMovieDetails(movieId)
            return convertTMDBToMedia(movie)
        } catch (error) {
            setError('Ошибка загрузки деталей фильма')
            console.error('Movie details error:', error)
            return null
        } finally {
            setLoading(false)
        }
    }

    return {
        // Методы API
        searchMovies,
        getPopularMovies,
        getTopRatedMovies,
        getMovieDetails,
        loadGenres,
        loadMore
    }
}

// services/tmdb.ts - Сервис для работы с TMDB API

class TMDBService {
    private baseURL = 'https://api.themoviedb.org/3'
    private apiKey = process.env.TMDB_API_KEY || 'your-api-key'

    // ===== ПОИСК =====
    async searchMovies(params: {
        query?: string
        genre?: string
        year?: string
        rating?: string
        sortBy?: string
        sortOrder?: string
        page?: number
    }) {
        const endpoint = params.query ? '/search/movie' : '/discover/movie'

        const searchParams: Record<string, any> = {
            api_key: this.apiKey,
            language: 'ru-RU',
            page: params.page || 1,
            include_adult: false
        }

        if (params.query) searchParams.query = params.query
        if (params.genre) searchParams.with_genres = params.genre
        if (params.year) searchParams.primary_release_year = params.year
        if (params.rating) searchParams.vote_average_gte = params.rating

        if (!params.query && params.sortBy) {
            const sortField = {
                popularity: 'popularity',
                rating: 'vote_average',
                title: 'title',
                year: 'primary_release_date'
            }[params.sortBy] || 'popularity'

            searchParams.sort_by = `${sortField}.${params.sortOrder || 'desc'}`
        }

        const response = await $fetch(`${this.baseURL}${endpoint}`, {
            params: searchParams
        })

        return response
    }

    // ===== ПОПУЛЯРНЫЕ =====
    async getPopular(page = 1) {
        return await $fetch(`${this.baseURL}/movie/popular`, {
            params: {
                api_key: this.apiKey,
                language: 'ru-RU',
                page
            }
        })
    }

    // ===== ТОП РЕЙТИНГ =====
    async getTopRated(page = 1) {
        return await $fetch(`${this.baseURL}/movie/top_rated`, {
            params: {
                api_key: this.apiKey,
                language: 'ru-RU',
                page
            }
        })
    }

    // ===== ЖАНРЫ =====
    async getGenres() {
        const response = await $fetch(`${this.baseURL}/genre/movie/list`, {
            params: {
                api_key: this.apiKey,
                language: 'ru-RU'
            }
        })
        return response.genres
    }

    // ===== ДЕТАЛИ ФИЛЬМА =====
    async getMovieDetails(movieId: number) {
        return await $fetch(`${this.baseURL}/movie/${movieId}`, {
            params: {
                api_key: this.apiKey,
                language: 'ru-RU',
                append_to_response: 'videos,credits,similar'
            }
        })
    }
}

export const tmdbService = new TMDBService()