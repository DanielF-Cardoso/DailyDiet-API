// eslint-disable-next-line
import { Knex } from 'knex'

declare module 'knex/types/tables' {
  export interface Tables {
    users: {
      id: string
      name: string
      email: string
      session_id: string
      created_at: string
    }
    meals: {
      id: string
      user_id: string
      name: string
      description: string
      in_diet: boolean
      date: number
      created_at: string
    }
  }
}