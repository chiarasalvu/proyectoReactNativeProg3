import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../../screens/Home/Home';
import Comments from '../../screens/Comments/Comments';

const Stack = createNativeStackNavigator();

function HomeStackNavigation() {
  return (
     <Stack.Navigator>
        <Stack.Screen name="Home" component={ Home } />
        <Stack.Screen name="Comments" component={ Comments } />
     </Stack.Navigator>
  );
}

export default HomeStackNavigation;