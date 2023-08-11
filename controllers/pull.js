const axios = require('axios');
const { json } = require('body-parser');

const test = (req, res) => {
    res.json({ message: "Hello World!" });
}


const pull = async (req, res) => {
    const TOKEN = '5jixnf6a5bfc7fq7hb87wp5cjh'

   const {channel_id, channel_name, team_domain, team_id, post_id, text, timestamp, token, trigger_words, user_id, user_name} = req.body


    try {
        const response = await axios.post()
        if (req.body.token !== TOKEN) {
            res.status(401).send({message: 'Unauthorized'})
        }
        console.log(req.body)
        res.status(200).send({message: 'Messages Received!'})

    } catch (e) {
        console.log(e)
         res.status(500).send({message: 'Error This is a post request'})
    }
}

const pull2 = async (req, res) => {
    try {
        const response = await axios.get('localhost:7070/apprise')
        console.log(response)
    } catch (e) {
        console.log(e)
    }
}

module.exports = {  pull };