import axios from "axios";

export default axios.create({
  baseURL: "https://ehealth4everyone.azurewebsites.net/api",
  headers: {
    "Content-type": "application/json"
    //"x-access-token":localStorage.getItem("token")
    //"x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNjk3MTEyNDcwLCJleHAiOjE2OTcxOTg4NzB9.--uqv8TGUrvtt-vHE7o0mkyqiQwz5LxC2aZsmlWaw5Y"
  }
});