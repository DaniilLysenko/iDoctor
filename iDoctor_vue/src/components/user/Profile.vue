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
        <button @click="createCard" v-if="user.hospital != '' && user.type == 'user' && !card" class="btn btn-card">Завести карточку</button>
        <div class="push-wrapper" v-if="!hasSubscription">
            <button class="btn" @click="subscribe">Підписатися на сповіщення</button>
        </div>
        <div class="choose_doctor">
            <div class="input-field">
                <v-text-input name="pName" id="pName" v-model="pName"></v-text-input>
                <label for="pName">Ім'я лікаря</label>
            </div>
        </div>
    </main>
</template>

<script>
import config from '../../sw/config.js';
import swMethods from '../../sw/methods.js'
export default {
  name: 'Profile',
  data() {
      return {
          user: {},
          hospitals: ['Міська лікарня №1','Міська лікарня №2','Міська лікарня №3'],
          hosp: 'Міська лікарня №1',
          serviceWorkerRegistration: null,
          hasSubscription: true,
          card: true
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
    },
    subscribe() {
        this.serviceWorkerRegistration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: swMethods.urlB64ToUint8Array(config.appServerKey)
        })
        .then(subscription => {
            this.axios.post('http://localhost:3000/user/push',{subscription: subscription})
            .then(response => {
                this.hasSubscription = true;
            });
        })
        .catch(err => {
            console.log(err);
        });
    },
    push() {
        this.axios.post('http://localhost:3000/user/send',{})
        .then(response => console.log(response));
    }
  },
  mounted: function() {
    this.axios.get('http://localhost:3000/user/profile')
    .then(response => {
        if (response.data.status == 200) {
            this.user = response.data.res;
            this.card = response.data.card;
            if (response.data.res.push_subscribe) {
                this.hasSubscription = true;
            } else {
                this.hasSubscription = false;
            }
        }
    });
    navigator.serviceWorker.register('/static/sw.js')
    .then(sw => {
        this.serviceWorkerRegistration = sw;
    });
  }
}
</script>