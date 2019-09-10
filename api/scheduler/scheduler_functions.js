const DSbaseURL = "https://fire-data-api.herokuapp.com";
const axios = require("axios");

const getAmericaFires = () => {
    return axios
      .get(`${DSbaseURL}/all_fires`)
      .then(res => {
          let USAfires = res.data.Fires
        return USAfires
      });
  };

  module.exports = {
      getAmericaFires
  }