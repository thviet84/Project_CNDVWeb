<script>
export default {
    props: {
        employee: { type: Object, required: true },
    },
};
</script>
<template>
    <div>
        <div class="p-1">
            <strong>Tên:</strong>
            {{ employee.name }}
        </div>
        <div class="p-1">
            <strong>E-mail:</strong>
            {{ employee.email }}
        </div>
        <div class="p-1">
            <strong>Địa chỉ:</strong>
            {{ employee.address }}
        </div>
        <div class="p-1">
            <strong>Điện thoại:</strong>
            {{ employee.phone }}
        </div>
        <div class="p-1">
            <strong>Vị trí:</strong>
            {{ employee.role }}
        </div>
    </div>
</template>