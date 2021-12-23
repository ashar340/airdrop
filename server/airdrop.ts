import { WebSocket, WebSocketServer } from "ws";
import { createServer } from "websocket-stream";
const websocket = require("websocket-stream");
import { IncomingMessage, ServerResponse } from "http";
import {
  both,
  complement,
  cond,
  either,
  equals,
  hasPath,
  identity,
  ifElse,
  isNil,
  prop,
  propSatisfies,
  __,
} from "ramda";
import { compose, gt } from "sanctuary";
import { PeerUtils } from "./util";

const _ = require("ramda");

type IP = string;
type SnapdropServer = {
  websocketServer: WebSocketServer;
};

const S = require("sanctuary");
const R = require("ramda");

const $ = require("sanctuary-def");

// onconnecttion(peer) -> onMessage(peer) -> joinRoom(peer)
// rooms: {peerIp: {peerId: Peer}}
// peer: {socket:WebSocket}

const sendMessage = (
  wss: WebSocket,
  peer: { socket: WebSocket },
  message: any
) => {
  if (!peer) return;
  if (wss.readyState !== WebSocket.OPEN) return;
  message = JSON.stringify(message);
  peer.socket.send(message, (error) => "");
};

const joinRoom = (peer, room) => {};

type Peer_ = {
  id: string;
  ip: string;
  deviceInfo: DeviceInfo;
  socket: WebSocket;
  rtcCapable: boolean;
  timerId: number;
  lastBeat: Date;
};

const createPeer = (socket: WebSocket, request: IncomingMessage) => {};

// {

//   model: undefined,

//   os: 'Mac OS',

//   browser: 'Chrome',

//   type: undefined,

//   deviceName: 'Mac Chrome',

//   displayName: 'Red Sawfish'

// } {

//   ua: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.55 Safari/537.36',

//   browser: { name: 'Chrome', version: '96.0.4664.55', major: '96' },

//   engine: { name: 'Blink', version: '96.0.4664.55' },

//   os: { name: 'Mac OS', version: '10.15.7' },

//   device: { vendor: undefined, model: undefined, type: undefined },

//   cpu: { architecture: undefined }

// }

const getUserAgent_ = S.get(S.is($.String))("user-agent");

const replaceMacOSDeviceName = R.replace("Mac OS", "Mac ");

const getDeviceName = () => {};

const getUserAgent = (incomingMessage: IncomingMessage) =>
  S.compose(parser)(getUserAgent_)(incomingMessage.headers);

const getDeviceInfo = (incomingMessage: IncomingMessage) => {};



// What is a Peer?

// Peer needs a request to set Ip, rtcCapable it.

const Server = {
  state: {
    rooms: {},
  },

  events: {
    /*   Emitted when the handshake is complete. 
  request is the http GET request sent by the client. 
  For parsing authority headers, cookie headers, and other information. */
    onConnection: (peer) => ({
      sendMsg: {},
      receiveMsg: {},

      fireEvents: {},
      receiveEvents: {},

      effectsSeq: [
        (capturePeerEffect) => {
          capturePeerEffect();
        },
        (joinRoomEffect) => {},
      ],
      effects: {
        joinRoomEffect: (peer, rooms) => {
          // Make a lens
          const xHeadYLens = R.lensPath([""]);
          R.view(xHeadYLens, {
            x: [
              { y: 2, z: 3 },
              { y: 4, z: 5 },
            ],
          });
          //=> 2

          const peerHasRoom = compose(prop(__, rooms), prop("ip"));

          if (complement(peerHasRoom(peer))) {
            return rooms;
          }

          const peerRooms = proprooms;
        },
        capturePeerEffect: (request) => {},
      },
    }),

    onHeaders: (headers, response, peeruuidfn) => {
      const mutatePeerIdResponse = (headers, response, peeruuidfn) => {
        const mutateResponse = (peeruuidFn, headers, response) => {
          const mutateHeaders = (headers, response) => {
            headers.push(
              "Set-Cookie: peerid=" +
                response.peerId +
                "; SameSite=Strict; Secure"
            );
          };

          response.peerid = peeruuidFn(response);
          mutateHeaders(headers, response);
        };

        const getPeerIdindex = (req) => req.url.indexOf("peerid=");
        const hasPeerIdCookie_ = (response) => gt(-1, getPeerIdindex(response));

        if (
          complement(
            both(hasPath(["headers", "cookie"]), hasPeerIdCookie_(response))
          )
        ) {
          mutateResponse(peeruuidfn, headers, response);
        }
      };

      mutatePeerIdResponse(headers, response, peeruuidfn);
    },
  },

  effects: {
    initialazieState: () => {
      const { Map } = require("immutable");
      const rooms = Map();
    },
  },

  effectsSeq: [effects.initialazieState],
};

const soketEvents = {
  onMessage: (msg, peer) => {
    const parsedMessage = JSON.parse(msg);
    const messageTypeCond = cond([
      [
        equals("disconnect"),
        () => {
          // leave room
        },
      ],
    ]);
  },
};

// =====================================
const PeersUI = () => {};
// WebsocketServer has a client connection as below:
const clientEvents = () => {};

//Airdop UI (HTML, CSS, JS):

//UI Events
const uiEvents = {
  //*   Emitted when the handshake is complete.
  receiveMsgs: {
    peerJoined: (isPeerPresent, eventDetail) => {
      const $$ = (query) => document.body.querySelector(query);
      if ($(peer.id)) return; // peer already exists
      const peerUI = new PeerUI(peer);
      $$("x-peers").appendChild(peerUI.$el);
      setTimeout((e) => window.animateBackground(false), 1750); // Stop animation
    },
  },

  // query types
  types: {
    isPeerPresent: (peer) => {
      const $ = (query) => document.getElementById(query);
      return $(peer.id);
    },
  },
};

const serverMessages = {};

const clientMessages = {};

const serverState = [{}];

const SnapDrop_Server = () => {
  const stream = websocket("localhost:8080");

  

  stream.socket.on("connection", (socket: WebSocket, incomingMsg) => {
    const utils = PeerUtils(socket, incomingMsg);
    
    const room = {
      "ip": {
        "peerId": {} // Peer,
      },
    };



    

  });

  stream.socket.on("headers", (headers, response) => {});
};
