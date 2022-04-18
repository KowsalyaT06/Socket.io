import React, { useEffect, useState } from "react";
import ScrollToBottom from 'react-scroll-to-bottom'

const Chat = ({ socket, username, room }) => {
  const [currentMessage, setCurrentMessage] = useState([]);
  const [messageList, setMessageList] = useState([]);

  const handleSubmit = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList ([...messageList, messageData]);
       setCurrentMessage("")
    
    }
  };
 
  // useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log("receive",data)
      setMessageList( [...messageList,data]);
    });
  // }, [socket]);
  console.log('effect',messageList)
  return (
    <>
      <div className="chat-window">
        <div className="chat-header">
          <p>Chat</p>
        </div>
        <div className="chat-body">
          <ScrollToBottom className="message-container"> 
          {messageList.map((messageContent) => {
            return (
              <div className="message" id={username === messageContent.author ? "you" : "other"}>
                <div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                    <p id="author">{messageContent.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
          </ScrollToBottom>
        </div>
        <div className="chat-footer">
          <input
            type="text"
            value={currentMessage}
            placeholder="Write a message"
            onChange={(e) => {
              setCurrentMessage(e.target.value);
            }}
          
          />
          <button onClick={handleSubmit}>send</button>
        </div>
      </div>
    </>
  );
};
export default Chat;
