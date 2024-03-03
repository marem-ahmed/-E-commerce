import React from 'react'
import Foooter from '../Foooter/Foooter'
import { Outlet } from 'react-router-dom';
import NavBar from './../NavBar/NavBar';
import toast, { Toaster } from "react-hot-toast";

export default function LayOut() {
  return (
    <>
      <NavBar></NavBar>
      <Outlet></Outlet>
      <Toaster/>
      <Foooter></Foooter>
    </>
  );
}
