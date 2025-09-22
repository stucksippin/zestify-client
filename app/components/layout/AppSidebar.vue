<template>
  <div :class="sidebarClass"> 
    <!-- Header -->
    <div class="header-section">
      <div class="flex items-center justify-between p-4">
        <div v-show="isOpen" class="logo-container">
          <NuxtLink to="/" class="logo-link">
            <span class="logo-text ml-3">Zestify</span>
          </NuxtLink>
        </div>
        <button @click="toggleSidebar" class="toggle-btn">
          <Icon :name="isOpen ? 'lucide:panel-left-close' : 'lucide:panel-left-open'" class="w-5 h-5" />
        </button>
      </div>
    </div>

    <!-- User -->
    <div class="user-section">
      <div class="user-card" :class="{ 'collapsed': !isOpen }">
        <div class="user-avatar">
          <img src="https://placehold.co/40x40" alt="User" class="avatar-img" />
          <div class="status-indicator"></div>
        </div>
        <div v-show="isOpen" class="user-info">
          <h4 class="user-name">John Doe</h4>
          <p class="user-stats">312 рецензий</p>
        </div>
      </div>

        <NuxtLink 
          :to="profileItem.href"
          :class="getLinkClass(profileItem)"
          class="menu-item profile-link mt-3"
        >
          <div class="item-icon">
            <Icon :name="profileItem.icon" class="w-5 h-5" />
          </div>
          <span v-show="isOpen" class="item-label">{{ profileItem.label }}</span>
        </NuxtLink>
    </div>

    <!-- Navigation -->
    <nav class="navigation">
     

      <!-- Main Menu -->
      <div class="menu-section">
        <div v-show="isOpen" class="section-title">Навигация</div>
        
        <div class="menu-items">
          <NuxtLink 
            v-for="item in mainMenuItems" 
            :key="item.href"
            :to="item.href"
            :class="getLinkClass(item)"
            class="menu-item group"
            @mouseenter="playHoverSound"
            @mouseover="handleItemHover(item.href)"
            @mouseleave="handleItemLeave"
          >
            <div class="item-icon">
              <Icon :name="item.icon" class="w-5 h-5" />
              <div class="icon-glow"></div>
            </div>
            <span v-show="isOpen" class="item-label">{{ item.label }}</span>
            <div v-show="isOpen && item.badge" class="item-badge">{{ item.badge }}</div>
            
            <!-- Tooltip -->
            <Transition name="tooltip">
              <div v-show="!isOpen && hoveredItem === item.href" class="item-tooltip">
                {{ item.label }}
              </div>
            </Transition>
          </NuxtLink>
        </div>
      </div>

      <!-- Collections -->
      <div class="collections-section">
        <div class="section-header">
          <div v-show="isOpen" class="section-title">
            <Icon name="lucide:folder" class="w-4 h-4" />
            Коллекции
            <div class="collections-count">{{ collections.length }}</div>
          </div>
          <button 
            @click="showCreateDialog = true"
            class="add-collection-btn"
            :title="isOpen ? '' : 'Создать коллекцию'"
          >
            <Icon name="lucide:plus" class="w-4 h-4" />
          </button>
        </div>

        <div class="collections-list">
          <NuxtLink 
            v-for="collection in collections" 
            :key="collection.id"
            :to="collection.href"
            :class="getLinkClass(collection)"
            class="collection-item group"
            @mouseover="handleItemHover(collection.href)"
            @mouseleave="handleItemLeave"
          >
            <div class="collection-icon">
              <Icon :name="collection.icon" class="w-4 h-4" />
              <div class="collection-color" :style="{ backgroundColor: collection.color }"></div>
            </div>
            <div v-show="isOpen" class="collection-info">
              <span class="collection-name">{{ collection.label }}</span>
              <span class="collection-count">{{ collection.count }} элементов</span>
            </div>
            
            <Transition name="tooltip">
              <div v-show="!isOpen && hoveredItem === collection.href" class="item-tooltip">
                {{ collection.label }}
              </div>
            </Transition>
          </NuxtLink>
        </div>
      </div>

      <!-- Activity -->
      <div v-show="isOpen" class="activity-section">
        <div class="section-title">Активность</div>
        <div class="activity-list">
          <div v-for="activity in recentActivity" :key="activity.id" class="activity-item">
            <div class="activity-avatar">
              <Icon :name="activity.icon" class="w-3 h-3" />
            </div>
            <div class="activity-content">
              <span class="activity-text">{{ activity.text }}</span>
              <span class="activity-time">{{ activity.time }}</span>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- Bottom -->
    <div class="bottom-section">
      <!-- Stats -->
      <div v-show="isOpen" class="stats-section">
        <div class="stat-item">
          <div class="stat-icon">
            <Icon name="lucide:eye" class="w-4 h-4" />
          </div>
          <div class="stat-info">
            <span class="stat-value">1,234</span>
            <span class="stat-label">Просмотров</span>
          </div>
        </div>
        <div class="stat-item">
          <div class="stat-icon">
            <Icon name="lucide:heart" class="w-4 h-4" />
          </div>
          <div class="stat-info">
            <span class="stat-value">89</span>
            <span class="stat-label">Лайков</span>
          </div>
        </div>
      </div>

      <!-- Links -->
      <div class="bottom-links">
      

        <NuxtLink 
          :to="settingsItem.href"
          :class="getLinkClass(settingsItem)"
          class="menu-item settings-link"
        >
          <div class="item-icon">
            <Icon :name="settingsItem.icon" class="w-5 h-5" />
          </div>
          <span v-show="isOpen" class="item-label">{{ settingsItem.label }}</span>
        </NuxtLink>
      </div>
    </div>

    <!-- Modal -->
    <Transition name="modal">
      <div v-if="showCreateDialog" class="modal-overlay" @click="showCreateDialog = false">
        <div class="create-modal" @click.stop>
          <div class="modal-header">
            <h3 class="modal-title">Создать коллекцию</h3>
            <button @click="showCreateDialog = false" class="modal-close">
              <Icon name="lucide:x" class="w-5 h-5" />
            </button>
          </div>
          
          <div class="modal-body">
            <div class="form-group">
              <label class="form-label">Название</label>
              <input 
                v-model="newCollectionName"
                placeholder="Введите название..."
                class="form-input"
                @keyup.enter="createCollection"
                ref="collectionInput"
              />
            </div>
            
            <div class="form-group">
              <label class="form-label">Цвет</label>
              <div class="color-picker">
                <button 
                  v-for="color in collectionColors"
                  :key="color"
                  @click="selectedColor = color"
                  class="color-option"
                  :class="{ active: selectedColor === color }"
                  :style="{ backgroundColor: color }"
                />
              </div>
            </div>
          </div>

          <div class="modal-actions">
            <button @click="createCollection" class="btn primary" :disabled="!newCollectionName.trim()">
              <Icon name="lucide:plus" class="w-4 h-4" />
              Создать
            </button>
            <button @click="showCreateDialog = false" class="btn secondary">
              Отмена
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>


<script setup>
const isOpen = ref(true)
const route = useRoute()
const showCreateDialog = ref(false)
const newCollectionName = ref('')
const selectedColor = ref('#3b82f6')
const hoveredItem = ref(null)
const collectionInput = ref(null)

// Основные пункты меню с бейджами
const mainMenuItems = [
  { 
    icon: 'lucide:home', 
    label: 'Главная', 
    href: '/',
    badge: null
  },
  { 
    icon: 'lucide:film', 
    label: 'Фильмы', 
    href: '/movies',
    badge: '1.2K'
  },
  { 
    icon: 'lucide:gamepad-2', 
    label: 'Игры', 
    href: '/games',
    badge: '856'
  },
  { 
    icon: 'lucide:book-open', 
    label: 'Книги', 
    href: '/books',
    badge: '234'
  },
  { 
    icon: 'lucide:rss', 
    label: 'Лента', 
    href: '/feed',
    badge: '12'
  },
]

// Настройки и профиль
const profileItem = { 
  icon: 'lucide:user-circle', 
  label: 'Профиль', 
  href: '/profile' 
}

const settingsItem = { 
  icon: 'lucide:settings', 
  label: 'Настройки', 
  href: '/settings' 
}

// Коллекции с цветами и счетчиками
const collections = ref([
  { 
    id: 1, 
    label: 'Любимые фильмы', 
    href: '/collections/1', 
    icon: 'lucide:heart',
    color: '#ef4444',
    count: 23
  },
  { 
    id: 2, 
    label: 'Хочу посмотреть', 
    href: '/collections/2', 
    icon: 'lucide:bookmark',
    color: '#f59e0b',
    count: 45
  },
  { 
    id: 3, 
    label: 'Классика', 
    href: '/collections/3', 
    icon: 'lucide:star',
    color: '#8b5cf6',
    count: 12
  },
])

// Цвета для коллекций
const collectionColors = [
  '#ef4444', '#f59e0b', '#10b981', '#3b82f6', 
  '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16'
]

// Активность
const recentActivity = ref([
  {
    id: 1,
    icon: 'lucide:heart',
    text: 'Добавил "Дюна" в избранное',
    time: '2 мин назад'
  },
  {
    id: 2,
    icon: 'lucide:star',
    text: 'Оценил "Оппенгеймер"',
    time: '1 час назад'
  },
  {
    id: 3,
    icon: 'lucide:plus',
    text: 'Создал коллекцию',
    time: '3 часа назад'
  }
])

// Computed
const sidebarClass = computed(() => [
  'sidebar-container',
  { 'expanded': isOpen.value, 'collapsed': !isOpen.value }
])

// Methods
const getLinkClass = (item) => {
  const isActive = route.path === item.href
  return {
    'active': isActive,
    'inactive': !isActive
  }
}

const toggleSidebar = () => {
  isOpen.value = !isOpen.value
}

const playHoverSound = () => {
  // Небольшой тактильный фидбек (если поддерживается)
  if (navigator.vibrate) {
    navigator.vibrate(10)
  }
}

// Создание коллекции
const createCollection = () => {
  if (newCollectionName.value.trim()) {
    const newId = Math.max(...collections.value.map(c => c.id)) + 1
    collections.value.push({
      id: newId,
      label: newCollectionName.value.trim(),
      href: `/collections/${newId}`,
      icon: 'lucide:folder',
      color: selectedColor.value,
      count: 0
    })
    
    // Сброс формы
    newCollectionName.value = ''
    selectedColor.value = '#3b82f6'
    showCreateDialog.value = false
  }
}

// Автофокус на инпут при открытии модалки
watch(showCreateDialog, (newVal) => {
  if (newVal) {
    nextTick(() => {
      collectionInput.value?.focus()
    })
  }
})

// Hover effects
const handleItemHover = (href) => {
  hoveredItem.value = href
}

const handleItemLeave = () => {
  hoveredItem.value = null
}
</script>

<style scoped>
.sidebar-container {
  @apply h-screen bg-gradient-to-b from-secondary via-secondary to-secondary/80;
  @apply border-r border-border/50 backdrop-blur-xl;
  @apply transition-all duration-500 ease-out;
  @apply relative overflow-hidden;
  width: 80px;
}

.sidebar-container.expanded {
  width: 350px;
}

/* Header Section */
.header-section {
  @apply relative;
  background: linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary)) 100%);
}

.header-section::after {
  content: '';
  @apply absolute bottom-0 left-0 right-0 h-px;
  background: linear-gradient(90deg, transparent, hsl(var(--border)), transparent);
}

.logo-container {
  @apply flex items-center gap-3;
}

.logo-link {
  @apply flex items-center gap-3 transition-transform duration-300;
}

.logo-link:hover {
  @apply scale-105;
}

.logo-icon {
  @apply w-10 h-10 bg-gradient-to-br from-white to-primary-foreground;
  @apply rounded-xl flex items-center justify-center font-bold text-lg;
  @apply shadow-lg text-primary;
}

.logo-text {
  @apply text-xl font-bold text-primary-foreground;
}

.toggle-btn {
  @apply p-2 rounded-lg backdrop-blur-sm;
  @apply bg-primary-foreground/10 hover:bg-primary-foreground/20;
  @apply text-primary-foreground transition-all duration-300;
  @apply hover:scale-110 active:scale-95;
}

/* User Section */
.user-section {
  @apply p-4;
}

.user-card {
  @apply flex items-center gap-3 p-3 rounded-xl;
  @apply bg-gradient-to-r from-background/50 to-background/30;
  @apply border border-border/50 backdrop-blur-sm;
  @apply hover:bg-gradient-to-r hover:from-primary/10 hover:to-primary/5;
  @apply transition-all duration-300 cursor-pointer;
}

.user-card:hover {
  @apply shadow-lg border-primary/30 scale-105;
}

.user-card.collapsed {
  @apply justify-center;
}

.user-avatar {
  @apply relative;
}

.avatar-img {
  @apply w-10 h-10 rounded-full object-cover;
  @apply ring-2 ring-primary/30 ring-offset-2 ring-offset-transparent;
}

.status-indicator {
  @apply absolute -bottom-0.5 -right-0.5 w-3 h-3;
  @apply bg-green-500 rounded-full border-2 border-background;
  @apply animate-pulse;
}

.user-info {
  @apply flex-1 min-w-0;
}

.user-name {
  @apply font-semibold text-foreground text-sm truncate;
}

.user-stats {
  @apply text-xs text-foreground/60;
}

/* Navigation */
.navigation {
  @apply flex-1 px-4 space-y-6 overflow-y-auto;
}

/* Quick Actions */
.quick-actions {
  @apply flex gap-2;
}

.quick-action-btn {
  @apply flex-1 flex items-center justify-center gap-2 py-2 px-3;
  @apply rounded-lg font-medium text-sm transition-all duration-300;
  @apply hover:scale-105 active:scale-95;
}

.quick-action-btn.primary {
  @apply bg-primary text-primary-foreground;
  @apply hover:bg-primary/90 shadow-lg hover:shadow-primary/25;
}

.quick-action-btn.secondary {
  @apply bg-secondary border border-border;
  @apply hover:bg-background text-foreground;
}

/* Menu Sections */
.menu-section, .collections-section, .activity-section {
  @apply space-y-2;
}

.section-title {
  @apply flex items-center gap-2 text-xs font-semibold;
  @apply text-foreground/70 uppercase tracking-wider px-3 py-1;
}

.collections-count {
  @apply ml-auto bg-primary/20 text-primary px-2 py-0.5;
  @apply rounded-full text-xs font-medium;
}

.section-header {
  @apply flex items-center justify-between px-3 py-2;
}

.add-collection-btn {
  @apply p-1.5 rounded-lg bg-primary/10 hover:bg-primary/20;
  @apply text-primary transition-all duration-300;
  @apply hover:scale-110 active:scale-95;
}

/* Menu Items */
.menu-item {
  @apply flex items-center gap-3 px-3 py-2.5 rounded-xl;
  @apply transition-all duration-300 relative;
  @apply hover:scale-105 active:scale-95;
}

.menu-item.active {
  @apply bg-gradient-to-r from-primary to-primary/90;
  @apply text-primary-foreground shadow-lg shadow-primary/25;
}

.menu-item.active .item-icon {
  @apply text-primary-foreground;
}

.menu-item.inactive {
  @apply hover:bg-gradient-to-r hover:from-primary/10 hover:to-primary/5;
  @apply hover:text-primary;
}

.item-icon {
  @apply relative flex items-center justify-center;
  @apply transition-all duration-300;
}

.icon-glow {
  @apply absolute inset-0 rounded-full opacity-0;
  @apply bg-primary/20 blur-md transition-opacity duration-300;
}

.menu-item:hover .icon-glow {
  @apply opacity-100;
}

.item-label {
  @apply font-medium text-sm flex-1 truncate;
}

.item-badge {
  @apply bg-primary/20 text-primary px-2 py-0.5;
  @apply rounded-full text-xs font-medium;
  @apply animate-pulse;
}

.menu-item.active .item-badge {
  @apply bg-primary-foreground/20 text-primary-foreground;
}

/* Collections */
.collections-list {
  @apply space-y-1;
}

.collection-item {
  @apply flex items-center gap-3 px-3 py-2 rounded-lg;
  @apply transition-all duration-300 relative ;
  @apply hover:scale-105;
}

.collection-item.active {
  @apply bg-gradient-to-r from-primary/20 to-primary/10;
  @apply text-primary border-l-2 border-primary;
}

.collection-item.inactive {
  @apply hover:bg-background/50;
}

.collection-icon {
  @apply relative flex items-center justify-center w-8 h-8;
}

.collection-color {
  @apply absolute inset-0 rounded-lg opacity-20;
}

.collection-info {
  @apply flex-1 min-w-0;
}

.collection-name {
  @apply font-medium text-sm text-foreground block truncate;
}

.collection-count {
  @apply text-xs text-foreground/60;
}

/* Activity */
.activity-list {
  @apply space-y-2;
}

.activity-item {
  @apply flex items-start gap-3 p-2 rounded-lg;
  @apply bg-background/30 hover:bg-background/50;
  @apply transition-all duration-300;
}

.activity-avatar {
  @apply w-6 h-6 bg-primary/10 rounded-full;
  @apply flex items-center justify-center text-primary;
}

.activity-content {
  @apply flex-1 min-w-0;
}

.activity-text {
  @apply text-xs text-foreground/80 block truncate;
}

.activity-time {
  @apply text-xs text-foreground/50;
}

/* Bottom Section */
.bottom-section {
  @apply border-t border-border/50 p-4 space-y-4;
}

.stats-section {
  @apply grid grid-cols-2 gap-3;
}

.stat-item {
  @apply flex items-center gap-2 p-2 rounded-lg;
  @apply bg-gradient-to-r from-primary/5 to-primary/10;
}

.stat-icon {
  @apply text-primary;
}

.stat-info {
  @apply flex flex-col;
}

.stat-value {
  @apply text-sm font-bold text-foreground;
}

.stat-label {
  @apply text-xs text-foreground/60;
}

.bottom-links {
  @apply space-y-1;
}

/* Tooltips */
.item-tooltip {
  @apply absolute left-20 bg-background border border-border;
  @apply px-3 py-2 rounded-lg shadow-lg z-50;
  @apply text-sm font-medium whitespace-nowrap;
  @apply pointer-events-none;
}

/* Modal */
.modal-overlay {
  @apply fixed inset-0 bg-black/60 backdrop-blur-sm;
  @apply flex items-center justify-center z-50 p-4;
}

.create-modal {
  @apply bg-secondary border border-border rounded-2xl;
  @apply max-w-md w-full shadow-2xl;
  @apply overflow-hidden;
}

.modal-header {
  @apply flex items-center justify-between p-6 border-b border-border;
  @apply bg-gradient-to-r from-primary/5 to-primary/10;
}

.modal-title {
  @apply text-lg font-bold text-foreground;
}

.modal-close {
  @apply p-2 rounded-lg hover:bg-background/50;
  @apply text-foreground/70 hover:text-foreground;
  @apply transition-all duration-300;
}

.modal-body {
  @apply p-6 space-y-4;
}

.form-group {
  @apply space-y-2;
}

.form-label {
  @apply text-sm font-medium text-foreground;
}

.form-input {
  @apply w-full px-4 py-3 rounded-xl;
  @apply bg-background border border-border;
  @apply focus:outline-none focus:ring-2 focus:ring-primary;
  @apply transition-all duration-300;
}

.color-picker {
  @apply flex gap-2 flex-wrap;
}

.color-option {
  @apply w-8 h-8 rounded-lg cursor-pointer;
  @apply border-2 border-transparent;
  @apply hover:scale-110 transition-all duration-300;
}

.color-option.active {
  @apply border-foreground ring-2 ring-primary/50;
}

.modal-actions {
  @apply flex gap-3 p-6 border-t border-border;
}

.btn {
  @apply flex items-center justify-center gap-2;
  @apply px-6 py-3 rounded-xl font-medium;
  @apply transition-all duration-300;
  @apply hover:scale-105 active:scale-95;
}

.btn.primary {
  @apply bg-primary text-primary-foreground;
  @apply hover:bg-primary/90 shadow-lg;
  @apply disabled:opacity-50 disabled:cursor-not-allowed;
}

.btn.secondary {
  @apply bg-background border border-border;
  @apply hover:bg-secondary;
}

/* Transitions */
.tooltip-enter-active, .tooltip-leave-active {
  @apply transition-all duration-300;
}

.tooltip-enter-from, .tooltip-leave-to {
  @apply opacity-0 transform scale-95;
}

.modal-enter-active, .modal-leave-active {
  @apply transition-all duration-500;
}

.modal-enter-from, .modal-leave-to {
  @apply opacity-0;
}

.modal-enter-from .create-modal,
.modal-leave-to .create-modal {
  @apply transform scale-95 translate-y-8;
}

/* Scrollbar */
.navigation::-webkit-scrollbar {
  @apply w-1;
}

.navigation::-webkit-scrollbar-track {
  @apply bg-transparent;
}

.navigation::-webkit-scrollbar-thumb {
  @apply bg-primary/30 rounded-full;
}

.navigation::-webkit-scrollbar-thumb:hover {
  @apply bg-primary/50;
}

/* Responsive */
@media (max-width: 768px) {
  .sidebar-container {
    @apply fixed left-0 top-0 z-40;
  }
  
  .sidebar-container.expanded {
    width: 100vw;
  }
}
</style> и