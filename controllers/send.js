// const appriseUrl = "http://localhost:7070/apprise/notify";
const appriseUrl = "https://sandbox-9494-dev.ilab.zone/apprise/notify";
const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");

const readfile = (platform, yourEmail) => {
  return new Promise((resolve, reject) => {
    fs.readFile("hooks.json", "utf8", (err, jsonString) => {
      if (err) {
        console.log("File read failed:", err);
        reject(err);
        return;
      }
      const jsonData = JSON.parse(jsonString);
      if (jsonData[platform]) {
        const data = jsonData[platform];
        const indivData = data[yourEmail];
        resolve(indivData);
      } else {
        resolve(null); // resolve with null if platform does not exist in jsonData
      }
    });
  });
};

const getPlatformUrl = (platform, data, recipient) => {
  switch (platform) {
    case "mattermost":
      console.log('mattermost case switch')
      return `mmosts://${data.url}:${data.port}/${data.hook}`;
    case "gmail":
      console.log('gmail case switch')
      let base = `mailto://${data.username}:${data.password}@gmail.com`;
      if (recipient) {
        base += `/?to=${recipient}`;
      }
      return base;
    default:
      return null;
  }
};

const send = async (req, res) => {
  console.log(req.body)
  const { platform, message, yourEmail, recipient } = req.body;
  //   let urls
  //   platform === 'mattermost' ?
  //  urls =  `mmosts://${indivData.url}:${indivData.port}/${indivData.hook}`:
  //   platform === 'gmail' ? urls = `mailto://${indivData.username}:${indivData.password}@gmail.com`: null

  

  try {
    const indivData = await readfile(platform, yourEmail);

    if (!indivData) {
      console.log('breaking at indiv data')
      res.status(400).send({ message: "platform not found" });
      return;
    }

    const urls = getPlatformUrl(platform, indivData, recipient);

    if (!urls) {
      console.log('breaking at urls')
      res.status(400).send({ message: "platform not found" });
      return;
    }

    const axiosResponse = await axios.post(
      appriseUrl,
      {
        urls: urls,
        body: message,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log(axiosResponse.data);
    res.status(200).send({ message: "notification sent" });
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: "Error This is a post request" });
  }
};

const test = (req, res) => {
  res.json({ message: "Hello World!" });
};

module.exports = { send, test };
