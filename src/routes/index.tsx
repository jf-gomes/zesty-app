import { NavigationContainer} from '@react-navigation/native'
import StackRoutes from './stack.routes'
import { AuthContext } from '../contexts/auth'
import { useContext } from 'react'
import TabRoutes from './tab.routes'

export default function Routes(){

    const { loggedIn }: any = useContext(AuthContext)

    return (
        <NavigationContainer>
            {loggedIn ? <TabRoutes /> : <StackRoutes />}
        </NavigationContainer>
    )
}