import React, { Component } from 'react';
import { auth, db } from '../../firebase/config';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

class Login extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            userName: '',
            miniBio: '',
            profilePhoto: '',
            errors: {
                email: '',
                password: '',
                userName: ''
            }
        }
    }

    componentDidMount() {
       
    }

    registerUser(email, password, userName, miniBio, profilePhoto) {
        if (email === '') {
            this.setState({ errors: { email: 'el campo email esta vacio' } })
        } else if (password === '') {
            this.setState({ errors: { password: 'el campo password esta vacio' } })
        } else if (userName === '') {
            this.setState({ errors: { userName: 'el campo userName esta vacio' } })
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

                            this.props.navigation.navigate('HomeMenu')
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
           
                <Text>Registro</Text>
                
        )
    }

}


export default Login;