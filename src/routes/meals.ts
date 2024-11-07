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
  ),

  app.put(
    '/:id', 
    { preHandler: [checkSessionIdExists] },
    async (request, reply) => {
      const paramsSchema = z.object({ id: z.string().uuid() })

      const { id } = paramsSchema.parse(request.params)

      const updateMealsBodySchema = z.object({
        name: z.string(),
        description: z.string(),
        inDiet: z.boolean(),
        date: z.coerce.date(),
      })

      const { name, description, inDiet, date } = updateMealsBodySchema.parse(
        request.body,
      )

      const meal = await knex('meals').where({ id: id }).first()

      if (!meal) {
        return reply.status(404).send({ message: 'The Meal was not found' })
      }

      await knex('meals').update({
        name,
        description,
        in_diet: inDiet,
        date: date.getTime(),
      }).where({ id, user_id: request.user?.id })

      return reply.status(204).send()
    },
  ),

  app.delete(
    '/:id', 
    { preHandler: [checkSessionIdExists] }, 
    async (request, reply) => {
      const paramsSchema = z.object({ id: z.string().uuid() })

      const { id } = paramsSchema.parse(request.params)

      const meal = await knex('meals').where({ id: id }).first()

      if (!meal) {
        return reply.status(404).send({ message: 'The Meal was not found' })
      }

      await knex('meals').delete().where({ id, user_id: request.user?.id })

      return reply.status(204).send()
    },
  ),

  app.get(
    '/',
    { preHandler: [checkSessionIdExists] }, 
    async (request, reply) => {
      const meals = await knex('meals').where({ user_id: request.user?.id })

      return reply.send({ meals })
    },      
  ),

  app.get(
    '/:id',
    { preHandler: [checkSessionIdExists] }, 
    async (request, reply) => {
      const paramsSchema = z.object({ id: z.string().uuid() })

      const { id } = paramsSchema.parse(request.params)

      const meal = await knex('meals').where({ id, user_id: request.user?.id }).first()

      if (!meal) {
          return reply.status(404).send({ message: 'The Meal was not found' })
      }

      return reply.send({ meal })
    },
  ),

  app.get(
    '/metrics',
    { preHandler: [checkSessionIdExists] },
    async (request, reply) => {
      const meals = await knex('meals')
      .where({ user_id: request.user?.id })
      .orderBy('date', 'desc')

      const totalMeals = meals.length
      const totalMealsOnDiet = meals.filter(meal => meal.in_diet).length
      const totalMealsOffDiet = totalMeals - totalMealsOnDiet

      let bestOnDietSequence = 0
      let currentSequence = 0
  
      meals.forEach(meal => {
        if (meal.in_diet) {
          currentSequence += 1
          bestOnDietSequence = Math.max(bestOnDietSequence, currentSequence)
        } else {
          currentSequence = 0
        }
      })

      return reply.send({ totalMeals, totalMealsOnDiet, totalMealsOffDiet, bestOnDietSequence })
    },
  )
}
