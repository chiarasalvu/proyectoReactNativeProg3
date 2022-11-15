import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { db } from '../../firebase/config'
import Post from '../../components/Post/Post'


class Home extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      loading: true
    }
  }

  componentDidMount() {
    db.collection('posts').orderBy('createdAt', 'desc').onSnapshot(
      docs => { 
        let posts = []; //si el array esta vacio podriamos poner que no hay resultados de busqueda
        docs.forEach(doc => {
          posts.push({
            id: doc.id,
            data: doc.data()
          })
          this.setState({
            posts: posts,
            loading: false
          })

        })
      }
      
      )

  }

  render() {
    return (
      
      <View style ={styles.container}>
        {this.state.loading ? <ActivityIndicator size='large' color='green'></ActivityIndicator> :
        <FlatList
          data={this.state.posts}
          keyExtractor={onePosts => onePosts.id.toString()}
          renderItem={({ item }) => <Post {...this.props} postData={item.data} id={item.id}/>} //Estamos destructurando todas las props que tiene el componente padre y pasandoselas al componente hijo
          
          /* Avalado por Facu */
        />}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  }
});

export default Home;

