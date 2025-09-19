// composables/useGamesAPI.ts

import type { MediaFilters, RAWGGame, Media } from '@/types'
import { rawgService } from '@/services/rawg'

export const useGamesAPI = () => {
    const {
        media,
        loadingState,
        genres,
        setLoading,
        setError,
        setMedia,
        addMedia,
        convertRAWGToMedia
    } = useMedia()

    // ===== ПОПУЛЯРНЫЕ ПЛАТФОРМЫ =====
    const popularPlatforms = [
        { id: '4', name: 'PC' },
        { id: '18', name: 'PlayStation 4' },
        { id: '187', name: 'PlayStation 5' },
        { id: '1', name: 'Xbox One' },
        { id: '186', name: 'Xbox Series X/S' },
        { id: '7', name: 'Nintendo Switch' },
        { id: '21', name: 'Android' },
        { id: '3', name: 'iOS' }
    ]

    // ===== ЗАГРУЗКА ЖАНРОВ =====
    const loadGenres = async () => {
        try {
            setLoading(true)
            const rawgGenres = await rawgService.getGenres()
            genres.value = rawgGenres.map(g => ({
                id: g.id.toString(),
                name: g.name
            }))
        } catch (error) {
            setError('Ошибка загрузки жанров игр')
            console.error('Games genres error:', error)
        } finally {
            setLoading(false)
        }
    }

    // ===== ПОИСК ИГР =====
    const searchGames = async (filters: MediaFilters, page = 1) => {
        try {
            setLoading(true)
            setError(null)

            const response = await rawgService.searchGames({
                query: filters.search,
                genre: filters.genre,
                year: filters.year,
                rating: filters.rating,
                sortBy: filters.sortBy,
                sortOrder: filters.sortOrder,
                page
            })

            const games = response.results.map(convertRAWGToMedia)

            if (page === 1) {
                setMedia(games)
            } else {
                addMedia(games)
            }

            loadingState.value.hasMore = !!response.next

        } catch (error) {
            setError('Ошибка поиска игр')
            console.error('Games search error:', error)
        } finally {
            setLoading(false)
        }
    }

    // ===== ПОПУЛЯРНЫЕ ИГРЫ =====
    const getPopularGames = async (page = 1) => {
        try {
            setLoading(true)
            setError(null)

            const response = await rawgService.getPopularGames(page)
            const games = response.results.map(convertRAWGToMedia)

            if (page === 1) {
                setMedia(games)
            } else {
                addMedia(games)
            }

            loadingState.value.hasMore = !!response.next

        } catch (error) {
            setError('Ошибка загрузки популярных игр')
            console.error('Popular games error:', error)
        } finally {
            setLoading(false)
        }
    }

    // ===== ТОП РЕЙТИНГ =====
    const getTopRatedGames = async (page = 1) => {
        try {
            setLoading(true)
            setError(null)

            const response = await rawgService.getTopRatedGames(page)
            const games = response.results.map(convertRAWGToMedia)

            if (page === 1) {
                setMedia(games)
            } else {
                addMedia(games)
            }

            loadingState.value.hasMore = !!response.next

        } catch (error) {
            setError('Ошибка загрузки топ игр')
            console.error('Top rated games error:', error)
        } finally {
            setLoading(false)
        }
    }

    // ===== ПОИСК ПО ПЛАТФОРМЕ =====
    const searchByPlatform = async (platformId: string, page = 1) => {
        try {
            setLoading(true)
            setError(null)

            const response = await rawgService.getGamesByPlatform(platformId, page)
            const games = response.results.map(convertRAWGToMedia)

            if (page === 1) {
                setMedia(games)
            } else {
                addMedia(games)
            }

            loadingState.value.hasMore = !!response.next

        } catch (error) {
            setError('Ошибка поиска игр по платформе')
            console.error('Platform games error:', error)
        } finally {
            setLoading(false)
        }
    }

    // ===== ЗАГРУЗИТЬ ЕЩЕ =====
    const loadMore = async () => {
        if (!loadingState.value.hasMore || loadingState.value.isLoading) {
            return
        }

        const currentPage = Math.ceil(media.value.length / 20) + 1

        // Здесь логика для продолжения текущего запроса
        // В зависимости от режима поиска
    }

    // ===== ДЕТАЛИ ИГРЫ =====
    const getGameDetails = async (gameId: number) => {
        try {
            setLoading(true)
            const game = await rawgService.getGameDetails(gameId)
            return convertRAWGToMedia(game)
        } catch (error) {
            setError('Ошибка загрузки деталей игры')
            console.error('Game details error:', error)
            return null
        } finally {
            setLoading(false)
        }
    }

    return {
        // Данные
        popularPlatforms,

        // Методы API
        searchGames,
        searchByPlatform,
        getPopularGames,
        getTopRatedGames,
        getGameDetails,
        loadGenres,
        loadMore
    }
}

// services/rawg.ts - Сервис для работы с RAWG API

class RAWGService {
    private baseURL = 'https://api.rawg.io/api'
    private apiKey = process.env.RAWG_API_KEY || 'your-api-key'

    // ===== ПОИСК ИГР =====
    async searchGames(params: {
        query?: string
        genre?: string
        year?: string
        rating?: string
        sortBy?: string
        sortOrder?: string
        page?: number
    }) {
        const searchParams: Record<string, any> = {
            key: this.apiKey,
            page: params.page || 1,
            page_size: 20
        }

        if (params.query) {
            searchParams.search = params.query
        }

        if (params.genre) {
            searchParams.genres = params.genre
        }

        if (params.year) {
            searchParams.dates = `${params.year}-01-01,${params.year}-12-31`
        }

        if (params.rating) {
            // Конвертируем в диапазон Metacritic (0-100)
            searchParams.metacritic = `${params.rating}0,100`
        }

        // Сортировка
        const sortMapping: Record<string, string> = {
            popularity: '-added',
            rating: '-rating',
            title: 'name',
            year: '-released'
        }

        const sortField = sortMapping[params.sortBy] || '-added'
        const ordering = params.sortOrder === 'asc' ?
            sortField.replace('-', '') :
            (sortField.startsWith('-') ? sortField : `-${sortField}`)

        searchParams.ordering = ordering

        const response = await $fetch(`${this.baseURL}/games`, {
            params: searchParams
        })

        return response
    }

    // ===== ПОПУЛЯРНЫЕ ИГРЫ =====
    async getPopularGames(page = 1) {
        return await $fetch(`${this.baseURL}/games`, {
            params: {
                key: this.apiKey,
                ordering: '-added',
                page_size: 20,
                page
            }
        })
    }

    // ===== ТОП РЕЙТИНГ =====
    async getTopRatedGames(page = 1) {
        const currentYear = new Date().getFullYear()
        const lastYear = currentYear - 1

        return await $fetch(`${this.baseURL}/games`, {
            params: {
                key: this.apiKey,
                ordering: '-rating',
                dates: `${lastYear}-01-01,${currentYear}-12-31`,
                page_size: 20,
                page
            }
        })
    }

    // ===== ИГРЫ ПО ПЛАТФОРМЕ =====
    async getGamesByPlatform(platformId: string, page = 1) {
        return await $fetch(`${this.baseURL}/games`, {
            params: {
                key: this.apiKey,
                platforms: platformId,
                ordering: '-rating',
                page_size: 20,
                page
            }
        })
    }

    // ===== ЖАНРЫ =====
    async getGenres() {
        const response = await $fetch(`${this.baseURL}/genres`, {
            params: {
                key: this.apiKey,
                page_size: 50
            }
        })
        return response.results
    }

    // ===== ПЛАТФОРМЫ =====
    async getPlatforms() {
        const response = await $fetch(`${this.baseURL}/platforms`, {
            params: {
                key: this.apiKey,
                page_size: 50
            }
        })
        return response.results
    }

    // ===== ДЕТАЛИ ИГРЫ =====
    async getGameDetails(gameId: number) {
        return await $fetch(`${this.baseURL}/games/${gameId}`, {
            params: {
                key: this.apiKey
            }
        })
    }
}

export const rawgService = new RAWGService()