import { useState } from "react";
import { useParams } from "react-router-dom";
import { FaRegGrinStars,FaRegGrimace,FaRegFrown } from  "react-icons/fa";
import './chat.css';

function Chat(){
    const params = useParams();
    const [data,setData] =useState([]);
    const [message, setMessage] = useState("");

    function concat_time(timestamp_db){
        function toTimestamp(strDate){ var datum = Date.parse(strDate); return datum/1000;}
        fetch('http://localhost:8000/one_user_retrive', {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${localStorage.token}`,
            }
        }).then((res) => res.json)
        .then((json) => {
            console.warn(json);
            
            var new_timestamps=[]
            for (let index = 0; index < json.datas.length; index++) {
                new_timestamps.push(toTimestamp(json.datas[index].msg_datetime));
            }
            return new_timestamps.concat(timestamp_db);
        })
    }

    function concat_data(data_db){
        function toTimestamp(strDate){ var datum = Date.parse(strDate); return datum/1000;}
        fetch('http://localhost:8000/one_user_retrive', {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${localStorage.token}`,
            }
        }).then((res) => res.json)
        .then((json) => {
            var new_data=[]
            for (let index = 0; index < json.datas.length; index++) {
                var data=json.datas[index]
                data["msg_timestamp"] = toTimestamp(data.msg_datetime)
                new_data.push(data);
            }
            return new_data.concat(data_db);
        })
    }

    function seen_and_delivery(delivery,seen){
        if (delivery === true && seen === true) {
            return <FaRegGrinStars style={{color: 'red', fontSize: '35px'}}/>
        }else if (delivery === true && seen === false) {
            return <FaRegGrimace style={{color: 'red', fontSize: '35px'}}/>
        }else{
            return <FaRegFrown style={{color: 'red', fontSize: '35px'}}/> 
        }
    }
    
    function timestamp_to_date(timestamp){
        let dateObj = new Date(timestamp * 1000);
        let dateString = dateObj.toDateString();
        return  dateString;
    }
    function timestamp_to_time(timestamp){
        let dateObj = new Date(timestamp * 1000);
        let dateString = dateObj.toTimeString();
        return  dateString;
    }
    
    fetch('http://localhost:8000/update_delivered', {
        method: 'PUT',
        headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${localStorage.token}`,
        }
    });

    fetch(`http://localhost:8000/retrive_chat`, {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${localStorage.token}`,
            'Content-Type': 'application/json'},
        body: JSON.stringify({"email": params.email})
    })
    .then((res) => res.json())
    .then((json) => {
        function data_sort_basedon_time(data,timestamps){
            const datas=[];
            for (let i = 0; i < timestamps.length; i++) {
                for (let j = 0; j < data.length; j++) {
                    if (timestamps[i] === data[j].msg_timestamp) {
                        datas.push(data[j])
                    }
                }            
            }
            let datas_latest_to_old = datas.filter((c, index) => {
                return datas.indexOf(c) === index;
            });
            return datas_latest_to_old;
        }
        let timestamp=[]
        for (let index = 0; index < json.chat_data.length; index++) {
            timestamp.push(json.chat_data[index].msg_timestamp)
        }
        let timestamps=concat_time(timestamp);
        let new_data = concat_data(json.chat_data)
        let required_data=data_sort_basedon_time(new_data,timestamps.reverse());
        let output_tags=[];
        let date=timestamp_to_date(required_data[0].msg_timestamp)
        output_tags.push(<div class="date">{date}</div>)
        required_data.forEach((item)=>{
            if (date == timestamp_to_date(item.msg_timestamp)) {
                output_tags.push(
                    <div>
                        {
                        (item.sender_id !== params.email)?
                        <div><div class="right">{item.message}</div><div class="time-right">{timestamp_to_time(item.msg_timestamp).slice(0,5)}{seen_and_delivery(item.delivered,item.seen)}</div></div>
                        :<div><div class="left">{item.message}</div><div class="time-left">{timestamp_to_time(item.msg_timestamp).slice(0,5)}</div></div>
                        }
                    </div>
                )
            }else{
                date=timestamp_to_date(item.msg_timestamp)
                output_tags.push(
                    <div>
                        <div class="date">{date}</div>
                        {
                        (item.sender_id !== params.email)?
                        <div><div class="right">{item.message}</div><div class="time-right">{timestamp_to_time(item.msg_timestamp).slice(0,5)}{}{seen_and_delivery(item.delivered,item.seen)}</div></div>
                        :<div><div class="left">{item.message}</div><div class="time-left">{timestamp_to_time(item.msg_timestamp).slice(0,5)}</div></div>
                        }
                    </div>
                )
            }
        })
        setData(output_tags)
    })
    fetch('http://localhost:8000/update_chat_seen', {
            method: 'PUT',
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${localStorage.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"email": params.email})
        });
    function send_msg(){
        fetch(`http://localhost:8000/add_chat`, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${localStorage.token}`,
                'Content-Type': 'application/json'    },
            body: JSON.stringify({
                "receiver": params.email,
                "message": message
            })
        });
        if (data.length === 0){setTimeout(() => {
            window.location.reload(true);
        }, 1000);}
    }
    return (<div>
        <div class="mx-auto text-center">
            <input type="text"  onChange={(e)=>setMessage(e.target.value)}/>
            <button onClick={() => send_msg()}>Send</button>
        </div>
        <h4>{params.email}</h4>
        
        {data}
    </div>)
}

export default Chat;