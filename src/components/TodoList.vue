<template>
    <TransitionGroup name="list" class="c-todo-list" tag="ul">
        <TodoItem v-for="task in List" :key="task.id" :task="task" />
    </TransitionGroup>
</template>
<script setup lang="ts">
    import TodoItem from '../components/TodoItem.vue'
    import type Task from '@/types/Task';
    // import type Person from '@/interfaces/Person';
    // interface Task {
    //     id: string
    //     name: string
    //     isComplete: boolean
    //     description: string
    // }
    defineProps<{
        List: Task[]
    }>()
</script>
<style scoped lang="scss">
    .c-todo-list{
        list-style: none;
        padding: 0;
        margin-bottom: 0;
    }
</style>
