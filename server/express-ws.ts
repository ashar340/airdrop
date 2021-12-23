import { dissoc } from "ramda";
import { IO } from "monio";
import {
  BehaviorSubject,
  filter,
  map,
  pairwise,
  takeWhile,
  tap,
} from "rxjs";
import { Stream } from "stream";
import { PeerUtil } from "./types";
import { PeerUtils } from "./util";
const expressWebSocket = require("express-ws");
const websocketStream = require("websocket-stream/stream");
const express = require("express");
const app = express();
const Readable = require("stream").Readable;

expressWebSocket(app, null, {
  perMessageDeflate: false,
});

const Fn = (run: Function) => ({
  run,
  chain: (f: Function) => Fn((x) => f(run(x)).run(x)),
  map: (f: Function) => Fn((x) => f(run(x))),
  concat: (o) => Fn((x) => run(x).concat(o.run(x))),
});

const sendOverStream = (stream: Stream, payload: { type: string; data: any }) =>
  IO(() => Readable.from(JSON.stringify(payload)).pipe(stream));

const state: BehaviorSubject<PeerUtil[] | []> = new BehaviorSubject([]);
const areElemsEqual = (x: any[]) =>
  x
    .reduce((memo, el, _, ary) => memo.concat(ary.map((ell) => [el, ell])), [])
    .map(([a, b]) => a === b)
    .every((el) => el);

const stateAppend$ = state.pipe(
  pairwise(),
  map(([prev, curr]) => [...prev, ...curr]),
);

const sendMessage$ = stateAppend$.pipe(
  filter((x) => x.length > 1),
  takeWhile((x: PeerUtil[]) =>
    areElemsEqual(x.map((el) => el.operations.getIp()))
  ),
  // [IO, IO] -> IO
  map((xs) => {
    return xs.map((p) =>
      sendOverStream(p.state.stream, {
        type: "peer-list",
        data: dissoc("stream", p.state),
      })
    );
  })
);

sendMessage$.subscribe((streamRunners) => {
  streamRunners.forEach((streamRunner) => streamRunner.run());
});

app.ws("/join-room", function (ws: WebSocket, req) {
  const stream: Stream = websocketStream(ws, {
    binary: true,
    perMessageDeflate: false,
  });
  const Peer = PeerUtils(stream, req);
  state.next([Peer]);
});

app.listen(3000);
