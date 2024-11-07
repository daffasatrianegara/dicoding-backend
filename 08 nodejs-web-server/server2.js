const http = require("http");
const port = Number(5000);
const host = String("localhost");

const requestHandler = (req, res) => {
  //   res.setHeader("Content-Type", "text/html"); // jika menggunakan ini maka browser akan render response menjadi bentuk html
  res.setHeader("Content-Type", "application/json"); // render dalam bentuk json
  res.setHeader("X-Powered-By", "NodeJS"); // memberi tahu client mesin apa yang digunakan
  res.statusCode = 200;

  const { method, url } = req;
  if (url === "/") {
    if (method === "GET") {
      res.statusCode = 200;
      res.end(
        JSON.stringify({
          message: "ini adalah halaman Home.",
        })
      );
    } else if (method === "POST") {
      let body;

      res.on("data", (chunk) => {
        body.push(chunk);
      });

      res.on("end", () => {
        body = Buffer.concat(body).toString();
        const { name, age } = JSON.parse(body);
        res.statusCode = 200;
        res.end(
          JSON.stringify({
            message: `Hallo ${name}, kamu memiliki umur ${age}.`,
          })
        );
      });
    } else {
      res.statusCode = 400;
      res.end(
        JSON.stringify({
          message: `method ${method} tidak diketahui.`,
        })
      );
    }
  } else if (url === "/about") {
    if (method === "GET") {
      res.statusCode = 200;
      res.end(
        JSON.stringify({
          message: "kami adalah perusahaan yang bergerak dibidang teknologi!",
        })
      );
    } else {
      res.statusCode = 400;
      res.end(
        JSON.stringify({
          message: `Method ${method} tidak diketahui`,
        })
      );
    }
  } else {
    res.statusCode = 404;
    res.end(
      JSON.stringify({
        message: "url tidak ditemukan...",
      })
    );
  }
};

const server = http.createServer(requestHandler);

server.listen(port, host, () => {
  console.log(`Server berjalan pada http://${host}:${port}`);
});
