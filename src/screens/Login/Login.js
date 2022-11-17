import React, { Component } from 'react';
import { auth } from '../../firebase/config';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

class Login extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            errors: ''
        }
    }

    loginUser(email, password) {
        //Registrar en firebase y si el reigstro sale bien redireccionar a Home
        auth.signInWithEmailAndPassword(email, password)
            .then(res => {
                this.props.navigation.navigate('HomeMenu')
            })
            .catch(error => {
                this.setState({ errors: 'Datos incorrectos. Verificalos y volvé a intentar' })
            })
    }


    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.error}> {this.state.errors} </Text>
                <View style={styles.container}>
                    <Ionicons name="person-outline" size={50} color="black" />
                    <TextInput
                        style={styles.field}
                        placeholder='Email'
                        keyboardType='email-address'
                        onChangeText={text => this.setState({ email: text })}
                        value={this.state.email}
                    />
                    <TextInput
                        style={styles.field}
                        placeholder='Contraseña'
                        keyboardType='default'
                        secureTextEntry={true}
                        onChangeText={text => this.setState({ password: text })}
                        value={this.state.password}
                    />

                    {(this.state.email, this.state.password) === '' ?
                        <TouchableOpacity style={styles.botonDesactivado}>
                            <Text style={styles.letra}>Ingresar</Text>
                        </TouchableOpacity> :
                        <TouchableOpacity style={styles.boton} onPress={() => this.loginUser(this.state.email, this.state.password)}>
                            <Text style={styles.letra}>Ingresar</Text>
                        </TouchableOpacity>
                    }

                    <Text style={styles.negrita} onPress={() => this.props.navigation.navigate('Register')} > ¿No tenes cuenta? Registrate</Text>
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
    },
    boton: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        borderColor: '#DBDBDB',
        padding: 10,
        backgroundColor: '#0095F6',

    },
    botonDesactivado: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        borderColor: '#DBDBDB',
        padding: 10,
        backgroundColor: '#E8F0FE',
    },
    letra: {
        color: "white",
        fontWeight: 'bold'
    },
    negrita: {
        fontWeight: 'bold',
    },
    error: {
        color: 'red',
        backgroundColor: 'white',
        fontWeight: 'bold',

    }
});

export default Login;