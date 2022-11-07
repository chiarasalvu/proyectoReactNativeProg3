import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList } from 'react-native';
import { db, auth } from '../../firebase/config';
import firebase from 'firebase';

class Post extends Component {

    constructor(props) {
        super(props)
        this.state = {
            cantidadDeLikes: this.props.postData.likes.length,
            miLike: false
        }
    }

    componentDidMount() {
        if (this.props.postData.likes.includes(auth.currentUser.email)) {
            this.setState({
                miLike: true
            })
        }
    }

    like() {
        db.collection('posts')
            .doc(this.props.id)
            .update({
                likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
            })
            .then(() => this.setState({
                cantidadDeLikes: this.state.cantidadDeLikes + 1,
                miLike: true
            }))
            .catch(e => console.log(e))
    }

    unlike() {
        db.collection('posts')
            .doc(this.props.id)
            .update({
                likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
            })
            .then(() => this.setState({
                cantidadDeLikes: this.state.cantidadDeLikes - 1,
                miLike: false
            }))
            .catch(e => console.log(e))
    }

    render() {
        return (

            <View style={styles.container}>
                <Text style={styles.negrita}> Posteos </Text>

                <Text onPress={() => this.props.navigation.navigate('Profile')} >Nombre del Usurario: {this.props.postData.userName}</Text>
                <Image
                    style={styles.photo}
                    source={{ uri: this.props.postData.photo }}
                    resizeMode='cover'
                />
                <Text>Likes: {this.state.cantidadDeLikes} </Text>
                <FlatList
                    data={this.props.postData.comments}
                    keyExtractor={oneComment => oneComment.id.toString()}
                    renderItem={({ item }) => <Text>{item.text}</Text>}
                />
                <TouchableOpacity  onPress={() => this.props.navigation.navigate('Comments')}>
                    <Text>Comentar</Text>
                </TouchableOpacity>
                {
                    this.state.miLike === false ?

                        <TouchableOpacity onPress={() => this.like()}>
                            <Text>Me Gusta</Text>
                        </TouchableOpacity> :

                        <TouchableOpacity onPress={() => this.unlike()}>
                            <Text>No Me Gusta</Text>
                        </TouchableOpacity>

                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginRigth: 5,
        marginLeft: 5
    },
    clickeable: {
        padding: 7,
        backgroundColor: 'rgba(0, 255, 0, 0.5)',
        marginBottom: 10,
        borderRadius: 4
    },
    negrita: {
        fontWeight: 'bold',
    },
    photo: {
        height: '40vh'
    }
});

export default Post;