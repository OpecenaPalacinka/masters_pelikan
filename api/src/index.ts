import { ApolloServer, BaseContext } from "@apollo/server";
import express from "express";
import cors from "cors";
import * as http from "http";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import rootResolver from "./graphql/rootResolver";
import schemaDefinition from "./graphql/rootTypeDefs";
import { expressMiddleware } from "@apollo/server/express4";
import { CustomContext } from "./types/types";
import { StandaloneServerContextFunctionArgument } from "@apollo/server/standalone";
import { getClient } from "./libs/dbConnection";
import dotenv from "dotenv";

dotenv.config();

const init = async () => {
  // const url = "postgresql://root:root@localhost:5456/diplomka?schema=public"

  const app = express();
  const httpServer = http.createServer(app);
  const port = process.env.PORT || 4000;

  const customContext = async ({
    req,
  }: StandaloneServerContextFunctionArgument): Promise<CustomContext> => {
    const auth = req.headers.Authorization || "";

    return {
      dbConnection: await getClient(),
      auth,
    };
  };
  const server = new ApolloServer<BaseContext>({
    typeDefs: schemaDefinition,
    resolvers: rootResolver,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  app.use(
    "/graphql",
    cors<cors.CorsRequest>(),
    express.json(),

    expressMiddleware(server, {
      context: customContext,
    }),
  );

  // Modified server startup
  httpServer.listen({ port: port }, () => {
    console.log(`🚀 Apollo Server ready at http://localhost:${port}/graphql`);
  });
};

init();
