import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../../screens/Home/Home';
import Comments from '../../screens/Comments/Comments';

const Stack = createNativeStackNavigator();

function HomeStackNavigation() {
  return (
<<<<<<< HEAD
     <Stack.Navigator >
        <Stack.Screen name="Home" component={ Home }  />
        <Stack.Screen name="Comments" component={ Comments }  />
=======
     <Stack.Navigator>
        <Stack.Screen name="Home" component={ Home } options= {{headerShown: false}}/>
        <Stack.Screen name="Comments" component={ Comments } />
>>>>>>> fd286aa83b5743c55ef74d2dd4c40dcfe456e8af
     </Stack.Navigator>
  );
}

export default HomeStackNavigation;