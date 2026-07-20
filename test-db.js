const { PrismaClient } = require("@prisma/client");

async function test(url) {
  console.log(`Connecting to ${url}...`);
  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: url
      }
    }
  });
  try {
    const userCount = await prisma.user.count();
    console.log(`Connection to ${url} successful! User count:`, userCount);
    return true;
  } catch (error) {
    console.error(`Connection to ${url} failed:`, error.message);
    return false;
  } finally {
    await prisma.$disconnect();
  }
}

async function main() {
  const localUrl = "mongodb://localhost:27017/policylens";
  const localIpUrl = "mongodb://127.0.0.1:27017/policylens";
  const envUrl = process.env.DATABASE_URL;

  let success = await test(localUrl);
  if (!success) {
    success = await test(localIpUrl);
  }
  if (!success && envUrl) {
    success = await test(envUrl);
  }
}

main();
