import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../../screens/Home/Home';
import Comments from '../../screens/Comments/Comments';
import Profile from '../../screens/Profile/Profile';

const Stack = createNativeStackNavigator();

function HomeStackNavigation() {
  return (
     <Stack.Navigator>
        <Stack.Screen name="Home" component={ Home } options={ {headerShown: false}}/>
        <Stack.Screen name="Comments" component={ Comments } />
     </Stack.Navigator>
  );
}

export default HomeStackNavigation;