import {
  Table, Column, Model, DataType, PrimaryKey, ForeignKey, BelongsTo
} from 'sequelize-typescript';
import { Post } from './Post';

@Table({
  tableName: 'Comments',
  timestamps: true,
  paranoid: true
})
export class Comment extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
  })
  declare id: string;

  @ForeignKey(() => Post)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  postId!: string;

  @BelongsTo(() => Post)
  post!: Post;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  userName!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  content!: string;
}