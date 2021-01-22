import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Contents extends BaseSchema {
  protected tableName = 'contents'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title').notNullable()
      table.string('slug').notNullable().unique().index()
      table.enum('type', ['page', 'post']).defaultTo('post').index()
      table.text('description')
      table.jsonb('tags').defaultTo('[]')
      table.jsonb('content').defaultTo('{}')
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
