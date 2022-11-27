<template>
    <section class="vh-100">
        <div class="container py-5 h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-12 col-md-8 col-lg-6 col-xl-5">
                    <div class="card shadow-2-strong" style="border-radius: 1rem;">
                        <div class="card-body p-5 text-center">

                            <form @submit.prevent="loginAccount">
                                <div class="form-group">
                                    <h3>Welcome</h3>
                                    <hr>
                                    <label for="exampleInputEmail1">Email </label>
                                    <input type="email" class="form-control" id="Email" aria-describedby="emailHelp"
                                        placeholder="Enter email" v-model="account.email">

                                </div>
                                <div class="form-group">
                                    <label for="exampleInputPassword1">Password</label>
                                    <input type="password" class="form-control" id="Password" placeholder="Password"
                                        v-model="account.pass">
                                </div>

                                <button type="submit" class="btn btn-primary">Login</button>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>

import { accountService } from '@/services/account.service';
export default {
    name: 'Login',
    data() {
        return {
            account: {
                email: '',
                pass: '',
            }
        };
    },
    methods: {
        async loginAccount() {
            try { 
                const data = await accountService.login(this.account);
                if (data.isValid) {
                    alert('Welcome, user: ' + data.acc.name)
                    this.$router.push({ name: 'employee' });
                }
                else 
                    alert('Your account or password is not correct!')
            } catch (error) {
                alert(error)
            }
        }
    }
}
</script>
