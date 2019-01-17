import React from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    ActivityIndicator,
    TouchableOpacity
  } from "react-native";

import * as firebase from 'firebase';

export default class HomeScreen extends React.Component {
  static navigationOptions = () => {
    return {
      title: 'Mailboxes',
      headerStyle: {
        backgroundColor: '#C173E8',
      },
      headerTintColor: '#fff'
    };
  };

  constructor(){
    super()
    this.state = {
        dataSource: [],
        isLoading: true
    }
  }

  renderItem = ({item}) => {
    return (
      <TouchableOpacity style={styles.touchableContent}
          onPress = {() => this.props.navigation.navigate('MailboxItems', {
            mailboxId: item.mailboxId
          })}>
          <Image style={styles.touchableContentImage}
          source={{ uri: 'https://cdn2.iconfinder.com/data/icons/IconsLandVistaMapMarkersIconsDemo/256/MapMarker_Marker_Outside_Azure.png' }}
          />
          <View style={styles.touchableContentMainText}>
              <Text style={{ fontSize: 16, color: 'green' }}>
                  {item.city}, {item.zipCode}
              </Text>
              <Text style={{ fontSize: 13, marginBottom: 15 }}>
                  {item.address}
              </Text>
          </View>
          <View style={styles.touchableContentNumberOfMailItems}>
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                  ({item.numberOfMailItems})
              </Text>
          </View>
      </TouchableOpacity>
    )
}

renderSeparator = () => {
  return (
      <View
          style={{height: 1, width: '100%', backgroundColor: 'black'}}>
      </View>
  )
}

componentDidMount(){
  const url = 'https://us-central1-peepnee-backend.cloudfunctions.net/getMyMailboxes?userId='
              + firebase.auth().currentUser.uid

  fetch(url)
  .then((response) => response.json())
  .then((responseJson) => {
    this.setState({
        dataSource: responseJson,
        isLoading: false
    })
  })
  .catch((error) => {
    console.log(error)
  })
}

render(){
  return (
    this.state.isLoading
    ?
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="green" animating />
    </View>
    :
    <View style={styles.container}>
      <FlatList style={{marginTop: 30}}
          data={this.state.dataSource}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.mailboxId}
          ItemSeparatorComponent={this.renderSeparator}
      />
    </View>
  )
}
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#F5FCFF'
  },
  touchableContent: {
      flex: 1, 
      flexDirection: 'row', 
      marginBottom: 3
  },
  touchableContentImage: {
      width: 40, 
      height: 40, 
      margin: 5
  },
  touchableContentMainText: {
      flex: 1, 
      justifyContent: 'center'
  },
  touchableContentNumberOfMailItems:{
      justifyContent: 'flex-end',
      justifyContent: 'center',
      marginRight: 10
  }
});