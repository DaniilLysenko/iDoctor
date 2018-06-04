<template>
    <main>
        {{ user }} <br>
        <div class="hospital">
            <p>Ви знаходитесь в місті {{town}}</p>
            <p>Оберіть вашу лікарню із списку нижче</p>
        </div>
    </main>
</template>

<script>
export default {
  name: 'Profile',
  data() {
      return {
          user: {},
          town: ''
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
    let position = await this.findUserPosition();
    let geocoder = new google.maps.Geocoder();
    geocoder.geocode({'location': {lat:position.coords.latitude,lng:position.coords.longitude}}, (results, status) => {
      this.town = results[3].address_components[0].short_name;
    });
    
  }
}
</script>