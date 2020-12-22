import React, { useEffect, useState } from 'react'
import './sidebar.css'
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import { Avatar, IconButton } from '@material-ui/core';
import SidebarChat from './SidebarChat';
import dp from './download.png';
import db from './firebase';
import { useStateValue } from './StateProvider';
import ForumTwoToneIcon from '@material-ui/icons/ForumTwoTone';
function Sidebar() {
    const [rooms, setRooms] = useState([]);
    const [{ user }, dispatch] = useStateValue();
    useEffect(() => {
        db.collection('rooms').onSnapshot
            (
                (snapshot) => setRooms
                    (
                        snapshot.docs.map((doc) => ({
                            id: doc.id,
                            data: doc.data(),
                        }))
                    )
            );

    }, []);

    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <Avatar src={user?.photoURL} />
                <h3 className="name">  Room Messenger </h3>

                <div className="sidebar__headerRight">
                    {/* <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton> */}
                    <ForumTwoToneIcon />
                </div>
            </div>
            {/* <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchOutlinedIcon />
                    <input placeholder="Search or start a new chat" type="text" />
                </div>
            </div> */}
            <div className="sidebar__chats">
                <SidebarChat addNewChat />
                {rooms.map((room) => (
                    <SidebarChat key={room.id} id={room.id} name={room.data.name} pass={room.data.pass} roomt={room.data.roomt} />
                ))}

            </div>
        </div>
    );
}

export default Sidebar;
