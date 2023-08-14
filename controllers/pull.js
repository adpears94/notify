const axios = require('axios');
const { json } = require('body-parser');

const test = (req, res) => {
    res.json({ message: "Hello World!" });
}


const pull = async (req, res) => {
    const TOKEN = '5jixnf6a5bfc7fq7hb87wp5cjh'

//    const {channel_id, channel_name, team_domain, team_id, post_id, text, timestamp, token, trigger_words, user_id, user_name} = req.body

   const { token } = req.body;  // Destructure only what you use. You can add others as needed.
    console.log('it has hit the endpoint')
    console.log(req.body)
   // First, validate the token
   if (token !== TOKEN) {
       return res.status(401).send({ message: 'Unauthorized' });
   }

   try {
       // Log the body here if you want to see it even if axios throws an error
       console.log(req.body);
       
       // If you need to send data with the POST request, ensure you provide it
       const axiosResponse = await axios.post( )
         
       console.log(axiosResponse)
       res.status(200).send({ message: 'Messages Received!' });

   } catch (e) {
       console.error(e);  // Use console.error for errors.
       res.status(500).send({ message: 'Error This is a post request' });
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