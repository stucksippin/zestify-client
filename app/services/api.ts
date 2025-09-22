// services/api.ts - ОДИН сервис для твоего бэкенда
class ApiService {
    private baseURL = '/api' // Твой бэкенд

    async getMovies() {
        return await $fetch(`${this.baseURL}/movies`)
    }

    async getProfile() {
        return await $fetch(`${this.baseURL}/profile`)
    }

    async createReview(data: any) {
        return await $fetch(`${this.baseURL}/reviews`, {
            method: 'POST',
            body: data
        })
    }
}

export const apiService = new ApiService()