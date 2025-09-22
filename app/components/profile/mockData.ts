// components/profile/mockData.ts
// Моковые данные для профиля пользователя

import type {
    User,
    UserStats,
    CollectionItem,
    ReviewItem,
    MediaItem,
    ActivityItem,
    GenreStat,
    TopFollower
} from '@/types'

// =============================================================================
// ПОЛЬЗОВАТЕЛЬ
// =============================================================================

export const user: User = {
    id: '1',
    username: 'john_doe',
    email: 'john@example.com',
    avatar_url: 'https://placehold.co/150x150',
    bio: 'Любитель книг, фильмов и видеоигр. Делюсь впечатлениями, иногда спорю о рейтингах.',
    created_at: '2022-01-15T00:00:00Z',
    updated_at: '2025-01-10T00:00:00Z',
    email_public: true
}

export const userStats: UserStats = {
    reviews_count: 312,
    collections_count: 47,
    media_count: 1678,
    followers_count: 980,
    following_count: 450
}

// =============================================================================
// КОЛЛЕКЦИИ
// =============================================================================

export const collections: CollectionItem[] = [
    {
        id: '1',
        name: 'Любимая фантастика',
        description: 'Коллекция лучших научно-фантастических произведений',
        media_type: 'books',
        media_count: 45,
        is_public: true,
        updated_at: '2024-11-20T00:00:00Z'
    },
    {
        id: '2',
        name: 'Фильмы на вечер',
        description: 'Подборка фильмов для уютного вечера дома',
        media_type: 'movies',
        media_count: 28,
        is_public: true,
        updated_at: '2024-11-18T00:00:00Z'
    },
    {
        id: '3',
        name: 'Игры, изменившие индустрию',
        description: 'Культовые проекты, которые повлияли на игровую индустрию',
        media_type: 'games',
        media_count: 67,
        is_public: true,
        updated_at: '2024-10-05T00:00:00Z'
    },
    {
        id: '4',
        name: 'Сериалы для марафона',
        description: 'Список сериалов для просмотра на выходных',
        media_type: 'movies',
        media_count: 14,
        is_public: false,
        updated_at: '2024-12-25T00:00:00Z'
    },
    {
        id: '5',
        name: 'Лучшие комиксы',
        description: 'Графические новеллы и манга, которые стоит прочитать',
        media_type: 'books',
        media_count: 32,
        is_public: true,
        updated_at: '2024-09-18T00:00:00Z'
    }
]

// =============================================================================
// РЕЦЕНЗИИ
// =============================================================================

export const reviews: ReviewItem[] = [
    {
        id: '1',
        rating: 5,
        content: 'Потрясающая книга о выживании и человечности в постапокалиптическом мире. Кормак Маккарти создал произведение, которое цепляет за живое и не отпускает даже после прочтения.',
        tags: ['фантастика', 'постапокалипсис', 'драма'],
        likes_count: 23,
        comments_count: 7,
        user_liked: false,
        created_at: '2024-11-25T00:00:00Z',
        media: {
            id: '1',
            title: 'Дорога',
            type: 'books',
            year: 2006,
            poster_url: 'https://placehold.co/60x90'
        }
    },
    {
        id: '2',
        rating: 4,
        content: 'Отличный фильм от Дени Вильнёва! Визуально потрясающий, философски глубокий. Райан Гослинг великолепен в роли репликанта K.',
        tags: ['экшен', 'фантастика', 'неонуар'],
        likes_count: 18,
        comments_count: 4,
        user_liked: true,
        created_at: '2024-11-22T00:00:00Z',
        media: {
            id: '2',
            title: 'Бегущий по лезвию 2049',
            type: 'movies',
            year: 2017,
            poster_url: 'https://placehold.co/60x90'
        }
    },
    {
        id: '3',
        rating: 3,
        content: 'Игра интересная, но сырая. Много багов при релизе, но атмосфера Найт-Сити действительно впечатляет. После патчей стало намного лучше.',
        tags: ['RPG', 'киберпанк', 'экшен'],
        likes_count: 5,
        comments_count: 2,
        user_liked: false,
        created_at: '2024-10-15T00:00:00Z',
        media: {
            id: '3',
            title: 'Cyberpunk 2077',
            type: 'games',
            year: 2020,
            poster_url: 'https://placehold.co/60x90'
        }
    },
    {
        id: '4',
        rating: 5,
        content: 'Фильм года! Атмосфера, игра актёров и музыка — всё на высшем уровне. Дени Вильнёв снова доказал, что он мастер научной фантастики.',
        tags: ['фантастика', 'эпик', 'драма'],
        likes_count: 40,
        comments_count: 15,
        user_liked: true,
        created_at: '2024-12-28T00:00:00Z',
        media: {
            id: '4',
            title: 'Дюна: Часть Вторая',
            type: 'movies',
            year: 2023,
            poster_url: 'https://placehold.co/60x90'
        }
    }
]

// =============================================================================
// МЕДИА
// =============================================================================

export const media: MediaItem[] = [
    {
        id: '1',
        title: 'Дорога',
        type: 'books',
        year: 2006,
        poster_url: 'https://placehold.co/150x225',
        is_favorite: true,
        user_rating: 5,
        user_status: 'completed'
    },
    {
        id: '2',
        title: 'Cyberpunk 2077',
        type: 'games',
        year: 2020,
        poster_url: 'https://placehold.co/150x225',
        is_favorite: false,
        user_rating: 3,
        user_status: 'playing'
    },
    {
        id: '3',
        title: 'Дюна: Часть Вторая',
        type: 'movies',
        year: 2023,
        poster_url: 'https://placehold.co/150x225',
        is_favorite: true,
        user_rating: 5,
        user_status: 'completed'
    },
    {
        id: '4',
        title: 'The Last of Us Part II',
        type: 'games',
        year: 2020,
        poster_url: 'https://placehold.co/150x225',
        is_favorite: true,
        user_rating: 5,
        user_status: 'completed'
    },
    {
        id: '5',
        title: 'Ведьмак',
        type: 'books',
        year: 1990,
        poster_url: 'https://placehold.co/150x225',
        is_favorite: false,
        user_rating: 4,
        user_status: 'want'
    },
    {
        id: '6',
        title: 'Бегущий по лезвию 2049',
        type: 'movies',
        year: 2017,
        poster_url: 'https://placehold.co/150x225',
        is_favorite: true,
        user_rating: 4,
        user_status: 'completed'
    }
]

// =============================================================================
// АКТИВНОСТЬ
// =============================================================================

export const recentActivity: ActivityItem[] = [
    {
        id: '1',
        type: 'review_created',
        text: 'Написал рецензию на "Дорога"',
        created_at: '2024-11-25T00:00:00Z'
    },
    {
        id: '2',
        type: 'collection_created',
        text: 'Создал коллекцию "Инди-игры"',
        created_at: '2024-11-20T00:00:00Z'
    },
    {
        id: '3',
        type: 'media_added',
        text: 'Добавил "Cyberpunk 2077" в коллекцию',
        created_at: '2024-11-18T00:00:00Z'
    },
    {
        id: '4',
        type: 'followed_user',
        text: 'Подписался на @alice_reader',
        created_at: '2024-12-01T00:00:00Z'
    },
    {
        id: '5',
        type: 'liked_review',
        text: 'Поставил лайк рецензии на "Дюна"',
        created_at: '2024-12-30T00:00:00Z'
    }
]

// =============================================================================
// СТАТИСТИКА ЖАНРОВ
// =============================================================================

export const genreStats: GenreStat[] = [
    { name: 'Фантастика', count: 120 },
    { name: 'Драма', count: 85 },
    { name: 'Экшен', count: 60 },
    { name: 'Триллер', count: 50 },
    { name: 'Фэнтези', count: 47 },
    { name: 'Романтика', count: 30 }
]

// =============================================================================
// ТОП ПОДПИСЧИКИ
// =============================================================================

export const topFollowers: TopFollower[] = [
    {
        id: '1',
        username: 'alice_reader',
        avatar_url: 'https://placehold.co/40x40',
        common_media: 23
    },
    {
        id: '2',
        username: 'movie_buff',
        avatar_url: 'https://placehold.co/40x40',
        common_media: 18
    },
    {
        id: '3',
        username: 'gamer_pro',
        avatar_url: 'https://placehold.co/40x40',
        common_media: 15
    },
    {
        id: '4',
        username: 'otaku_girl',
        avatar_url: 'https://placehold.co/40x40',
        common_media: 12
    },
    {
        id: '5',
        username: 'critic99',
        avatar_url: 'https://placehold.co/40x40',
        common_media: 10
    }
]