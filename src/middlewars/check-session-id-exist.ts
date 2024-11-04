import { FastifyRequest, FastifyReply } from 'fastify'
import { knex } from '../database/connection'

export async function checkSessionIdExists(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const sessionID = request.cookies.sessionID

  if (!sessionID) {
    return reply.status(401).send({ error: 'Unauthorized acess.' })
  }

  const user = await knex('users').where({ session_id: sessionID }).first

  if (!user) {
    return reply.status(401).send({ error: 'Unauthorized acess.' })
  }
}
