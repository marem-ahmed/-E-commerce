import { createContext, useState } from "react";
import axios from "axios";

export let TokenContext = createContext();

export default function TokenContextProvider({ children, navigate }) {
  const [token, setToken] = useState(null);
  const[isUserLogin,setUserLogin]=useState(false)
  const [errMessage, setErrMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState("");

  async function callLogin(requestLogin) {
    setErrMessage("");
    setIsLoading(true);
    try {
      const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", requestLogin);
      console.log(data);
      console.log(data.message);
      
      
      if (data.message === "success") {
        localStorage.setItem("userToken", data.token);
        console.log(data.user.name);
        setUserInfo(data.user.name)

        setUserLogin(true)
        setErrMessage('')
        setToken(data.token);
      }
    } catch (err) {
      setErrMessage(err.response?.data?.message || "An error occurred.");
      console.log('mlllll');
      
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <TokenContext.Provider value={{ token, setToken, callLogin, errMessage, setErrMessage, isLoading, userInfo, setUserInfo ,isUserLogin}}>
      {children}
    </TokenContext.Provider>
  );
}
