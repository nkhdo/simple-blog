import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AddCustomMetaToContents extends BaseSchema {
  protected tableName = 'contents'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.text('custom_meta')
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('custom_meta')
    })
  }
}
