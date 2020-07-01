const { JWT_SECRET, NODE_ENV, PORT, MONGODB_URL} = process.env;

module.exports.PORT = PORT || 3000;
module.exports.MONGODB_URL = NODE_ENV !== 'production' ? MONGODB_URL : 'mongodb://localhost:27017/newsdb';
module.exports.PrivateKey = NODE_ENV !== 'production' ? 'some-dev-secret' : JWT_SECRET;
