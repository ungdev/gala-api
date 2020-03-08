const fs = require('fs');
const errorHandler = require('../../utils/errorHandler');

module.exports = (app) => {
  app.get('/gallery', async (req, res) => {
    try {
      const location = 'gallery';
      const files = fs.readdirSync(location);

      // Filters and absolute path (without the base url)
      const photos = files.filter((file) => file.match(/^.*\.jpe?g$/)).map((file) => `/${location}/${file}`);

      return res
        .status(200)
        .json(photos)
        .end();
    } catch (err) {
      return errorHandler(err, res);
    }
  });
};
