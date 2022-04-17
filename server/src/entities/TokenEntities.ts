import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn
  } from "typeorm";
import { Users } from "./UserEntities";
  
@Entity()
export class Token {
  @PrimaryGeneratedColumn("uuid")
  id_token: string;

  @Column({type: 'varchar'})
  id_users: string;

  @Column({type: 'varchar', length: 200})
  accessToken: string;

  @Column({type: 'varchar', length: 200})
  refreshToken: string;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  create_token: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  update_token: Date;

  @ManyToOne(() => Users, users => users.token)
  @JoinColumn({name: "id_users"}) 
  users: Users;
}