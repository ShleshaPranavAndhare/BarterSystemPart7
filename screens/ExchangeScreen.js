import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Alert } from 'react-native';
import db from '../config';
import firebase from 'firebase';
import Header from '../components/Header';

export default class ExchangeScreen extends React.Component {
    constructor() {
        super();
        this.state ={
            userId: firebase.auth().currentUser.email,
            itemName: '',
            description: ''
        }
    }

    addItem = (itemName, description) =>{
        var userName = this.state.userId

        db.collection("exchange_requests").add({
            "username": userName,
            "item_name": itemName,
            "description": description
        })

        this.setState({
            itemName: '',
            description: ''
        })

        return Alert.alert(
            'Item ready to exchange',
            '',
            [
                {text: 'OK', onPress: () => {
                    this.props.navigation.navigate('HomeScreen')
                }}
            ]
        );
    }
    render() {
        return(
            <View style = {{
                flex: 1
            }}>
                <Header title = "Add Item"/>
                <KeyboardAvoidingView style = {styles.keyboard}>
                    <TextInput
                    style = {styles.addItem}
                    placeholder = "Enter Item Name"
                    onChangeText = {(text) =>{
                        this.setState({
                            itemName: text
                        })
                    }}
                    value = {this.state.itemName}/>
                    <TextInput
                    style = {[styles.addItem, {height: 300}]}
                    multiline
                    numberOfLines = {8}
                    placeholder = "Why do you want this item?"
                    onChangeText = {(text) =>{
                        this.setState({
                            description: text
                        })
                    }}
                    value = {this.state.description}/>
                    <TouchableOpacity
                    style = {styles.button}
                    onPress = {() =>{
                        this.addItem(this.state.itemName, this.state.description)
                    }}>
                        <Text style = {{color: '#fff', fontSize: 20}}>Add Item</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    keyboard: {
      flex:1,
      alignItems:'center',
      justifyContent:'center',
      backgroundColor: '#FFE0B2'
    },
    addItem:{
      width:"75%",
      height:50,
      alignSelf:'center',
      borderColor:'#806F2D',
      borderRadius:10,
      borderWidth:1,
      marginTop:20,
      padding:10,
      backgroundColor: '#FFEDA6',
      fontSize: 20,
      color: '#806F2D'
    },
    button:{
      width:"75%",
      height:50,
      justifyContent:'center',
      alignItems:'center',
      borderRadius:10,
      backgroundColor:"#DEAC35",
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 8,
      },
      shadowOpacity: 0.44,
      shadowRadius: 10.32,
      elevation: 16,
      marginTop:20
      },
    }
  )
  