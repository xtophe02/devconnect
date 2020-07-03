const { ApolloServer } = require("apollo-server");
const { ApolloGateway, RemoteGraphQLDataSource } = require("@apollo/gateway");
const FileUploadDataSource = require("@profusion/apollo-federation-upload");
const FormData = require("form-data");
const { fetch, Request } = require("apollo-server-env");
const { isObject } = require("@apollo/gateway/dist/utilities/predicates");
const processFileUpload = require("./fileUpload");

class AuthenticatedDataSource extends RemoteGraphQLDataSource {
  didReceiveResponse({ request, response, context }) {
    const cookie = response.http.headers.get("set-cookie");
    if (cookie) {
      if (context && context.res) {
        // console.log(Object.keys(context.res));
        context.res.cookie(cookie);
      }
    }
    return response;
  }
  async willSendRequest({ request, context }) {
    if (context && context.req) {
      request.http.headers.set("token", context.req.headers.cookie);
    }
    if (request.variables) {
      // const test = new processFileUpload(request, context);
      // console.log(test.variables);
      // context.variables = test.variables;

      const form = new FormData();
      const variables = request.variables;
      const fileVariables = Object.entries(variables || {}).filter(
        ([, value]) => value instanceof Promise
      );
      for (const [variableName] of fileVariables) {
        variables[variableName] = null;
      }
      const operations = JSON.stringify({
        query: request.query,
        variables,
      });
      form.append("operations", operations);
      const resolvedFiles = await Promise.all(
        fileVariables.map(async ([variableName, file]) => {
          const contents = await file;
          return [variableName, contents];
        })
      );
      const fileMap = resolvedFiles.reduce(
        (map, [variableName], i) => ({
          ...map,
          [i]: [`variables.${variableName}`],
        }),
        {}
      );
      form.append("map", JSON.stringify(fileMap));

      await Promise.all(
        resolvedFiles.map(async ([, contents], i) => {
          const { filename, mimetype, createReadStream } = contents;
          const stream = await createReadStream();
          form.append(i, stream, { filename, contentType: mimetype });
        })
      );
      const headers = (request.http && request.http.headers) || {};

      request.http = {
        method: "POST",
        url: this.url,
        headers,
        headers: { ...headers, ...form.getHeaders() },
      };

      const options = {
        ...request.http,
        body: form,
      };

      const httpRequest = new Request(request.http.url, options);
      try {
        const httpResponse = await fetch(httpRequest);
        console.log(this.didReceiveResponse);
        let body = await this.didReceiveResponse(httpResponse);

        if (!isObject(body)) {
          throw new Error(`Expected JSON response body, but received: ${body}`);
        }

        const response = {
          ...body,
          http: httpResponse,
        };
        console.log(response);
        return response;
      } catch (error) {
        console.log(error);
        this.didEncounterError(error, httpRequest);
        throw error;
      }
    }
    // return new processFileUpload(request, context);

    return context;
  }
}

const gateway = new ApolloGateway({
  serviceList: [{ name: "auth", url: process.env.AUTH_URL }],
  buildService({ url }) {
    return new AuthenticatedDataSource({ url });
  },
});

const start = async () => {
  if (!process.env.AUTH_URL) {
    throw new Error("AUTH_URL needs to be defined");
  }
  const { schema, executor } = await gateway.load();

  const server = new ApolloServer({
    schema,
    executor,
    context: ({ req, res }) => {
      return { req, res };
    },
    subscriptions: false,
  });

  server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
};

// setTimeout(() => start(), 10000);
start();
