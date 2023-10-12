<template>
    <div class="submit-form">
        <div v-if="!submitted">
            <div class="form-group">
                <label for="title">Surname</label>
                <input type="text" class="form-control" id="surname" required v-model="patient.surname" name="surname" />
            </div>

            <div class="form-group">
                <label for="description">First Name</label>
                <input class="form-control" id="first_name" required v-model="patient.first_name" name="first_name" />
            </div>

            <div class="form-group">
                <label for="description">Middle Name</label>
                <input class="form-control" id="middle_name" v-model="patient.middle_name" name="middle_name" />
            </div>

            <div class="form-group">
                <label for="description">Gender</label>
                <select class="form-control" required v-model="patient.gender" name="gender" id="gender">
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
            </div>

                <button @click="savePatient" class="btn btn-success">Submit</button>
            </div>

            <div v-else>
                <h4>You submitted successfully!</h4>
                <button class="btn btn-success" @click="newPatient">Add</button>
            </div>
        </div>
</template>
  
<script>
import PatientDataService from "../services/PatientDataService";

export default {
    name: "add-patient",
    data() {
        return {
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
            submitted: false
        };
    },
    methods: {
        savePatient() {
            console.log("here")
            var data = {
                surname: this.patient.surname,
                first_name:this.patient.first_name,
                middle_name: this.patient.middle_name,
                gender: this.patient.gender,
                birth_date: "2023-09-09",
                patient_no: "",
                phone_no: ""
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

        newPatient() {
            this.submitted = false;
            this.patient = {};
        }
    }
};
</script>
  
<style>
.submit-form {
    max-width: 300px;
    margin: auto;
}
</style>