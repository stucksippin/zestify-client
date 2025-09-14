<template>
  <div :class="sidebarClass">
    <!-- Header -->
    <div class="flex items-center justify-between p-4 border-b border-border">
      <h1 v-show="isOpen" class="font-bold text-xl text-primary ml-3">
        <nuxt-link to="/">Zestify</nuxt-link>
      </h1>
      <button 
        @click="toggleSidebar"
        class="p-2 rounded-lg hover:bg-background/20 transition-colors"
      >
        <Icon :name="isOpen ? 'heroicons:x-mark' : 'heroicons:bars-3'" class="w-5 h-5" />
      </button>
    </div>

    <!-- Navigation -->
    <nav class="p-4 space-y-2">
      <!-- Основные пункты меню -->
      <NuxtLink 
        v-for="item in mainMenuItems" 
        :key="item.href"
        :to="item.href"
        :class="linkClass(item)"
        class="flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group relative"
      >
        <Icon :name="item.icon" class="w-5 h-5" />
        <span v-show="isOpen" class="font-medium">{{ item.label }}</span>
        
        <!-- Tooltip для основных пунктов -->
        <div 
          v-show="!isOpen" 
          class="absolute left-16 bg-background border border-border px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50"
        >
          {{ item.label }}
        </div>
      </NuxtLink>

      <!-- Раздел Коллекции -->
      <div class="pt-4">
        <!-- Заголовок раздела -->
        <div class="flex items-center justify-between px-3 py-2 mb-2">
          <h3 v-show="isOpen" class="text-xs font-semibold text-foreground/70 uppercase tracking-wide">
            Коллекции
          </h3>
          <button 
            v-show="isOpen"
            @click="showCreateDialog = true"
            class="p-1 rounded hover:bg-background/20 transition-colors"
            title="Создать коллекцию"
          >
            <Icon name="heroicons:plus" class="w-4 h-4 text-primary" />
          </button>
        </div>

        <!-- Список коллекций -->
        <div class="space-y-1">
          <NuxtLink 
            v-for="collection in collections" 
            :key="collection.id"
            :to="collection.href"
            :class="linkClass(collection)"
            class="flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group relative"
          >
            <Icon :name="collection.icon" class="w-4 h-4" />
            <span v-show="isOpen" class="font-medium text-sm">{{ collection.label }}</span>
            
            <!-- Tooltip для коллекций -->
            <div 
              v-show="!isOpen" 
              class="absolute left-16 bg-background border border-border px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50"
            >
              {{ collection.label }}
            </div>
          </NuxtLink>

          <!-- Кнопка создания коллекции для свернутого состояния -->
          <button 
            v-show="!isOpen"
            @click="showCreateDialog = true"
            class="w-full flex items-center justify-center  py-2 rounded-lg hover:bg-background/20 transition-colors "
          >
            <Icon name="heroicons:plus" class="w-4 h-4 text-primary" />
            
            <!-- Tooltip -->
            <div class="absolute left-16 bg-background border border-border px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
              Создать коллекцию
            </div>
          </button>
        </div>
      </div>

      <!-- Настройки внизу -->
      <div class="pt-4 border-t border-border mt-4">
        <NuxtLink 
          :to="settingsItem.href"
          :class="linkClass(settingsItem)"
          class="flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group relative"
        >
          <Icon :name="settingsItem.icon" class="w-5 h-5" />
          <span v-show="isOpen" class="font-medium">{{ settingsItem.label }}</span>
          
          <!-- Tooltip -->
          <div 
            v-show="!isOpen" 
            class="absolute left-16 bg-background border border-border px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50"
          >
            {{ settingsItem.label }}
          </div>
        </NuxtLink>
      </div>


      <div class="">
               <NuxtLink 
          :to="profileItem.href"
          :class="linkClass(profileItem)"
          class="flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group relative"
        >
          <Icon :name="profileItem.icon" class="w-5 h-5" />
          <span v-show="isOpen" class="font-medium">{{ profileItem.label }}</span>
          
          <!-- Tooltip -->
          <div 
            v-show="!isOpen" 
            class="absolute left-16 bg-background border border-border px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50"
          >
            {{ profileItem.label }}
          </div>
        </NuxtLink>
      </div>
    </nav>

    <!-- Диалог создания коллекции -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div 
        v-if="showCreateDialog" 
        class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        @click="showCreateDialog = false"
      >
        <Transition
          enter-active-class="transition-all duration-400 ease-out"
          enter-from-class="opacity-0 transform scale-95 translate-y-4"
          enter-to-class="opacity-100 transform scale-100 translate-y-0"
          leave-active-class="transition-all duration-200 ease-in"
          leave-from-class="opacity-100 transform scale-100 translate-y-0"
          leave-to-class="opacity-0 transform scale-95 translate-y-4"
        >
          <div 
            v-if="showCreateDialog"
            class="bg-secondary border border-border rounded-lg p-6 max-w-md w-full mx-4 shadow-2xl"
            @click.stop
          >
            <h3 class="text-lg font-bold mb-4 text-primary">Создать коллекцию</h3>
            <input 
              v-model="newCollectionName"
              placeholder="Название коллекции"
              class="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-200 focus:scale-105"
              @keyup.enter="createCollection"
            >
            <div class="flex gap-3 mt-4">
              <button 
                @click="createCollection"
                class="flex-1 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-all duration-200 hover:scale-105 active:scale-95"
              >
                Создать
              </button>
              <button 
                @click="showCreateDialog = false"
                class="flex-1 bg-background border border-border px-4 py-2 rounded-lg hover:bg-background/50 transition-all duration-200 hover:scale-105 active:scale-95"
              >
                Отмена
              </button>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </div>
</template>

<script setup>
const isOpen = ref(true)
const route = useRoute()
const showCreateDialog = ref(false)
const newCollectionName = ref('')

// Основные пункты меню
const mainMenuItems = [
  { icon: 'heroicons:home', label: 'Главная', href: '/' },
  { icon: 'heroicons:film', label: 'Фильмы', href: '/movies' },
  { icon: 'heroicons:puzzle-piece', label: 'Игры', href: '/games' },
  { icon: 'heroicons:book-open', label: 'Книги', href: '/books' },
]

// Настройки отдельно
const settingsItem = { 
  icon: 'heroicons:cog-6-tooth', 
  label: 'Настройки', 
  href: '/settings' 
}

const profileItem = { 
  icon: 'heroicons:user-circle', 
  label: 'Профиль', 
  href: '/profile' 
}

// Коллекции (с заглушками)
const collections = ref([
  { 
    id: 1, 
    label: 'Любимые фильмы', 
    href: '/collections/1', 
    icon: 'heroicons:heart' 
  },
  { 
    id: 2, 
    label: 'Хочу посмотреть', 
    href: '/collections/2', 
    icon: 'heroicons:bookmark' 
  },
  { 
    id: 3, 
    label: 'Классика', 
    href: '/collections/3', 
    icon: 'heroicons:star' 
  },
])

const sidebarClass = computed(() => 
  `${isOpen.value ? 'w-64' : 'w-20'} transition-all duration-300 ease-in-out bg-secondary border-r border-border h-screen relative overflow-y-auto`
)

const linkClass = (item) => 
  route.path === item.href 
    ? 'bg-primary text-primary-foreground' 
    : 'hover:bg-background/20'

const toggleSidebar = () => {
  isOpen.value = !isOpen.value
}

// Создание новой коллекции (заглушка)
const createCollection = () => {
  if (newCollectionName.value.trim()) {
    const newId = Math.max(...collections.value.map(c => c.id)) + 1
    collections.value.push({
      id: newId,
      label: newCollectionName.value.trim(),
      href: `/collections/${newId}`,
      icon: 'heroicons:folder'
    })
    newCollectionName.value = ''
    showCreateDialog.value = false
  }
}
</script>