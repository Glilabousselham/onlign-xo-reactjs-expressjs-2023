import SocketClient from "../socket/SocketClient";

export default function useSocket() {
    const socket = SocketClient.getInstance()

    if (!socket.isConnected()) {
        socket.connect()
    }

    return socket;
}