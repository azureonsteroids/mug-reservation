import axios from "axios";

const headers = {
  "Content-Type": "application/json"
};

const baseUrl = window.BASE_URL ? window.BASE_URL : undefined;

const backendUrl = window.BASE_URL ? baseUrl + "/back" : "http://127.0.0.1:8001";
const producerUrl = window.BASE_URL ? baseUrl + "/producer" : "http://127.0.0.1:8002";

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
