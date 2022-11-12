import React, { Component } from 'react';
import { auth, db } from '../../firebase/config';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

class Register extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            userName: '',
            miniBio: '',
            profilePhoto: '',
            errors: ''
        }
    }

    componentDidMount() {
        auth.onAuthStateChanged( //para redirigir al usuario logueado al HomeMenu
            user => {
                if (user) {
                    this.props.navigation.navigate('HomeMenu')
                }
            })
    }

    registerUser(email, password, userName, miniBio, profilePhoto) {
       
        if (this.state.email === '') {
            this.setState({ errors: 'el campo email esta vacio' })
        } else if (this.state.password === '') {
            this.setState({ errors: 'el campo password esta vacio' })
        } else if (this.state.userName === '') {
            this.setState({ errors: 'el campo userName esta vacio' })
        } else {

            auth.createUserWithEmailAndPassword(email, password)
                .then(res => {

                    db.collection('users').add({
                        email: email,
                        userName: userName,
                        miniBio: miniBio,
                        profilePhoto: profilePhoto,
                        createdAt: Date.now()
                    })
                        .then(() => {
                            this.setState({
                                email: '',
                                password: '',
                                userName: '',
                                miniBio: '',
                                profilePhoto: '',
                                errors: {}
                            })

                            this.props.navigation.navigate('Login')
                        })

                })
                .catch(error => { console.log(error)
                    if (error === errors.email) {
                        console.log(errors.email)
                    }
                })
        }  
    }


    render() {
        return (
            <View>
                <Text>Registro</Text>
                <Text> { this.state.errors } </Text>
                <View style={styles.container}>
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
                        secureTextEntry= {true}
                        onChangeText={text => this.setState({ password: text })}
                        value={this.state.password}
                    />
                    <TextInput
                    style={styles.field}
                        placeholder='Nombre de usuario'
                        keyboardType='default'
                        onChangeText={text => this.setState({ userName: text })}
                        value={this.state.userName}
                    />
                    <TextInput
                    style={styles.field}
                        placeholder='Mini Bio'
                        keyboardType='default'
                        onChangeText={text => this.setState({ miniBio: text })}
                        value={this.state.miniBio}
                    />
                    <TextInput
                    style={styles.field}
                        placeholder='Foto de perfil'
                        keyboardType='default'
                        onChangeText={text => this.setState({ profilePhoto: text })}
                        value={this.state.profilePhoto}
                    />

                    <TouchableOpacity onPress={() => this.registerUser(this.state.email, this.state.password, this.state.userName, this.state.miniBio, this.state.profilePhoto)}>
                        <Text>Registrarme</Text>
                    </TouchableOpacity>

                    <Text onPress={() => this.props.navigation.navigate('Login')} >Ir a login</Text>

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

export default Register;