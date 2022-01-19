import ReconnectingWebSocket from 'reconnecting-websocket';

/**
 * WebSocket 构造函数
 * 
 * @param {any} url 
 * @param {any} protocols 
 * @param {any} options 
 * @returns 
 */
const Socket = (url, protocols, options) => {
    return new ReconnectingWebSocket(url, protocols, options);
}

export default Socket;