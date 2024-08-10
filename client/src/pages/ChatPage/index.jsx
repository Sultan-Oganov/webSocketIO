import React, { useState, useEffect } from "react";
import { Sidebar } from "./components/Sidebar";
import { Body } from "./components/Body";
import { MessageBlock } from "./components/MessageBlock";
import styles from './styles.module.css';

export const ChatPage = ({ socket }) => {
  const [messages, setMessages] = useState([]);
  const [status, setStatus] = useState('');

  useEffect(() => {
    socket.on('response', (data) => {
      setMessages([...messages, data]);
    });
  }, [socket, messages]);

  useEffect(() => {
    socket.on('responseTyping', (data) => {
      setStatus(data);
      setTimeout(() => {
        setStatus('');
      }, 2000);
    });
  }, [socket]);

  return (
    <div className={styles.wrapper}>
      <Sidebar socket={socket} />
      <main className={styles.main}>
        <Body socket={socket} messages={messages} status={status} />
        <MessageBlock socket={socket} />
      </main>
    </div>
  );
};
