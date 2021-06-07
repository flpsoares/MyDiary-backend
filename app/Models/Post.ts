import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Image from './Image'

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public content: string

  @column()
  public userId: number

  @column()
  public imageId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User, {foreignKey: 'userId', localKey: 'id'})
  public user: BelongsTo<typeof User>

  @belongsTo(() => Image, {foreignKey: 'imageId', localKey: 'id'})
  public image: BelongsTo<typeof Image>
}
