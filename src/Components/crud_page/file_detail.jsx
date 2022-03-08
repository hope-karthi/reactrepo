import { useEffect, useState } from "react";

function Image_details(){
    const [getData, setGetData]=useState([]);
    useEffect(() => {delete_image()},[])
    
    fetch('http://localhost:8000/update_delivered', {
        method: 'PUT',
        headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${localStorage.token}`,
        }
    });

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
        
    
    function delete_image(name){
        console.warn(name);
        fetch(`http://localhost:8000/delete_image?name=${name}`, {
            method: 'DELETE',
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${localStorage.token}`
            }
        });
    }
    return (
        <div >
            <a href="/upload-image"><h2>Upload Images</h2></a>
            {getData.map((value) => {
            return <div><img src={value} key={value} class="mx-auto d-block" width="150" height="150" /><button href onClick={() => delete_image(value.split("/")[value.split("/").length-1])}>Delete Image</button> <br/></div>
            })}
        </div>

    )
}

export default Image_details;