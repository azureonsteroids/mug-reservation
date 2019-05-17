import axios from "axios";
import { compileFunction } from "vm";
const headers = {
  "Content-Type": "application/json"
};
// const burl = "http://muginclermont.trafficmanager.net";
const burl = "http://127.0.0.1:8001";
const burl2 = "http://127.0.0.1:8002";
export default {
  login: function(email, password) {
    return axios.post(
      burl + "/user/login",
      {
        email: email,
        password: password
      },
      {
        headers: headers
      }
    );
  },
  signup: function(send) {
    return axios.post(burl + "/user/signup", send, { headers: headers });
  },

  isAuth: function() {
    return localStorage.getItem("token") !== null;
  },
  logout: function() {
    localStorage.clear();
  },
  retriveGoodies: function(){
    return axios.get(burl + "/goody/all");
  },
  retrieveEvents: function(){
    return axios.get(burl + "/events/all");
  },
  registerEvent: function(body){
    return axios.post(burl2 + "/register/event", body, {headers: headers });
  },
  orderGoody: function(body){
    return axios.post(burl2 + "/order/goody", body, {headers: headers });
  }
};
