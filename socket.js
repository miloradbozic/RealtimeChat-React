import EventEmmitter from 'events';

class Socket {

    constructor(ws = new WebSocket('ws://echo.websocket.org'), ee = new EventEmmitter()) {
        this.ws = ws;
        this.ee = ee;
        ws.onopen = this.open.bind(this);
        ws.onclose = this.close.bind(this);
        ws.onmessage = this.message.bind(this); 
    }

    on(name, handler) {
        this.ee.on(name, handler);
    }

    off(name, handler) {
        this.ee.removeListener(name, handler);
    }

    emit(name, data) {
        const message = JSON.stringify({name, data});
        this.ws.send(message);
    }

    message(e) {
        try {
            const message = JSON.parse(e.data);
            this.ee.emit(message.name, message.data);
        } catch(err) {
            this.ee.emit('error', err);  
        }        
    }

    open(e) {
        this.ee.emit('connect');  
    }

    close(e) {
        this.ee.emit('dissconect');  
    }
}

export default Socket;
