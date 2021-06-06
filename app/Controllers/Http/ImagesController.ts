import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { schema } from '@ioc:Adonis/Core/Validator'
import Application from '@ioc:Adonis/Core/Application'
import Image from 'App/Models/Image'

export default class ImagesController {
  public async index() {
    const data = Image.all()

    return data
  }

  public async store({ request }: HttpContextContract){
    const validatedImage = schema.create({
      image: schema.file({
        size: '2mb',
        extnames: ['jpg', 'png'],
      }),
      filename: schema.string(),
    })

    const payload = await request.validate({ schema: validatedImage })

    const imageName = `${Date.now()}-${payload.filename}`

    const image = Image.create({filename: imageName, size: payload.image.size})
    
    await payload.image.move(Application.tmpPath('uploads'), {name: imageName})

    return image
  }

  public async show({params, response}: HttpContextContract){
    return response.attachment(
      Application.tmpPath('uploads', params.filename)
    )
  }
}
