import Raect, {Component} from 'react';
import {View, Text} from 'react-native';
import {Card, Header, Icon} from 'react-native-elements';
import firebase from 'firebase';
import db from '../config';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class ItemDetailsScreen extends Component{
    constructor(props){
        super(props)
        this.state={
            userId: firebase.auth().currentUser.email,
            reciverId : this.props.navigation.getParam('details')["user_id"],
            requestId : this.props.navigation.getParam('details')["request_id"],
            bookName  : this.props.navigation.navigate('details')["book_name"],
            reason_for_requesting : this.props.navigation.getParam('details')["reason_to_request"],
            recieverName : '',
            recieverContact : '',
            recieverAddress : '',
            recieverRequestDocId : ''
        }
    }

    getRecieverDetails(){
        db.collection('users').where('email_id', '==', this.state.reciverId).get()
        .then(snapshot=>{
            snapshot.forEach(doc=>{
                this.setState({
                    recieverName : doc.data().first_name, 
                    recieverContact: doc.data().contact,
                    recieverAddress: doc.data().address
                })
            })
        })

        db.collection('request_items').where('request_id', '==', this.state.requestId).get()
        .then(snapshot=>{
            snapshot.forEach(doc=>{
                this.setState({recieverRequestDocId: doc.id})
            })
        })}

        updateItemStatus=()=>{
            db.collection('all_donations').add({
                book_name : this.state.bookName,
                request_id: this.state.requestId,
                requested_by: this.state.recieverName,
                donor_id: this.state.userId,
                requestStatus: "Donor Intrested"
            })
        }

    render(){
        return(
            <View style={styles.container}>
                <View style={{flex: 0.1}}>
                    <Header
                        leftComponent={<Icon name='arrow-left' type='feather' color='#696969' onPress={()=> this.props.navigation.goBack()}/>}
                        centerComponent={{text: "Donate Item", style={color: '#90A5A9', fontSize: 20, fontWeight: "bold"}}}
                        backgroundColor="#eaf8fe"
                    />
                </View>     
                <View style={{flex: 0.3}}>
                    <Card
                        title={"Book Information"}
                        titleStyle={{fontSize: 20}}
                    >
                    <Card>
                        <Text style={{fontWeight: 'bold'}}>Name : {this.state.bookName}</Text>
                    </Card>
                    <Card>
                        <Text style={{fontWeight: 'bold'}}>Reason: {this.state.reason_for_requesting}</Text>
                    </Card>
                    </Card>
                </View>
                <View style={{flex: 0.3}}>
                    <Card
                        title={"Reciever Details"}
                        titleStyle={{fontSize: 20}}
                    >
                    <Card>
                        <Text style={{fontWeight: 'bold'}}>Name: {this.state.recieverName}</Text>
                    </Card>
                    <Card>
                        <Text style={{fontWeight: 'bold'}}>Contact: {this.state.recieverContact}</Text>
                    </Card>
                    <Card>
                        <Text style={{fontWeight: 'bold'}}> Address: {this.state.recieverAddress}</Text>
                    </Card>
                    </Card>
                </View>
                <View style={styles.buttonContainer}>
                    {
                        this.state.reciverId !== this.state.userId
                        ?(
                            <TouchableOpacity
                                style={styles.button}
                                onPress={()=>{
                                    this.updateItemStatus()
                                    this.props.navigation.navigate('My Donations')
                                }}>
                                <Text>I want to donate</Text>
                            </TouchableOpacity>
                        )
                        :null
                    }
                </View>    
            </View>
        )
    }
}