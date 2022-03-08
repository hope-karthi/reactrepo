import React, { useState,lazy,Suspense } from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';

import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const Create = lazy(()=> import('./Components/crud_page/create'));
const Detail = lazy(()=> import('./Components/crud_page/detail'));
const CRUD = lazy(()=> import('./Components/crud_page/list'));
const Update = lazy(()=> import('./Components/crud_page/update'));
const Home = lazy(()=> import('./home'));
const Login = lazy(()=> import('./Components/users/login'));
const Signup = lazy(()=> import('./Components/users/signup'));
const Admin_promote = lazy(()=> import('./Components/users/admin_promot'));
const Image_fetching = lazy(()=> import('./Components/crud_page/file_upload'));
const Image_details = lazy(()=> import('./Components/crud_page/file_detail'));
const Chat_room = lazy(()=> import('./Components/chat/chat_room'));
const Chat = lazy(()=> import('./Components/chat/chat'));


Sentry.init({
  dsn: "https://74141159ca3f49c8a597e950fc8c7a4b@o1143252.ingest.sentry.io/6203471",
  integrations: [new BrowserTracing()],
  tracesSampleRate: 1.0,
});

function App(){
  const token= localStorage.getItem('token')
  
  
  return(
    <div>
      <div class='body'>
            <div class="container1 d-flex h-100 p-3 mx-auto ">
                
      
      <Router>
        <Suspense fallback={<div><h1>Loading page</h1></div>}>
          <Routes>
            <Route exact path="/" element={<Home/>} />
      
            <Route path="/list" element={
              <CRUD/>
            } />

            <Route 
            exact path="/create" 
            element={
              ! token?
              <Login/>:
              <Create/>
            } />
            <Route exact path={`/detail/:id`} element={<Detail/>} />
            <Route exact path={`/update/:id`} element={<Update/>} />
            <Route 
            exact path={"/upload-image"} 
            element={
              ! token?
              <Login/>:
              <Image_fetching/>
            }/>
            <Route 
            exact path={"/detail-image"} 
            element={
              ! token?
              <Login/>:
              <Image_details/>
            }/>
            <Route 
            exact path={"/chat-room"} 
            element={
              ! token?
              <Login/>:
              <Chat_room/>
            }/>
            <Route 
            exact path={"/chat/:email"} 
            element={
              ! token?
              <Login/>:
              <Chat/>
            }/>
            <Route 
            exact path={'/login'} 
            element={
              ! token?
              <Login/>:
              <Navigate to='/'/>
            }
            />
            <Route 
            exact path={'/signup'} 
            element={
              ! token?
              <Signup/>:
              <Navigate to='/'/>
            }
            />
            <Route 
            exact path={'/admin_promote'} 
            element={
              (localStorage.user === `${process.env.CURRENT_SUPERUSER}`)?
              <Admin_promote/>:
              <Navigate to='/'/>
            }
            />
          </Routes>
        </Suspense>
      </Router>
      <footer class="masterfoot mt-auto">
                    <div class="inner">
                    <p>Cover template for <a class='foota' href="https://getbootstrap.com/">Bootstrap</a>, by <a class='foota' href="#">@abcd</a>.</p>
                    </div>
                </footer>
            </div>
        </div>
    </div>
    
  )
}
ReactDOM.render(
  <App />,
  document.getElementById('root')
);

