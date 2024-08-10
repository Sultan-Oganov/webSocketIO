import React, { useState } from "react";
import styles from './styles.module.css';

export const MessageBlock = ({ socket }) => {
  const [message, setMessage] = useState('');

  const handleChange = (event) => {
    setMessage(event.target.value);
  }

  const isTyping = () => {
    socket.emit('typing', `${localStorage.getItem('user')} is typing`);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if(message.trim() && localStorage.getItem('user')) {
      socket.emit('message', {
        text: message,
        user: localStorage.getItem('user'),
        id: `${socket.id}-${Math.random()}`,
        socketId: socket.id
      });
    }
    setMessage('');
  }

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input className={styles.input} onChange={handleChange} value={message} onKeyDown={isTyping}/>
        <button type='submit' className={styles.btn}>Send</button>
      </form>
    </div>
  );
};
