const service = require('feathers-mongoose')
import hooks from './hooks'
import MessageModel from './message-model'

export default function() {
  const app = this

  let options = {
    Model: MessageModel,
    paginate: {
      default: 100,
      max: 200
    },
    lean: true
  }

  app.use('/api/message', service(options))
  const messageService = app.service('api/message')
  messageService.before(hooks.before)
  messageService.after(hooks.after)
}
