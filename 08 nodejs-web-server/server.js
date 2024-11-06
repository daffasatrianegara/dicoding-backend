const http = require("http");
const port = Number(3000);
const host = String("localhost");

const requestListener = (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.statusCode = 200;

  const { method, url } = req;
  let text;

  if (url == "/") {
    switch (method) {
      case "GET":
        text = `<h1>Hallo HTTP Server! method: ${method}</h1>`;
        res.end(text);
        break;
      case "POST":
        let body = [];

        req.on("data", (chunk) => {
          body.push(chunk);
        });

        req.on("end", () => {
          body = Buffer.concat(body).toString();
          const { name } = JSON.parse(body);
          text = `<h1>Hai, ${name}!</h1>`;
          res.end(text);
        });
        break;
      case "PUT":
        text = `<h1>Data berhasil diperbarui dengan method: ${method}</h1>`;
        res.end(text);
        break;
      case "DELETE":
        text = `<h1>Data berhasil dihapus dengan method: ${method}</h1>`;
        res.end(text);
        break;
      default:
        text = `<h1>Method tidak dikenali</h1>`;
        res.statusCode = 405;
        res.end(text);
        break;
    }
  } else {
    res.end("<h1>URL tidak diketahui</h1>")
  }
};

const server = http.createServer(requestListener);

server.listen(port, host, () => {
  console.log(`Server berjalan pada http://${host}:${port}`);
});
