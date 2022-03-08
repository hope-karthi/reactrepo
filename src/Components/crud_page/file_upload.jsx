import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function Image_fetching(){
    let navigate =useNavigate();
    const [select, setSelete] =useState(null);
    const [getData, setGetData]=useState([]);
    var data=new FormData();

    const onInputChange = (e) => {
        for (let i = 0; i < e.target.files.length; i++) {
            data.append('files',e.target.files[i]);
            data.append('type',e.target.files[i].type);                
            }
        setSelete(data)      
    }
    fetch('http://localhost:8000/update_delivered', {
        method: 'PUT',
        headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${localStorage.token}`,
        }
    });

    function upload(){
        var fetching=fetch('http://localhost:8000/upload_file', {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${localStorage.token}`
            },
            body: select
        });
        document.getElementById("info").innerHTML=`<div class="spinner-border text-success"></div>`
        fetching.then((res)=>{
            if(res.status){
                document.getElementById("info").innerHTML=`Successfully upload <span style="color:red;">Redirect to Image detail page</span> within 5 sec`
                setTimeout(() => { navigate("/detail-image") }, 5000);
            }
        })
    }
    
    function retrive(){
        var fetching=fetch(`http://localhost:8000/retrive_images`, {
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${localStorage.token}`
            }
        });
        fetching.then((res) => res.json())
        .then((json) => {
            setGetData(json.images);
        })
        
    }
    retrive();
    
    return(
        
            <div>
                <a href="/detail-image"><h2>List of Images</h2></a>
                <input type="file" onChange={onInputChange} multiple/><br/><p class="text-warning">Choose multiple Image files</p>
                <div id="info"/>         
                <button onClick={upload}>Upload</button>
                {getData.map((value) => {
                    return <div><img src={value} key={value} class="mx-auto d-block" width="150" height="150" /><br/></div>
                })}
            </div>
    )
}

export default Image_fetching;