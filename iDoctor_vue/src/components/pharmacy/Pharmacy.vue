<template>
    <div id="map"></div>
</template>

<script>
export default {
  name: 'Pharmacy',
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
  }},
  mounted: function(){
	  this.loadScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyDTDIeLUtzT3Vq1Bblqs-Kl5sjugLMOJNM&libraries=places')
	  .then(() => {
		  const options = {
			  zoom: 18,
			  center: {lat: 49.4225237, lng: 32.0950475}
		  }
		  let map = new google.maps.Map(document.getElementById('map'),options);
	  });
  }
}
</script>