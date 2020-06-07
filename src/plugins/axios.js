import axios from "axios";
// setup the baseurl and default headers so that I don't have to define them in every request
export default {
  ...axios.create({
    baseURL: "http://localhost:5000",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  })
};
