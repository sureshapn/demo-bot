const _ = require('lodash');
let config = require('./env/all');
config = _.assign({}, config, require(`./env/${process.env.NODE_ENV || "dev"}`));

module.exports = config