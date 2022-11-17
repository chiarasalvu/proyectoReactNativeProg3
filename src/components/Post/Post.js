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
                    <Text style={styles.contexto} onPress={() => this.props.navigation.navigate('Profile', {id: this.props.id})} ><Ionicons name="person-outline" size={20} color="black" /> {this.props.postData.owner}</Text>
                    :
                    <Text style={styles.contexto} onPress={() => this.props.navigation.navigate('Users', { email: this.props.postData.owner })} > <Ionicons name="person-outline" size={20} color="black" /> {this.props.postData.owner}</Text>

                }
                <Image
                    style={styles.photo}
                    source={{ uri: this.props.postData.photo }}
                    resizeMode='cover'
                />
                <View style={styles.container}>
                {
                    this.state.miLike === false ?

                        <TouchableOpacity style={styles.botones} onPress={() => this.like()}>
                            <AntDesign name="hearto" size={20} color="black" />
                        </TouchableOpacity> :

                        <TouchableOpacity style={styles.botones} onPress={() => this.unlike()}>
                            <AntDesign name="heart" size={20} color="red" />
                        </TouchableOpacity>

                }
                <TouchableOpacity style={styles.botones} onPress={() => this.props.navigation.navigate('Comments', { id: this.props.id })}>
                    <FontAwesome name="comment-o" size={24} color="black" />
                </TouchableOpacity>
                </View>
                <Text style={styles.contexto}>Likes: {this.state.cantidadDeLikes} </Text>

                <Text style={styles.contexto}>Comentarios: {this.props.postData.comments.length} </Text>
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
        flex: 1,
        backgroundColor: '#fff',
        width : '100%',
        
        
    },
    contexto: {
        alignItems : 'flex-start',
        padding: 7,
        marginBottom: 10,
        
    },
    botones: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems : 'flex-start',
        padding: 7,
        marginBottom: 10,
        width: '40%',
        
        
    },
    negrita: {
        fontWeight: 'bold',
    },
    photo: {
        height: 350,
        alignItems : 'center',
        borderWidth: 2,
        borderColor: 'black',
        
    }
});

export default Post;