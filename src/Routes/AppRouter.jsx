import React from "react";
import { Route, Router, Routes } from "react-router-dom";
import Homepage from "../Pages/Home";
import AboutPage from "../Pages/About";

function AppRouter(){
    return(
        <Routes> 
            <Route path="/" element = {<Homepage/>} />
            <Route path="/about" element = {<AboutPage/>}/>
        </Routes>
    );
}

export default AppRouter;