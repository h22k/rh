<template>
    <div>
        <div class="form-group row">
            <label for="email" class="col-md-4 col-form-label text-md-right">E-mail Address</label>

            <div class="col-md-6">
                <input id="email" @change="removeField('email')" autocomplete="off" type="email" class="form-control"
                       :class="{'is-invalid': Object.keys(errors).includes('email')}" v-model="register.email">
                <span class="invalid-feedback" v-if="errors.email" role="alert">
                                            <strong>{{ errors.email[0] }}</strong>
                                        </span>
            </div>
        </div>

        <div class="form-group row">
            <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>

            <div class="col-md-6">
                <input id="password" @change="removeField('password')" autocomplete="off" type="password"
                       class="form-control"
                       :class="{'is-invalid': Object.keys(errors).includes('password')}"
                       v-model="register.password">
                <span class="invalid-feedback" v-if="errors['password']" role="alert">
                                            <strong>{{ errors['password'][0] }}</strong>
                                        </span>
            </div>
        </div>

        <div class="form-group row mb-0">
            <div class="col-md-6 offset-md-4">
                <button @click.prevent="doRegister" :disabled="isDisable" class="btn btn-primary">
                    Register
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Register",
    data: () => {
        return {
            register: {
                email: '',
                password: ''
            },
            errors: {},
            isDisable: true
        }
    },
    methods: {
        async doRegister() {
            try {
                const response = await axios.post('/api/auth/register', this.register)
                const data = response.data

                if (!data.status) {
                    this.errors = await data.errorMsg
                    setTimeout(() => {
                        this.errors = {}
                    }, 4000)
                } else {
                    this.doRegisterToPgsql(data.data)
                }

            } catch (e) {
                alert('Unexpected error! Please try again!')
            }

        },
        removeField(field) {
            if (Object.keys(this.errors).includes(field)) {
                delete this.errors[field]
            }
        },
        async doRegisterToPgsql(data) {
            const userData = data.user
            try {
                const response = await nodeAxios.post('/user/create', userData)
                if (response.status === 200) {
                    window.location.href = 'http://localhost:8000/auth/login'
                }
            } catch (e) {
                console.log(e)
            }
        }
    },
    watch: {
        register: {
            deep: true,

            handler(val) {
                let isDisabled = false
                const aborded = ['', null]
                for (let field of Object.entries(val)) {
                    if (aborded.includes(field[1])) {
                        isDisabled = true
                        break
                    }
                }
                this.isDisable = isDisabled
            }
        }
    }
}
</script>

<style scoped>

</style>
