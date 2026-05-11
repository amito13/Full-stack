import { uuid,pgTable, varchar, text, boolean,timestamp } from "drizzle-orm/pg-core";  

export const users = pgTable('users', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar('name', { length: 255 }).notNull(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    password: text('password').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
    
})