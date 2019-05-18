import axios from "axios";
import { compileFunction } from "vm";
const headers = {
  "Content-Type": "application/json"
};
// const backendUrl = "http://muginclermont.trafficmanager.net";
const backendUrl = "http://127.0.0.1:8001";
const producerUrl = "http://127.0.0.1:8002";
export default {
  login: function(username, password) {
    return axios.post(
      backendUrl + "/user/login",
      {
        username: username,
        password: password
      },
      {
        headers: headers
      }
    );
  },
  signup: function(send) {
    return axios.post(backendUrl + "/user/signup", send, { headers: headers });
  },
  isAuth: function() {
    return localStorage.getItem("token") !== null;
  },
  logout: function() {
    localStorage.clear();
  },
  retriveGoodies: function(){
    return axios.get(backendUrl + "/goody/all");
  },
  retrieveEvents: function(){
    return axios.get(backendUrl + "/event/all");
  },
  registerEvent: function(body){
    return axios.post(producerUrl + "/register/event", body, {headers: headers });
  },
  orderGoody: function(body){
    return axios.post(producerUrl + "/order/goody", body, {headers: headers });
  },
  retriveOrderedGoodies: function(){
    return axios.get(backendUrl + "/goody/ordered?username=axel");
  },
  retrieveRegisteredEvents: function(){
    return axios.get(backendUrl + "/event/registered?username=axel");
  }
};
