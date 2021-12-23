const serverConnection = () => {

}

const connectServer = () => {
    const { host, pathname } = grabHostAndPathName();
    new WebSocket(getEndpoint(whatProtocol(), isRtcSupported(), host, pathname));

}

const setupHandlers = (ws: WebSocket) => {

}

const onMessageCb = (event: MessageEvent) => {
    
}


type Protocol = 'ws' | 'wss';
type WebRtcSupport = '/webrtc' | '/fallback';
type Host = string
type PathName = string;
type WebRtcServer = 'server'
type Endpoint =
  `${Protocol}://${Host}${PathName}${WebRtcServer}${WebRtcSupport}`;

const x: Endpoint = 'ws://localhost:8080/server/webrtc';

const getEndpoint = (
  protocol: Protocol,
  webRtc: WebRtcSupport,
  host: string,
  pathName: string
): Endpoint => 
    `${protocol}://${host}${pathName}server${webRtc}`;
;

const grabHostAndPathName = () => ({
    host: location.host,
    pathname: location.pathname
})

const whatProtocol = (): Protocol =>
  location.protocol.startsWith("https") ? "wss" : "ws";


const isRtcSupported = () => 
    window.isRtcSupported ? '/webrtc' : '/fallback';
