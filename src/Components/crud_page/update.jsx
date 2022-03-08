import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Update(){
    const params = useParams();
    const navigate = useNavigate();
    const [getId,setGetId] = useState("");
    const [putPrice, setputPrice]=useState("");
    const [putTax,setputTax] = useState("");
    const [putTags, setputTags] = useState("");
    const [putValueName,setputValueName] = useState("");
    const [putUrl,setputUrl] = useState("");
    const [putImageName,setputImageName] = useState("");

    useEffect(() =>{
        getFetch();
    },[]);

    fetch('http://localhost:8000/update_delivered', {
        method: 'PUT',
        headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${localStorage.token}`,
        }
    });
    
    const getFetch =() => fetch(`http://localhost:8000/get_item/${params.id}`, {
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${localStorage.token}`
            }
    })
    .then((res)=> res.json())
    .then((json) => {
        setGetId(json.id)
        setputPrice(json.price)
        setputTags(json.tags)
        setputTax(json.tax)
        setputValueName(json.value_list.name)
        setputImageName(json.value_list.image_list.name)
        setputUrl(json.value_list.image_list.url)
    })
    function updateItem(){
        let item= {"price": putPrice,"tax": putTax,"tags": putTags,"value_list": {"name": putValueName,"image_list": {"url": putUrl,"name": putImageName}}}
        
        fetch(`http://localhost:8000/update_item/${getId}`, {
            method: 'PUT',
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${localStorage.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        })
        .then((res) => {
            if (res.status === 200){
                window.alert("Updated");
                navigate(`/detail/${getId}`)
            }
        })
    }

    return(
        <div>
            <div>
                <h2>Update Products</h2>
                Price:<input type="number" value={putPrice} onChange={(e)=>{setputPrice(e.target.value)}}/><pre/>
                Tax:<input value={putTax} onChange={(e)=>{setputTax(e.target.value)}}/><pre/>
                Tags:<input value={putTags} onChange={(e)=>{setputTags(e.target.value)}}/><pre/>
                <h3>Value List</h3>
                Value Name:<input value={putValueName} onChange={(e)=>{setputValueName(e.target.value)}}/><pre/>
                <h3>Image List</h3>
                URL:<input value={putUrl} onChange={(e)=>{setputUrl(e.target.value)}}/><pre/>
                Image Name:<input value={putImageName} onChange={(e)=>{setputImageName(e.target.value)}}/><pre/>
                <button type='button' onClick={updateItem} >Update</button>
            </div>
        </div>
    )
}


export default Update;