import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import slugify from 'App/Utils/slugify'

export default class Content extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @column()
  public slug: string

  @column()
  public type: 'page' | 'post'

  @column()
  public description: string

  @column()
  public tags: string

  @column()
  public content: string

  @column()
  public visible: boolean

  @column()
  public customMeta: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  public get tagsArray(): string[] {
    if (!this.tags) return []
    return this.tags.split(',').map((t) => t.trim())
  }

  public static async generateSlug(title: string): Promise<string> {
    const slug = slugify(title)

    const existingSlugs = (
      await Content.query().select(['slug']).where('slug', 'LIKE', `${slug}%`)
    ).map((r) => r.slug)

    if (!existingSlugs.length) {
      return slug
    }

    // add postfix number
    let num = 2
    while (existingSlugs.includes(`${slug}-${num}`)) {
      num += 1
    }

    return `${slug}-${num}`
  }
}
