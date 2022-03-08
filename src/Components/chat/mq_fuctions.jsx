function concat_time(timestamp_db){
    function toTimestamp(strDate){ var datum = Date.parse(strDate); return datum/1000;}
    fetch('http://localhost:8000/one_user_retrive', {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzdXBlcnVzZXJAaG9tZW5vdy5jb20iLCJleHAiOjE2NDYyMTM5MDN9.mAtDkH3flmaEvD_yA4Mpxjub7l8mAfw9S-nE2EaTvVc'
        }
    }).then((res) => res.json)
    .then((json) => {
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
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzdXBlcnVzZXJAaG9tZW5vdy5jb20iLCJleHAiOjE2NDYyMTM5MDN9.mAtDkH3flmaEvD_yA4Mpxjub7l8mAfw9S-nE2EaTvVc'
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