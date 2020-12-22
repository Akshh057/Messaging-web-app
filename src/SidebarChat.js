import { Avatar, IconButton } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import './SidebarChat.css'
import db from './firebase'
import { Link } from 'react-router-dom';
// import Avatars from '@dicebear/avatars';
// // import sprites from '@dicebear/avatars-male-sprites';
function SidebarChat({ id, name, pass, addNewChat }) {
    const [seed, setSeed] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (id) {
            db.collection('rooms')
                .doc(id)
                .collection("messages")
                .orderBy('timestamp', 'desc')
                .onSnapshot((snapshot) =>
                    setMessages(snapshot.docs.map((doc) =>
                        doc.data()))
                );
        }
    }, [id]);

    useEffect
        (
            () => {
                setSeed(Math.floor(Math.random() * 5000));
            }, []
        );

    const createChat = () => {
        const roomName = prompt("please enter name for chat");
        const passkey = prompt("Please enter passcode for the" + roomName);
        if (roomName && passkey) {
            db.collection('rooms').add({
                name: roomName,
                pass: passkey,
            });

            // console.log(roomtype);
        }

        // else if (roomtype === 'public' || 'Public') {
        //     if (roomName) {
        //         db.collection('rooms').add({
        //             name: roomName,
        //             roomt: roomtype,
        //         });
        //     }
        // }
        // else {
        //     alert("Please enter public or private");
        // }
    };
    const check = (e) => {
        const userpass = prompt("Please Enter passcode to enter room");
        if (userpass === pass) {
            return true;
        }
        else {
            alert("you enterd wrong passcode");
            e.preventDefault();
        }
    }

    return !addNewChat ? (
        <Link to={`/rooms/${id}`} onClick={(e) => { check(e) }}>
            <div className="sidebarChat">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                <div className="sidebarChat__info">
                    <h2>{name}</h2>

                    <p> {messages[0]?.message} </p>
                </div>
            </div>
        </Link>
    ) : (
            <div onClick={createChat}
                className="sidebarChat ic">
                <h2>Add New Room
            </h2>

            </div>
        );
}
export default SidebarChat;
