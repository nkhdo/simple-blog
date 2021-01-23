import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Configs extends BaseSchema {
  protected tableName = 'configs'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('key').notNullable().unique().index()
      table.string('value')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
