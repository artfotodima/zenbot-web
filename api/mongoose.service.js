const mongoose = require('mongoose');

export default function mongooseService(app) {
  mongoose.connect(app.get('mongodb'), { useNewUrlParser: true });
  mongoose.Promise = global.Promise;

  app.set('mongooseClient', mongoose);
}
