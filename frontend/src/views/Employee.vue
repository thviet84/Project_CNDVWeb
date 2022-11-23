<template>
    <div class="page row">
        <div class="col-md-10">
            <InputSearch v-model="searchText" />
        </div>
        <div class="mt-3 col-md-6">
            <h4 style="color: white">
                Danh sách nhân viên
                <i class="fas fa-address-book" />
            </h4>
            <EmployeeList v-if="filteredEmployeesCount > 0" :employees="filteredEmployees"
                v-model:activeIndex="activeIndex" />
            <p v-else>
                Không có nhân viên nào.
            </p>
            <div class="mt-3 row justify-content-around align-items-center">
                <button class="btn btn-sm btn-primary" @click="refreshList()">
                    <i class="fas fa-redo" /> Làm mới
                </button>
                <button class="btn btn-sm btn-success" @click="goToAddEmployee">
                    <i class="fas fa-plus" /> Thêm mới
                </button>
                <button class="btn btn-sm btn-danger" @click="onDeleteEmployees">
                    <i class="fas fa-trash" /> Xóa tất cả
                </button>
            </div>
        </div>
        <div class="mt-3 col-md-6" style="color: white">
            <div v-if="activeEmployee">
                <h4>
                    Thông tin nhân viên
                    <i class="fas fa-address-card" />
                </h4>
                <EmployeeCard :employee="activeEmployee" />
                <router-link :to="{
                                name: 'employee.edit',
                                params: { id: activeEmployee.id },
                                }">
                    <span class="mt-2 badge badge-warning">
                        <i class="fas fa-edit" /> Chỉnh sửa</span>
                </router-link>
            </div>
        </div>
    </div>
</template>
<script>
import EmployeeCard from '@/components/EmployeeCard.vue';
import InputSearch from '@/components/InputSearch.vue';
import EmployeeList from '@/components/EmployeeList.vue';
import { employeeService } from '@/services/employee.service';
export default {
    components: {
        EmployeeCard,
        InputSearch,
        EmployeeList,
    },
    // The full code will be presented below
    data() {
        return {
            employees: [],
            activeIndex: -1,
            searchText: '',
        };
    },
    watch: {
        // Monitor changes on searchText.
        // Release the currently selected employee.
        searchText() {
            this.activeIndex = -1;
        },
    },
    computed: {
        // Map employees to strings for searching.
        employeesAsStrings() {
            return this.employees.map((employee) => {
                const { name, email, address, phone, role } = employee;
                return [name, email, address, phone, role].join('');
            });
        },
        // Return employees filtered by the search box.
        filteredEmployees() {
            if (!this.searchText) return this.employees;
            return this.employees.filter((employee, index) =>
                this.employeesAsStrings[index].includes(this.searchText)
            );
        },
        activeEmployee() {
            if (this.activeIndex < 0) return null;
            return this.filteredEmployees[this.activeIndex];
        },
        filteredEmployeesCount() {
            return this.filteredEmployees.length;
        },
    },
    methods: {
        async retrieveEmployees() {
            try {
                const employeesList = await employeeService.getMany();
                this.employees = employeesList.sort((current, next) =>
                    current.name.localeCompare(next.name)
                );
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrieveEmployees();
            this.activeIndex = -1;
        },
        async onDeleteEmployees() {
            if (confirm('Bạn muốn xóa tất cả Liên hệ?')) {
                try {
                    await employeeService.deleteMany();
                    this.refreshList();
                } catch (error) {
                    console.log(error);
                }
            }
        },
        goToAddEmployee() {
            this.$router.push({ name: 'employee.add' });
        },
    },
    mounted() {
        this.refreshList();
    },
};

</script>
<style scoped>
.page {
    text-align: left;
    max-width: 750px;
    color: red;
}
</style>