import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Posts extends BaseSchema {
  protected tableName = 'posts'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.text('content').notNullable()
      table.integer('image_id').references('id').inTable('images').onUpdate('CASCADE').onDelete('CASCADE').nullable()
      table.integer('user_id').references('id').inTable('users').onUpdate('CASCADE').onDelete('CASCADE').nullable()
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
