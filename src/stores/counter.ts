import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Ref } from 'vue'

import type Task from "@/types/Task";

let TODO_LS: Task[] = []
const KEY_LS = import.meta.env.VITE_KEY_LS
  const list: string | null = localStorage.getItem(KEY_LS)
if (typeof list == 'string') {
  TODO_LS = JSON.parse(list)
} else {
  TODO_LS = [{
    id: 'string',
    name: 'send mail boss',
    isComplete: false,
    description: 'Enviar informe de componentes a pol@mail.com'
  }]
  localStorage.setItem(KEY_LS, JSON.stringify(TODO_LS))
}

export const useStore = defineStore('counter', () => {
  // const todoList: <array[any]> = ref([])
  const todoList: Ref<Task[]> = ref(TODO_LS)

  const completed = computed(() => {
    return todoList.value.filter((item: Task): boolean => item.isComplete).length
  })
  
  function saveTask(tasks: Task[]) {
    todoList.value = [...tasks]
    localStorage.setItem(KEY_LS, JSON.stringify(todoList.value))
  }

  function addTask(newTask: Task) {
    saveTask([...todoList.value, newTask])
  }

  function deleteTask(id: Task['id']): void {
    // todoList.value = [...todoList.value, payload]
    const newList = todoList.value.filter((task: Task): boolean => {
      return task.id !== id
    })
    saveTask(newList)
  }

  function changeTaskState ( id: Task['id'], isCompleted: boolean): void {
    saveTask(todoList.value.map((item: Task): Task => {
      return {
        ...item,
        isComplete: item.id === id ? isCompleted: item.isComplete
      }
    }))
  }

  return { todoList, completed, addTask, deleteTask, changeTaskState }
})
