import { Avatar, IconButton } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
// import MoreVertIcon from '@material-ui/icons/MoreVert';
import AttachFileIcon from '@material-ui/icons/AttachFile';
// import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
// import MicIcon from '@material-ui/icons/Mic';
import './chat.css'
import { Link, useParams } from 'react-router-dom';
import db from './firebase';
import { useStateValue } from './StateProvider';
import firebase from "firebase";
import SendIcon from '@material-ui/icons/Send';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Sidebar from './Sidebar';
function Chat() {
    const [input, setInput] = useState("");
    const [seed, setSeed] = useState('');
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([]);
    const [{ user }, dispatch] = useStateValue();
    useEffect(() => {
        if (roomId) {
            db.collection('rooms')
                .doc(roomId)
                .onSnapshot((snapshot) =>
                    setRoomName(snapshot.data().name));

            db.collection('rooms')
                .doc(roomId)
                .collection("messages")
                .orderBy('timestamp', 'asc')
                .onSnapshot((snapshot) =>
                    setMessages(snapshot.docs.map((doc) =>
                        doc.data()))
                );
        }
    }, [roomId]);

    useEffect
        (
            () => {
                setSeed(Math.floor(Math.random() * 5000));
            }, [roomId]
        );

    const sendMessage = (e) => {
        e.preventDefault();
        if (input.length < 18) {
            db.collection('rooms').doc(roomId).collection('messages').add({
                message: input,
                name: user.displayName,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                photo: user.photoURL,
            })
            setInput("");
        } else {
            alert("please enter shorter messages we are still in demo mode, Happy texting!!");
        }

    }
    // var d = new Date();
    // d.getHours();
    // d.getMinutes();
    // d.getSeconds();
    return (
        <div className="chat">
            <div className="chat__header">
                <Link to="/">
                    <IconButton>
                        <ArrowBackIosIcon />
                    </IconButton>
                </Link>
                <Avatar src={`https://avatars.dicebear.com/api/human/${Math.floor(Math.random() * 5000)}.svg`} />
                <div className="chat__headerInfo">
                    <h2>{roomName}</h2>
                    <p> Last seen at {new Date(messages[messages.length - 1]?.timestamp?.toDate()).toDateString()}</p>

                </div>
                {/* <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlinedIcon />
                    </IconButton>
                    <IconButton>
                        <AttachFileIcon />
                    </IconButton>

                </div> */}
            </div>
            <div className="chat__body">
                {messages.map((message) =>
                    <p className={`chat__message ${message.name === user.displayName && "chat__receiver"}`}>

                        <span className="chat__name">
                            {message.name}
                            <Avatar src={message.photo} className="dp" />
                        </span>
                        <p className="p1"> {message.message} </p>
                        <span className="chat__timestamp">
                            {new Date(message.timestamp?.toDate()).toLocaleTimeString()}
                        </span>
                    </p>
                )}

            </div>
            <div className="chat__footer">
                {/* <InsertEmoticonIcon /> */}
                <form>
                    <input value={input}
                        onChange={(e) => setInput(e.target.value)}
                        type="text" placeholder="Type a message" />
                    <button onClick={sendMessage} type="submit"> <SendIcon /></button>
                </form>
            </div>
        </div>
    )
}

export default Chat
