import React from 'react';
import { 
  View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    ActivityIndicator,
    TouchableOpacity 
  } from 'react-native';

export default class MailboxItemsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      observedMailboxId: props.navigation.state.params.mailboxId,
      mailboxItems: [],
      isLoading: true,
      stateIconsMapping:{
        0: 'https://img.icons8.com/cotton/2x/cancel.png',
        1: 'https://cdn.pixabay.com/photo/2017/01/13/01/22/ok-1976099__340.png'
      }
    };
  }

  static navigationOptions = () => {
    return {
      title: 'Mailbox items',
      headerStyle: {
        backgroundColor: '#1D9ED7'
      },
      headerTintColor: '#fff'
    };
  };

  componentDidMount(){
    const url = 'https://us-central1-peepnee-backend.cloudfunctions.net/getMailboxItems?mailboxId='
                + this.state.observedMailboxId
  
    fetch(url)
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
          mailboxItems: responseJson,
          isLoading: false
      })
    })
    .catch((error) => {
      console.log(error)
    })
  }

  renderItem = ({item}) => {
    return (
      <TouchableOpacity style={{ flex: 1, flexDirection: 'row', marginBottom: 3 }}
          onPress = {() => this.props.navigation.navigate('MailboxItemDetails', {
            mailItemId: item.mailItemId,
            receivedAt: item.receivedAt,
            statusIcon: this.state.stateIconsMapping[item.status],
            snapshotUrl: item.snapshotUrl
          })}>
          <Image style={{ width: 40, height: 40, margin: 5 }}
          source={{ uri: this.state.stateIconsMapping[item.status] }}
          />
          <View style={{ flex: 1, justifyContent: 'center' }}>
              <Text style={{ fontSize: 16, color: 'green' }}>
                  {item.receivedAt}
              </Text>
              <Text style={{ fontSize: 13, marginBottom: 15 }}>
                  {item.ocrText}
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

  render() {
    return (
    this.state.isLoading
    ?
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="green" animating />
    </View>
    :
    <View style={styles.container}>
      <FlatList style={{marginTop: 30}}
          data={this.state.mailboxItems}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.mailItemId}
          ItemSeparatorComponent={this.renderSeparator}
      />
    </View>
    );
    }
  }

  const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF'
    }
  });