import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

import Post from 'App/Models/Post'

export default class PostsController {
  public async index(){
    const data = Post.all()

    return data
  }

  public async store({ request, auth }: HttpContextContract){
    const validatedData = await request.validate({
      schema: schema.create({
        content: schema.string({}, [
          rules.unique({table: 'posts', column: 'content'})
        ]),
      }),
      messages: {
        'content.required': 'The content field cannot be empty',
      }
    })

    const post = await Post.create(validatedData)
    if(auth.user) {
      await post.related('user').associate(auth.user)
      await post.load('user')
    }

    return post
  }
}
