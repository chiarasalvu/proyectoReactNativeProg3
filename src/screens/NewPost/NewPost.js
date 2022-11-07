import React, { Component } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { auth, db } from '../../firebase/config';
import MyCamara from '../../components/Camera/Camera';


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
            <View>
                {
                    this.state.showCamara ?
                        <MyCamara onImageUpload= { url => this.onImageUpload(url)}/>
                        :
                        <View>
                            <Text> Nuevo posteo </Text>
                            <View>
                                <TextInput
                                    placeholder='texto post'
                                    keyboardType='default'
                                    //poner propiedad para transformarlo en textArea
                                    onChangeText={text => this.setState({ textoPost: text })}
                                    value={this.state.textoPost}
                                />
                                <TouchableOpacity onPress={() => this.createPost(this.state.textoPost, this.state.photo)}>
                                    <Text>Guardar</Text>
                                </TouchableOpacity>
                            </View>


                        </View>
                }

            </View>
        )
    }
}

export default NewPost;