<template>
    <main>
        <div class="alert alert-error">
            <ul>
                <li v-for="err in errors" :key="err">{{err}}</li>
            </ul>
        </div>
        <form @submit.prevent="reg">
            <div class="input-field">
                <v-text-input name="fName" id="fName" v-model="fName"></v-text-input>
                <label for="fName">Ваше ім'я</label>
            </div>
            <div class="input-field">
                <v-text-input name="sName" id="sName" v-model="sName"></v-text-input>
                <label for="sName">Ваше прізвище</label>
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
                <v-text-input name="birthdayY" id="birthdayY" v-model="birthdayY"></v-text-input>
                <label for="birthdayY">Повна дата народження (день.місяць.рік)</label>
            </div>
            <div class="input-field">
                <v-text-input name="placeL" id="placeL" v-model="placeL"></v-text-input>
                <label for="placeL">Міце проживання (вулиця, квартира)</label>
            </div>
            <v-btn type="submit">Реєстрація</v-btn>
        </form>
    </main>
</template>

<script>
export default {
  name: 'Registration',
  data() {
    return {
        fName: '',sName: '',mName: '',email: '',password: '', birthdayY: '', placeL: '', errors: []
    }
  },
  methods: {
    reg() {
        let opt = {
            fName: this.fName,
            sName: this.sName,
            mName: this.mName,
            email: this.email,
            password: this.password,
            birthdayY: this.birthdayY,
            placeL: this.placeL
        };
        this.axios.post('http://localhost:3000/user/reg', opt)
        .then(response => {
            if (response.data.success) {
                this.$router.push('/login');
            } else {
                this.errors = response.data.errors;
            }
        });
    }
  }
}
</script>