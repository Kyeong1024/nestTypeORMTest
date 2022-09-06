import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 30 })
  name: string;

  @Column('int')
  age: number;

  @Column()
  isActive: boolean;
}
