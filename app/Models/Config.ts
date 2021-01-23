import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Config extends BaseModel {
  @column({})
  public key: string

  @column({})
  public value: string
}
