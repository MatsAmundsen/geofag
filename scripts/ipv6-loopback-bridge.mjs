/**
 * Accept IPv6 loopback on the dev port and hand the bytes to Vite on 127.0.0.1.
 *
 * Vite is pinned to `0.0.0.0` (the live-preview contract). That socket is IPv4
 * only, so a browser that opens `localhost` talks to `::1` first and stops at
 * ECONNREFUSED before it tries 127.0.0.1. This listener is ipv6-only, so it can
 * share the port with that IPv4 socket.
 */
import net from "node:net";

export function startIpv6LoopbackBridge(port, { targetHost = "127.0.0.1" } = {}) {
  const server = net.createServer((client) => {
    const upstream = net.connect({ host: targetHost, port });
    const close = () => {
      client.destroy();
      upstream.destroy();
    };
    client.pipe(upstream);
    upstream.pipe(client);
    upstream.on("error", close);
    client.on("error", close);
  });
  return server;
}

function listen(server, port) {
  return new Promise((resolve, reject) => {
    const onError = (err) => {
      server.off("listening", onListening);
      reject(err);
    };
    const onListening = () => {
      server.off("error", onError);
      resolve();
    };
    server.once("error", onError);
    server.once("listening", onListening);
    server.listen({ port, host: "::", ipv6Only: true });
  });
}

if (process.argv[1]?.endsWith("ipv6-loopback-bridge.mjs")) {
  const port = Number(process.env.DEV_PORT || 8080);
  const server = startIpv6LoopbackBridge(port);
  listen(server, port)
    .then(() => {
      console.error(`[ipv6-bridge] [::]:${port} -> 127.0.0.1:${port}`);
    })
    .catch((err) => {
      if (err?.code === "EADDRINUSE") {
        console.error(`[ipv6-bridge] [::]:${port} already open`);
        process.exit(0);
      }
      console.error("[ipv6-bridge]", err);
      process.exit(1);
    });
}
