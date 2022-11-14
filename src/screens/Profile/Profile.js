import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { auth, db } from '../../firebase/config'
import Post from '../../components/Post/Post'
import { AntDesign } from '@expo/vector-icons';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      posts: []
    }
  }

  componentDidMount() {
    db.collection('users').where('email', '==', auth.currentUser.email).onSnapshot(
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
    db.collection('posts').where('owner', '==', auth.currentUser.email).onSnapshot(
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

  borrarFoto(id) {
    db.collection('posts').doc(id).delete()
  }

  logout() {
    auth.signOut()
      .then(() => this.props.navigation.navigate('Login'))

      .catch(e => console.log(e))
  }




  render() {
    return (

      <View style={styles.container}>
        <Text>Perfil</Text>

        <FlatList
          style={styles.flatList}
          data={this.state.users}
          keyExtractor={oneUser => oneUser.id.toString()}
          renderItem={({ item }) => <>
            <Text style={styles.contexto} >{item.data.userName}</Text>
            <Text style={styles.contexto} >{item.data.email}</Text>
            <Text style={styles.contexto} >{item.data.miniBio}</Text>
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
            <Text style={styles.contexto} >{item.data.textoPost}</Text>

            <TouchableOpacity onPress={() => this.borrarFoto(item.id)}>
              <Text style={styles.contexto} > <AntDesign name="delete" size={20} color="black" />  Borrar posteo</Text>
            </TouchableOpacity>


          </>} //Estamos destructurando todas las props que tiene el componente padre y pasandoselas al componente hijo

        /* Avalado por Facu */

        />

        <TouchableOpacity onPress={() => this.logout()}>
          <Text style={styles.container}> <AntDesign name="logout" size={20} color="black" />   Cerrar sesión</Text>
        </TouchableOpacity>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
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
  contexto: {
    alignItems: 'flex-start',
    padding: 7,
    marginBottom: 10,
  },
  flatList: {
    //ayuda
  }
});

export default Profile

