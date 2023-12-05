import { createRequestHandler } from "@remix-run/express";
import { installGlobals } from "@remix-run/node";
import express from "express";

installGlobals();

const app = express();

// handle asset requests
app.use(
  "/build",
  express.static("public/build", { immutable: true, maxAge: "1y" })
);
app.use(express.static("public", { maxAge: "1h" }));

// handle SSR requests
app.all(
  "*",
  createRequestHandler({
    build: await import("./build/index.js")
  })
);

/**
 * @returns {Promise<import("http").Server>}
 */
export async function startServer(port) {
  let server;

  await new Promise(resolve => {
    server = app.listen(port, () => {
      console.log(`Server listening on ${port}`);
      resolve();
    });
  });

  return server;
}
