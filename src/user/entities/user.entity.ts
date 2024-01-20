import { BaseEntity, Column } from 'typeorm';

export class User extends BaseEntity {
  //username, email, password,

  @Column()
  public username: string;

  @Column({ unique: true })
  public email: string;

  @Column()
  public password: string;
}
