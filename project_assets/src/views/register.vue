<template>
    <div class="login__layout">
        <v-container>
            <v-row justify="center">
                <v-col cols="12" md="6">
                    <!--Success Message-->
                    <div v-if="successMessage" class="login__error text-center mb-3">
                        <v-alert type="success" variant="outlined">
                            {{ successMessage }}
                        </v-alert>
                    </div>
                    <!--Login Error-->
                    <div v-if="registerError" class="login__error text-center mb-3">
                        <v-alert type="error" variant="outlined">
                            {{ registerError }}
                        </v-alert>
                    </div>
                    <v-card class="pa-5" rounded="xl">
                        <v-card-text class="login__layout--title text-center">
                            <h1>Get Started with my Store</h1>
                            <p>Sign up to enjoy personalized deals and special offers.</p>
                        </v-card-text>

                        <form class="d-flex flex-column ga-4" @submit.prevent="handleRegister">
                            <!--First name-->
                            <v-text-field v-model="state.firstName"
                                :error-messages="v$.firstName.$errors.map(e => e.$message)" label="First Name" required
                                @blur="v$.firstName.$touch" @input="v$.firstName.$touch"
                                class="rounded-pill"></v-text-field>
                            <!--Last Name-->
                            <v-text-field v-model="state.lastName"
                                :error-messages="v$.lastName.$errors.map(e => e.$message)" label="Last Name" required
                                @blur="v$.lastName.$touch" @input="v$.lastName.$touch"
                                class="rounded-pill"></v-text-field>
                            <!--User Name-->
                            <v-text-field v-model="state.username"
                                :error-messages="v$.username.$errors.map(e => e.$message)" label="User Name" required
                                @blur="v$.username.$touch" @input="v$.username.$touch"
                                class="rounded-pill"></v-text-field>
                            <!--Email-->
                            <v-text-field v-model="state.email" :error-messages="v$.email.$errors.map(e => e.$message)"
                                label="Email" required @blur="v$.email.$touch" @input="v$.email.$touch"
                                class="rounded-pill"></v-text-field>
                            <!--Password -->
                            <v-text-field v-model="state.password"
                                :error-messages="v$.password.$errors.map(e => e.$message)" label="Password" required
                                @blur="v$.password.$touch" @input="v$.password.$touch"
                                :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                                :type="visible ? 'text' : 'password'" @click:append-inner="visible = !visible"
                                class="rounded-pill"></v-text-field>


                            <v-card-actions class="d-block pt-5" align="center">
                                <div class="d-flex flex-wrap ga-3">
                                    <v-btn @click="v$.$validate" class="capitalize-text" variant="outlined"
                                        color="success" type="submit">
                                        Create My Account
                                    </v-btn>
                                    <v-btn @click="clear" class="capitalize-text" variant="elevated" color="primary">
                                        clear
                                    </v-btn>
                                </div>
                                <div class="text-center pt-6">
                                    Already have account <v-btn @click="router.push('/login')" variant="text"
                                        class="capitalize-text" color="info">Login</v-btn>
                                </div>
                            </v-card-actions>

                        </form>


                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>
<!--Use Composition Api-->
<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { required, email } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
const router = useRouter()
const state = reactive({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: ''
})

const visible = ref(false)
const registerError = ref('')
const successMessage = ref('')


const rules = {
    firstName: { required },
    lastName: { required },
    username: { required },
    email: { required, email },
    password: { required }
}
const v$ = useVuelidate(rules, state)

function clear() {
    v$.value.$reset()
    Object.keys(state).forEach(key => state[key] = '')
    registerError.value = ''
    successMessage.value = ''
}
async function handleRegister() {
    registerError.value = ''
    successMessage.value = ''

    try {
        const res = await fetch('https://dummyjson.com/users/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(state)
        })
        const data = await res.json()
        if (res.ok) {
            // save on local storage because Dummy Api (Mock API) not save on server
            localStorage.setItem('registeredUser', JSON.stringify(state))
            successMessage.value = 'User registered successfully! Redirecting to login...'
            setTimeout(() => router.push('/login'), 1000)
        } else {
            registerError.value = data.message || 'Registration failed!'
        }
    } catch (err) {
        registerError.value = 'Something went wrong.'
        alert(err);
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