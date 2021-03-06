const express = require("express");
const router = express.Router();
const axios = require("axios");
const axiosRetry = require("axios-retry");

axiosRetry(axios, { retries: 5 });
router.get("/getUserProfile", (req, res) => {
  let token = req.query.token;
  let url = "https://api.spotify.com/v1/me";
  axios
    .get(url, {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      if (response.status === 200) {
        res.send(response.data);
      }
    })
    .catch((error) => {
      console.log("an error happened at  /user/getUserProfile");
    });
});

module.exports = { router };
