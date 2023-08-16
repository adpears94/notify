const express = require("express");
const cors = require("cors");
require("dotenv").config();
const socket = require("socket.io");
const http = require("http");

const bodyParser = require("body-parser");
const port = 3006;
const sendRoute = require("./routes/sendRoutes");
const pullRoute = require("./routes/pullRoutes");

const app = express();
const server = http.createServer(app);
const io = socket(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  }
});
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("io", io);

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

// --------- initial API Routes ------------------------------
app.get("/api", (req, res) => {
  console.log("hit the get route");
  res.send(htmlResponse);
});

// --------- apprise API Routes ------------------------------

app.use("/api", sendRoute);
app.use("/api", pullRoute);

server.listen(port, () => {
  console.log(`Proxy server listening on ${port}`);
});
