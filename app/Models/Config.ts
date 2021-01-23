import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Config extends BaseModel {
  @column({ isPrimary: true })
  public key: string

  @column({})
  public value: string
}
