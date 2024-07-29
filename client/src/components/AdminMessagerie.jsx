import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../css/AdminMessagerie.css";
import { MdEmail, MdPerson, MdDateRange, MdSubject } from 'react-icons/md';

const AdminMessagerie = ({ updateUnreadCount }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/message/messages')
      .then(res => {
        setMessages(res.data.reverse()); // Reverse the messages array
      })
      .catch(err => {
        console.error('Error fetching messages:', err);
      });
  }, []);

  const handleMarkAsRead = (id) => {
    axios.patch(`http://localhost:3001/message/messages/${id}`, { read: true })
      .then(() => {
        // Update unread count by notifying the parent component
        updateUnreadCount(prevCount => prevCount - 1);
        // Optionally, you can also update the state of messages to mark the specific message as read
        setMessages(prevMessages =>
          prevMessages.map(message =>
            message._id === id ? { ...message, read: true } : message
          )
        );
      })
      .catch(err => {
        console.error('Error marking message as read:', err);
      });
  };

  return (
    <div className="hero">
      <div className="appc">
        <div className="work">
          <div>
            <h1 className='titre1'>Boîte de Réception</h1>
           <div className="cadre">
           <ul>
              {messages.map(message => (
                <li key={message._id} className="message-card">
                  <div className="profile-icon">
                    <MdPerson className='p-i' />
                  </div>
                  <div className="card-info">
                    <p><MdEmail className="icon" /> Adresse e-mail destinataire : {message.email}</p>
                    <p><MdPerson className="icon" /> IDentifiant de l'Utilisateur : {message.userID}</p>
                    <p><MdSubject className="icon" /> Objet du Message : {message.message}</p>
                    <p><MdDateRange className="icon" /> Date de Réception {message.createdAt}</p>
                    {/* Button to mark message as read */}
                    {!message.read && (
                      <button className="mark-as-read" onClick={() => handleMarkAsRead(message._id)}>
                        Marquer comme lu
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
           </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminMessagerie;
