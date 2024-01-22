<script setup lang="ts">
    // import { ref } from 'vue';
    const props = defineProps(['modelValue'])
    const emit = defineEmits(['update:modelValue'])
    // const inputRef = ref()
    // ref="inputRef"
</script>

<template>
    <label for=""></label>
    <input
        :value="props.modelValue"
        @input="emit('update:modelValue', 'value')"
    />
</template>