import http from "../http-common";

class PatientDataService {
    getAll() {

        return http.get("/patients", {
            headers: {
                "x-access-token": localStorage.getItem('token')
            }
        });
    }

    getAllVitals(id) {
        return http.get(`/patients/${id}/vitals`, {
            headers: {
                "x-access-token": localStorage.getItem('token')
            }
        });
    }

    create(data) {
        return http.post("/patients", data, {
            headers: {
                "x-access-token": localStorage.getItem('token')
            }
        });
    }

    createVital(id, data) {
        return http.post(`/patients/${id}/vitals`, data, {
            headers: {
                "x-access-token": localStorage.getItem('token')
            }
        });
    }
}

export default new PatientDataService();