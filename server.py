#!/usr/bin/env python

import asyncio
import websockets


class BroadcastServer:

    def __init__(self):
        self.clients = []

    def run(self):
        start_server = websockets.serve(self.handler, '0.0.0.0', 8765)
        asyncio.get_event_loop().run_until_complete(start_server)
        asyncio.get_event_loop().run_forever()

    @asyncio.coroutine
    def handler(self, websocket, path):
        self.clients.append(websocket)
        while True:
            message = yield from websocket.recv()
            if message is None:
                self.clients.remove(websocket)
                break
            yield from self.broadcast(message)


    @asyncio.coroutine
    def broadcast(self, text):
        print("broadcast")
        for client in self.clients:
            print("|| {}".format(text))
            yield from client.send(text)

bs = BroadcastServer()
bs.run()
