import {FastifyInstance} from "fastify";
import {ZodTypeProvider} from "fastify-type-provider-zod";
import {z} from "zod";
import {prisma} from "../lib/prisma";
import {BadRequest} from "./errors/bad-request";

export async function checkIn(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>()
    .get('/attendee/:attendeeId/check-in', {
      schema: {
        params: z.object({
          attendeeId: z.coerce.number().int()
        }),
        response: {
          201: z.null()
        }
      }
    }, async (request, reply) => {
      const {attendeeId} = request.params

      const attendeeCheckIn = await prisma.checkIn.findUnique({
        where: {
          attendeeId
        }
      })

      if (attendeeCheckIn) {
        throw new BadRequest('Attendee already check in')
      }

      await prisma.checkIn.create({
        data: {attendeeId}
      })

      return reply.status(201).send()
    })
}