import React, { Component } from 'react';
import { Camera } from 'expo-camera';
import { storage } from '../../firebase/config';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

class MyCamera extends Component {
    constructor(props) {
        super(props);
        this.state = {
            permissions: false,
            showCamera: true,
            temporaryURL: ''
        }

        this.metodosDeCamara = ''
    }

    componentDidMount() {
        Camera.requestCameraPermissionsAsync()
            .then(() => this.setState({
                permissions: true
            }))
            .catch(e => console.log(e))
    }

    sacarFoto() {
        //Aca hay que usar los métodos de la cámara
        this.metodosDeCamara.takePictureAsync()
            .then(photo => {
                this.setState({
                    temporaryURL: photo.uri,
                    showCamera: false
                })
            })
            .catch(error => console.log(error))
    }

    cancelarFoto() {

        this.setState({
            temporaryURL: '',
            showCamera: true
        })


    }

    guardarFoto() {
        fetch(this.state.temporaryURL) //buscar la foto de la carpeta temporal en nuestra máquina
            //blob--> foto tipo de dato binario. cuanodo haces un fetch, hace un pedido y trae un monton de cosas. nosotros queremos que saque todo y que se quede con la foto. es el equivalente al JSON pero de foto
            //ref--> metodo de firebase 
            //put--> guarda la foto en firebase. guarda la foto xq es lo que recibo del primer .then()
            //getDownloadURL--> me da la url de la foto
            .then(res => res.blob()) //quedarnos con la foto en formato binario
            .then(image => { //ya podemos trabajar el dato final
                //crear el destino y nombre con el que se guarda la foto en storage
                const refStorage = storage.ref(`photos/${Date.now()}.jpg`);
                refStorage.put(image) //mandar la foto al storage. put es asincronico entonces tiene un .then()
                    .then(() => {
                        refStorage.getDownloadURL() //url publica de firebase
                            .then(url => this.props.onImageUpload(url))
                    })
            })
            .catch(error => console.log(error))
    }


    render() {
        return (
            <View style={styles.container}>
                {
                    this.state.permissions ?
                        this.state.showCamera ?
                            <View style={styles.container}>
                                <Camera
                                    type={Camera.Constants.Type.front}
                                    ref={metodosDeCamara => this.metodosDeCamara = metodosDeCamara}
                                />
                                <TouchableOpacity style={styles.button} onPress={() => this.sacarFoto()}>
                                    <AntDesign name="camerao" size={24} color="black" />
                                </TouchableOpacity>
                            </View>
                            :

                            <View style={styles.preview}>
                                <TouchableOpacity onPress={() => this.cancelarFoto()} style={styles.buttonsPreview} >
                                    <AntDesign name="close" size={30} color="red" />
                                </TouchableOpacity>
                                <Image
                                    style={styles.preview}
                                    source={{ uri: this.state.temporaryURL }}
                                    resizeMode='cover'
                                />

                                <TouchableOpacity onPress={() => this.guardarFoto()} >
                                    <MaterialIcons name="arrow-forward" size={30} color="green" />
                                </TouchableOpacity>
                            </View>
                        :
                        <Text>No tengo permisos</Text>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        width: '100%'

    },
    cameraStyle: {
        height: 275,
        justifyContent: 'center'

    },
    button: {
        height: '4%',
        width: '2%',
        borderColor: 'white',
        borderWidth: 1,
        padding: 5,
        borderRadius: 4,
        marginTop: 20,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    preview: {
        height: '70%',
        justifyContent: 'center'
    }
})

export default MyCamera;