import '@fastify/jwt'

declare module '@fastify/jwt' {
  interface FastifyJWT {
    payload: { user: any } // o que vai no payload
    user: { user: any } // o que estará disponível depois do verify
  }
}
