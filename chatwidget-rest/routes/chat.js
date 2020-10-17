const chatController = require('../controllers/chat')
module.exports = (router) => {
    router.post('/sendMessage', chatController.sendMessage)
      return router
}