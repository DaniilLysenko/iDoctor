<template>
    <main>
        <h4>Кабінет</h4><br>
        <div class="search-patients">
            <div class="input-field">
                <v-text-input name="pName" id="pName" v-model="pName"></v-text-input>
                <label for="pName">Ім'я паціента</label>
            </div>
        </div>
        <div class="res-patients" v-if="patients.length > 0">
            <p>Пацієнти</p>
            <table class="doctable">
                <tr>
                    <th>Ім'я</th>
                    <th>Прізвище</th>
                    <th>Карточка</th>
                </tr>
                <tr v-for="p in patients" :key="p.firstname">
                    <td>{{ p.firstname }}</td>
                    <td>{{ p.lastname }}</td>
                    <td><router-link :to="'/card/' + p._id">Карточка</router-link></td>
                </tr>
            </table>
        </div>
    </main>
</template>

<script>
    export default {
        name: 'Cabinet',
        data() {
            return {
                pName: '',
                patients: []
            }
        },
        watch: {
            pName: function(val) {
                this.axios.get('http://localhost:3000/doctor/patients',{params: {name: val}})
                .then(response => this.patients = response.data.result);
            }
        }
    }
</script>