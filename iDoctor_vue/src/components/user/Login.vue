<template>
    <main>
        <div class="alert alert-error">
            <ul>
                <li v-for="err in errors" :key="err">{{err}}</li>
            </ul>
        </div>
        <form @submit.prevent="login">
            <div class="input-field">
                <v-text-input name="email" id="email" v-model="email" type="email"></v-text-input>
                <label for="email">Ваш email</label>
            </div>
            <div class="input-field">
                <v-text-input name="password" id="password" v-model="password" type="password"></v-text-input>
                <label for="password">Пароль</label>
            </div>
            <v-btn type="submit">Вхід</v-btn>
        </form>
    </main>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      email: '', password: '',errors: []
    }
  },
  methods: {
    login(){
      let opt = {email: this.email, password: this.password};
      this.axios.post('http://localhost:3000/user/login',opt)
      .then(response => {
        if (response.data.success) {
          this.$store.commit('setJwt', response.data.token);
          this.$store.commit('setAuth', true);
          this.$router.push('/profile');
        }
      });
    }
  }
}
</script>