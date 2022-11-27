<template>
    <nav class="navbar navbar-expand navbar-light bg-light">
        <a href="/" class="navbar-brand"></a>
        <div class="mr-auto navbar-nav">
            <li class="nav-item">
                <router-link :to="{ name: 'employee' }" class="nav-link">
                    Ứng dụng Quản lý nhân viên
                    <i class="fas fa-address-book" />
                </router-link>
            </li>
        </div>
        
        <div class="signOutIcon">
            <b></b>
            <button class="fa-solid fa-right-from-bracket" style="color: darkgoldenrod" @click="moveToLogin()">
            </button>
        </div>
    </nav>
</template>

<script>
export default {
    methods: {
        moveToLogin() {
            this.$router.push("/");
        },
        
    }
}
</script>

