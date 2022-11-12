import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StyleSheet} from 'react-native';
import Register from './src/screens/Register/Register';
import Login from './src/screens/Login/Login';
import HomeMenu from './src/components/HomeMenu/HomeMenu';
import Users from './src/screens/Users/Users';

const Stack = createNativeStackNavigator();

function App() {
  return (
    //Plantear la navegación
    <NavigationContainer>
     <Stack.Navigator>
        <Stack.Screen name="Register" component={ Register } />
        <Stack.Screen name="Login" component={ Login } />
        <Stack.Screen name="HomeMenu" component={ HomeMenu } options= {{headerShown: false}} />
        <Stack.Screen name="Users" component={ Users } />
     </Stack.Navigator>
   </NavigationContainer>
  );
}

export default App;
