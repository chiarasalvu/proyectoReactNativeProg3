import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList } from 'react-native';
import { db, auth } from '../../firebase/config';
import firebase from 'firebase';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';


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
                {this.props.postData.owner == auth.currentUser.email ?
                    <Text onPress={() => this.props.navigation.navigate('Profile')} ><Ionicons name="person-outline" size={20} color="black" /> {this.props.postData.owner}</Text>
                    :
                    <Text onPress={() => this.props.navigation.navigate('Users', { email: this.props.postData.owner })} > <Ionicons name="person-outline" size={20} color="black" /> {this.props.postData.owner}</Text>

                }
                <Image
                    style={styles.photo}
                    source={{ uri: this.props.postData.photo }}
                    resizeMode='cover'
                />
                {
                    this.state.miLike === false ?

                        <TouchableOpacity onPress={() => this.like()}>
                            <AntDesign name="hearto" size={20} color="black" />
                        </TouchableOpacity> :

                        <TouchableOpacity onPress={() => this.unlike()}>
                            <AntDesign name="heart" size={20} color="red" />
                        </TouchableOpacity>

                }
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Comments', { id: this.props.id })}>
                    <FontAwesome name="comment-o" size={24} color="black" />
                </TouchableOpacity>
                <Text  >Likes: {this.state.cantidadDeLikes} </Text>

                <Text>Comentarios: {this.props.postData.comments.length} </Text>
                {/* <FlatList //adicional
                    data={this.props.postData.comments}
                    keyExtractor={oneComment => oneComment.id.toString()}
                    renderItem={({ item }) => <Text>{item.text}</Text>}
                />  */}
                
                
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
        height: '60vh',
        width: '80vh'
    }
});

export default Post;