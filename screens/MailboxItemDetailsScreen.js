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

    console.log(this.state.statusIcon)
  }

  render() {
      return (
        <ImageBackground source={{uri: this.state.snapshotUrl}} style={styles.container}>
            <TouchableOpacity style={styles.navBarLeftButton}>
              <Image style={{ width: 40, height: 40, margin: 5 }}
                source={{ uri: this.state.statusIcon }}
              />
              <Text style={styles.buttonText}>{this.state.receivedAt}</Text>
            </TouchableOpacity>
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
      inner: {
        width: '90%',
        height: '10%',
        backgroundColor: 'rgba(255, 255, 255, .7)'
      },
      navBarLeftButton: {
        width: '90%',
        height: '10%',
        backgroundColor: 'rgba(255, 255, 255, .7)',
        paddingLeft: 8,
        //width: 100,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        //justifyContent: 'flex-start'
      }
  })