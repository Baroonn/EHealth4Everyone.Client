<template>
    <nav class="navbar navbar-expand navbar-dark bg-dark">
        <router-link to="/" class="navbar-brand">EHealth4Everyone</router-link>
    </nav>
    <div class="row justify-content-md-center mt-5">
        <form>
            <h3>Sign In</h3>

            <div class="form-group">
                <label>Username</label>
                <input type="text" class="form-control form-control-lg" v-model="user.username" id="username"
                    name="username" />
            </div>

            <div class="form-group">
                <label>Password</label>
                <input type="password" class="form-control form-control-lg" v-model="user.password" id="password"
                    name="password" />
            </div>

            <button type="submit" :disabled="isSubmitting" @click="loginAction" class="btn btn-dark btn-lg btn-block">Sign
                In</button>

            <p class="forgot-password text-right">
                Not a user?
                <router-link :to="{ name: 'signup' }">Sign Up</router-link>
            </p>
        </form>
    </div>
</template>

<script>
import AuthService from '@/services/AuthService';

export default {
    data() {
        return {
            user: {
                username: '',
                password: '',
            },
            validationErrors: {},
            isSubmitting: false,
        }
    },
    created() {
        if (localStorage.getItem('token') != "" && localStorage.getItem('token') != null) {
            this.$router.push('/patients')
        }
    },
    methods: {
        loginAction() {
            this.isSubmitting = true
            let payload = {
                username: this.user.username,
                password: this.user.password,
            }
            console.log(this.user.username)
            AuthService.login(payload)
                .then(response => {
                    if (response.status == 200) {
                        localStorage.setItem('token', response.data.accessToken)
                        console.log(response.data.accessToken)
                        localStorage.setItem('username', response.data.username)
                        localStorage.setItem('roles', response.data.roles[0])
                        console.log(response.data.data)
                        this.$router.push('/patients')
                    }
                    else {
                        alert(response?.message)
                    }

                    return response
                })
                .catch(error => {
                    this.isSubmitting = false
                    // if (error.response.data.errors != undefined) {
                    //     this.validationErrors = error.response.data.errors
                    // }
                    // if (error.response.data.error != undefined) {
                    //     this.validationErrors = error.response.data.error
                    // }
                    alert(error);
                    return error
                });
        }
    }

}
</script>