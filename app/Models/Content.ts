import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

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

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  public get tagsArray(): string[] {
    if (!this.tags) return []
    return this.tags.split(',').map((t) => t.trim())
  }
}
