

const { SerialPort } = require("serialport");
const { ReadlineParser } = require("@serialport/parser-readline");
const WebSocket = require("ws");
const http = require("http");
const fs = require("fs");
const path = require("path");

// Setup HTTP server to serve index.html
const server = http.createServer((req, res) => {
  if (req.url === "/") {
    fs.readFile(path.join(__dirname, "index.html"), (err, data) => {
      if (err) return res.end("Error loading file");
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    });
  }
});

// Setup WebSocket server
const wss = new WebSocket.Server({ server });

// Setup SerialPort
const port = new SerialPort({ path: "COM9", baudRate: 115200 });
const parser = port.pipe(new ReadlineParser({ delimiter: "\r\n" }));

// Broadcast sensor data to all connected clients
parser.on("data", (data) => {
  console.log("From Arduino:", data);
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
