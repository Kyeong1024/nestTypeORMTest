import { Injectable } from '@nestjs/common';
import { InjectRepository, InjectConnection } from '@nestjs/typeorm';
import { DataSource, Repository, Connection } from 'typeorm';
import { createUserDto } from '../dto/create.user.dto';
import { User } from '../../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectConnection() private connection: Connection,
    private dataSource: DataSource,
  ) {}

  async createMany(users: User[]) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.save(users[0]);
      await queryRunner.manager.save(users[1]);

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async create(user: createUserDto) {
    // return await this.usersRepository.save(user);
    const sql = `
      INSERT INTO user 
      (email, password, name) 
      VALUES 
      (?, ?, ?)`;

    const result = await this.dataSource.manager.query(sql, [
      user.email,
      user.password,
      user.name,
    ]);
    console.log({ result });

    return result;
  }

  async findAll(): Promise<User[]> {
    // return await this.usersRepository.find();

    // const sql = `SELECT * FROM user`;
    // const param = {};
    // const [q, p] = this.connection.driver.escapeQueryWithParameters(
    //   sql,
    //   param,
    //   {},
    // );
    // const result = await this.connection.query(q, p);

    // return result;

    const sql = `SELECT * FROM user;`;
    const result = await this.dataSource.manager.query(sql);
    return result;
  }

  async findOne(id: number): Promise<User> {
    // return await this.usersRepository.findOneBy({ id });
    const sql = `SELECT * FROM user WHERE id=?;`;
    const result = await this.dataSource.manager.query(sql, [id]);
    return result;
  }

  async remove(id: number): Promise<void> {
    // await this.usersRepository.delete(id);
    const sql = `DELETE FROM user WHERE id=?;`;
    const result = await this.dataSource.manager.query(sql, [id]);
    return result;
  }

  async update(id: number, content): Promise<void> {
    // await this.usersRepository.update(id, { name: 'meta100' });
    const sql = `UPDATE user SET ? WHERE id=?;`;
    const result = await this.dataSource.manager.query(sql, [content, id]);

    return result;
  }

  async createGallery(galleryName, userId) {
    const sql = `INSERT INTO gallery (name, userId) VALUES (?, ?);`;
    const result = await this.dataSource.manager.query(sql, [
      galleryName,
      userId,
    ]);

    return result;
  }

  async subscribe(userId, galleryId) {
    const sql = `INSERT INTO gallery_subscribers_user (galleryId, userId) VALUES (?, ?);`;
    const result = await this.dataSource.manager.query(sql, [
      galleryId,
      userId,
    ]);

    return result;
  }

  async createArtWork(userId, info) {
    const sql = `INSERT INTO art_work (name, description, url, ownerId) VALUES (? , ? , ?, ?);`;
    const { name, description, artWorkUrl } = info;
    const result = await this.dataSource.manager.query(sql, [
      name,
      description,
      artWorkUrl,
      userId,
    ]);

    return result;
  }
}
