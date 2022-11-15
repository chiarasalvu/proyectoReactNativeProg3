import React, { Component } from 'react'
import { Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';
import { auth, db } from '../../firebase/config';
import MyCamera from '../../components/Camera/Camera';



class NewPost extends Component {
    constructor() {
        super()
        this.state = {
            textoPost: '',
            createdAt: '',
            photo: '',
            showCamara: true,
        }
    }


    createPost(texto, photo) {
        db.collection('posts').add({
            owner: auth.currentUser.email,
            textoPost: texto,
            photo: photo,
            likes: [],
            comments: [],
            createdAt: Date.now()
        })
            .then(() => {
                this.setState({
                    textoPost: '',
                    showCamara: true,
                })
                this.props.navigation.navigate('Home')
            })
            .catch(error => console.log(error))
    }

    onImageUpload(url){
        this.setState({
            photo: url,
            showCamara: false,
        })
    }

    render() {
        return (
            <View style={styles.container}>
                {
                    this.state.showCamara ?
                        <MyCamera onImageUpload= { url => this.onImageUpload(url)}/>
                        :
                            <View style={styles.container}>
                                <TextInput
                                style={styles.field}
                                    placeholder='Enviar una descripción...'
                                    keyboardType='default'
                                    //poner propiedad para transformarlo en textArea
                                    onChangeText={text => this.setState({ textoPost: text })}
                                    value={this.state.textoPost}
                                />
                                <TouchableOpacity onPress={() => this.createPost(this.state.textoPost, this.state.photo)}>
                                    <Text>Guardar</Text>
                                </TouchableOpacity>
                            </View>
                }

            </View>
        )
    }
}

const styles = StyleSheet.create({
    field: {
        display: 'flex',
        height: 40,
        margin: 15,
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

export default NewPost;
