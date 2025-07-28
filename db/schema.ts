import { pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const waitlistUsers = pgTable("waitlist_users", {
  id: serial("id").primaryKey(),
  businessName: text("business_name"),
  businessCategory: text("business_category"),
  businessAddress: text("business_address"),
  firstName: text("first_name"),
  lastName: text("last_name"),
  email: text("email").notNull().unique(),
  phone: text("phone"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 256 }),
  message: text("message"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});
