import authentication from './authentication'
import claim from './claim'
import claimRebuttal from './claimRebuttal'
import contact from './contact'
import crisis from './crisis'
import hero from './hero'
import message from './message'
import note from './note'
import rebuttal from './rebuttal'
import user from './user'

export default function () {
  const app = this

  app.configure(authentication)
     .configure(claim)
     .configure(claimRebuttal)
     .configure(contact)
     .configure(crisis)
     .configure(hero)
     .configure(message)
     .configure(note)
     .configure(rebuttal)
     .configure(user)
}
