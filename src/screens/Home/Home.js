import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { db } from '../../firebase/config'
import Post from '../../components/Post/Post'


class Home extends Component {
  constructor() {
    super();
    this.state = {
      posts: []
    }
  }

  componentDidMount() {
    db.collection('posts').onSnapshot(
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
      
      <View style ={styles.flatlist}>
        <Text>Perfil</Text>
        <FlatList
          data={this.state.posts}
          keyExtractor={onePosts => onePosts.id.toString()}
          renderItem={({ item }) => <Post {...this.props} postData={item.data} id={item.id}/>} //Estamos destructurando todas las props que tiene el componente padre y pasandoselas al componente hijo
          
          /* Avalado por Facu */
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
  flatlist : {
    width : '100%',
    flex: 1
  }
});

export default Home

