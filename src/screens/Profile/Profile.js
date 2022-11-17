import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { auth, db } from '../../firebase/config'
import Post from '../../components/Post/Post'
import { AntDesign } from '@expo/vector-icons';
import MyCamera from '../../components/Camera/Camera';


class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      posts: [],
      usuarioLogueado: auth.currentUser.email,
      // loading: true,
      loading: false,
      profilePhoto: '',
      showCamara: false,


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
            users: users,
            loading: false,

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
            posts,
            loading: false
          })


        })
      }

    )

  }

  borrarFoto(id) {
    let alert = confirm('¿Desea borrar el posteo?')
    {
      alert ? db.collection('posts').doc(id).delete() : console.log('No deseo borrar');
    }

  }

  logout() {
    auth.signOut()
      .then(() => this.props.navigation.navigate('Login'))

      .catch(e => console.log(e))
  }


  eliminarPerfil() {

    db.collection("users").doc(this.props.id).delete()
      .then(() => {
        auth.currentUser.delete()
      })
      .then(() => {
        this.props.navigation.navigate('Register')

      })
      .catch(e => console.log(e))
  }


  onImageUpload(url) {
    this.setState({
      profilePhoto: url,
      showCamara: false,
    })
  }


  updatePhoto() {
    db.collection('users')
      .doc(this.state.user.id)
      .update({
        profilePhoto
      })
      .catch(e => console.log(e))
  }




  render() {
    return (

      <View style={styles.container}>

        {this.state.loading ? <ActivityIndicator size='large' color='blue'></ActivityIndicator> :
          <>
            <View style={styles.tamañoFlatlist}>
              <FlatList
                style={styles.flatList}
                data={this.state.users}
                keyExtractor={oneUser => oneUser.id.toString()}
                renderItem={({ item }) => <>
                  <Text style={styles.contexto} >Usuario: {item.data.userName}</Text>
                  <Text style={styles.contexto} >Email del Usuario{item.data.email}</Text>
                  <Text style={styles.contexto} >Descripción: {item.data.miniBio}</Text>
                  {
                    this.state.showCamara ?

                      <View>
                        <MyCamera onImageUpload={url => this.onImageUpload(url)} />
                      </View>

                      :

                      <>
                        <TouchableOpacity style={styles.field} onPress={() => this.setState({ showCamara: true })}>
                          <Text style={styles.letra}> Tocá para sacarte una foto de perfil </Text>
                        </TouchableOpacity>

                        {
                          this.state.showCamara == false ?
                            '' :
                            <TouchableOpacity style={styles.field} onPress={() => this.updatePhoto()}>
                              <Text style={styles.letra}> Confirmar </Text>
                            </TouchableOpacity>
                        }
                      </>






                  }
                  <Image
                    style={styles.photo}
                    source={{ uri: item.data.profilePhoto }}
                    resizeMode='cover'
                  />

                  <Text> Cantidad de posteos: {this.state.posts.length}</Text>
                </>

                }
              />
            </View>


            <FlatList
              data={this.state.posts}
              keyExtractor={onePosts => onePosts.id.toString()}
              renderItem={({ item }) => <>

                <Post postData={item.data} id={item.id} />
                <Text style={styles.contexto} >{item.data.textoPost}</Text>

                <TouchableOpacity onPress={() => this.borrarFoto(item.id)}>
                  <Text style={styles.contexto} > <AntDesign name="delete" size={20} color="black" />  Borrar posteo</Text>
                </TouchableOpacity>


              </>}

            />

            <TouchableOpacity onPress={() => this.eliminarPerfil()}>
              <Text style={styles.contexto}> <AntDesign name="deleteuser" size={20} color="black" />   Eliminar Perfil</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.logout()} >
              <Text style={styles.contexto}> <AntDesign name="logout" size={20} color="black" />   Cerrar sesión</Text>
            </TouchableOpacity>



          </>}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

  },
  clickeable: {
    padding: 4,
    backgroundColor: '#ccc',
    marginBottom: 10,
    borderRadius: 4
  },

  contexto: {
    alignItems: 'flex-start',
    padding: 7,
    marginBottom: 10,

  },
  flatList: {
    borderWidth: 2,
    borderColor: 'black',
  },
  tamañoFlatlist: {
    height: '20%'
  }
});

export default Profile

