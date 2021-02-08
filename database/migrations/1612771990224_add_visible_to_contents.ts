import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AddVisibleToContents extends BaseSchema {
  protected tableName = 'contents'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.boolean('visible').defaultTo(false)
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('visible')
    })
  }
}
