<template>
    <div>
        <form @submit.prevent="doLogin" ref="form" action="" method="POST">
            <div class="form-group row">
                <label for="email" class="col-md-4 col-form-label text-md-right">E-Mail Address</label>

                <div class="col-md-6">
                    <input id="email" name="email" v-model="login.email" type="email"
                           :class="{'is-invalid': errors.hasOwnProperty('email')}" class="form-control" required
                           autocomplete="email"
                           autofocus>

                    <span class="invalid-feedback" role="alert" v-if="errors.hasOwnProperty('email')">
                                                        <strong>{{ errors.email[0] }}</strong>
                                                    </span>
                </div>
            </div>

            <div class="form-group row">
                <label for="password" :class="{'is-invalid': errors.hasOwnProperty('password')}"
                       class="col-md-4 col-form-label text-md-right">Password</label>

                <div class="col-md-6">
                    <input id="password" name="password" type="password" class="form-control"
                           v-model="login.password" required autocomplete="current-password">
                </div>
                <span class="invalid-feedback" role="alert" v-if="errors.hasOwnProperty('password')">
                                                        <strong>{{ errors.password[0] }}</strong>
                                                    </span>
            </div>

            <div class="form-group row">
                <div class="col-md-6 offset-md-4">
                    <div class="form-check">
                        <input class="form-check-input" name="remember_me" :class="{'is-invalid': errors.hasOwnProperty('remember_me')}"
                               type="checkbox" v-model="login.remember_me" id="remember">

                        <label class="form-check-label" for="remember">
                            Remember me
                        </label>
                        <span class="invalid-feedback" role="alert" v-if="errors.hasOwnProperty('remember_me')">
                                                        <strong>{{ errors.remember_me[0] }}</strong>
                                                    </span>
                    </div>
                </div>
            </div>

            <div class="form-group row mb-0">
                <div class="col-md-8 offset-md-4">
                    <button @click.prevent="doLogin" :disabled="isDisabled" type="submit" class="btn btn-primary">
                        Login
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: "Login",
    data() {
        return {
            login: {
                email: '',
                password: '',
                remember_me: 1
            },
            errors: {},
            isDisabled: true
        }
    },
    methods: {
        async doLogin() {
            this.login.remember_me = this.login.remember_me ? 1 : 0
            try {
                const loginData = await axios.post('/api/auth/login', this.login)
                const data = loginData.data
                if (!data.status) {
                    this.login.email = ''
                    this.login.password = ''
                    if (data.errorMsg.hasOwnProperty('msg')) {
                        return this.errorAlert(data.errorMsg.msg)
                    }
                    this.errors = data.errorMsg
                    setTimeout(() => {
                        this.errors = {}
                    }, 4000)
                    return
                }

                this.$refs.form.action = data.data.route
                this.$refs.form.method = 'POST'
                this.$refs.form.submit()

            } catch (e) {
                console.log(e)
            }
        },
        errorAlert(msg) {
            this.$swal(msg)
        }
    },
    watch: {
        login: {
            deep: true,

            handler(val) {
                let isDisabled = false
                const keys = Object.keys(val)
                keys.forEach(e => {
                    if (['', null].includes(val[e])) {
                        isDisabled = true
                    }
                })
                this.isDisabled = isDisabled
            }
        }
    }
}
</script>

<style scoped>

</style>
