import { Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm"
import { ProjectUser } from "../project-users/project-user.entity"

@Entity()
export class Project{
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    name : string

    @Column()
    referringEmployeeId : string

    @OneToMany(() => ProjectUser, (puser: ProjectUser) => puser.project)
    projectUser : ProjectUser[]

}
