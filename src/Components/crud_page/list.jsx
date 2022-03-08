import React, { useEffect, useState } from 'react';

function CRUD(props) {
    const [getData, setGetData]=useState([]);
    
    useEffect(() =>{
        fetch_all();
    },[]);

    fetch('http://localhost:8000/update_delivered', {
        method: 'PUT',
        headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${localStorage.token}`,
        }
    });

    var fetching;
    const [fetch_status,setFetch_status]=useState();
    const fetch_all=() =>{
        fetching=fetch(`http://localhost:8000/get_items`, {
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${localStorage.token}`
            }
        });
        fetching.then((res)=>{
            setFetch_status(res.status);
        })

        fetching.then((res) => res.json())
        .then((json) => {
            setGetData(json.response);
            console.log(json);
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
    
return (
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
        <div>
            <h3>List of Products</h3>
                {
                    (fetch_status ===404)?
                    <h2>No Data Found. Plz Create Data</h2>:
                    <table class='table' style={{"table-layout":"auto"}} >
                        <thead><tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Tax</th>
                            <th>Details</th>
                        </tr></thead>
                        <tbody>
                            {getData.map((i)=>(
                                <tr>
                                    <td>{i.value_list.name}</td>
                                    <td>{i.price}</td>
                                    <td>{i.tax}</td>
                                    <td><a href={`/detail/${i.id}`}>Detail</a></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                }
        </div>

    	</div>
);
}

export default CRUD;
