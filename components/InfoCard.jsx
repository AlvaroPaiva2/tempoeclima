import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const InfoCard = (props) => {

    const [darkTheme, setDarkTheme] = useState(true)

    const styles = StyleSheet.create({
        card: {
            alignItems: 'center',
            margin: 10,
            minWidth: 150,
        },
        text: {
            margin: 5,
            marginLeft: 15, 
            fontSize: 18,
        }
    }
    );

    return (
        <View style={styles.card}>
            <Text style={[styles.text, {color: darkTheme ? '#bdc08a' : 'black'}]}>{props.title}</Text>
            <Text style={[styles.text]}>{props.value}</Text>
        </View>
    );
}

export default InfoCard;