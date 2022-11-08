import React, { Component } from 'react';
import { Camera } from 'expo-camera';
import { storage } from '../../firebase/config';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

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
            .catch(e => console.log(e))
    }

    cancelarFoto() {
        
    }

    guardarFoto(){
        fetch(this.state.temporaryURL) //buscar la foto de la carpeta temporal en nuestra máquina
        //blob--> foto tipo de dato binario. cuanodo haces un fetch, hace un pedido y trae un monton de cosas. nosotros queremos que saque todo y que se quede con la foto. es el equivalente al JSON pero de foto
        //ref--> metodo de firebase 
        //put--> guarda la foto en firebase. guarda la foto xq es lo que recibo del primer .then()
        //getDownloadURL--> me da la url de la foto
            .then(res=> res.blob()) //quedarnos con la foto en formato binario
            .then( image => { //ya podemos trabajar el dato final
                //crear el destino y nombre con el que se guarda la foto en storage
                const refStorage = storage.ref(`photos/${Date.now()}.jpg`);
                refStorage.put(image) //mandar la foto al storage. put es asincronico entonces tiene un .then()
                    .then(()=>{
                        refStorage.getDownloadURL() //url publica de firebase
                            .then( url=> this.props.onImageUpload(url)) 
                    } )
            })
            .catch( error => console.log(error))
    }


    render() {
        return (
            <View>
                {
                    this.state.permissions ?
                    this.state.showCamera ?
                        <View style={styles.cameraStyle}>
                            <Camera
                                style={styles.cameraStyle}
                                type={Camera.Constants.Type.front}
                                ref={metodosDeCamara => this.metodosDeCamara = metodosDeCamara}
                            />
                            <TouchableOpacity style={styles.button} onPress={() => this.sacarFoto()}>
                                <Text>Sacar foto</Text>
                            </TouchableOpacity>
                        </View>
                        :

                        <View  style={styles.preview}>
                            <Image
                                style={styles.preview}
                                source={{uri: this.state.temporaryURL}}
                            resizeMode= 'cover'
                        />
                            <TouchableOpacity onPress={() => this.cancelarFoto()}>
                                <Text> Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.guardarFoto()}>
                                <Text> Aceptar</Text>
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
    cameraStyle: {
        height: '80vh',
    },
    button: {
        height: '20vh',
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 5,
        borderRadius: 4,
        marginTop: 20
    },
    preview: {
        height: '40vh'
    }
})

export default MyCamera;