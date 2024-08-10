import socketIO from 'socket.io-client';
import { Routes, Route } from 'react-router-dom';
import { HomePage, ChatPage } from './pages/index';

const socket = socketIO.connect('http://localhost:5000');

function App() {

  return (
    <Routes>
      <Route path="/" element={<HomePage socket={socket} />} />
      <Route path="/chat" element={<ChatPage socket={socket} />} />
    </Routes>
  )
}

export default App
