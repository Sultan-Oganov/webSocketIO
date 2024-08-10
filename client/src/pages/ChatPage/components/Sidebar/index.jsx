import React, { useState, useEffect } from "react";
import styles from './styles.module.css';

export const Sidebar = ({ socket }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.on('responseNewUser', (data) => {
      setUsers(data);
    });
  }, [socket, users]);

  const filteredList = users.filter((value, i, arr) =>
  (i === arr.findIndex(t => (
    t.user === value.user && t.socketID === value.socketID
  )))
  );

  return (
    <div className={styles.wrapper}>
      <h4 className={styles.title}>Users</h4>
      <ul className={styles.list}>
        {filteredList?.map(({ user, socketID }, i) => (
          <li key={`${i}-${user}-${socketID}`} className={styles.item}>{user}</li>
        ))}
      </ul>
    </div>
  );
};
