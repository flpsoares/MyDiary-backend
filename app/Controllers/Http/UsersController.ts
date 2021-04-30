import { schema } from '@ioc:Adonis/Core/Validator'

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
  public async index({  }: HttpContextContract) {
    const users =  User.all()

    return users
  }

  public async store({ request }: HttpContextContract) {
    const {username, password, email} = request.all()

    const user = await User.create({
      username,
      password,
      email
    })

    return user
  }

  public async update({ request, params }: HttpContextContract) {
    const data = request.only(['email'])

    const user = await User.findOrFail(params.username)

    user.merge(data)
    user.save()

    return user
  }

  public async delete({ params, response}: HttpContextContract) {
    const user = await User.findOrFail(params.id)

    user.delete()

    return response.json({ message: 'User deleted' })
  }
}
