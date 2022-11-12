import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import HomeStackNavigation from "../HomeStackNavigation/HomeStackNavigation"
import Profile from '../../screens/Profile/Profile'
import NewPost from '../../screens/NewPost/NewPost'
import { SimpleLineIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const Tab = createBottomTabNavigator()

function HomeMenu() {

    return (
        <Tab.Navigator screenOptions={{ tabBarShowLabel: false }}>
            <Tab.Screen name="HomeStackNavigation" component={HomeStackNavigation} options={
    {tabBarIcon: ()=> <SimpleLineIcons name="home" size={24} color="black" />} }/>
            <Tab.Screen name="Profile" component={Profile}  options={{tabBarIcon: ()=> <Ionicons name="person-outline" size={24} color="red" /> } }/>
            <Tab.Screen name="NewPost" component={NewPost} options= {{tabBarIcon: ()=> <AntDesign name="pluscircleo" size={24} color="black" />} } />
        </Tab.Navigator>
    )

}



export default HomeMenu