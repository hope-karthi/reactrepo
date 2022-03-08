import React, { useState } from "react";
import GoogleLogin from 'react-google-login';
import {useNavigate} from "react-router-dom";
function Login(){

    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    let navigate =useNavigate();

    function login(e){
        e.preventDefault();
        console.warn(process.env)
        var result =fetch(`http://localhost:8000/login`,{
            method :"POST",
            headers : { 
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
                
            },
            body: JSON.stringify(`grant_type=&username=${username}&password=${password}&scope=&client_id=&client_secret=`)
        })
        result.then((response)=> {
            if (response.status === 200){
                result.then((response) => response.json())
                .then((json) =>{
                    localStorage.setItem("token",json.access_token);
                    localStorage.setItem("current_user",username)
                    localStorage.setItem("user",json.user);
                })
                navigate("/");
            }else{
                document.getElementById("incorrect_detail").innerHTML=`<span style="color:red;">Incorrect details</span>`
            }
        })
        
    }
    function responseGoogle(prop){
        var fetching=fetch(`http://localhost:8000/g-auth_user/`, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"email":prop.profileObj.email,"google_oauth":true,"accessToken":prop.tokenObj.access_token,"full_name":prop.profileObj.name})
        })
        fetching.then((response) => response.json())
        .then((json) => {
            localStorage.setItem("token",json.access_token);
            localStorage.setItem("user",json.user);
            localStorage.setItem("current_user",prop.profileObj.email)
            navigate('/');
        })
    }
    
    return(
        <div>
            <header class="masterhead mb-auto">
                <div class="inner">
                    <h3 class="masthead-brand">HomeNow</h3>
                        <nav class="nav nav-masthead">
                            <a class="nav-link normal" href="/">Home</a>
                            <a class="nav-link active" href="/login">Login</a>
                            <a class="nav-link normal" href="/signup">Signup</a>
                        </nav>
                </div>
            </header>
            <div class='bgimg'>
                <div class='global-container'>
                    <div class='card login-form'>
                        <div class='card-body'>
                            <h1 class='card-title text-center'>
                                LOGIN FORM
                            </h1>
                            <div class='card-text'>
                                <form autoComplete="off">
                                <div class='form-group'>
                                    <label for='exampleInputEmail1'>Email Address</label>
                                    <input class='input1' type='email' onChange={(e)=>setUsername(e.target.value)} class='form-control form-control-sm' id='exampleInputEmail1'></input>
                                </div>
                                <div class='form-group'>
                                    <a href='#' style={{"float" :'right', 'font-size': '13px','marginBottom':'10px'}}>Forget Password</a>
                                    <label for='exampleInputPassword1'>Password</label>
                                    <input type='password' onChange={(e)=>setPassword(e.target.value)} class='form-control form-control-sm' id='exampleInputPassword1'></input>
                                </div>
                                <button type='submit' onClick={login} class='btn btn-danger btn-block'>
                                    Sign In
                                </button>
                                <div class='signup'>
                                    Don't have an account? <a href='/signup' >Create account</a>
                                </div>
                                <div id="incorrect_detail" />
                                <div class='glogin'>
                                <GoogleLogin 
                                    clientId="1035280662368-ph8ssntl350ll9qpo652tct5q7ja9ag3.apps.googleusercontent.com"
                                    buttonText="Login" 
                                    onSuccess={responseGoogle}
                                    onFailure={responseGoogle}
                                    cookiePolicy={'single_host_origin'}>
                                    Login
                                </GoogleLogin>
                                </div>
                                
                                </form>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
        
    )

}
export default Login;