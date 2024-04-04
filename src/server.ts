import fastify from "fastify";
import {jsonSchemaTransform, serializerCompiler, validatorCompiler} from "fastify-type-provider-zod";
import {createEvent} from "./routes/create-event";
import {registerForEvent} from "./routes/register-for-event";
import {getEvent} from "./routes/get-event";
import {getAttendeeBadge} from "./routes/get-attendee-badge";
import {checkIn} from "./routes/check-in";
import {getAttendeesEvent} from "./routes/get-attendees-event";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";


const app = fastify()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(fastifySwagger, {
  swagger: {
    consumes: ['application/json'],
    produces: ['application/json'],
    info: {
      title: 'pass.in',
      description: 'Docs PassIn',
      version: '1.0.0'
    }
  },
  transform: jsonSchemaTransform
})

app.register(fastifySwaggerUi, {
  routePrefix: '/docs'
})

app.register(createEvent)
app.register(registerForEvent)
app.register(getEvent)
app.register(getAttendeeBadge)
app.register(checkIn)
app.register(getAttendeesEvent)

app.listen({port: 3333}).then(() => {
  console.log('HTTP Server Running')
})