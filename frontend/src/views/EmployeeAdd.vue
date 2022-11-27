<template>
    <div class="page" style="color:white">
        <h4>Thêm nhân viên</h4>
        <EmployeeForm :employee="employee" @submit:employee="onCreateEmployee"/>
        <p>{{ message }}</p>
    </div>
</template>

<script>
import EmployeeForm from '@/components/EmployeeForm.vue';
import { employeeService } from '@/services/employee.service';
export default {
    components: {
        EmployeeForm,
    },
    props: {
        employeeId: { type: Number, required: true },
    },
    data() {
        return {
            employee: null,
            message: '',
        };
    },
    methods: {
        async onCreateEmployee(employee) {
            try {
                await employeeService.create(employee);
                alert('Nhân viên đã được thêm thành công.');
                this.$router.push({ name: 'employee' });
            } catch (error) {
                console.log(error);
            }
        },
    },
    created() {
        this.employee = { name: '', email: '', address: '', phone: '', role: '' };
        this.message = '';
    },
};
</script>