import React, { Component } from 'react';
import {auth} from '../../firebase/config';
import { View,
         Text,
         TextInput,
         TouchableOpacity,
        StyleSheet } from 'react-native';

class Login extends Component {
    constructor(){
        super()
        this.state = {
            email:'',
            password:'',
            errors:''
        }
    }

    loginUser(email, password){
        //Registrar en firebase y si el reigstro sale bien redireccionar a Home
        auth.signInWithEmailAndPassword(email, password)
            .then( res => {
                this.props.navigation.navigate('HomeMenu')
            })
            .catch(error => console.log(error))
    }

    render(){
        return(
            <View> 
                <Text>Login</Text>
                <View style={styles.container}>
                   <TextInput  
                   style={styles.field}
                       placeholder='email'
                       keyboardType='email-address'
                       onChangeText={ text => this.setState({email:text}) }
                       value={this.state.email}
                    /> 
                    <TextInput  
                    style={styles.field}
                        placeholder='password'
                        keyboardType='default'
                        secureTextEntry= {true}
                        onChangeText={ text => this.setState({password:text}) }
                        value={this.state.password}
                    />  

                    <TouchableOpacity onPress={()=>this.loginUser(this.state.email, this.state.password)}>
                        <Text>Ingresar</Text>
                    </TouchableOpacity>
                    <Text onPress={ () => this.props.navigation.navigate('Register')} >Ir a Registro</Text>
                </View>
            </View>
        )
    }
    
}

const styles = StyleSheet.create({
    field: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default Login;