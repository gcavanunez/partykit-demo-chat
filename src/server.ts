/// <reference no-default-lib="true"/>
/// <reference types="@cloudflare/workers-types" />

import type { PartyKitServer } from 'partykit/server';

export default {
    onConnect(ws, room) {
        console.log(room.env);

        console.log(process.env.WHATUP);

        console.log(SOME_GLOBAL);
        // your business logic here
        ws.addEventListener('message', (evt) => {
            if (evt.data === 'ping') {
                ws.send(`pong:${room.connections.size}`);
            } else if ((evt.data as string).startsWith('latency')) {
                ws.send(evt.data);
            }
        });
    },
    async onBeforeConnect(_req: Request) {
        return { x: 1 };
    },
    async onBeforeRequest(req: Request) {
        return new Request(req.url, {
            headers: {
                'x-foo': 'bar',
            },
        });
    },
    async onRequest(req: Request, room) {
        console.log(room.env);

        console.log(process.env.WHATUP);

        console.log(SOME_GLOBAL);
        return new Response(
            'Hello world:' + req.headers.get('x-foo') + ' ' + room.id
        );
    },
} satisfies PartyKitServer;
