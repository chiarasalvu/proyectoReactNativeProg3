import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, TextInput } from 'react-native';
import { auth, db } from '../../firebase/config'
import Post from '../../components/Post/Post'

class Filter extends Component {
    constructor() {
        super();
        this.state = {
            users: [],
            filteredUsers: [],
            text: '',
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

    controlarCambios(textoDelUsuario) {

       const filteredUsers = this.state.users.filter(user => user.data.userName.toLowerCase().includes(textoDelUsuario.toLowerCase()));

       this.setState({
        filteredUsers, //ej: filteredUsers: filteredUsers
        text: textoDelUsuario
       })
    }

    render() {
        return (

            <View>
                <Text>Buscador</Text>

                <TextInput
                    placeholder='Busqueda de usuarios'
                    keyboardType='default'
                    onChangeText={text => this.controlarCambios(text)}
                    value={this.state.text}
                />


                {
                    this.state.text === '' ? 
                        <></>
                        :
                        this.state.filteredUsers.length === 0 ?
                            <>No se encontraron resultados</>
                            :
                            <FlatList
                                data={this.state.filteredUsers}
                                keyExtractor={oneUser => oneUser.id.toString()}
                                renderItem={({ item }) => <Text>{item.data.userName}</Text>} //navigate
                            />
                }

            </View>
        )
    }
}

export default Filter

