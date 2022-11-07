import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Home from '../../screens/Home/Home';
import Profile from '../../screens/Profile/Profile'
import NewPost from '../../screens/NewPost/NewPost'

const Tab = createBottomTabNavigator()

function HomeMenu() {

    return (
        <Tab.Navigator screenOptions={{ tabBarShowLabel: false }}>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Profile" component={Profile} />
            <Tab.Screen name="NewPost" component={NewPost} />
        </Tab.Navigator>

    )

}



export default HomeMenu