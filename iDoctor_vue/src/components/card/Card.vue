<template>
    <main>
        <h3>Карточка</h3>
        <div class="add-record" v-if="this.$store.state.type == 'doctor'">
            <p>Додати запис</p>
            <form @submit.prevent="addRecord">
                <div class="input-field">
                    <v-text-input name="text" id="text" v-model="text"></v-text-input>
                    <label for="text">Текст</label>
                </div> 
                <div class="input-field">
                    <v-text-input name="recommendation" id="recommendation" v-model="recommendation"></v-text-input>
                    <label for="recommendation">Рекомендації</label>
                </div>  
                <v-btn type="submit">Додати</v-btn>            
            </form>
        </div>
        <div class="card" v-if="isCheck">
            <form>
                <label for="birthdate">Birthdate</label>
                <v-date-input id="birthdate" name="birthdate"></v-date-input>
            </form>
        </div>
        <div class="error" v-else>
            Сорян но ви там шото напутали з карточкою верніться назад
        </div>
    </main>
</template>

<script>
    export default {
        name: 'Card',
        data(){
            return {
                text: '', recommendation: '', isCheck: false
            }
        },
        methods: {
            addRecord() {
                const opt = {
                    text: this.text,
                    recommendation: this.recommendation,
                    id: this.$route.params.id
                };
                this.axios.post('http://localhost:3000/doctor/add-record', opt)
                .then(response => {
                    // console.log(response);
                });
            }
        },
        mounted: function(){
            
        },
        created: function() {
            this.axios.get('http://localhost:3000/card/check', {params: {id: this.$route.params.id}})
            .then(response => {
                if (response.data.status == 200) {
                    this.isCheck = true;
                }
            });
        }
    }
</script>