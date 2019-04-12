const Twitter = require('twitter')
const removeAccents = require('remove-accents')

module.exports = app => {
  const { Censored, Tweet } = app.locals.models
  const client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
  })
  const stream = client.stream('statuses/filter', {
    track: `#${process.env.HASHTAG}`
  })

  stream.on('data', async event => {
    console.log('tweet !')
    event.text = event.text.replace('&gt;', '>').replace('&lt;', '<')
    const censoreds = await Censored.findAll({
      attributes: ['word'],
      where: { level: 1 } // level 1 censors are bannished
    })
    const found =
      censoreds && censoreds.length > 0
        ? censoreds.find(censored =>
            removeAccents(event.text)
              .toLowerCase()
              .includes(removeAccents(censored.word).toLowerCase())
          )
        : false
    console.log(
      `Message en provenance de ${event.user.screen_name}: "${event.text}"`
    )
    console.log(found)
    await Tweet.create({
      user: event.user.screen_name,
      text: removeAccents(event.text).toLowerCase(),
      visible: !found
    })
    if (found) {
      console.log('TWEET FILTERED')
      const text = `Le tweet ${event.text} envoyé par ${
        event.user.screen_name
      } a été filtré car il contient le mot ${found.word}.`
      axios.post(
        process.env.SLACK_HOOK,
        { text },
        { headers: { 'Content-type': 'application/json' } }
      )
    } else {
      const tweets = await Tweet.findAll()
      app.locals.io.emit('tweets', tweets)
    }
  })

  stream.on('error', function(error) {
    console.log('Twitter error :')
    console.log(error)
  })
}
