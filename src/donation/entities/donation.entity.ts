
import { User } from "src/user/entities/user.entity"
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity()
export class Donation {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    amount: number

    @Column()
    UserId: number

    @ManyToOne(() => User, (user) => user.Donation)
    @JoinColumn({ name: 'UserId' })
    User: User

    @CreateDateColumn()
    createdDate: Date

    @UpdateDateColumn()
    updatedDate: Date
}


