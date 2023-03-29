import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Contact from "../contacts/contact";

@Entity("clients")
class Client {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ length: 127 })
    full_name: string

    @Column({ length: 127 })
    email: string

    @Column({ length: 12 })
    phone_number: string

    @CreateDateColumn({ type: "date" })
    createdAt: Date

    @OneToMany(() => Contact, (contacts) => contacts.client)
    contacts: Contact[]
}

export default Client