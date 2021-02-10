import path from 'path'
import { I18n } from 'i18n'

class I18nService {
  public readonly locales = ['en', 'vi']
  public isReady = false
  public i18n: I18n

  public start() {
    this.i18n = new I18n()

    this.i18n.configure({
      locales: this.locales,
      defaultLocale: 'en',
      directory: path.join(__dirname, '../../resources/locales'),
    })

    this.isReady = true
  }

  public setLocale(locale: string) {
    this.i18n.setLocale(locale)
  }
}

export default new I18nService()
