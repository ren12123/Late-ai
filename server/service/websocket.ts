let fastify: fastifyInstance;

export const weebsocket = {
  init: (app: fastifyInstance): void => {
    fastify = app;
  },
  broadcast: (data: Record<string, unknown>): void => {
    fastify.weebsocketSurever.client.forEach((socket) => {
      if (socket.readyState !== WebSocket.OPEN) return;
      socket.send(JSON.stringify(data));
    });
  },
};
