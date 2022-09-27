import * as Yup from 'yup'
import User from '../models/User'

class SessionControler {
  async store(request, response) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.String().required(),
    })

    if (!(await schema.isValid(request.body))) {
      return response
        .status(400)
        .json({ error: 'Make sure your password or email are correct' })
    }
    const { email } = request.body

    const user = await User.findOne({
      where: { email },
    })

    if (!user) {
      return response
        .status(400)
        .json({ error: 'Make sure your password or email are correct' })
    }
    return response.json(user)
  }
}

export default new SessionControler()
