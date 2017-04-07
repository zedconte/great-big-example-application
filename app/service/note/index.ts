const service = require('feathers-mongoose');
import hooks from './hooks'
import NoteModel from './note-model'

export default function() {
  const app = this;

  const options = {
    Model: NoteModel,
    paginate: {
      default: 5,
      max: 25
    },
    lean: true
  };

  app.use('/api/note', service(options));
  const noteService = app.service('/api/note');
  noteService.before(hooks.before);
  noteService.after(hooks.after);
};
