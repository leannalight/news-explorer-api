const { JWT_SECRET, NODE_ENV, MONGODB_URL} = process.env;

module.exports.PORT = process.env.PORT || 3000;
module.exports.MONGODB_URL = NODE_ENV !== 'production' ? 'mongodb://localhost:27017/newsdb' : MONGODB_URL;
module.exports.PrivateKey = NODE_ENV !== 'production' ? 'some-dev-secret' : JWT_SECRET;
