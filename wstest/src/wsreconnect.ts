import { LiteEngine } from "../../src/engines/engine";
import { LiteSingleEngine } from "../../src/engines/single";
import { LiteRoundRobinEngine } from "../../src/engines/roundRobin";
import { LiteClient } from "../../src/client";

// 127.0.0.1 localhost server
let server = {
  "id": {
      "key": "pedGc3v4TgpCYC4syuDDggW3lP6esfTMHNfZq3Q598I=",
      "@type": "pub.ed25519"
  },
  "port": 4443,
  "ip": 2130706433
}

async function main() {
  const engines: LiteEngine[] = [];
  for (let i = 0; i < 1; i++) {
      const pubkey = encodeURIComponent(server.id.key)
      engines.push(new LiteSingleEngine({
          host: `ws://localhost:8080/?ip=${server.ip}&port=${server.port}&pubkey=${pubkey}`,
          publicKey: Buffer.from(server.id.key, 'base64'),
          client: 'ws',
        }));
  }

  const engine: LiteEngine = new LiteRoundRobinEngine(engines);
  const client = new LiteClient({ engine });

  document.getElementById('counter')!.onclick = async () => console.log('Got Called masterchain info', await client.getMasterchainInfo())
  console.log('get master info')
  // debugger;
  const master = await client.getMasterchainInfo()
  console.log('master', master)
  
  console.log('start')
}
main()