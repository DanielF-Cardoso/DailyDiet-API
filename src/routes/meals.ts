import { FastifyInstance } from 'fastify'
import { randomUUID } from 'node:crypto'
import { z } from 'zod'
import { knex } from '../database/connection'
import { checkSessionIdExists } from '../middlewars/check-session-id-exist'

export async function mealsRoutes(app: FastifyInstance) {
  app.post(
    '/',
    { preHandler: [checkSessionIdExists] },
    async (request, reply) => {
      const createMealsBodySchama = z.object({
        name: z.string(),
        description: z.string(),
        inDiet: z.boolean(),
        date: z.coerce.date(),
      })

      const { name, description, inDiet, date } = createMealsBodySchama.parse(
        request.body,
      )

      await knex('meals').insert({
        id: randomUUID(),
        name,
        description,
        in_diet: inDiet,
        date: date.getTime(),
        user_id: request.user?.id,
      })
      return reply.status(201).send
    },
  )
}
