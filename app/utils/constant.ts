// =============================================================================
// MEDIA
// =============================================================================


import type { MediaTab, MediaType } from '@/types'

// Табы для медиа
export const mediaTabs: MediaTab[] = [
    {
        id: 'movies',
        label: 'Фильмы',
        icon: '🎬',
        href: '/movies'
    },
    {
        id: 'games',
        label: 'Игры',
        icon: '🎮',
        href: '/games'
    },
    {
        id: 'books',
        label: 'Книги',
        icon: '📚',
        href: '/books'
    }
]

// Получить таб по ID
export const getMediaTab = (id: string) => {
    return mediaTabs.find(tab => tab.id === id)
}

// Получить все типы медиа
export const getMediaTypes = (): MediaType[] => {
    return mediaTabs.map(tab => tab.id as MediaType)
}