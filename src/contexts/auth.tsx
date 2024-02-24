import { createContext, useState } from 'react'

export const AuthContext = createContext({})

export default function AuthProvider({ children }: any){
    const [loggedIn, setLoggedIn] = useState<boolean>(true)
    const [currentProject, setCurrentProject] = useState<object>()
    return (
        <AuthContext.Provider value={{loggedIn, currentProject, setCurrentProject}}>
            {children}
        </AuthContext.Provider>
    )
}