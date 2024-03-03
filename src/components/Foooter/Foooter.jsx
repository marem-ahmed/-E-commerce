import React from "react";
import styles from "./Foooter.module.css";
export default function Foooter() {
  return (
    <>
      <footer className="bg-main-light py-5 mt-3 ">
        <div className="container">
          <p className="fw-bloder fs-3 ">Get the FreshCart app</p>
          <p className="text-muted ">
            We will send you a link, open it on your phone to download the app.
          </p>
          <div className="d-flex justify-content-between align-items-center">
            <input
              type="text"
              className="form-control w-75"
              placeholder="Email.."
            />
            <button className="bg-main text-white btn"> Share App Link</button>
          </div>
        </div>
      </footer>
    </>
  );
}
