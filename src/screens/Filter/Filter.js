import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, TextInput } from 'react-native';
import { auth, db } from '../../firebase/config'
import Post from '../../components/Post/Post'

class Profile extends Component {
    constructor() {
        super();
        this.state = {
            users: [],
            email: [],
            emailInicial: [],
            usuario: [],
            usuarioInicial: [],
            busqueda: ''
        }
    }

    componentDidMount() {
        db.collection('users').onSnapshot(
            docs => {
                let users = []; //si el array esta vacio podriamos poner que no hay resultados de busqueda
                docs.forEach(doc => {
                    users.push({
                        id: doc.id,
                        data: doc.data()
                    })
                    this.setState({
                        users: users
                    })

                })
            }

        )
    }

    controlarCambios(email) {
        this.setState({ busqueda: email }, () => this.filtrarUsuarioEmail(this.state.busqueda))
    }

    filtrarUsuarioEmail(textoDelUsuario) {
        let emailFiltradas = this.state.emailInicial.filter(unEmail => unEmail.toLowerCase().includes(textoDelUsuario.toLowerCase()));
        this.setState({
            email: emailFiltradas,
        })
    }

    render() {
        return (

            <View>
                <Text>Buscador</Text>

                <FlatList
                    data={this.state.users}
                    keyExtractor={oneUser => oneUser.id.toString()}
                    renderItem={({ item }) => <>
                        <Text>{item.data.userName}</Text>
                        <Text>{item.data.email}</Text>
                    </>

                    }
                />

                <TextInput
                    placeholder='Busqueda de usuarios'
                    keyboardType='default'
                    onChangeText={email => this.controlarCambios(email)}
                    value={this.state.email}
                />

                {
                    this.state.email.length === 0 ?
                        <>No se encontraron resultados</>
                        :
                        <FlatList
                            data={this.state.users}
                            keyExtractor={oneUser => oneUser.id.toString()}
                            renderItem={({ item }) => <>
                                <Text>{item.data.userName}</Text>
                                <Text>{item.data.email}</Text>
                            </>

                            }
                        />
                }

            </View>
        )
    }
}

export default Profile

