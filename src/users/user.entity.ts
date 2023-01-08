import { Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm"
import { ProjectUser } from "../project-users/project-user.entity"

export enum Role {
  Employee = 'Employee',
  Admin = 'Admin',
  ProjectManager = 'ProjectManager',
}


@Entity()
export class User{
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({nullable: false, unique: true})
    username : string

    @Column({nullable: false, unique : true })
    email : string

    @Column({nullable: false})
    password : string;

    @Column({
        type: 'enum',
        enum: Role,
        default: Role.Employee
      })
    role : string;

    @OneToMany(() => ProjectUser, (projectuser: ProjectUser) => projectuser.user)
	  projectUser : ProjectUser[]

}

