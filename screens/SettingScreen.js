import React, {Component} from 'react';
import {View, Text, TextInput, Alert, TouchableOpacity, StyleSheet} from 'react-native';
import {TextComponent} from 'react-native';
import Header from '../components/Header';
import firebase from 'firebase';
import db from '../config';

export default class SettingScreen extends Component{
    constructor(){
        super();
        this.state={
            emailId   : '',
            firstName : '',
            lastName  : '',
            address   : '',
            contact   : '',
            docId     : ''
        }
    }

    getUserDetails(){
        var user=firebase.auth().currentUser;
        var email=user.email

        db.collection('users').where('email_id', '==', email).get()
        .then(snapshot => {
            snapshot.forEach(doc =>{
                var data=doc.data()
                this.setState({
                    emailId: data.email_id,
                    firstName: data.first_name,
                    lastName: data.last_name,
                    address: data.address,
                    contact: data.contact,
                    docId: doc.id
                })
            })
        })
    }

    updateUserDetails=()=>{
        db.collection('users').doc(this.state.docId)
        .update({
            "first_name": this.state.firstName,
            "last_name" : this.state.lastName,
            "address": this.state.address,
            "contact": this.state.contact
        })

        Alert.alert("Profile Updated Successfully")
    }

    componentDidMount(){
        this.getUserDetails();
    }

    render(){
        return(
            <View style={styles.container}>
                <Header title="Setting" navigation={this.props.navigation}/>
                <View style={styles.formContainer}>
                    <TextInput
                        style={styles.formTextInput}
                        placeholder={"First Name"}
                        maxLength={8}
                        onChangeText={(text)=>{
                            this.setState({
                                firstName: text
                            })
                        }}
                        value={this.state.firstName}
                    />

                    <TextInput
                        style={styles.formTextInput}
                        placeholder={"Last Name"}
                        maxLength={8}
                        onChangeText={(text)=>{
                            this.setState({
                                lastName: text
                            })
                        }}
                        value={this.state.lastName}
                    />

                    <TextInput
                        style={styles.formTextInput}
                        placeholder={"Contact"}
                        maxLength={10}
                        keyboardType={'numeric'}
                        onChangeText={(text)=>{
                            this.setState({
                                contact: text
                            })
                        }}
                        value={this.state.contact}
                    />

                    <TextInput
                        style={styles.formTextInput}
                        placeholder={"Address"}
                        multiline={true}
                        onChangeText={(text)=>{
                            this.setState({
                                address: text
                            })
                        }}
                        value={this.state.address}
                    />

                    <TouchableOpacity style={styles.button}
                        onPress={()=>{
                            this.updateUserDetails()
                        }}>
                        <Text style={styles.buttonText}>Save to update Profile</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    formContainer:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    formTextInput:{
        marginTop: 10,
        width: 300,
        height: 30,
        backgroundColor: 'yellow',
        color: 'red'
    },
    button:{
        marginTop: 20,
        width: 200,
        height: 30,
        backgroundColor: 'purple',
        color: 'red'
    },
    buttonText:{
        textAlign: 'center',
        fontSize: 15,
        color: 'white'
    }
})