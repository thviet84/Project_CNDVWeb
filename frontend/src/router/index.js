import { createWebHistory, createRouter } from 'vue-router';
import Employee from '@/views/Employee.vue';
import Login from '@/views/Login.vue';
const routes = [
    {
        path: '/',
        name: 'employee',
        component: Employee,
    },
    {
        path:'/login',
        name: 'login',
        component: Login,
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'notfound',
        component: () => import('@/views/NotFound.vue'),
    },
    {
        path: '/employees/:id',
        name: 'employee.edit',
        component: () => import('@/views/EmployeeEdit.vue'),
        props: (route) => ({ employeeId: parseInt(route.params.id) })
    },
    {
        path: '/employees/add',
        name: 'employee.add',
        component: () => import('@/views/EmployeeAdd.vue'),
    },
];
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});
export default router;