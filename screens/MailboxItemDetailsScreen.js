import React from 'react';
import { TouchableOpacity, Text, Image, View, ImageBackground, StyleSheet } from 'react-native';
import Constants from '../constants/Constants'

export default class MailboxItemDetailsScreen extends React.Component {
  static navigationOptions = () => {
    return {
      title: Constants.MAILBOX_ITEM_DETAILS,
      headerStyle: {
        backgroundColor: '#C173E8'
      },
      headerTintColor: '#fff'
    };
  };

  constructor(props) {
    super(props);
    this.state = { 
      mailItemId: props.navigation.state.params.mailItemId,
      receivedAt: props.navigation.state.params.receivedAt, 
      itemStatus: props.navigation.state.params.itemStatus,
      snapshotUrl: props.navigation.state.params.snapshotUrl
    };
  }

  render() {
      let icon = this.state.itemStatus == 0 
                      ? require('../content/images/mailboxItemDeclined_Icon.png')
                      : require('../content/images/mailboxItemAccepted_Icon.png')
      return (
        <ImageBackground source={{uri: this.state.snapshotUrl}} style={styles.container}>
            <View style={styles.innerView}>
              <TouchableOpacity style={styles.innerTouchableContent}>
                  <Image style={styles.innerTouchableContentImage} source={icon} />
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