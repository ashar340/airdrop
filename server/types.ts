const daggy = require('daggy')
import { IncomingMessage } from 'http';
import { Stream } from 'stream';
const $ = require ('sanctuary-def');
//    env :: Array Type
const env = $.env.concat ([List ($.Unknown)]);
//    def :: String -> StrMap (Array TypeClass) -> Array Type -> Function -> Function
const def = $.create ({checkTypes: true, env});
//    add :: Number -> Number -> Number
const add =
def ('add')                           // name
    ({})                              // type-class constraints
    ([$.Number, $.Number, $.Number])  // input and output types
    (x => y => x + y);                // implementation

type UserAgentOS = {
    name: string,
    version: string,
}

type DeviceInfo = {
    model: Maybe string,
    os: Maybe string,
    browser: Maybe string,
    type: Maybe string,
    deviceName: Maybe string,
    displayName: Maybe string
}

type BrowserUA = {
    name: string,
    version: string,
    major: string,
}

const browserUA = daggy.tagged('browserUA', ['name', 'version', 'major']);

const deviceInfo = daggy.tagged('deviceInfo', ['model', 'os', 'browser', 'type', 'deviceName', 'displayName']);

const userAgentOS = daggy.tagged('userAgentOS', ['name', 'version'])
const ParsedUserAgent = daggy.tagged('parsedUserAgent', ['ua', 'browser', 'engine', 'os', 'device', 'cpu']);

export type PeerId = string;
export type PeerIp = string;
export type RtcCapable = boolean;
export type PeerName = string;
export type Uuid = string;


export type Peer = {
    id: PeerId,
    ip: PeerIp,
    name: PeerName,
    rtcCapable: RtcCapable,
    uuid: Uuid
}

export type PeerInfo = 
    Pick<Peer, "id" | "name" | "rtcCapable">;


export type Socket = WebSocket;
export type TimerId = number;
export type LastBeat = number;

export type PeerState = {
    stream: Stream,
    timerId: TimerId,
    lastBeat: LastBeat,
}

export type PeerDeviceInfo = {
    model: string,
    os: string,
    browser: string,
    type: string,
    deviceName: string,
    displayName: string,
}

export type PeerUtil = {
    state: PeerState,
    operations: {
        getPeerId: () => PeerId,
        getPeerName: () => PeerDeviceInfo,
        getIp: () => PeerIp,
        isRtcCapable: () => RtcCapable,
        getuuid: () => Uuid,
    }
}
// <Socket<PeerUtil>>[] compose this
const ComposeFunctor = (F,G) => {
const Functor = fg => ({
    map: (f) => fg.map(g => g.map(f)),
   extract: () => fg,
})

return Functor;
}

export type PeerUtilsGenerator = 
    (stream: Stream, request: IncomingMessage) => PeerUtil;
