import React from 'react';
import { 
  View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    ActivityIndicator,
    TouchableOpacity ,
    Button
  } from 'react-native';

export default class MailboxItemsScreen extends React.Component {
  static navigationOptions = (props) => {
    return {
      title: 'Items',
      headerStyle: {
        backgroundColor: '#C173E8'
      },
      headerTintColor: '#fff',
      headerRight: (
        <Button style={{marginRight:20}} color="#2196F3"
          onPress={() => props.navigation.navigate('MailboxSettings', {mailboxId: props.navigation.state.params.mailboxId})}
          title="Settings"
        />
      )
    };
  };

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
      <TouchableOpacity style={styles.touchableContent}
          onPress = {() => this.props.navigation.navigate('MailboxItemDetails', {
            mailItemId: item.mailItemId,
            receivedAt: item.receivedAt,
            statusIcon: this.state.stateIconsMapping[item.status],
            snapshotUrl: item.snapshotUrl
          })}>
          <Image style={styles.touchableContentImage}
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
    return (<View style={styles.rowsSeparator}></View>)
  }

  render() {
    return (
    this.state.isLoading
    ?
    <View style={styles.activityIndicator}>
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
    },
    touchableContent:{
        flex: 1,
        flexDirection: 'row',
        marginBottom: 3
    },
    touchableContentImage:{
        width: 40,
        height: 40,
        margin: 5
    },
    rowsSeparator:{
        height: 1,
        width: '100%',
        backgroundColor: 'black'
    },
    activityIndicator:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
  });