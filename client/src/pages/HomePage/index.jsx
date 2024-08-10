import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from './styles.module.css';

export const HomePage = ({ socket }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState('');

  const handleChange = (event) => {
    setUser(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem('user', user);

    socket.emit('newUser', {
      user, socketID: socket.id
    });
    navigate('chat', { user })
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2 className={styles.title}>Sign in to chat</h2>
      <input id='userName' value={user} onChange={handleChange} className={styles.input}/>
      <button type='submit' className={styles.btn}>Sign in</button>
    </form>
  );
};
