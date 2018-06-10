<template>
    <main>
        <div class="hospital" v-if="user.hospital == '' && user.type == 'user'">
            <form @submit.prevent="chooseHosp">
                <p>Оберіть вашу лікарню</p>
                <select v-model="hosp">
                    <option v-for="h in hospitals" :key="h" :value="h">{{h}}</option>
                </select>
                <v-btn type="submit">Обрати</v-btn>
            </form>
        </div>
        <button @click="createCard" v-if="user.hospital != '' && user.type == 'user'" class="btn btn-card">Завести карточку</button>
        <hr>
        <div class="personal_info">
            <p>Особиста інформація</p>
        </div>
        <p v-if="user.type == 'admin'">Опа опа да ти адмін</p>
    </main>
</template>

<script>
export default {
  name: 'Profile',
  data() {
      return {
          user: {},
          hospitals: ['Міська лікарня №1','Міська лікарня №2','Міська лікарня №3'],
          hosp: 'Міська лікарня №1'
      }
  },
  methods: {
    loadScript(src) { 
        return new Promise((resolve, reject) => { 
            const script = document.createElement('script'); 
            script.src = src; 
            script.async = false; 
            script.onerror = reject; 
            script.onload = resolve; 
            document.body.appendChild(script); 
        }); 
    },
    findUserPosition() {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(position => {
                resolve(position);
            }, error => {
                console.log(error);
            });
        });
    },
    chooseHosp() {
        this.axios.post('http://localhost:3000/user/hospital',{hospital: this.hosp})
        .then(response => {
            if (response.data.status == 200) {
                this.user.hospital = this.hosp;
            }
        })
    },
    createCard() {
        this.axios.post('http://localhost:3000/card/create-card',{})
        .then(response => {
            if (response.data.status == 200) this.$router.push('/card');
        });
    }
  },
  mounted: async function() {
    await this.loadScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyDTDIeLUtzT3Vq1Bblqs-Kl5sjugLMOJNM&language=uk&libraries=places');
    this.axios.get('http://localhost:3000/user/profile')
    .then(response => {
        if (response.data.status == 200) {
            this.user = response.data.res;
        }
    });
  }
}
</script>