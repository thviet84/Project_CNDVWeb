<template>
    <Form @submit="submitEmployee" :validation-schema="employeeFormSchema">
        <div class="form-group">
            <label for="name">Tên</label>
            <Field name="name" type="text" class="form-control" v-model="employeeLocal.name" />
            <ErrorMessage name="name" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="email">E-mail</label>
            <Field name="email" type="email" class="form-control" v-model="employeeLocal.email" />
            <ErrorMessage name="email" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="address">Địa chỉ</label>
            <Field name="address" type="text" class="form-control" v-model="employeeLocal.address" />
            <ErrorMessage name="address" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="phone">Điện thoại</label>
            <Field name="phone" type="tel" class="form-control" v-model="employeeLocal.phone" />
            <ErrorMessage name="phone" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="role">Vị trí</label>
            <Field name="role" type="text" class="form-control" v-model="employeeLocal.role" />
            <ErrorMessage name="role" class="error-feedback" />
        </div>
        
        <div class="form-group">
            <button class="btn btn-primary">Lưu</button>
            <button v-if="employeeLocal.id" type="button" class="ml-2 btn btn-danger" @click="deleteEmployee">
                Xóa
            </button>
        </div>
    </Form>
</template>
<script>
import * as yup from 'yup';
import { Form, Field, ErrorMessage } from 'vee-validate';
export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    emits: ['submit:employee', 'delete:employee'],
    props: {
        employee: { type: Object, required: true }
    },
    data() {
        const employeeFormSchema = yup.object().shape({
            name: yup
                .string()
                .required('Tên phải có giá trị.')
                .min(2, 'Tên phải ít nhất 2 ký tự.')
                .max(50, 'Tên có nhiều nhất 50 ký tự.'),
            email: yup
                .string()
                .email('E-mail không đúng.')
                .max(50, 'E-mail tối đa 50 ký tự.'),
            address: yup.string().max(100, 'Địa chỉ tối đa 100 ký tự.'),
            phone: yup
                .string()
                .matches(
                    /((09|03|07|08|05)+(\d{8})\b)/g,
                    'Số điện thoại không hợp lệ.'
                ),
            role: yup.string(),
        });
        return {
            // Props are supposed to be immutable, therefore create
            // a local variable employeeLocal and bind it to the form
            employeeLocal: {
                ...this.employee },
            employeeFormSchema,
        };
    },
    methods: {
        submitEmployee() {
            this.$emit('submit:employee', this.employeeLocal);
        },
        deleteEmployee() {
            this.$emit('delete:employee', this.employeeLocal.id);
        },
    },
};
</script>
<style scoped>
@import '@/assets/form.css';
.form-group{
    color: wheat;
}
</style>