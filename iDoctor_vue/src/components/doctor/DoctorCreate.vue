<template>
    <main>
        <div class="alert alert-error">
            <ul>
                <li v-for="err in errors" :key="err">{{err}}</li>
            </ul>
        </div>
        <div class="create-doctor">
            <form @submit.prevent="createDoctor">
                <div class="input-field">
                    <v-text-input name="fName" id="fName" v-model="fName"></v-text-input>
                    <label for="fName">Ім'я</label>
                </div>
                <div class="input-field">
                    <v-text-input name="sName" id="sName" v-model="sName"></v-text-input>
                    <label for="sName">Прізвище</label>
                </div>
                <div class="input-field">
                    <v-text-input name="mName" id="mName" v-model="mName"></v-text-input>
                    <label for="mName">По-батькові</label>
                </div>
                <div class="input-field">
                    <v-text-input name="email" id="email" type="email" v-model="email"></v-text-input>
                    <label for="email">Email</label>
                </div>
                <div class="input-field">
                    <v-text-input name="password" id="password" type="password" v-model="password"></v-text-input>
                    <label for="password">Пароль</label>
                </div>
                <div class="input-field">
                    <p>Лікарня роботи</p>
                    <select v-model="hospital">
                        <option v-for="h in hospitals" :key="h" :value="h">{{h}}</option>
                    </select>
                </div>
                <div class="input-field">
                    <p>Фах лікаря</p>
                    <select v-model="type">
                        <option v-for="t in types" :key="t" :value="t">{{t}}</option>
                    </select>
                </div>
                <v-btn type="submit">Зберегти</v-btn>
            </form>
        </div>
    </main>
</template>

<script>
    export default {
        name: 'DoctorCreate',
        data() {
            return {
                hospitals: ['Міська лікарня №1','Міська лікарня №2','Міська лікарня №3'],
                types: ['Терапевт','Окуліст','Хірург','Офтальмолог','Дантист'],
                hospital: 'Міська лікарня №1',
                type: 'Терапевт',
                fName: '',
                sName: '',
                mName: '',
                email: '',
                password: '',
                errors: []
            }
        },
        methods: {
            createDoctor() {
                const opt = {
                    hospital: this.hospital,
                    type: this.type,
                    fName: this.fName,
                    sName: this.sName,
                    mName: this.mName,
                    password: this.password,
                    email: this.email
                };
                this.axios.post('http://localhost:3000/doctor/create', opt)
                .then(response => {
                    if (response.data.status == 200) {
                        this.$router.push('login');
                    } else {
                        this.errors = response.data.errors;
                    }
                });
            }
        }
    }
</script>