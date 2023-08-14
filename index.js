const express = require("express");
const cors = require("cors");
const FormData = require("form-data");
const fs = require('fs');
const axios = require("axios");
const bodyParser = require("body-parser");
const port = 3006;
const sendRoute = require("./routes/sendRoutes");
const pullRoute = require("./routes/pullRoutes");
const { test } = require("./controllers/send");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const htmlResponse = `
<html>
    <head>
        <title>Notification API</title>
    </head>
    <body>
        <h1>Welcome to the Notification API!</h1>
        <ul>
            <li><code>/api/pull</code> is for receiving notifications and messages.</li>
            <li><code>/api/send</code> is for sending notifications through the service.</li>
        </ul>
    </body>
</html>`;


const appriseUrl = "http://localhost:7070/apprise/notify"; // replace with your apprise server url if not localhost



// --------- initial API Routes ------------------------------
app.get("/api", (req, res) => {
  res.send(htmlResponse);
  fs.readFile("hooks.json", "utf8", (err, jsonString) => {
    if (err) {
      console.log("File read failed:", err);
      return;
    }
    let b
    const a = JSON.parse(jsonString);
    const tags = Object.keys(a);
    tags.forEach((tag) => {
      if (tag === "matterMost"){
        b = a[tag]
      }
    })
    console.log("File data:", b);
  })
});



// --------- apprise API Routes ------------------------------

app.use('/api', sendRoute)
app.use('/api', pullRoute)


app.listen(port, () => {
  console.log(`Proxy server listening on ${port}`);
});
