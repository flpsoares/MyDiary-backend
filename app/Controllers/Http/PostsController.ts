import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'

import Post from 'App/Models/Post'
import Image from 'App/Models/Image'
import Application from '@ioc:Adonis/Core/Application'

export default class PostsController {
  public async index(){
    const posts = Post.query().preload('user').preload('image')

    return posts
  }

  public async store({ request, auth}: HttpContextContract){
    const validatedData = await request.validate({
      schema: schema.create({
        content: schema.string.optional(),
      }),
      messages: {
        'content.required': 'The content field cannot be empty',
      }
    })

    const validatedImage = schema.create({
      image: schema.file.optional({
        size: '2mb',
        extnames: ['jpg', 'png'],
      }),
      filename: schema.string.optional(),
    })

    const payload = await request.validate({ schema: validatedImage })

    const post = await Post.create(validatedData)

    if(payload.filename) {
      const imageName = `${Date.now()}-${payload.filename}`
      
      const image = Image.create({filename: imageName, size: payload.image?.size})
  
      await payload.image?.move(Application.tmpPath('uploads'), {name: imageName})
      
      if(payload) {
        await post.related('image').associate(await image)
        await post.load('image')
      }
    }
    
    if(auth.user) {
      await post.related('user').associate(auth.user)
      await post.load('user')
    }
    
    
    return post
    
  }

  public async delete({ params, response}: HttpContextContract) {
    const post = await Post.findOrFail(params.id)

    post.delete()

    return response.json({ message: 'Post deleted' })
  }
}


