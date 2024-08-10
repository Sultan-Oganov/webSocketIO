import React from "react";
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';

export const Body = ({ socket, messages, status }) => {
    const navigate = useNavigate();

    const handleLeave = () => {
        socket.emit('logout', { user: localStorage.getItem('user') });
        localStorage.removeItem('user');
        navigate('/');
    }

    return (
        <>
            <header className={styles.header}>
                <button className={styles.signOutBtn} onClick={handleLeave}>Sign out</button>
            </header>
            <div className={styles.container}>
                {messages?.map((el, i) => {
                    const isMe = el.user === localStorage.getItem('user');
                    return (
                        <div className={styles.chats} key={`${i}-${el.id}`}>
                            <p className={`${styles.userName} ${isMe ? styles.senderName : ''}`}>{isMe ? 'You' : el.user}</p>
                            <div className={`${isMe ? styles.messageBlock__sender : styles.messageBlock__recipient}`}>
                                <p className={styles.message}>{el.text}</p>
                            </div>
                        </div>
                    )
                })}

                {status && <div className={styles.status}>{status}...</div>}
            </div>
        </>
    );
};
