import { ApplicationContract } from '@ioc:Adonis/Core/Application'

export default class AppProvider {
  public static needsApplication = true

  constructor(protected app: ApplicationContract) {}

  public register() {}

  public async boot() {}

  public async ready() {
    const App = await import('@ioc:Adonis/Core/Application')

    if (App.default.environment === 'web') {
      await import('../start/i18n')
    }
  }

  public async shutdown() {}
}
