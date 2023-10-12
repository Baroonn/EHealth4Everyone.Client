<template>
    <nav class="navbar navbar-expand navbar-dark bg-dark">
        <router-link to="/" class="navbar-brand">EHealth4Everyone</router-link>
        <div class="navbar-nav mr-auto">
            <li class="nav-item">
                <router-link to="/patients" class="nav-link">Patients</router-link>
            </li>
        </div>
    </nav>
    <div>
        <b-table striped hover :items="vitals"></b-table>
    </div>
    <!-- Button trigger modal -->
    <div class="col-md-12 bg-light text-right">
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
            Create New Vital
        </button>
    </div>


    <!-- Modal -->
    <div class="modal fade bd-example-modal-lg" id="exampleModalCenter" tabindex="-1" role="dialog"
        aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="col-md-4 mb-3">
                            <label for="temp">Temperature</label>
                            <input type="text" class="form-control" required v-model="vital.temp" id="temp">
                        </div>
                        <div class="col-md-4 mb-3">
                            <label for="height">Height</label>
                            <input type="text" class="form-control" required v-model="vital.height" id="height">
                        </div>
                        <div class="col-md-4 mb-3">
                            <label for="weight">Weight</label>
                            <input type="text" class="form-control" v-model="vital.weight" id="weight">
                        </div>

                        <div class="col-md-4 mb-3">
                            <label for="pulse_rate">Pulse Rate</label>
                            <input type="text" class="form-control" v-model="vital.pulse_rate" id="pulse_rate">
                        </div>
                        <div class="col-md-4 mb-3">
                            <label for="blood_pressure">Blood Pressure</label>
                            <input type="text" class="form-control" required v-model="vital.blood_pressure"
                                id="blood_pressure">
                        </div>
                        <div class="col-md-4 mb-3">
                            <label for="bmi">Body Mass Index</label>
                            <input type="text" class="form-control" required v-model="vital.bmi" id="bmi">
                        </div>
                        <div class="col-md-12 bg-light text-right">
                            <button type="submit" @click="saveVital" class="btn btn-primary">Add New Vitals</button>
                        </div>

                    </form>
                </div>
                <!-- <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary">Save changes</button>
                </div> -->
            </div>
        </div>
    </div>
</template>

  
<script>
import PatientDataService from "../services/PatientDataService";


export default {
    name: "vitals-list",
    data() {
        return {
            vitals: [],
            vital: {
                id: 0,
                temp: "",
                height: "",
                weight: "",
                pulse_rate: "",
                blood_pressure: "",
                bmi: ""
            },
            submitted: false,
            currentVital: null,
            currentIndex: -1,
            surname: ""
        };
    },
    //compatConfig: { MODE: 3 },
    methods: {
        saveVital() {
            const id = this.$route.params.id;
            console.log(this);
            var data = {
                temp: this.vital.temp,
                height: this.vital.height,
                weight: this.vital.weight,
                pulse_rate: this.vital.pulse_rate,
                blood_pressure: this.vital.blood_pressure,
                bmi: this.vital.bmi
            };

            PatientDataService.createVital(id, data)
                .then(response => {
                    this.vital.id = response.data.id;
                    this.submitted = true;
                })
                .catch(e => {
                    console.log(e);
                });
        },
        retrieveVitals() {
            const id = this.$route.params.id;
            PatientDataService.getAllVitals(id)
                .then(response => {
                    this.vitals = response?.data?.data;
                })
                .catch(e => {
                    console.log(e);
                });
        },

        refreshList() {
            this.retrieveVitals();
            this.currentVital = null;
            this.currentIndex = -1;
        },

        setActiveVital(vital, index) {
            this.currentVital = vital;
            this.currentIndex = vital ? index : -1;
        },

        //   removeAllTutorials() {
        //     TutorialDataService.deleteAll()
        //       .then(response => {
        //         console.log(response.data);
        //         this.refreshList();
        //       })
        //       .catch(e => {
        //         console.log(e);
        //       });
        //   },

        //   searchTitle() {
        //     TutorialDataService.findByTitle(this.title)
        //       .then(response => {
        //         this.tutorials = response.data;
        //         this.setActiveTutorial(null);
        //         console.log(response.data);
        //       })
        //       .catch(e => {
        //         console.log(e);
        //       });
        //   }
    },
    mounted() {
        this.retrieveVitals();
    }
};
</script>
  
<style>
.list {
    text-align: left;
    max-width: 750px;
    margin: auto;
}
</style>