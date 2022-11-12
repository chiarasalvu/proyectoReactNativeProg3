import { View, Text, StyleSheet } from "react-native"
import React, { Component } from 'react'
import { db, auth } from '../../firebase/config'
import firebase from 'firebase';


class Comments extends Component {
    constructor(props) {
        super(props)
        this.state = {
            comments: '',
            id: this.props.match.params.id
        }
    }


    // componentDidMount() {
    //     db.collection('posts').onSnapshot(
    //         docs => {
    //             let posts = [];
    //             docs.forEach(doc => {
    //                 posts.push({
    //                     id: doc.id,
    //                     data: doc.data()
    //                 })
    //                     .then(() => this.setState({
    //                         comments: ''
    //                     }))
    //                     .catch(e => console.log(e))

    //             })
    //         }
    //     )
    // }

    
    enviarComment(comments){
        db.collection('posts')
        .doc(this.state.id)
        .update({
            comments: firebase.firestore.FieldValue.arrayUnion({
                owner: auth.currentUser.email,
                comments:comments,
                createdAt: Date.now()
            })
        })
        .then( () => {
            this.setState({
                comments: ''
            })
        })
    }

render(){
    <Text> Comentarios del post</Text>

}
}

export default Comments;


