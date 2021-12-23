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
  gt,
  __,
} from "ramda";
import { PeerUtilsGenerator } from "./types";
const {
  uniqueNamesGenerator,
  animals,
  colors,
} = require("unique-names-generator");
const parser = require("ua-parser-js");

export const PeerUtils: PeerUtilsGenerator = (stream, request) => ({
  state: {
    stream,
    timerId: 0,
    lastBeat: Date.now(), // (MUTATION) gets set for keepalive
  },

  operations: {
    //taken an IncomingRequest we do the following operations:

    //IncomingRequest -> PeerId
    getPeerId: () => {
      const replacePeerIdCookie = (request) =>
        request.headers.cookie.replace("peerid=", "");

      const peerIdProp = "peerid";
      const isPropPresent = propSatisfies(complement(isNil));
      const isPeerIdPropPresent = isPropPresent(peerIdProp);

      // request -> peerId
      const getPeerId_ = ifElse(
        isPeerIdPropPresent,
        prop("peerid"),
        replacePeerIdCookie
      );

      return getPeerId_(request);
    },

    //IncomingRequest -> Ip
    getIp: () => {
      // ===================================================================
      //CODE TO RESUE:
      // const ip = [''];

      // const getIpFromForwardedForHeaders = (request) => {
      //   const xForwardedForHeaderProp = "x-forwarded-for";
      //    if(request.headers['x-forwarded-for'])
      //    return request.headers['x-forwarded-for'].split(/\s*,\s*/)[0]
      // }

      // const ipv6loopback = "::1";
      // const ipv4loopback = "::ffff:127.0.1"

      // const isIpv6orIpv4Loopback = either(_.equals(ipv6loopback), _.equals(ipv4loopback));

      // if(2){return 2}
      // else {
      //     const remoteAddressPathForRequest = ['connection', 'remoteAddress'];
      //     this.ip = request.connection.remoteAddress;
      //   }
      //   // IPv4 and IPv6 use different values to refer to localhost
      //   if (this.ip == "::1" || this.ip == "::ffff:127.0.0.1") {
      //     this.ip = "127.0.0.1";
      //   }
      // }

      // //if(isIpv6orIpv4Loopback(ip)) return "127.0.0.1";

      // ===================================================================

      let ip = "";

      if (request.headers["x-forwarded-for"]) {
        const headers__ = request.headers["x-forwarded-for"] as string;
        ip = headers__.split(/\s*,\s*/)[0];
      } else {
        ip = request.connection.remoteAddress;
      }
      // IPv4 and IPv6 use different values to refer to localhost
      if (ip == "::1" || ip == "::ffff:127.0.0.1") {
        ip = "127.0.0.1";
      }

      return ip;
    },

    // IncomingRequest -> Boolean
    isRtcCapable: () => {
      const getwebrtcindex = (req) => req.url.indexOf("webrtc");
      return gt(-1, getwebrtcindex(request));
    },

    // IncomingRequest -> String
    getPeerName: () => {
      let ua = parser(request.headers["user-agent"]);
      let deviceName = "";
      if (ua.os && ua.os.name) {
        deviceName = ua.os.name.replace("Mac OS", "Mac") + " ";
      }

      if (ua.device.model) {
        deviceName += ua.device.model;
      } else {
        deviceName += ua.browser.name;
      }

      if (!deviceName) {
        deviceName = "Unknown Device";
      }

      const displayName = uniqueNamesGenerator({
        length: 2,
        separator: " ",
        dictionaries: [colors, animals],
        style: "capital",
        getSeed: (peerId) => {
          const getHashcode = (str) => {
            var hash = 0,
              i,
              chr;
            for (i = 0; i < str.length; i++) {
              chr = str.charCodeAt(i);
              hash = (hash << 5) - hash + chr;
              hash |= 0; // Convert to 32bit integer
            }
            return hash;
          };
          return getHashcode(peerId);
        },
      });

      return {
        model: ua.device.model,
        os: ua.os.name,
        browser: ua.browser.name,
        type: ua.device.type,
        deviceName,
        displayName,
      };
    },

    // IncomingRequest -> String
    getuuid: () => {
      let uuid = "",
        ii;
      for (ii = 0; ii < 32; ii += 1) {
        switch (ii) {
          case 8:
          case 20:
            uuid += "-";
            uuid += ((Math.random() * 16) | 0).toString(16);
            break;
          case 12:
            uuid += "-";
            uuid += "4";
            break;
          case 16:
            uuid += "-";
            uuid += ((Math.random() * 4) | 8).toString(16);
            break;
          default:
            uuid += ((Math.random() * 16) | 0).toString(16);
        }
      }
      return uuid;
    },

    //query types
  },
});
