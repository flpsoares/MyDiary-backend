import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Images extends BaseSchema {
  protected tableName = 'images'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('filename').notNullable()
      table.double('size').notNullable()
      table.timestamps(true)
    })
    this.schema.table('users', (table) => {
      table.integer('image_id').references('id').inTable('images').onUpdate('CASCADE').onDelete('CASCADE').nullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
