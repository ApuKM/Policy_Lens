import { defineConfig } from "prisma/config";

/**
 * Prisma v7 configuration file.
 * Connection URLs and adapter configuration live here instead of schema.prisma.
 * Docs: https://pris.ly/d/config-datasource
 */
export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: process.env.DATABASE_URL!,
  },
});
