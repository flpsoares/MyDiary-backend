import { schema, rules } from '@ioc:Adonis/Core/Validator'
// import Mail from '@ioc:Adonis/Addons/Mail'

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class UsersController {
  public async index(){
    const users =  User.all()

    return users
  }

  public async store({ request }: HttpContextContract) {
    const validatedData = await request.validate({
      schema: schema.create({
        username: schema.string({}, [
          rules.unique({table: 'users', column: 'username'})
        ]),
        password: schema.string(),
        email: schema.string({}, [
          rules.unique({table: 'users', column: 'email'}),
          rules.email()
        ]),
      }),
      messages: {
        required: 'Make sure to enter the all field value',
        'username.unique': 'Username is already in use',
        'email.unique': 'Email is already in use',
        'email.email': 'Invalid email'
      }
    })

    // await Mail.send((message) => {
    //   message
    //     .from('filipeseventeen1@gmail.com')
    //     .to('filipeseventeen1@gmail.com')
    //     .subject('teste')
    //     .text('salve')
    // }).then((res) => console.log(res))

    const user = User.create(validatedData)

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
