import { config } from 'dotenv'
import { z } from 'zod'

config()

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']).default('production'),
  DATABASE_CLIENT: z.string(),
  DATABASE_URL: z.string(),
  PORT: z.coerce.number().default(3333),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('Invalid enviroment variables!', _env.error.format())

  throw new Error('Invalid enviroment variables!')
}
export const env = _env.data
