import React from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';

class NewMailItemDecisionButton extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <TouchableOpacity {...this.props} style={styles.menuItem}>
                <Image
                    source={{uri: this.props.itemImage}}
                    style={styles.image} />
            </TouchableOpacity>
        )      
    }
}

export default withNavigation(NewMailItemDecisionButton);

const styles = StyleSheet.create({
    menuItem:{
        width: '33.333333%',
        height: '50%',
        padding: 20,
        //backgroundColor: '#ccc',
        //borderColor: '#000',
        //borderWidth: 2
    },
    image:{
        width: '100%',
        height: '100%',
        opacity: 0.8,
        borderColor: '#fff',
        borderWidth: 3
    }
});