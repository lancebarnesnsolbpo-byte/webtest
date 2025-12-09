import { pgTable, text, varchar, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Property model for real estate listings
export const properties = pgTable("properties", {
  id: varchar("id").primaryKey(),
  title: text("title").notNull(),
  address: text("address").notNull(),
  city: text("city").notNull(),
  state: text("state").notNull(),
  zipCode: text("zip_code").notNull(),
  price: integer("price").notNull(),
  bedrooms: integer("bedrooms").notNull(),
  bathrooms: integer("bathrooms").notNull(),
  squareFeet: integer("square_feet").notNull(),
  imageUrl: text("image_url").notNull(),
  images: text("images").array(), // Additional property images
  description: text("description"),
  fullDescription: text("full_description"), // Detailed property description
  amenities: text("amenities").array(), // List of amenities
  yearBuilt: integer("year_built"),
  lotSize: text("lot_size"), // e.g., "0.25 acres"
  garage: integer("garage"), // Number of garage spaces
  latitude: text("latitude"), // For map integration
  longitude: text("longitude"), // For map integration
  isFeatured: boolean("is_featured").default(false),
  propertyType: text("property_type").notNull(), // house, condo, townhouse
  status: text("status").notNull(), // for-sale, pending, sold
});

export const insertPropertySchema = createInsertSchema(properties).omit({
  id: true,
});
export type InsertProperty = z.infer<typeof insertPropertySchema>;
export type Property = typeof properties.$inferSelect;

// Contact form submission model
export const contactSubmissions = pgTable("contact_submissions", {
  id: varchar("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  message: text("message").notNull(),
  submittedAt: text("submitted_at").notNull(),
});

export const insertContactSchema = createInsertSchema(contactSubmissions).omit({
  id: true,
  submittedAt: true,
});
export type InsertContact = z.infer<typeof insertContactSchema>;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;

// Testimonial model for client reviews
export const testimonials = pgTable("testimonials", {
  id: varchar("id").primaryKey(),
  clientName: text("client_name").notNull(),
  clientInitials: text("client_initials").notNull(),
  rating: integer("rating").notNull(),
  text: text("text").notNull(),
  location: text("location"),
});

export const insertTestimonialSchema = createInsertSchema(testimonials).omit({
  id: true,
});
export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
export type Testimonial = typeof testimonials.$inferSelect;

// Contact form validation schema with extended validation
export const contactFormSchema = insertContactSchema.extend({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});
export type ContactFormData = z.infer<typeof contactFormSchema>;
