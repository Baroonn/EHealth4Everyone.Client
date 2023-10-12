<template>
    <nav class="navbar navbar-expand navbar-dark bg-dark">
        <router-link to="/" class="navbar-brand">EHealth4Everyone</router-link>
        <div class="navbar-nav mr-auto">
            <li class="nav-item">
                <router-link to="/patients" class="nav-link">Patients</router-link>
            </li>
        </div>
        <div class="d-flex">
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <a @click="logoutAction()" class="nav-link " aria-current="page" href="#">Logout</a>
                            </li>
                        </ul>
                    </div>
        <h5 class="text-center mt-1 text-white" >Welcome, {{username}}({{role}})</h5>
    </nav>
    
    <div>
        <b-table striped hover :items="patients" @row-clicked="onRowClicked"></b-table>
    </div>
    <!-- Button trigger modal -->
    <div class="col-md-12 bg-light text-right">
        <button v-if="role=='Clerk'" type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
            Create New Patient
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
                            <label for="surname">Surname</label>
                            <input type="text" class="form-control" required v-model="patient.surname" id="surname">
                        </div>
                        <div class="col-md-4 mb-3">
                            <label for="first_name">First Name</label>
                            <input type="text" class="form-control" required v-model="patient.first_name" id="first_name">
                        </div>
                        <div class="col-md-4 mb-3">
                            <label for="middle_name">Middle Name</label>
                            <input type="text" class="form-control" v-model="patient.middle_name" id="middle_name">
                        </div>

                        <div class="col-md-4 mb-3">
                            <label for="description">Gender</label>
                            <select class="form-control" required v-model="patient.gender" name="gender" id="gender">
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                        <div class="col-md-4 mb-3">
                            <label for="example-datepicker">Date of Birth</label>
                            <input type="date" class="form-control" required v-model="patient.birth_date" id="birth_date">
                        </div>
                        <div class="col-md-4 mb-3">
                            <label for="patient_no">Patient Identification</label>
                            <input type="text" class="form-control" required v-model="patient.patient_no" id="patient_no">
                        </div>
                        <div class="col-md-12 bg-light text-right">
                            <button type="submit" @click="savePatient" class="btn btn-primary">Add Patient</button>
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
import router from "../router"
export default {
    name: "patients-list",
    data() {
        return {
            patients: [],
            patient: {
                id: null,
                surname: "",
                first_name: "",
                middle_name: "",
                gender: "",
                birth_date: "",
                patient_no: "",
                phone_no: ""
            },
            username: localStorage.getItem('username'),
            role: localStorage.getItem('roles') == "ROLE_CLERK"?"Clerk":"Nurse",
            submitted: false,
            currentPatient: null,
            currentIndex: -1,
            surname: ""
        };
    },
    //compatConfig: { MODE: 3 },
    methods: {
        logoutAction(){
            localStorage.clear()
          this.$router.push('/')
        },
        
        onRowClicked(item, index, event) {
            if(this.role != 'Nurse')return
            console.log(item)
            router.push({ path: `/patients/${item.id}/vitals`, replace: true })
            index;event;
        },
        savePatient() {
            console.log(this);
            var data = {
                surname: this.patient.surname,
                first_name: this.patient.first_name,
                middle_name: this.patient.middle_name,
                gender: this.patient.gender,
                birth_date: this.patient.birth_date,
                patient_no: this.patient.patient_no,
                phone_no: this.patient.phone_no
            };

            PatientDataService.create(data)
                .then(response => {
                    this.patient.id = response.data.id;
                    this.submitted = true;
                })
                .catch(e => {
                    console.log(e);
                });
        },
        retrievePatients() {
            PatientDataService.getAll()
                .then(response => {
                    this.patients = response?.data?.data;
                    console.log(response?.data);
                })
                .catch(e => {
                    console.log(e);
                });
        },

        refreshList() {
            this.retrievePatients();
            this.currentPatient = null;
            this.currentIndex = -1;
        },

        setActivePatient(patient, index) {
            this.currentPatient = patient;
            this.currentIndex = patient ? index : -1;
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
        this.retrievePatients();
        //localStorage.clear();
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