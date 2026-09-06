import { pgTable, text, timestamp, integer, index, pgEnum } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { services } from "./services";

export const orderStatusEnum = pgEnum("order_status", [
  "pending",
  "paid",
  "verified",
  "rejected",
]);

export const orders = pgTable("orders", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  serviceId: integer("service_id").notNull().references(() => services.id),
  uniqueCode: integer("unique_code").notNull(),
  totalPrice: integer("total_price").notNull(),
  status: orderStatusEnum("status").default("pending").notNull(),

  buyerName: text("buyer_name").notNull(),
  buyerPhone: text("buyer_phone").notNull(),
  buyerEmail: text("buyer_email"),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  verifiedAt: timestamp("verified_at"),
}, (t) => ({
  serviceIdx: index("order_service_idx").on(t.serviceId),
  statusIdx: index("order_status_idx").on(t.status),
  createdAtIdx: index("order_created_at_idx").on(t.createdAt),
}));

export const ordersRelations = relations(orders, ({ one }) => ({
  service: one(services, {
    fields: [orders.serviceId],
    references: [services.id],
  }),
}));
