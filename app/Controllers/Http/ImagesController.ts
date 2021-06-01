import Route from '@ioc:Adonis/Core/Route'
import { schema } from '@ioc:Adonis/Core/Validator'
import Application from '@ioc:Adonis/Core/Application'

Route.post('image', async ({ request }) => {
  const validatedImage = schema.create({
    cover_image: schema.file({
      size: '2mb',
      extnames: ['jpg', 'png'],
    }),
  })

  const payload = await request.validate({ schema: validatedImage })

  await payload.cover_image.move(Application.tmpPath('uploads'))
})


