
const pull = async (req, res) => {
  const TOKEN = '5jixnf6a5bfc7fq7hb87wp5cjh'
  const io = req.app.get("io");


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
    res.status(200).send({ message: "Messages Received!", data: req.body })
    io.emit("message", req.body);
    
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: "Error This is a post request" });
  }
};


module.exports = { pull };
