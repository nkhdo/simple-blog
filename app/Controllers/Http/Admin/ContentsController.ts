import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Content from 'App/Models/Content'

export default class ContentsController {
  public async index({ view }: HttpContextContract) {
    const contents = await Content.query().orderBy('id', 'desc')

    const posts = contents.filter((c) => c.type === 'post')
    const pages = contents.filter((c) => c.type === 'page')

    return view.render('admin/contents/index', {
      posts,
      pages,
    })
  }

  public async new({ request, view }: HttpContextContract) {
    return view.render('admin/contents/new', {
      type: request.input('type') || 'post',
    })
  }

  public async create({ request, response }: HttpContextContract) {
    const validationSchema = schema.create({
      type: schema.enum(['post', 'page']),
      title: schema.string({ trim: true }, [rules.maxLength(128)]),
      description: schema.string.optional({ trim: true }, [rules.maxLength(256)]),
      content: schema.string({ trim: true }),
      tags: schema.string.optional({ trim: true }, [rules.maxLength(128)]),
      visible: schema.boolean.optional(),
      custom_meta: schema.string.optional({ trim: true }),
    })

    const contentDetails = await request.validate({
      schema: validationSchema,
    })

    const content = new Content()
    content.type = contentDetails.type as 'post' | 'page'
    content.title = contentDetails.title
    content.slug = await Content.generateSlug(contentDetails.title)
    content.description = contentDetails.description || ''
    content.content = contentDetails.content
    content.tags = (contentDetails.tags || '').toLowerCase()
    content.visible = contentDetails.visible || false
    content.customMeta = contentDetails.custom_meta || ''

    await content.save()

    return response.redirect().toRoute('Admin/ContentsController.index')
  }

  public async edit({ params, view }: HttpContextContract) {
    const content = await Content.findOrFail(params.id)

    return view.render('admin/contents/edit', {
      content,
    })
  }

  public async update({ request, response, params }: HttpContextContract) {
    const validationSchema = schema.create({
      title: schema.string({ trim: true }, [rules.maxLength(128)]),
      description: schema.string.optional({ trim: true }, [rules.maxLength(256)]),
      content: schema.string({ trim: true }),
      tags: schema.string.optional({ trim: true }, [rules.maxLength(128)]),
      visible: schema.boolean.optional(),
      custom_meta: schema.string.optional({ trim: true }),
    })

    const contentDetails = await request.validate({
      schema: validationSchema,
    })

    const content = await Content.findOrFail(params.id)
    content.title = contentDetails.title
    content.description = contentDetails.description || ''
    content.content = contentDetails.content
    content.tags = (contentDetails.tags || '').toLowerCase()
    content.visible = contentDetails.visible || false
    content.customMeta = contentDetails.custom_meta || ''

    await content.save()

    switch (request.accepts(['json', 'html'])) {
      case 'json':
        return response.status(204)
      default:
        return response.redirect().toRoute('Admin/ContentsController.index')
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    const content = await Content.findOrFail(params.id)
    await content.delete()

    return response.status(204)
  }
}
