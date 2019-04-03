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
                    source={this.props.itemImage}
                    style={styles.image} />
            </TouchableOpacity>
        )      
    }
}

export default withNavigation(NewMailItemDecisionButton);

const styles = StyleSheet.create({
    menuItem:{
        width: '33.333333%',
        height: '70%',
        padding: 20,
    },
    image:{
        width: '90%',
        height: '90%',
        //opacity: 0.8,
        borderColor: '#fff',
        borderWidth: 3
    }
});