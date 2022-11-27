<template>
    <div v-if="employee" class="page" style="color: white">
        <h4>Chỉnh sửa thông tin nhân viên</h4>
        <EmployeeForm :employee="employee" @submit:employee="onUpdateEmployee" @delete:employee="onDeleteEmployee" />
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
        async getEmployee(id) {
            try {
                this.employee = await employeeService.get(id);
            } catch (error) {
                console.log(error);
                // Redirect to NotFound page and keep URL intact
                this.$router.push({
                    name: 'notfound',
                    params: {
                        pathMatch: this.$route.path.split('/').slice(1)
                    },
                    query: this.$route.query,
                    hash: this.$route.hash,
                });
            }
        },
        async onUpdateEmployee(employee) {
            try {
                await employeeService.update(employee.id, employee);
                alert ('Thông tin được cập nhật thành công.');
                this.$router.push({ name: 'employee' });
            } catch (error) {
                console.log(error);
            }
        },
        async onDeleteEmployee(id) {
            if (confirm('Bạn muốn xóa nhân viên này?')) {
                try {
                    await employeeService.delete(id);
                    this.$router.push({ name: 'employee' });
                } catch (error) {
                    console.log(error);
                }
            }
        },
    },
    created() {
        this.getEmployee(this.employeeId);
        this.message = '';
    },
};
</script>