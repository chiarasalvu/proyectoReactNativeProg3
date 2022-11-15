import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import HomeStackNavigation from "../HomeStackNavigation/HomeStackNavigation"
import Profile from '../../screens/Profile/Profile'
import NewPost from '../../screens/NewPost/NewPost'
import Filter from '../../screens/Filter/Filter'
import { SimpleLineIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const Tab = createBottomTabNavigator()

function HomeMenu() {

    return (
        <Tab.Navigator screenOptions={{ tabBarShowLabel: false }}>
            <Tab.Screen name="Home" component={HomeStackNavigation} options={{tabBarIcon: ()=> <SimpleLineIcons name="home" size={24} color="black" /> } } />
            <Tab.Screen name="Profile" component={Profile}  options={{tabBarIcon: ()=> <Ionicons name="person-outline" size={24} color="black" /> } }/>
            <Tab.Screen name="New Post" component={NewPost} options= {{tabBarIcon: ()=> <AntDesign name="pluscircleo" size={24} color="black" />} } />
            <Tab.Screen name="Filter" component={ Filter } options={{tabBarIcon: ()=> <AntDesign name="search1" size={24} color="black" /> }}/>
        </Tab.Navigator>
    )
}

export default HomeMenu;