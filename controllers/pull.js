const axios = require("axios");
const { json } = require("body-parser");

const customAxios = axios.create({
  headers: {
    post: {
      "User-Agent": "Go 1.1 package http",
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
  },
});

const pull = async (req, res) => {
  const TOKEN = "5jixnf6a5bfc7fq7hb87wp5cjh";

  const {
    channel_id,
    channel_name,
    team_domain,
    team_id,
    post_id,
    text,
    timestamp,
    token,
    trigger_words,
    user_id,
    user_name,
  } = req.body;
  console.log("it has hit the endpoint");

  if (token !== TOKEN) {
    console.log("unauthorized attempt");
    return res
      .status(401)
      .send({
        message:
          "Unauthorized attempt. Please check your token and try again.",
      });
  }

  try {
    res.status(200).send({ message: "Messages Received!", data: req.body });
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: "Error This is a post request" });
  }
};

module.exports = { pull };
