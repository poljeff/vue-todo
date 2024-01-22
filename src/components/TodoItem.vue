<!-- v-model="task.isComplete" -->
<template>
  <li>
    <div class="c-todo-item">
      <div class="c-todo-item__content" :class="{'is-completed': task.isComplete }">
        <p class="mb-0 u-truncate">
          <span class="u-subtitle u-subtitle--20">{{ capitalize(task.name) }}</span>
        </p>
        <p class="u-fs u-fs-16 u-text--gray-3 mb-0 u-truncate-2">{{ capitalize(task.description) }}</p>
      </div>
      <div>
        <button @click="() => { handleDeleteTask(task) }">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" height="20" width="20">
            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
          </svg>
        </button>
      </div>
      <label :for="task.id" class="c-todo-item__action u-pointer">
        <input
            :id="task.id"
            class="c-todo-item__checkbox"
            :checked="task.isComplete"
            @change="($event) => { handleChangeStatus(task, $event) }"
            type="checkbox"
        >
      </label>
    </div>
  </li>
</template>

<script setup lang="ts">
    import type Task from '@/types/Task';
    import { useStore } from '@/stores/counter'
    // HTMLInputElement

    defineProps<{
      task: Task
    }>()
    const store = useStore()

    const handleChangeStatus = (task: Task, event: any): void => {
      // store.changeTaskState(task.id, !task.isComplete)
      store.changeTaskState(task.id, event.target.checked)
    }

    const handleDeleteTask = (task: Task): void => {
      // store.changeTaskState(task.id, !task.isComplete)
      Swal.fire({
        title: "Eliminar tarea",
        text: "¿Estás seguro de eliminar esta tarea?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#682ee4",
        cancelButtonColor: "#d1d1d1",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar"
      })
      .then((result: any) => {
        if (result.isConfirmed) {
          store.deleteTask(task.id)
        }
      })
    }

    const capitalize = function (text: string): string {
        return text.charAt(0).toUpperCase() + text.slice(1)
    }
</script>

<style scoped lang="scss">
  .c-todo-item{
    display: flex;
    align-items: center;
    &:not(:last-child) {
      border-bottom: 1px solid red;
    }
    &__action {
      padding: 1em;
    }
    &__checkbox {
      transform: scale(1.8);
    }
    &__content {
      flex: 1;
      padding: 1em;
      width: calc(100% - 200px);
    }
    &:hover{
      background-color: var(--c-gray);
    }
    .u-subtitle{
      position: relative;
      &:after{
        content: '';
        position: absolute;
        width: 0;
        height: 2px;
        top: 10px;
        left: 0;
        background-color: black;
        transition: .5s all ease-out;
      }
    }
    .is-completed {
      opacity: .5;
      transition: .2s all ease;
      // > .u-subtitle {
      //   text-decoration: line-through;
      // }
      .u-subtitle{
        &:after{
          transition: .5s all ease-in;
          width: 100%;
        }
      }
    }
  }
</style>
