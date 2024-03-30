import React from 'react'
import { Circles } from "react-loader-spinner";
import './Loader.module.css'
export default function Loader() {
  return (
    <>
      <div className='text-center my-3 d-flex justify-content-center'>
        <Circles
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    </>
  );
}

