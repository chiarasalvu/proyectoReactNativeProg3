import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, ActivityIndicator } from "react-native"
import React, { Component } from 'react'
import { db, auth } from '../../firebase/config'
import firebase from 'firebase';


class Comments extends Component {
    constructor(props) {
        super(props)
        this.state = {
            comments: '',
            id: this.props.route.params.id,
            post: [],
            loading: true
        }
    }


    componentDidMount() {
        db.collection('posts').doc(this.state.id).onSnapshot(
            doc => {
                this.setState({
                    post: doc.data(),
                    loading: false
                })
            }
        )
    }


    enviarComment(comments) {
        db.collection('posts')
            .doc(this.state.id) //id del documento a modificar
            .update({
                comments: firebase.firestore.FieldValue.arrayUnion({
                    owner: auth.currentUser.email,
                    comments: comments,
                    createdAt: Date.now()
                })
            })
            .then(() => {
                this.setState({
                    comments: ''
                })
            })
    }

    render() {
        return (

            <>
                {this.state.loading ? <ActivityIndicator size='large' color='green'></ActivityIndicator> :
                    <>
                        {
                            this.state.post.comments?.length === 0 ?
                                <Text style={styles.noComments}> Aún no hay comentarios</Text>
                                :
                                <>
                                    <FlatList
                                        data={this.state.post.comments}
                                        keyExtractor={oneComment => oneComment.createdAt.toString()}
                                        renderItem={({ item }) => <><Text style={styles.negrita}> {item.owner}: {item.comments}</Text> 
                                             </>}
                                    />
                                </>

                        }
                        <View style={styles.container}>

                            <TextInput
                                style={styles.field}
                                placeholder=' Agregá un comentario!'
                                keyboardType='default'
                                //poner propiedad para transformarlo en textArea
                                onChangeText={text => this.setState({ comments: text })}
                                value={this.state.comments}
                            />
                            <TouchableOpacity onPress={() => this.enviarComment(this.state.comments)}>
                                <Text>Comentar</Text>
                            </TouchableOpacity>

                        </View>
                    </>}
            </>

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
    
    noComments: {
        textAlign : 'center',
        padding: 7,
        backgroundColor:'#fff',
        fontSize: 20
    },
    negrita: {
        fontWeight: 'bold',

    }
});



export default Comments;

