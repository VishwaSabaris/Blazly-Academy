import { defineConfig } from '@prisma/config'
import fs from 'fs'
import path from 'path'

// Manually parse .env.local to ensure Prisma 7 CLI can read the URL before boot
let databaseUrl = 'postgresql://localhost:5432/postgres'
try {
  const envContent = fs.readFileSync(path.resolve(process.cwd(), '.env.local'), 'utf8')
  const match = envContent.match(/DATABASE_URL="([^"]+)"/)
  if (match && match[1]) {
    databaseUrl = match[1]
  }
} catch (e) {
  console.log("Could not load .env.local manually")
}

export default defineConfig({
  earlyAccess: true,
  studio: {
    port: 5555,
  },
  datasource: {
    url: databaseUrl,
  },
})
