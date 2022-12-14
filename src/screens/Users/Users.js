import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { auth, db } from '../../firebase/config'
import Post from '../../components/Post/Post'

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      posts: [],
      loading: true
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
            users,
            loading: false
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
            posts,
            loading: false
          })

        })
      }

    )

  }

  render() {
    return (

      <View style={styles.container}>

        {this.state.loading ? <ActivityIndicator size='large' color='green'></ActivityIndicator> :
          <>
            <View style={styles.tamañoFlatlist}>
              <FlatList
                data={this.state.users}
                style={styles.flatList}
                keyExtractor={oneUser => oneUser.id.toString()}
                renderItem={({ item }) => <>
                 <Image
                    style={styles.photo}
                    source={{ uri: item.data.profilePhoto }}
                    resizeMode='cover'
                  />
                  <Text style={styles.contexto}>{item.data.userName}</Text>
                  <Text style={styles.contexto}>{item.data.email}</Text>
                  <Text style={styles.contexto}>{item.data.miniBio}</Text>
                  <Text> Cantidad de posteos: {this.state.posts.length}</Text>
                </>
                }
              />
            </View>

            <FlatList
              data={this.state.posts}
              keyExtractor={onePosts => onePosts.id.toString()}
              renderItem={({ item }) => <>
                <Post {...this.props} postData={item.data} id={item.id} />
                <Text>{item.data.textoPost}</Text>


              </>}

            />
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
  negrita: {
    fontWeight: 'bold',
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
  },
  photo: { 
    backgroundColor: '#fff',
    height: 80,
    width: 80,
    borderRadius: 50,
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 10
  }  

});

export default Users;

