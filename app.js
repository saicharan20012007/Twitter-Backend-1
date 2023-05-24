const express = require('express');
const cors = require('cors');
const Twit = require('twit');

const app = express();
app.use(cors());
app.use(express.json());

// Twitter API credentials
const twitterClient = new Twit({
  consumer_key: 'Cp9Y9cG3cW9y53aggPMY5uB5z',
  consumer_secret: '9xlZeolwPKP2uuYOyOeSNztbMq607Z15amZWDZrqpFEUQuDgCr',
  access_token: '1395021920114933766-eGQW8dbLRXFKhWxZPBpZTOc7E2Fa2n',
  access_token_secret: 'E6eKMqV7mNWEz8YZwJpdjewP9mUsDm0mKC3FLfgVcAYX5',
});

// Route to schedule a tweet
app.post('/tweets', (req, res) => {
  const { tweetText, scheduledAt } = req.body;

  // Send the tweet
  twitterClient.post(
    'statuses/update',
    { status: tweetText },
    (err, data, response) => {
      if (err) {
        console.log('Error:', err);
        res.status(500).json({ error: 'Failed to schedule tweet.' });
      } else {
        console.log('Tweet scheduled:', data.text);
        res.status(200).json({ message: 'Tweet scheduled successfully.' });
      }
    }
  );
});

// Start the server
const port = 5001 ;
app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
