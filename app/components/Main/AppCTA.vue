<template>
  <section class="cta">
    <div class="container">
      <div class="cta-content">
        <div class="cta-text">
          <h2 class="cta-title">
            Готовы начать свое медиа-путешествие?
          </h2>
          <p class="cta-description">
            Присоединяйтесь к тысячам пользователей, которые уже делятся 
            впечатлениями и находят новые любимые фильмы, игры и книги.
          </p>
          
          <div class="cta-features">
            <div class="feature-item">
              <span class="feature-icon">✅</span>
              <span class="feature-text">Регистрация бесплатна</span>
            </div>
            <div class="feature-item">
              <span class="feature-icon">🚀</span>
              <span class="feature-text">Начните за 30 секунд</span>
            </div>
            <div class="feature-item">
              <span class="feature-icon">🎯</span>
              <span class="feature-text">Персональные рекомендации</span>
            </div>
          </div>
        </div>
        
        <div class="cta-form">
          <div class="form-container">
            <h3 class="form-title">Создайте аккаунт</h3>
            <form @submit.prevent="handleSubmit" class="signup-form">
              <div class="form-group">
                <input 
                  v-model="form.email"
                  type="email" 
                  placeholder="Ваш email"
                  class="form-input"
                  required
                />
              </div>
              
              <div class="form-group">
                <input 
                  v-model="form.username"
                  type="text" 
                  placeholder="Придумайте никнейм"
                  class="form-input"
                  required
                />
              </div>
              
              <div class="form-group">
                <input 
                  v-model="form.password"
                  type="password" 
                  placeholder="Надежный пароль"
                  class="form-input"
                  required
                />
              </div>
              
              <button type="submit" class="submit-button">
                <span v-if="!isLoading">Создать аккаунт</span>
                <span v-else class="loading-spinner">⏳</span>
              </button>
            </form>
            
            <div class="form-footer">
              <p class="login-link">
                Уже есть аккаунт? 
                <a href="/login" class="link">Войти</a>
              </p>
              
              <div class="social-login">
                <div class="divider">
                  <span class="divider-text">или</span>
                </div>
                
                <div class="social-buttons">
                  <button class="social-btn google">
                    <span class="social-icon">🔍</span>
                    Google
                  </button>
                  <button class="social-btn github">
                    <span class="social-icon">🐙</span>
                    GitHub
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Интерфейс для формы регистрации
interface SignupForm {
  email: string
  username: string
  password: string
}

// Реактивные данные
const form = ref<SignupForm>({
  email: '',
  username: '',
  password: ''
})

const isLoading = ref(false)

// Обработчик отправки формы
const handleSubmit = async () => {
  isLoading.value = true
  
  try {
    // Здесь будет логика регистрации
    // Пока что просто имитируем загрузку
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    console.log('Регистрация:', form.value)
    
    // После успешной регистрации можно перенаправить пользователя
    // await $router.push('/dashboard')
    
  } catch (error) {
    console.error('Ошибка регистрации:', error)
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.cta {
  padding: 100px 0;
  background: linear-gradient(135deg, 
    hsl(var(--background)) 0%, 
    hsla(var(--primary), 0.05) 50%, 
    hsl(var(--background)) 100%);
  position: relative;
}

/* Декоративные элементы фона */
.cta::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    radial-gradient(circle at 20% 80%, hsla(var(--primary), 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, hsla(var(--accent-rating), 0.05) 0%, transparent 50%);
  pointer-events: none;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 1;
}

.cta-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
}

.cta-title {
  font-size: 2.75rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 24px;
  color: hsl(var(--foreground));
}

.cta-description {
  font-size: 1.25rem;
  line-height: 1.6;
  color: hsl(var(--foreground), 0.8);
  margin-bottom: 40px;
}

.cta-features {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.feature-icon {
  font-size: 1.2rem;
}

.feature-text {
  color: hsl(var(--foreground), 0.9);
  font-weight: 500;
}

.form-container {
  background: hsl(var(--secondary));
  border: 1px solid hsl(var(--border));
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 20px 40px hsla(var(--background), 0.2);
  position: relative;
  overflow: hidden;
}

/* Добавляем градиентный эффект на форму */
.form-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, 
    hsl(var(--primary)), 
    hsl(var(--accent-rating)));
}

.form-title {
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 30px;
  color: hsl(var(--foreground));
}

.signup-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 30px;
}

.form-group {
  position: relative;
}

.form-input {
  width: 100%;
  padding: 16px 20px;
  background: hsl(var(--background));
  border: 2px solid hsl(var(--border));
  border-radius: 12px;
  color: hsl(var(--foreground));
  font-size: 1rem;
  transition: all 0.3s ease;
  outline: none;
}

.form-input::placeholder {
  color: hsl(var(--foreground), 0.5);
}

.form-input:focus {
  border-color: hsl(var(--primary));
  box-shadow: 0 0 0 3px hsla(var(--primary), 0.1);
}

.submit-button {
  width: 100%;
  padding: 16px;
  background: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.submit-button:hover:not(:disabled) {
  background: hsl(var(--primary), 0.9);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px hsla(var(--primary), 0.3);
}

.submit-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.loading-spinner {
  display: inline-block;
  animation: spin 1s linear infinite;
}

.form-footer{
display: flex;
flex-direction: column;
align-items: center;
}

.divider{
    text-align: center;
}

.social-btn{
    border: 1px solid hsl(var(--foreground)) ;
    border-radius: 8px;
    padding: 5px 10px;
    transition: all 1s ease-out;
    animation-delay: 300ms;
}

</style>