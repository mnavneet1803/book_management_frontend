
import { removeAuthToken } from "./Auth"
import { useNavigate } from 'react-router';
import {useEffect} from "react"



function SignOut(){
    removeAuthToken()
    alert("SignOut succesfully" )
const navigate = useNavigate()
useEffect(() => {
    navigate("/signup/user")
  });
       
}   




export default SignOut