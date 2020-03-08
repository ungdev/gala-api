const errorHandler = require('../../utils/errorHandler');
const path = require('path');
const fs = require('fs');

module.exports = (app) => {
  app.get('/gallery/:name', async (req, res) => {
    try {
      const files = fs.readdirSync('src/gallery');
      let file = files.find((f) => f.indexOf(req.params.name) !== -1);
      res.sendFile(path.join(process.cwd(), 'src/gallery', file));
    } catch (err) {
      errorHandler(err, res);
    }
  });
};
