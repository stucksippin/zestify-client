<template>
  <div class="min-h-screen bg-white flex items-center justify-center p-4 relative overflow-hidden">
    
    <!-- фон -->
    <div class="absolute inset-0 transition-colors duration-700" :class="isRegisterMode ? 'bg-accent-rating' : 'bg-primary'" />

    <!-- контейнер  карты-->
    <div class="relative z-10 w-full max-w-md h-[600px] perspective">
      <div 
        class="flip-container w-full h-full relative transform-style-preserve transition-transform duration-700"
        :class="{ 'rotate-y-180': isRegisterMode }"
      >
        
        <!-- ЛИЦЕВАЯ СТОРОНА - АВТОРИЗАЦИЯ -->
        <div class="flip-face flip-front absolute w-full h-full backface-hidden">
          <div class="glassmorphism rounded-3xl shadow-2xl p-8 h-full flex flex-col justify-center">
            
            <!-- Заголовок авторизации -->
            <div class="text-center mb-8">
              <div class="w-16 h-16 bg-primary rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                </svg>
              </div>
              <h1 class="text-3xl font-bold text-foreground mb-2">Добро пожаловать</h1>
              <p class="text-foreground/70 text-sm">Войдите в свой аккаунт</p>
            </div>

            <!-- Поля входа -->
            <div class="space-y-4 flex-grow">
              
              <!-- Email для входа -->
              <div class="space-y-2">
                <label for="login-email" class="text-foreground text-sm font-medium block">
                  Email адрес
                </label>
                <div class="relative">
                  <input
                    id="login-email"
                    v-model="loginData.email"
                    type="email"
                    class="w-full px-4 py-3 bg-white border border-border rounded-xl text-secondary placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                    placeholder="example@mail.com"
                    :class="{ 'border-red-400': loginErrors.email }"
                  />
                  <svg class="absolute right-3 top-3.5 w-5 h-5 text-foreground/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"></path>
                  </svg>
                </div>
                <p v-if="loginErrors.email" class="text-red-500 text-xs">{{ loginErrors.email }}</p>
              </div>

              <!-- Пароль для входа -->
              <div class="space-y-2">
                <label for="login-password" class="text-foreground text-sm font-medium block">
                  Пароль
                </label>
                <div class="relative">
                  <input
                    id="login-password"
                    v-model="loginData.password"
                    :type="showLoginPassword ? 'text' : 'password'"
                    class="w-full px-4 py-3 bg-white border border-border rounded-xl text-secondary placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                    placeholder="••••••••"
                    :class="{ 'border-red-400': loginErrors.password }"
                  />
                  <button
                    type="button"
                    class="absolute right-3 top-3.5 text-foreground/40 hover:text-foreground/70 transition-colors"
                    @click="showLoginPassword = !showLoginPassword"
                  >
                    <svg v-if="!showLoginPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                    <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"></path>
                    </svg>
                  </button>
                </div>
                <p v-if="loginErrors.password" class="text-red-500 text-xs">{{ loginErrors.password }}</p>
              </div>

              <!-- Чекбокс и забыли пароль -->
              <div class="flex items-center justify-between">
                <label class="flex items-center cursor-pointer">
                  <input
                    v-model="loginData.rememberMe"
                    type="checkbox"
                    class="w-4 h-4 text-primary bg-white border-border rounded focus:ring-primary focus:ring-2"
                  />
                  <span class="ml-2 text-sm text-foreground/70">Запомнить меня</span>
                </label>
                <button 
               
                  class="text-sm text-primary-foreground hover:text-primary/80 transition-colors"
                    @click="forgotPassword"
                >
                  Забыли пароль?
                </button>
              </div>

              <!-- Кнопка входа -->
              <button
                class="w-full py-3 px-4 bg-primary hover:bg-primary/90 disabled:bg-gray-400 text-white font-medium rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                :disabled="isLoading"
                @click="handleLogin"
              >
                <div v-if="isLoading" class="flex items-center justify-center">
                  <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Вход в систему...
                </div>
                <span v-else>Войти</span>
              </button>
            </div>

            <!-- Ссылка на регистрацию -->
            <p class="mt-6 text-center text-foreground/70">
              Нет аккаунта?
              <button 
                class="text-primary hover:text-accent-rating font-medium transition-colors ml-1"
                @click="flipToRegister"
              >
                Зарегистрироваться
              </button>
            </p>
          </div>
        </div>

        <!-- ОБРАТНАЯ СТОРОНА - РЕГИСТРАЦИЯ -->
        <div class="flip-face flip-back absolute w-full h-full backface-hidden rotate-y-180">
          <div class="glassmorphism rounded-3xl shadow-2xl p-8 h-full flex flex-col justify-center">
            
            <!-- Заголовок регистрации -->
            <div class="text-center mb-6">
              <div class="w-16 h-16 bg-accent-rating rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
                </svg>
              </div>
              <h1 class="text-3xl font-bold text-foreground mb-2">Создать аккаунт</h1>
              <p class="text-foreground/70 text-sm">Заполните форму для регистрации</p>
            </div>

            <!-- Поля регистрации -->
            <div class="space-y-4 flex-grow overflow-y-auto">
              
              <!-- Никнейм -->
              <div class="space-y-2">
                <label for="register-nickname" class="text-foreground text-sm font-medium block">
                  Никнейм
                </label>
                <input
                  id="register-nickname"
                  v-model="registerData.nickname"
                  type="text"
                  class="w-full px-4 py-3 bg-white border border-border rounded-xl text-secondary placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                  placeholder="Ваш никнейм"
                  :class="{ 'border-red-400': registerErrors.nickname }"
                />
                <p v-if="registerErrors.nickname" class="text-red-500 text-xs">{{ registerErrors.nickname }}</p>
              </div>

              <!-- Email для регистрации -->
              <div class="space-y-2">
                <label for="register-email" class="text-foreground text-sm font-medium block">
                  Email адрес
                </label>
                <input
                  id="register-email"
                  v-model="registerData.email"
                  type="email"
                  class="w-full px-4 py-3 bg-white border border-border rounded-xl text-secondary placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                  placeholder="example@mail.com"
                  :class="{ 'border-red-400': registerErrors.email }"
                />
                <p v-if="registerErrors.email" class="text-red-500 text-xs">{{ registerErrors.email }}</p>
              </div>

              <!-- Пароль для регистрации -->
              <div class="space-y-2">
                <label for="register-password" class="text-foreground text-sm font-medium block">
                  Пароль
                </label>
                <div class="relative">
                  <input
                    id="register-password"
                    v-model="registerData.password"
                    :type="showRegisterPassword ? 'text' : 'password'"
                    class="w-full px-4 py-3 bg-white border border-border rounded-xl text-secondary placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                    placeholder="Минимум 8 символов"
                    :class="{ 'border-red-400': registerErrors.password }"
                  />
                  <button
                    type="button"
                    class="absolute right-3 top-3.5 text-foreground/40 hover:text-foreground/70 transition-colors"
                    @click="showRegisterPassword = !showRegisterPassword"
                  >
                    <svg v-if="!showRegisterPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                    <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"></path>
                    </svg>
                  </button>
                </div>
                <p v-if="registerErrors.password" class="text-red-500 text-xs">{{ registerErrors.password }}</p>
              </div>

              <!-- Подтверждение пароля -->
              <div class="space-y-2">
                <label for="confirm-password" class="text-foreground text-sm font-medium block">
                  Подтвердите пароль
                </label>
                <div class="relative">
                  <input
                    id="confirm-password"
                    v-model="registerData.confirmPassword"
                    :type="showConfirmPassword ? 'text' : 'password'"
                    class="w-full px-4 py-3 bg-white border border-border rounded-xl text-secondary placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                    placeholder="Повторите пароль"
                    :class="{ 'border-red-400': registerErrors.confirmPassword }"
                  />
                  <button
                    type="button"
                    class="absolute right-3 top-3.5 text-foreground/40 hover:text-foreground/70 transition-colors"
                    @click="showConfirmPassword = !showConfirmPassword"
                    >
                    <svg v-if="!showConfirmPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                    <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"></path>
                    </svg>
                  </button>
                </div>
                <p v-if="registerErrors.confirmPassword" class="text-red-500 text-xs">{{ registerErrors.confirmPassword }}</p>
              </div>

              <!-- Согласие с условиями -->
              <div class="flex items-start space-x-2">
                <input
                  v-model="registerData.agreeToTerms"
                  type="checkbox"
                  class="w-4 h-4 text-primary bg-white border-border rounded focus:ring-primary focus:ring-2 mt-1"
                  :class="{ 'border-red-400': registerErrors.agreeToTerms }"
                />
                <label class="text-sm text-foreground/70">
                  Я соглашаюсь с 
                  <button class="text-primary hover:text-primary/80 underline">
                    условиями использования
                  </button>
                  и
                  <button class="text-primary hover:text-primary/80 underline">
                    политикой конфиденциальности
                  </button>
                </label>
              </div>
              <p v-if="registerErrors.agreeToTerms" class="text-red-500 text-xs">{{ registerErrors.agreeToTerms }}</p>

              <!-- Кнопка регистрации -->
              <button
                 class="w-full py-3 px-4 bg-accent-rating hover:bg-accent-rating/90 disabled:bg-gray-400 text-white font-medium rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-rating focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                 :disabled="isLoading" 
                 @click="handleRegister"
              
              >
                <div v-if="isLoading" class="flex items-center justify-center">
                  <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Создание аккаунта...
                </div>
                <span v-else>Создать аккаунт</span>
              </button>
            </div>

            <!-- Ссылка назад к входу -->
            <p class="mt-4 text-center text-foreground/70">
              Уже есть аккаунт?
              <button 
              class="text-accent-rating hover:text-primary font-medium transition-colors ml-1"
                @click="flipToLogin"
              >
                Войти
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AuthPage',
  
  

  data() {
    return {
      // Режим отображения (false - вход, true - регистрация)
      isRegisterMode: false,
      
      // Состояния загрузки
      isLoading: false,
      
      // Видимость паролей
      showLoginPassword: false,
      showRegisterPassword: false,
      showConfirmPassword: false,
      
      // Данные формы входа
      loginData: {
        email: '',
        password: '',
        rememberMe: false
      },
      
      // Данные формы регистрации
      registerData: {
        nickname: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeToTerms: false
      },
      // Ошибки валидации для входа
      loginErrors: {
        email: '',
        password: ''
      },
      
      // Ошибки валидации для регистрации
      registerErrors: {
        nickname: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeToTerms: ''
      }
    }
  },
  
  mounted() {
    console.log('Компонент авторизации/регистрации загружен')
  },

  methods: {
    // Переключение на режим регистрации
    flipToRegister() {
      this.isRegisterMode = true
      this.clearErrors()
    },
    
    // Переключение на режим входа
    flipToLogin() {
      this.isRegisterMode = false
      this.clearErrors()
    },
    
    // Очистка всех ошибок
    clearErrors() {
      this.loginErrors = { email: '', password: '' }
      this.registerErrors = { nickname: '', email: '', password: '', confirmPassword: '', agreeToTerms: '' }
    },
    
    // Валидация email
    validateEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(email)
    },
    
    // Валидация формы входа
    validateLogin() {
      this.loginErrors = { email: '', password: '' }
      let isValid = true
      
      if (!this.loginData.email) {
        this.loginErrors.email = 'Email обязателен'
        isValid = false
      } else if (!this.validateEmail(this.loginData.email)) {
        this.loginErrors.email = 'Некорректный email'
        isValid = false
      }
      
      if (!this.loginData.password) {
        this.loginErrors.password = 'Пароль обязателен'
        isValid = false
      } else if (this.loginData.password.length < 6) {
        this.loginErrors.password = 'Минимум 6 символов'
        isValid = false
      }
      
      return isValid
    },
    
    // Валидация формы регистрации
    validateRegister() {
      this.registerErrors = { nickname: '', email: '', password: '', confirmPassword: '', agreeToTerms: '' }
      let isValid = true
      // Проверка никнейма
      if (!this.registerData.nickname.trim()) {
        this.registerErrors.nickname = 'Никнейм обязателен'
        isValid = false
      } else if (this.registerData.nickname.trim().length < 2) {
        this.registerErrors.nickname = 'Минимум 2 символа'
        isValid = false
      } else if (!/^[a-zA-Z0-9_]+$/.test(this.registerData.nickname)) {
        this.registerErrors.nickname = 'Только латинские буквы, цифры и _'
        isValid = false
      }
      // Проверка email
      if (!this.registerData.email) {
        this.registerErrors.email = 'Email обязателен'
        isValid = false
      } else if (!this.validateEmail(this.registerData.email)) {
        this.registerErrors.email = 'Некорректный email'
        isValid = false
      }
      // Проверка пароля
      if (!this.registerData.password) {
        this.registerErrors.password = 'Пароль обязателен'
        isValid = false
      } else if (this.registerData.password.length < 8) {
        this.registerErrors.password = 'Минимум 8 символов'
        isValid = false
      } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(this.registerData.password)) {
        this.registerErrors.password = 'Пароль должен содержать заглавные, строчные буквы и цифры'
        isValid = false
      }
      // Проверка подтверждения пароля
      if (!this.registerData.confirmPassword) {
        this.registerErrors.confirmPassword = 'Подтверждение пароля обязательно'
        isValid = false
      } else if (this.registerData.password !== this.registerData.confirmPassword) {
        this.registerErrors.confirmPassword = 'Пароли не совпадают'
        isValid = false
      }
      // Проверка согласия с условиями
      if (!this.registerData.agreeToTerms) {
        this.registerErrors.agreeToTerms = 'Необходимо согласиться с условиями'
        isValid = false
      }
      return isValid
    },
    
    // Обработчик входа
    async handleLogin() {
      if (!this.validateLogin()) return
      
      this.isLoading = true
      
      try {
        // Имитация API запроса
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        console.log('Вход:', this.loginData)
        alert(`Добро пожаловать, ${this.loginData.email}!`)
        
        // Здесь бы был редирект
        // this.$router.push('/dashboard')
        
      } catch (error) {
        console.error('Ошибка входа:', error)
        alert('Ошибка входа. Проверьте данные.')
      } finally {
        this.isLoading = false
      }
    },
    
    // Обработчик регистрации
    async handleRegister() {
      if (!this.validateRegister()) return
      
      this.isLoading = true
      
      try {
        // Имитация API запроса
        await new Promise(resolve => setTimeout(resolve, 2500))
        
        console.log('Регистрация:', this.registerData)
        alert(`Аккаунт создан! Добро пожаловать, ${this.registerData.nickname}!`)
        
        // После успешной регистрации можно переключить на вход
        this.flipToLogin()
        
      } catch (error) {
        console.error('Ошибка регистрации:', error)
        alert('Ошибка регистрации. Попробуйте снова.')
      } finally {
        this.isLoading = false
      }
    },
    
    // Забыли пароль
    forgotPassword() {
      alert('Переход на страницу восстановления пароля')
    }
  },
  

}
</script>

<style scoped>
.perspective {
  perspective: 1200px;
}

.flip-container {
  transform-style: preserve-3d;
}

.flip-face {
  backface-visibility: hidden;
}

.rotate-y-180 {
  transform: rotateY(180deg);
}

.flip-front {
  transform: rotateY(0deg);
}

.flip-back {
  transform: rotateY(180deg);
}

/* Анимация плавающих шариков */
.float-animation {
  animation: float 10s ease-in-out infinite;
}
.float-animation.delay-2 {
  animation-delay: 2s;
}
.float-animation.delay-4 {
  animation-delay: 4s;
}
@keyframes float {
  0%, 100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-20px) scale(1.05);
  }
}

/* Стеклянный эффект карточки */
.glassmorphism {
  background: rgba(16, 18, 22, 0.85); /* чуть темнее, чтобы текст был читаемым */
  backdrop-filter: blur(16px);
  border: 1px solid hsl(var(--border));
}


/* скроллбар */
.space-y-4.flex-grow.overflow-y-auto::-webkit-scrollbar {
  
  width: 8px;
  background: transparent;
}
.space-y-4.flex-grow.overflow-y-auto::-webkit-scrollbar-thumb {
  background: hsl(var(--accent-rating));
  border-radius: 8px;
}

</style>