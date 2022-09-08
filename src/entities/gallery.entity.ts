import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ArtWork } from './artwork.entity';
import { User } from './user.entity';

@Entity()
export class Gallery {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar', { length: 30 })
  name: string;

  @ManyToOne((type) => User, (user) => user.galleries, { onDelete: 'CASCADE' })
  user: User;

  @ManyToMany(() => User, { cascade: true })
  @JoinTable()
  subscribers: User[];

  @ManyToMany(() => ArtWork, { cascade: true })
  @JoinTable()
  artworks: ArtWork[];
}
