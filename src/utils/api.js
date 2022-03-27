import axios from "axios";

export default {
  getSentence: function (counter) {
    return axios
      .get("https://api.hatchways.io/assessment/sentences/" + counter)
      .then((response) => {
        if (response.status === 200) return response.data.data.sentence;
        throw new Error("Network error");
      })
      .catch((error) => console.log(error));
  },
};
