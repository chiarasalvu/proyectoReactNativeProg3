import React, { Component } from 'react';
import { auth, db } from '../../firebase/config';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MyCamera from '../../components/Camera/Camera';

class Register extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            userName: '',
            miniBio: '',
            profilePhoto: '',
            errors: '',
            showCamara: false,
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

        if (this.state.email == '') {

            this.setState({ errors: 'El campo de email esta vacío' })
        } else if (this.state.password == '') {
            this.setState({ errors: 'El campo de contraseña esta vacío' })
        } else if (this.state.userName === '') {
            this.setState({ errors: 'El campo de nombre de usuario esta vacío' })
        } else {

            auth.createUserWithEmailAndPassword(email, password)
                .then(res => {

                    db.collection('users').add({
                        email,
                        userName,
                        miniBio,
                        profilePhoto,
                        createdAt: Date.now()
                    })
                        .then(() => {
                            this.setState({
                                email: '',
                                password: '',
                                userName: '',
                                miniBio: '',
                                profilePhoto: '',
                                errors: '',
                                showCamara: false,
                            })

                            this.props.navigation.navigate('Login')
                        })

                })
                .catch(error => { console.log(error) })
        }
    }

    onImageUpload(url) {
        this.setState({
            profilePhoto: url,
            showCamara: false,
        })
    }


    render() {
        return (
            <View style={styles.container}>

                {this.state.errors ?
                    <Text style={styles.error}> {this.state.errors}</Text> :
                    ""
                }
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


                    {
                        
                            this.state.showCamara ?

                            <View style={styles.container2}>
                                <MyCamera onImageUpload={url => this.onImageUpload(url)} />
                            </View>

                            :

                            <TouchableOpacity style={styles.field} onPress={() => this.setState({ showCamara: true })}>
                                <Text style={styles.letra}> Tocá para sacarte una foto de perfil </Text>
                            </TouchableOpacity>

                    }




                    {(this.state.email, this.state.password, this.state.userName) == '' ?
                        <TouchableOpacity style={styles.botonDesactivado} onPress={() => this.registerUser(this.state.email, this.state.password, this.state.userName, this.state.miniBio, this.state.profilePhoto)}>
                            <Text style={styles.letra}>Registrarme</Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity style={styles.boton} onPress={() => this.registerUser(this.state.email, this.state.password, this.state.userName, this.state.miniBio, this.state.profilePhoto)}>
                            <Text style={styles.letra}>Registrarme</Text>
                        </TouchableOpacity>

                    }


                    <Text style={styles.negrita} onPress={() => this.props.navigation.navigate('Login')} >Ir a login</Text>

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

    container2: {
        backgroundColor: '#fff',
        height: 350,
        width: 250,
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
        color: "black",

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

export default Register;