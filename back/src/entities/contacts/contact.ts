import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Client from "../clients/client.entity";

@Entity("contacts")
class Contact {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ length: 127 })
    full_name: string

    @Column({ length: 127 })
    email: string

    @Column({ length: 12 })
    phone_number: string

    @ManyToOne(() => Client, (client) => client.contacts, { onDelete: "CASCADE" })
    client: Client

    @CreateDateColumn({ type: "date" })
    createdAt: Date
}

export default Contact