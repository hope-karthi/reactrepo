import React, { useState } from "react";
import {useNavigate} from "react-router-dom";

function Admin_promote(){
    let navigate =useNavigate();
    const [email, setEmail] =useState("");
    function promote(){
        fetch(`http://localhost:8000/admin_register`, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Authorization': `Bearer ${localStorage.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"email":`${email}`})
        })
        .then((response)=>{
            if(response.status === 200){window.alert("Promoted successfuly");navigate('/')}
            else{document.getElementById("incorrect_email").innerHTML=`<span style="color:red;">Check the mail id</span>`}
        })
    }
    return(
        <div>
            Email:<br/>
            <input type="email" onChange={(e)=> setEmail(e.target.value)}/>
            <button onClick={promote}>Promote</button>
            <p id="incorrect_email"/>
        </div>
    )
}

export default Admin_promote;