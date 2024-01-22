<template>
  <div class="c-app-wrapper">
    <div class="c-app-wrapper__header">
      <h1 class="u-title u-title--lg mb-0">Mis tareas</h1>
      <div class="c-app-wrapper__actions">
        <!-- <RouterLink class="c-button c-button--primary" to="/crear">crear</RouterLink> -->
        <button class="c-button c-button--icon mr-2" @click="showFilters = !showFilters">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="20" hidden="20">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
          </svg>
        </button>
        <router-link to="/crear" custom v-slot="{ navigate }" >
          <button class="c-button c-button--primary" @click="navigate" role="link" >crear</button>
        </router-link>
      </div>
    </div>

    <transition name="fade">
      <div class="c-app-wrapper__filters" v-if="showFilters">
        <div>
          <label class="c-label" for="id-name">Nombre</label>
          <input class="c-input c-input--alter" id="id-name" type="text" v-model="queryName" placeholder="Nombre de la tarea...">
        </div>
        <div>
          <label class="c-label" for="id-status">Estado</label>
          <select class="c-select" id="id-status" name="status" v-model="queryStatus">
            <option v-for="option in options" :value="option.value" :key="option.key">
              {{ option.text }}
            </option>
          </select>
        </div>
      </div>
    </transition>

    <div class="c-app-wrapper__body">
      <!-- <TodoList :List="store.todoList"></TodoList> -->
      <TodoList v-if="computedList.length" :List="computedList"></TodoList>
      <div class="p-4" v-else-if="queryName != '' || queryStatus != null">
        <p class="u-text--gray-3 mb-0">No se encontró</p>
      </div>
      <div class="p-4" v-else>
        <p class="u-text--gray-3 mb-0">No tiene ninguna tarea</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { RouterLink } from 'vue-router'
import type { Ref } from 'vue'
import { useStore } from '@/stores/counter'

import TodoList from '@/components/TodoList.vue';
import type Task from '@/types/Task';
const showFilters = ref(false)
const queryName = ref('')
const queryStatus: Ref<boolean | null> = ref(null)
const options = ref([
  { text: 'Todos', value: null, key: 0 },
  { text: 'No completados', value: false, key: 1 },
  { text: 'Completados', value: true, key: 2 }
])
// import type { Ref } from 'vue'

// use store
const store = useStore()
// define state reactive
// const todoList: Ref<Task[]> = ref([])

onMounted(() => {
})
const computedList = computed(() => {
  return store.todoList.filter((item: Task) => {
    const status = queryStatus.value
    if (queryStatus.value === null) {
      return item.name.toLowerCase().includes(queryName.value)
    } else {
      return item.name.toLowerCase().includes(queryName.value) && item.isComplete === status
    }
  })
})
// watch()
</script>

<style scoped lang="scss">
  .c-app-wrapper{
    background-color: var(--c-white);
    max-width: 768px;
    margin-inline: auto;
    border-radius: .75rem;
    border: 1px solid var(--c-gray-2);
    box-shadow: 1px 1px 8px var(--c-gray-2);
    &__header{
      border-bottom: 1px solid var(--c-gray-2);
      padding: 1em;
      display: flex;
      justify-content: space-between;
      @media screen and (max-width: 768px) {
        flex-direction: column;
      }
    }
    &__actions{
      display: flex;
      align-items: center;
      justify-content: start;
      @media screen and (max-width: 768px) {
        justify-content: end;
      }
    }
    &__body{
      max-height: 600px;
      overflow: auto;
    }
    &__filters{
      border-bottom: 1px solid var(--c-gray-2);
      padding: 1rem;
      display: flex;
      gap: 2em;
    }
  }
</style>
