import { PrismaClient } from "@prisma/client";
import dns from "dns";
import { promisify } from "util";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const dnsResolveSrv = promisify(dns.resolveSrv);

function isLikelyAtlas(url?: string) {
  return !!url && url.includes("mongodb+srv://");
}

async function validateDatabaseUrl(url?: string) {
  if (!url) {
    throw new Error(
      "DATABASE_URL is not set. Please set DATABASE_URL in your .env (e.g. MongoDB Atlas or local Mongo)."
    );
  }

  if (isLikelyAtlas(url)) {
    // Parse cluster host from the SRV URL and do a quick DNS SRV check
    const m = url.match(/@([\w.-]+)\//);
    const host = m ? m[1] : null;
    if (host) {
      try {
        await dnsResolveSrv(`_mongodb._tcp.${host}`);
      } catch (err) {
        throw new Error(
          `Unable to resolve MongoDB SRV records for host '${host}'. Please verify your DATABASE_URL (replace '<cluster-host>' with your Atlas cluster host, e.g. 'cluster0.mongodb.net'), or use a local MongoDB URL like 'mongodb://127.0.0.1:27017/yourdb'.`,
        );
      }
    }
  }
}

await validateDatabaseUrl(process.env.DATABASE_URL).catch((err) => {
  // Re-throw with a clearer message so it surfaces at startup
  console.error("Prisma datasource validation failed:", err.message);
  throw err;
});

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
