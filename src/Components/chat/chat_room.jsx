import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Chat_room(){
    let navigate =useNavigate();
    const [datas, setDatas]=useState([]);

    fetch('http://localhost:8000/update_delivered', {
        method: 'PUT',
        headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${localStorage.token}`,
        }
    });

    fetch('http://localhost:8000/retrive_users', {
        headers: {
            'accept': 'application/json'
        }
    })
    .then((res) => res.json())
    .then((json) => {
        setDatas(json);
        console.warn(json)
    })
    return(
        <div>
            ChatRoom
            {datas.map((value) => {
                return <div class="text-center pb-3">
                        <p>{
                                (value.email != localStorage.getItem("current_user"))?
                                <div>{value.full_name}<button onClick={() => {navigate(`/chat/${value.email}`)}} className="btn-success">Chat</button></div>
                                :<p/>
                            } </p>
                    </div>
            })}
            <div id="chat" />
        </div>
    )
}

export default Chat_room;