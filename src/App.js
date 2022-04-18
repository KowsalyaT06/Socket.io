import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from './chat'

const socket = io.connect("http://localhost:3001");
function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [show, setShow] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room",room);
      setShow(true)
    }
  };
  return (
    <>
      <div className="App">
        {!show?(
        <div className="joinChatContainer">
        <h3>Chat</h3>
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        /><br></br>
        <input
          type="text"
          placeholder="Room ID"
          onChange={(e) => {
            setRoom(e.target.value);
          }}
        />
        <button onClick={joinRoom}>JOIN a Room</button>
        </div>
  )
        :(
        <Chat socket={socket} username={username} room={room}/>
        )}
      </div>
    </>
  );
}

export default App;
