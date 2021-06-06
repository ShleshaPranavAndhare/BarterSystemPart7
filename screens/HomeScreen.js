import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native';
import db from '../config';
import firebase from 'firebase';
import Header from '../components/Header';
import { ListItem } from 'react-native-elements';

export default class HomeScreen extends React.Component {
    constructor() {
        super();
        this.state ={
            allItems: []
        }
        this.exchangeRef = null;
    }

    getAllItems = () =>{
        this.exchangeRef = db.collection("exchange_requests")
        .onSnapshot((snapshot)=>{
            var allItems = snapshot.docs.map(document => document.data());
            this.setState({
                allItems: allItems
            })
        })
    }

    componentDidMount() {
        this.getAllItems()
    }

    componentWillUnmount() {
        this.exchangeRef();
    }

    keyExtractor = (item, index) => index.toString()

    renderItem = ( {item, i} ) =>{
        return (
            <ListItem 
                key = {i} 
                title={item.item_name}
                subtitle={item.description}
                titleStyle={{color: 'black', fontWeight: 'bold'}}
                rightElement={
                    <TouchableOpacity style={styles.button}
                        onPress={()=>{
                            this.props.navigation.navigate("RecieverDetails",{"details": item})
                        }}
                    >
                        <Text style={{color: 'red', borderColor: 'black'}}>Exchange </Text>
                    </TouchableOpacity>
                }
                bottomDivider 
                />
        )
    }

    render() {
        return(
        <View style = {{flex: 1, backgroundColor: '#FFE0B2'}}>
            <Header title = "Home"/>
            <View style = {{flex: 1}}>
            {
                this.state.allItems.length === 0
                ?(
                <View style = {styles.default}>
                    <Text style = {{fontSize: 20, color: '#5C5127', fontWeight: 'bold'}}>All requested items</Text>
                </View>
                )
                :(
                <FlatList
                    keyExtractor = {this.keyExtractor}
                    data = {this.state.allItems}
                    renderItem = {this.renderItem}
                />
                )
            }
            </View>
        </View>
        )
    }
}

const styles = StyleSheet.create({
    default:{
      flex:1,
      fontSize:20,
      justifyContent:'center',
      alignItems:'center'
    },
    view:{
      width:100,
      height:30,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:"#F69400",
      shadowColor: "#000",
      shadowOffset: {
         width:0,
         height:8
       }
    }
  })