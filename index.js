const express = require("express");
const cors = require("cors");
const FormData = require("form-data");
const axios = require("axios");
const bodyParser = require("body-parser");
const port = 3006;
const sendRoute = require("./routes/sendRoutes");
const pullRoute = require("./routes/pullRoutes");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const appriseUrl = "http://localhost:7070/apprise/notify"; // replace with your apprise server url if not localhost



// --------- initial API Routes ------------------------------
app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});



// --------- apprise API Routes ------------------------------

app.use('/api', sendRoute)
app.use('/api', pullRoute)


app.listen(port, () => {
  console.log(`Proxy server listening on ${port}`);
});
