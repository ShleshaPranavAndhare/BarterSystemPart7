import React from 'react';
import { Header } from 'react-native-elements';

const MyHeader = props => {
    return(
        <Header
        centerComponent={{ text: props.title, style: { color: '#fff', fontSize:30, fontWeight:"bold", } }}
        backgroundColor = "#F69400"
        />
    )
}

export default MyHeader;