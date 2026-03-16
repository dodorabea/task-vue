<template>
    <div class="login__layout">
        <v-container>
            <v-row justify="center">
                <v-col cols="12" md="6">
                    <v-card class="pa-5" rounded="xl">
                        <v-card-text class="login__layout--title text-center">
                            <h1>Welcome Back</h1>
                            <p>Let’s get you back to shopping and exploring.</p>
                        </v-card-text>

                        <form class="d-flex flex-column ga-4" v-if="v$" @submit.prevent="loginUser">
                            <v-text-field v-model="state.username"
                                :error-messages="v$.username.$errors.map(e => e.$message)" label="Username" required
                                @blur="v$.username.$touch" @input="v$.username.$touch"
                                class="rounded-pill"></v-text-field>

                            <v-text-field v-model="state.password"
                                :error-messages="v$.password.$errors.map(e => e.$message)" label="Password" required
                                @blur="v$.password.$touch" @input="v$.password.$touch"
                                :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                                :type="visible ? 'text' : 'password'" @click:append-inner="visible = !visible"
                                class="rounded-pill"></v-text-field>

                            <div class="d-flex flex-wrap ga-3">
                                <v-btn @click="v$.$validate" variant="outlined" color="success" type="submit">
                                    submit
                                </v-btn>
                                <v-btn @click="clear" variant="elevated" color="primary">
                                    clear
                                </v-btn>
                            </div>
                            <div v-if="loginError" class="login__error text-center mb-3">
                                <v-alert type="error" variant="outlined">
                                    {{ loginError }}
                                </v-alert>
                            </div>
                        </form>
                        <v-card-actions class="d-flex justify-center pt-5" align="center">
                            <div class="text-center">
                                Not have account <v-btn @click="router.push('/')" variant="text"
                                    color="info">Register</v-btn>
                            </div>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { useRouter } from 'vue-router'

const router = useRouter()
const loginError = ref('')
const initialState = {
    username: '',
    password: '',
}

const state = reactive({
    ...initialState,
})

const rules = {
    username: { required },
    password: { required },
}

const v$ = useVuelidate(rules, state)

function clear() {
    v$.value.$reset()

    for (const [key, value] of Object.entries(initialState)) {
        state[key] = value
        loginError.value = ''
    }
}
const visible = ref(false)



async function loginUser() {
    v$.value.$touch()
    if (v$.value.$invalid) return

    loginError.value = ''

    const savedUser = JSON.parse(localStorage.getItem('registeredUser'))

    // Username && password from local storage
    if (
        savedUser &&
        state.username === savedUser.username &&
        state.password === savedUser.password
    ) {
        router.push('/products')
        return
    }

    // Username && password from Api
    try {
        const res = await fetch('https://dummyjson.com/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: state.username,
                password: state.password,
            }),
        })

        const data = await res.json()

        if (res.ok) {
            localStorage.setItem('token', data.accessToken)
            router.push('/products')
        } else {
            loginError.value = 'Username or password is incorrect!'
        }

    } catch (error) {
        loginError.value = 'Something went wrong. Please try again.'
        console.error(error)
    }
}
</script>
<style lang="scss" scoped>
body {
    min-height: 100vh;
    display: flex;
    flex-direction: column;

    .v-card {
        background: #FFF;
        box-shadow: 0 4px 4px 0 rgb(1 37 4 / 10%);
    }

    .login__layout {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: calc(100vh - 200px);

        &--title {
            margin-bottom: 32px;

            h1 {
                font-size: 24px;
                font-weight: 600;
                color: #053E4B;
            }

            p {
                font-size: 18px;
                color: #6B6B6B;
                font-weight: 300;
            }
        }
    }
}
</style>