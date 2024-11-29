import { Client, cacheExchange, fetchExchange } from "@urql/core";

const clients = new Map<string, Client>();

export const getClient = (endpoint: string) => {
  let client = clients.get(endpoint);

  if (!client) {
    client = new Client({
      url: endpoint,
      exchanges: [cacheExchange, fetchExchange],
    });
    clients.set(endpoint, client);
  }
  return client;
};
