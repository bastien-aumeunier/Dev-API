import { Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm"
import { User } from "../users/user.entity"
import { Project } from "../projects/project.entity"

@Entity()
export class ProjectUser{
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    startDate: Date

    @Column()
    endDate: Date

    @Column()
    userId : string

    @Column()
    projectId : string


    @ManyToOne(() => User, (user: User) => user.projectUser)
    user: User

    @ManyToOne(() => Project, (project: Project) => project.projectUser)
    project: Project

}


