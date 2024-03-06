import { createContext, useState } from "react";

const UserType=createContext()

const UserContext=({children})=>{
    const [userId, setuserId] = useState('')
    return(
        <UserType.Provider value={{userId,setuserId}}>
    {children}
        </UserType.Provider>)
}


export {UserType,UserContext}