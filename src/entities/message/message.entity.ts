import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    JoinColumn,
    UpdateDateColumn,
} from 'typeorm'

import { User } from '../user'

@Entity({ name: 'Messages' })
export class Message {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @OneToOne(() => User, {
        eager: true,
        cascade: true,
    })
    @JoinColumn({ name: 'sender_id' })
    sender_id: User

    @OneToOne(() => User, {
        eager: true,
        cascade: true,
    })
    @JoinColumn({ name: 'recipient_id' })
    recipient_id: User

    @Column()
    message: string

    @UpdateDateColumn({
        name: 'created_time',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
    })
    created_time: Date
}
