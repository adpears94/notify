// const appriseUrl = "http://localhost:7070/apprise/notify";
const appriseUrl = "https://sandbox-9494-dev.ilab.zone/apprise/notify";
const axios = require("axios");
const FormData = require("form-data");

axios.defaults.headers.post["Content-Type"] = "application/json";

const send = async (req, res) => {
  const { url, message } = req.body;
  const formData = new FormData();
  console.log(req.body);

  formData.append("urls", url);
  formData.append("body", message);

  try {
    const response = await axios.post(appriseUrl, formData, {
      headers: formData.getHeaders(),
    });
    console.log(response.data);
    res.status(200).send({ message: "Notification sent!" });
    

  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ error: "There was an error contacting the apprise server." });
  }
};

const test = (req, res) => {
    res.json({ message: "Hello World!" });
}


module.exports = { send, test };