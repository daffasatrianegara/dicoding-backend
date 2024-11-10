const Hapi = require("@hapi/hapi");
const booksRoutes = require("./routes/books.routes");
require("dotenv").config();

const port = Number(process.env.PORT) || 9000;
const host = String(process.env.HOST) || "localhost";

const init = async () => {
  const server = Hapi.server({
    port,
    host,
    routes: {
      cors: {
        origin: ["*"],
      },
    },
  });

  server.route(booksRoutes);
  await server.start();

  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
