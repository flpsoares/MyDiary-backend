import { schema, rules } from '@ioc:Adonis/Core/Validator'
// import Mail from '@ioc:Adonis/Addons/Mail'

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

import Image from 'App/Models/Image'
import Application from '@ioc:Adonis/Core/Application'

export default class UsersController {
  public async index(){
    const users =  User.query().preload('image')

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
    //     .text('teste')
    // }).then((res) => console.log(res))

    const user = User.create(validatedData)

    return user
  }

  public async avatar({ request, auth}: HttpContextContract) {
    const validatedImage = schema.create({
      image: schema.file.optional({
        size: '2mb',
        extnames: ['jpg', 'png'],
      }),
      filename: schema.string.optional(),
    })
    const payload = await request.validate({ schema: validatedImage })

    const user = auth.user

    if(payload.image) {
      const imageName = `${Date.now()}-${payload.filename}`
      
      const image = Image.create({filename: imageName, size: payload.image.size})
  
      await payload.image.move(Application.tmpPath('uploads'), {name: imageName})
      
      if(payload) {
        await user?.related('image').associate(await image)
        await user?.load('image')
      }
    }
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
