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
  import Constants from '../constants/Constants'

export default class MailboxItemsScreen extends React.Component {
  static navigationOptions = (props) => {
    return {
      title: Constants.ITEMS_LBL,
      headerStyle: {
        backgroundColor: '#C173E8'
      },
      headerTintColor: '#fff',
      headerRight: (
        <Button style={{marginRight:20}} color="#2196F3"
          onPress={() => props.navigation.navigate('MailboxSettings', {mailboxId: props.navigation.state.params.mailboxId})}
          title={Constants.SETTINGS_LBL}
        />
      )
    };
  };

  constructor(props) {
    super(props);
    this.state = { 
      observedMailboxId: props.navigation.state.params.mailboxId,
      mailboxItems: [],
      isLoading: true
    };
  }

  componentDidMount(){
    fetch(Constants.FUNCTIONS_URL.GET_MAILBOX_ITEMS + this.state.observedMailboxId)
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
    let icon = item.status == 1 
                      ? require('../content/images/mailboxItemAccepted_Icon.png')
                      : require('../content/images/mailboxItemDeclined_Icon.png')
    return (
      <TouchableOpacity style={styles.touchableContent}
          onPress = {() => this.props.navigation.navigate('MailboxItemDetails', {
            mailItemId: item.mailItemId,
            receivedAt: item.receivedAt,
            itemStatus: item.status,
            snapshotUrl: item.snapshotUrl
          })}>
          <Image style={styles.touchableContentImage} source={icon}/>
          <View style={{ flex: 1, justifyContent: 'center' }}>
              <Text style={{ fontSize: 16, color: 'green' }}>
                  {item.receivedAt}
              </Text>
              <Text style={{ fontSize: 13, marginBottom: 15 }}>
                  {item.topScoreImageTag}, {item.middleScoreImageTag}, {item.lowestScoreImageTag}
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