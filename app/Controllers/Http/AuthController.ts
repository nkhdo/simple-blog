import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

export default class AuthController {
  public async renderSetup({ view, auth, response }: HttpContextContract) {
    if (auth.isAuthenticated) {
      return response.redirect('/')
    }
    const userCount = await User.query().count('id')
    if (userCount[0]['count(`id`)'] > 0) {
      return response.redirect('/')
    }
    return view.render('setup')
  }

  public async setup({ request, auth, response }: HttpContextContract) {
    const userCount = await User.query().count('id')
    if (userCount[0]['count(`id`)'] > 0) {
      return response.redirect('/')
    }

    const validationSchema = schema.create({
      email: schema.string({ trim: true }, [
        rules.email(),
        rules.unique({ table: 'users', column: 'email' }),
      ]),
      password: schema.string({ trim: true }, [rules.confirmed()]),
    })

    const userDetails = await request.validate({
      schema: validationSchema,
    })

    const user = new User()
    user.email = userDetails.email
    user.password = userDetails.password
    await user.save()

    await auth.login(user)
    response.redirect('/')
  }

  public async renderLogin({ view, auth, response }: HttpContextContract) {
    if (auth.isAuthenticated) {
      return response.redirect('/')
    }

    const userCount = await User.query().count('id')
    if (userCount[0]['count(`id`)'] === 0) {
      // no user -> create
      return response.redirect().toRoute('AuthController.setup')
    }

    return view.render('login')
  }

  public async login({ auth, request, response }: HttpContextContract) {
    const validationSchema = schema.create({
      email: schema.string({ trim: true }, [rules.email()]),
      password: schema.string({ trim: true }),
      remember: schema.boolean.optional(),
    })
    const { email, password, remember } = await request.validate({
      schema: validationSchema,
    })

    await auth.attempt(email, password, !!remember)

    response.redirect('/')
  }

  public async logout({ auth, response }: HttpContextContract) {
    await auth.logout()

    response.redirect('/')
  }
}
