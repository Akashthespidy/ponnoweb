import { pgTable, serial, varchar, text, timestamp } from "drizzle-orm/pg-core";

export const accessUsers = pgTable("access_users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 256 }),
  businessName: varchar("business_name", { length: 256 }),
  businessCategory: varchar("business_category", { length: 256 }),
  businessDescription: text("business_description"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 256 }),
  message: text("message"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});
