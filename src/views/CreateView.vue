<template>
  <div class="o-container o-container--768">
    <div>
      <h1 class="u-title mb-0">Crear Tarea</h1>
    </div>
    <form class="c-create-form" @submit.prevent="saveTask">
      <div>
        <input class="c-input" v-model="name" required ref="nameref" name="name" type="text" placeholder="Que deceas hacer..." maxlength="200">
      </div>
      <div>
        <textarea class="c-textarea" required v-model="description" cols="30" maxlength="500" rows="3" placeholder="Descripción"></textarea>
        <p class="u-text--right u-text--sm u-text--gray-3">{{ description.length }} de 500</p>
      </div>
      <div class="u-text--right">
        <RouterLink class="c-button mr-2" to="/">Cancelar</RouterLink>
        <button class="c-button c-button--primary">Agregar</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
  // import {v4 as uuidv4} from 'uuid';
  import { RouterLink } from 'vue-router'
  import { onMounted, ref } from 'vue';
  import { useStore } from '@/stores/counter'
  import { useRouter, useRoute } from 'vue-router'
  
  const store = useStore()
  const nameref = ref()
  const name = ref('')
  const description = ref('')
  const router = useRouter()
  const route = useRoute()
  // const refInputDescription = ref()

  onMounted(() => {
    nameref.value.focus()
  })

  const saveTask = function () {
    store.addTask({
      id: new Date().getTime().toString(),
      name: name.value.trim(),
      description: description.value.trim(),
      isComplete: false
    })

    Swal.fire({
      title: "¿Quieres crear mas tareas?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#682ee4",
      cancelButtonColor: "#d1d1d1",
      confirmButtonText: "Sí",
      cancelButtonText: "No"
    })
    .then((result: any) => {
      if (result.isConfirmed) {
        name.value = ''
        description.value = ''
        nameref.value.focus()
      } else {
        router.push({
          name: 'home'
        })
      }
    })
  }
</script>

<style scoped lang="scss">
/* @media (min-width: 1024px) { */
  /* } */
.c-create-form {
  border-radius: .75rem;
  border: 1px solid var(--c-gray-2);
  background-color: var(--c-white);
  padding: 1rem 1rem;
  box-shadow: 1px 1px 8px var(--c-gray-2);
}
</style>
