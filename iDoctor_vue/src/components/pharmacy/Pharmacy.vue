<template>
    <div id="map"></div>
</template>

<script>
import axios from 'axios';
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
        },
        createMarker(place,map,infowindow){
            let marker = new google.maps.Marker({
                position: new google.maps.LatLng(place.geometry.location.lat, place.geometry.location.lng),
                icon: 'https://u.imageresize.org/873b8269-1b6b-41ee-8a6e-1ca08854ff3a.png',
                map: map
            });
            google.maps.event.addListener(marker, 'click', function() {
                infowindow.setContent(place.name);
                infowindow.open(map, this);
            });
        }
    },
    mounted: function(){
        this.loadScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyDTDIeLUtzT3Vq1Bblqs-Kl5sjugLMOJNM&libraries=places')
        .then(() => {
            const options = {
                zoom: 16,
                center: {lat: 49.4225237, lng: 32.0950475}
            }
            var map = new google.maps.Map(document.getElementById('map'), options);
            var infowindow = new google.maps.InfoWindow();
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(49.4225237, 32.0950475),
                map: map
            });
            const opt = {
                lat: 49.4225237,
                lng: 32.0950475
            }
            axios.post('http://localhost:3000/pharmacy/near', opt)
            .then(response => {
                console.log(response);
                response.data.apt.forEach((apt) => {
                    this.createMarker(apt, map, infowindow);
                })
            });
        });
    }
}
</script>