const cluster = require("cluster");
const axios = require("axios");

if (cluster.isMaster) {
  for (let i = 0; i < 4; i++) {
    cluster.fork();
  }
} else {
  console.log(1);
  axios.post("http://localhost:3000/redeem", { promocode: "NEW50" });
}
