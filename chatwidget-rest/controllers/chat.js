const _ = require('lodash')
const chatService = require('../services/chat')
const errors = require('../errors');

exports.sendMessage = (req, res, next) => {
    try {
        const input = _.trim(_.get(req.body, 'input', ""))
        if(input === "") {
            throw errors.InvalidInput
        }
        const data = chatService.sendMessage(input)
        return res.success(res, data)
    } catch (err) {
        return res.message(res, err.statusCode() || 500, err.message || err.stack || err);
    }
}