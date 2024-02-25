import { createContext, useState } from 'react'

export const AuthContext = createContext({})

interface UserData {
    _id: string
}

export default function AuthProvider({ children }: any){
    const [loggedIn, setLoggedIn] = useState<boolean>(true)
    const [currentProject, setCurrentProject] = useState<object>()
    const [userData, setUserData] = useState<UserData>({
        _id: '65bc29cf9f87eda02834a09a'
    })
    return (
        <AuthContext.Provider value={{loggedIn, currentProject, setCurrentProject, userData, setUserData}}>
            {children}
        </AuthContext.Provider>
    )
}