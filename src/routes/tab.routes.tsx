import { createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import UserProjects from '../screens/UserProjects'
import Team from '../screens/Team'
import Posts from '../screens/Posts'
import Tasks from '../screens/Tasks'
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

const Tab = createBottomTabNavigator()

export default function TabRoutes(){
    return (
        <Tab.Navigator screenOptions={{ headerShown: false} }>
            <Tab.Screen 
                name='userProjects'
                component={UserProjects}
                options={{
                    tabBarIcon: () => <FontAwesome name="book" size={24} color="black" />,
                    tabBarLabel: 'Projetos'
                }}
            />
            <Tab.Screen 
                name='team'
                component={Team}
                options={{
                    tabBarIcon: () => <AntDesign name="team" size={24} color="black" />,
                    tabBarLabel: 'Equipe'
                }}
            />
            <Tab.Screen 
                name='tasks'
                component={Tasks}
                options={{
                    tabBarIcon: () => <FontAwesome5 name="tasks" size={24} color="black" />,
                    tabBarLabel: 'Tarefas'
                }}
            />
            <Tab.Screen 
                name='posts'
                component={Posts}
                options={{
                    tabBarIcon: () => <MaterialIcons name="post-add" size={24} color="black" />,
                    tabBarLabel: 'Publicações'
                }}
            />
        </Tab.Navigator>
    )
}