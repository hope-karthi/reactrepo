import React, { useState } from "react";
import GoogleLogin from 'react-google-login';
import {useNavigate} from "react-router-dom";

function Signup(){
    let navigate =useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm_password, setConfirm_password] = useState("");
    const [fullname, setFullname] = useState("");
    function register(e){
        e.preventDefault();
        if(password === confirm_password && email.includes('@' && '.')){
            window.alert("OKAY");
            var create_user=fetch(`http://localhost:8000/signup`, {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({"email":`${email}`,"password":`${password}`,"full_name":`${fullname}`})
            });
            create_user.then((response)=> {
                if(response.status === 200){
                    create_user.then((response)=> response.json())
                    .then((json) => {
                        localStorage.setItem("token",json.access_token);
                        localStorage.setItem("current_user",email)
                        localStorage.setItem("user",json.user);
                    })
                    navigate('/');
                }else{
                    document.getElementById("incorrect_password").innerHTML=`<span style="color:red;">This user aleready registered</span><span style="color:blue;">Please Sign in</span>`
                }
            })
        }else{
            document.getElementById("incorrect_password").innerHTML=`<span style="color:red;">Check the data</span>`
        }
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
            localStorage.setItem("current_user",prop.profileObj.email)
            localStorage.setItem("user",json.user);
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
                        <a class="nav-link normal" href="/login">Login</a>
                        <a class="nav-link active" href="/signup">Signup</a>
                    </nav>
                </div>
            </header>
            <div class='bgimg'>
                <div class='global-container-signup'>
                    <div class='card signup-form'>
                        <div class='card-body'>
                            <h1 class='card-title text-center'>
                                Signup Form
                            </h1>
                            <div class='card-text'>
                                <form autoComplete="off">
                                    <div class='form-group'>
                                        <label for='exampleInputEmail1'>Email Address</label>
                                        <input type='email' onChange={(e)=>setEmail(e.target.value)} class='form-control form-control-sm' id='exampleInputEmail1' autoComplete="off"></input>
                                    </div>
                                    <div class='form-group'>
                                        <label for='exampleInputEmail1'>Full name</label>
                                        <input type='text' onChange={(e)=>setFullname(e.target.value)} class='form-control form-control-sm' id='exampleInputEmail1'></input>
                                    </div>
                                    <div class='form-group'>
                                        <label for='exampleInputPassword1'>Password</label>
                                        <input type='password' onChange={(e)=>setPassword(e.target.value)} class='form-control form-control-sm' id='exampleInputPassword1'></input>
                                    </div>
                                    <div class='form-group'>
                                        <label for='exampleInputEmail1'>Confirm Password</label>
                                        <input type='password' onChange={(e)=>setConfirm_password(e.target.value)} class='form-control form-control-sm' id='exampleInputEmail1'></input>
                                    </div>
                                    <button type='submit' onClick={register} class='btn btn-danger btn-block'>
                                        Sign up
                                    </button>
                                    <div class='signup'>
                                        Do you have an account? <a href='/login' >Sign in</a>
                                    </div>
                                    <div id="incorrect_password" />
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





export default Signup;