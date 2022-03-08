import React, { useState } from "react";
import {useNavigate} from "react-router-dom";

function Create(){
    let navigate =useNavigate();
    const [getPrice, setGetPrice]=useState();
    const [getTax,setGetTax] = useState();
    const [getTags, setGetTags] = useState("");
    const [getValueName,setGetValueName] = useState("");
    const [getUrl,setGetUrl] = useState("");
    const [getImageName,setGetImageName] = useState("");

    fetch('http://localhost:8000/update_delivered', {
        method: 'PUT',
        headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${localStorage.token}`,
        }
    });

    function saveData(){
        let data= {
            "price": getPrice,
            "tax": getTax,
            "tags": getTags,
            "value_list": {
              "name": getValueName,
              "image_list": {
                "url": getUrl,
                "name": getImageName
              }
            }
          }
          fetch(`http://localhost:8000/items/`, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${localStorage.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then((response)=>{
            if(response.status === 200){navigate('/list');}
        })
    }
    function check_user(){
        if (localStorage.user){
        return (<p class='user_name'>Welcome {localStorage.getItem("current_user")}</p>)
        }
    }
    function check_superuser(){
        if(localStorage.user === 'super_user'){
        return <a class="nav-link normal" href="/admin_promote"> Promote employee </a>
    }}
    function logout(){
        localStorage.clear()
    }
    return(
        <div>
            <header class="masterhead mb-auto">
                <div  class="inner">
                    {check_user()}
                    <h3 class="masthead-brand">HomeNow</h3>
                    <nav class="nav nav-masthead">
                        <a class="nav-link normal" href="/">Home</a>
                        <a class="nav-link active" href="/list">List of Items</a>
                        <a class="nav-link normal" href="/upload-image"> Upload Images </a>
                        <a class="nav-link normal" href="/detail-image"> List of Images </a>
                        <a class="nav-link normal" href="/chat-room"> Private Chat </a>
                        {check_superuser()}
                        <a class="nav-link normal" onClick={logout} href='/'> Logout </a>
                    </nav>
                </div>
            </header>
            {/* <div id='create_items'>
                <h2>Product</h2>
                Price:<input type="number" value={getPrice} onChange={(e)=>{setGetPrice(e.target.value)}}/>(required)<pre/>
                Tax:<input type="number" value={getTax} onChange={(e)=>{setGetTax(e.target.value)}}/>(required)<pre/>
                Tags:<input value={getTags} onChange={(e)=>{setGetTags(e.target.value)}}/><pre/>
                <h3>Value List</h3>
                Value Name:<input value={getValueName} onChange={(e)=>{setGetValueName(e.target.value)}}/><pre/>
                <h3>Image List</h3>
                URL:<input value={getUrl} onChange={(e)=>{setGetUrl(e.target.value)}}/><pre/>
                Image Name:<input value={getImageName} onChange={(e)=>{setGetImageName(e.target.value)}}/><pre/>
                <button type='button' onClick={saveData} >Create</button>
            </div> */}
            <div class="create">
                <h2 >Product Details</h2>
                <form>
                    <div class="form-create">
                        <label>Name</label>
                        <input type="text" value={getValueName} onChange={(e)=>{setGetValueName(e.target.value)}}/>
                    </div>
                    <div class="form-create">
                        <label>Price</label>
                        <input type="text" value={getPrice} onChange={(e)=>{setGetPrice(e.target.value)}}/>
                    </div><div class="form-create">
                        <label>Tax</label>
                        <input type="text" value={getTax} onChange={(e)=>{setGetTax(e.target.value)}}/>
                    </div><div class="form-create">
                        <label>Image</label>
                        <input type="text" value={getImageName} onChange={(e)=>{setGetValueName(e.target.value)}}/>
                    </div><div class="form-create">
                        <label>Url</label>
                        <input type="text" value={getUrl} onChange={(e)=>{setGetValueName(e.target.value)}}/>
                    </div><div class="form-create">
                        <label>Tags</label>
                        <input type="text" value={getTags} onChange={(e)=>{setGetValueName(e.target.value)}}/>
                    </div>
                    <button type='button' class="btn" onClick={saveData} >Create</button>
                </form>
            </div>
        </div>
    )
}

export default Create;