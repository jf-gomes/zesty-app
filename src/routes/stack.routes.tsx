import { createNativeStackNavigator} from '@react-navigation/native-stack'
import Login from '../screens/Login'
import Signup from '../screens/Signup'

const Stack = createNativeStackNavigator()

export default function StackRoutes(){
    return (
        <Stack.Navigator screenOptions={{ headerShown: false} }>
            <Stack.Screen 
                name='login'
                component={Login}
            />
            <Stack.Screen 
                name='signup'
                component={Signup}
            />
        </Stack.Navigator>
    )
}