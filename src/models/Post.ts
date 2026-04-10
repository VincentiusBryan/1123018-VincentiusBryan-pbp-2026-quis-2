import {
  Table, Column, Model, DataType, PrimaryKey, HasMany
} from 'sequelize-typescript';
import { Comment } from './Comment';

@Table({
  tableName: 'Posts',
  timestamps: true,
  paranoid: true
})
export class Post extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  username!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  content!: string;

  @HasMany(() => Comment)
  comments!: Comment[];
}