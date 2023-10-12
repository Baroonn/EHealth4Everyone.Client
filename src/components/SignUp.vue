<template>
        <nav class="navbar navbar-expand navbar-dark bg-dark">
        <router-link to="/" class="navbar-brand">EHealth4Everyone</router-link>
    </nav>
    <div class="row justify-content-md-center mt-5">
        <form>
            <h3>Sign Up</h3>

            <div class="form-group">
                <label>Username</label>
                <input type="text" v-model="user.username" class="form-control form-control-lg" />
            </div>

            <div class="form-group">
                <label>Email address</label>
                <input type="email" v-model="user.email" class="form-control form-control-lg" />
            </div>

            <div class="form-group">
                <label>Password</label>
                <input type="password" v-model="user.password" class="form-control form-control-lg" />
            </div>

            <div class="form-group">
                <label for="roles">Role</label>
                <select class="form-control form-control-lg" required v-model="user.roles" name="roles" id="roles">
                    <option value="clerk">Clerk</option>
                    <option value="nurse">Nurse</option>
                </select>
            </div>

            <button type="submit" :disabled="isSubmitting" @click="registerAction" class="btn btn-dark btn-lg btn-block">Sign Up</button>

            <p class="forgot-password text-right">
                Already registered
                <router-link :to="{ name: 'login' }">sign in?</router-link>
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
                email: '',
                roles: []
            },
            validationErrors: {},
            isSubmitting: false,
        };
    },
    created() {
        if (localStorage.getItem('token') != "" && localStorage.getItem('token') != null) {
            this.$router.push('/patients')
        }
    },
    methods: {
        registerAction() {
            this.isSubmitting = true
            let payload = {
                username: this.user.username,
                email: this.user.email,
                password: this.user.password,
                roles: [this.user.roles]
            };
            AuthService.signup(payload)
                .then(response => {
                    if (response.status == 200) {
                        this.$router.push('/')    
                    }else{
                        alert(response.status)
                    }
                    
                    return response
                })
                .catch(error => {
                    alert(error)
                    this.isSubmitting = false
                    // if (error.response.data.errors != undefined) {
                    //     this.validationErrors = error.response.data.errors
                    // }
                    return error
                });
        }
    }
}
</script>