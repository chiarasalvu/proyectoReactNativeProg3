import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { auth, db } from '../../firebase/config'
import { MaterialIcons } from '@expo/vector-icons';

class Filter extends Component {
    constructor() {
        super();
        this.state = {
            users: [],
            filteredUsers: [],
            text: '',
            loading: true
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
                        users: users,
                        loading: false
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
            
            <View style={styles.container}>
                <MaterialIcons name="person-search" size={40} color="black" />
                {this.state.loading ? <ActivityIndicator size='large' color='green'></ActivityIndicator> :
                    <>
                        <TextInput 
                        style={styles.field}
                            placeholder='Búsqueda de usuarios'
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
                    </>}
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

export default Filter

