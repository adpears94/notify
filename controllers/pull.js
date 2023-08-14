const axios = require('axios');
const { json } = require('body-parser');

axios.defaults.headers.post["Content-Type"] = "application/json";
const customAxios = axios.create({
    headers: {
        post: {
          "Content-Type": "application/json"
        }
      }
})


const pull = async (req, res) => {
    const TOKEN = '5jixnf6a5bfc7fq7hb87wp5cjh'

//    const {channel_id, channel_name, team_domain, team_id, post_id, text, timestamp, token, trigger_words, user_id, user_name} = req.body

   const { token } = req.body;  // Destructure only what you use. You can add others as needed.
    console.log('it has hit the endpoint')
   
   // First, validate the token
   if (token !== TOKEN) {
       console.log('unauthorized attempt')
       return res.status(401).send({ message: 'Unauthorized' });
   }

   try {
       // Log the body here if you want to see it even if axios throws an error
       console.log(req.body);
       
       // If you need to send data with the POST request, ensure you provide it
       const axiosResponse = await customAxios.post()
         
       console.log(axiosResponse)
       res.status(200).send({ message: 'Messages Received!' });

   } catch (e) {
       console.error(e);  // Use console.error for errors.
       res.status(500).send({ message: 'Error This is a post request' });
   }
}


module.exports = {  pull };