const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

const TELEGRAM_BOT_TOKEN = '5477889304:AAGIrBexQdhdzlXWWoyrOVcjNdPKLh7WP_o';
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`;


// Endpoint to handle incoming updates from Telegram
app.post('/webhook', (req, res) => {
  const { message } = req.body;

  if (message && message.text) {
    console.log('Received message:', message.text);
    
    // Process the message here
  }

  res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  
  // Set webhook URL
  axios.post(`${TELEGRAM_API_URL}/setWebhook`, {
    url: `http://localhost:3000/webhook`
  }).then(response => {
    console.log('Webhook set:', response.data);
  }).catch(error => {
    console.error('Error setting webhook:', error);
  });
});
