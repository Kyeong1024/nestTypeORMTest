import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ArtWork } from './artwork.entity';
import { Gallery } from './gallery.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar', { length: 30 })
  name: string;

  @Column('varchar', { unique: true })
  email: string;

  @Column('varchar', { length: 30 })
  password: string;

  @OneToMany((type) => Gallery, (gallery) => gallery.user, { cascade: true })
  galleries: Gallery[];

  @OneToMany((type) => ArtWork, (artwork) => artwork.owner, { cascade: true })
  artworks: ArtWork[];
}
