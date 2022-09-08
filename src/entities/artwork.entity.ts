import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class ArtWork {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar', { length: 30 })
  name: string;

  @Column('varchar', { length: 100 })
  description: string;

  @Column('text')
  url: string;

  @ManyToOne((type) => User, (user) => user.artworks, { onDelete: 'CASCADE' })
  owner: User;
}
