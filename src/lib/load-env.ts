import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { config } from 'dotenv'

const envLocalPath = resolve(process.cwd(), '.env.local')
const envPath = resolve(process.cwd(), '.env')

if (existsSync(envLocalPath)) {
  config({ path: envLocalPath })
} else if (existsSync(envPath)) {
  config({ path: envPath })
}
