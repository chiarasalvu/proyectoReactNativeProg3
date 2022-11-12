import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { auth, db } from '../../firebase/config'
import Post from '../../components/Post/Post'

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      posts: [],
    }
  }

  componentDidMount() {
    db.collection('users').where('email', '==', this.props.route.params.email).onSnapshot(
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
    db.collection('posts').where('owner', '==', this.props.route.params.email).onSnapshot(
      docs => {
        let posts = []; //si el array esta vacio podriamos poner que no hay resultados de busqueda
        docs.forEach(doc => {
          posts.push({
            id: doc.id,
            data: doc.data()
          })
          this.setState({
            posts: posts
          })

        })
      }

    )

  }






  render() {
    return (

      <View style={styles.flatlist}>
        <Text>Perfil</Text>

        <FlatList
          data={this.state.users}
          keyExtractor={oneUser => oneUser.id.toString()}
          renderItem={({ item }) => <>
            <Text>{item.data.userName}</Text>
            <Text>{item.data.email}</Text>
            <Text>{item.data.miniBio}</Text>
            <Image
              style={styles.photo}
              source={{ uri: item.data.profilePhoto }}
              resizeMode='cover'
            />
          </>

          }
        />

        <Text style={styles.negrita}> Posteos </Text>

        <FlatList
          data={this.state.posts}
          keyExtractor={onePosts => onePosts.id.toString()}
          renderItem={({ item }) => <>
          
            <Text> Cantidad de posteos: {this.state.posts.length}</Text>
            <Post postData={item.data} id={item.id} />
            <Text>{item.data.textoPost}</Text>


          </>}

        />

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    textAlign: 'center',
    padding: 10
  },
  clickeable: {
    padding: 4,
    backgroundColor: '#ccc',
    marginBottom: 10,
    borderRadius: 4
  },
  negrita: {
    fontWeight: 'bold',
  },
  flatlist: {
    width: '100%',
    flex: 1
  }
});

export default Users

