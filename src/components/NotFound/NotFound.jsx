import React from 'react'
import imgError from '../../Assets/images/error.svg'
export default function NotFound() {
  return (
    <>
      <div className=" container d-flex ">
        <img src={imgError} alt="erorr" className="w-75 m-auto" />
      </div>
    </>
  );
}
