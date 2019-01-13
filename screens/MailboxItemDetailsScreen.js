import React from 'react';
import { Icon, TouchableOpacity, Text, Image, View, ImageBackground, StyleSheet } from 'react-native';

export default class MailboxItemDetailsScreen extends React.Component {
  static navigationOptions = () => {
    return {
      title: 'Mailbox item details',
      headerStyle: {
        backgroundColor: '#1D9ED7'
      },
      headerTintColor: '#fff'
    };
  };

  constructor(props) {
    super(props);
    this.state = { 
      mailItemId: props.navigation.state.params.mailItemId,
      receivedAt: props.navigation.state.params.receivedAt, 
      statusIcon: props.navigation.state.params.statusIcon,
      snapshotUrl: props.navigation.state.params.snapshotUrl
    };
  }

  render() {
      return (
        <ImageBackground source={{uri: this.state.snapshotUrl}} style={styles.container}>
            <View style={styles.innerView}>
              <TouchableOpacity style={styles.innerTouchableContent}>
                  <Image style={styles.innerTouchableContentImage} source={{ uri: this.state.statusIcon }}/>
                  <Text>{this.state.receivedAt}</Text>
              </TouchableOpacity>
            </View>
        </ImageBackground>
      );
    }
  }

  const styles = StyleSheet.create({
      container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
      },
      innerView: {
        width: '90%', 
        height: '15%'
      },
      innerTouchableContent: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(255, 255, 255, .7)',
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'center'
      },
      innerTouchableContentImage: {
        width: 40, 
        height: 40
      }
  })