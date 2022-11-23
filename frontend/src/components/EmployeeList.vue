<script>
export default {
    props: {
        employees: { type: Array, default: () => [] },
        activeIndex: { type: Number, default: -1 },
    },
    emits: ['update:activeIndex'],
    methods: {
        updateActiveIndex(index) {
            this.$emit('update:activeIndex', index);
        },
    },
};
</script>
<template>
    <ul class="list-group">
        <li class="list-group-item" v-for="(employee, index) in employees" :key="employee.id"
            :class="{ active: index === activeIndex }" @click="updateActiveIndex(index)">
            {{ employee.name }}
        </li>
    </ul>
</template>