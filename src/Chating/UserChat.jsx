import { io } from "socket.io-client";
import { useEffect, useState } from "react";

const socket = io("http://localhost:4000");

export default function UserChat({ userId }) {
    const roomId = `user_${userId}`;
    const [msg, setMsg] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.emit("joinRoom", roomId);

        socket.on("receiveMessage", (data) => {
            setMessages((prev) => [...prev, data]);
        });
    }, []);

    const send = () => {
        socket.emit("sendMessage", {
            roomId,
            sender: "user",
            message: msg
        });
        setMsg("");
    };

    return (
        <div>
            <h3>User Support Chat</h3>

            {messages.map((m, i) => (
                <p key={i}><b>{m.sender}:</b> {m.message}</p>
            ))}

            <input value={msg} onChange={e => setMsg(e.target.value)} />
            <button onClick={send}>Send</button>
        </div>
    );
}
