import { View, Image, StyleSheet } from 'react-native'

export const Loader = () => {
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Image style={styles.loader} source={require('../../assets/loading.gif')} />
        </View>
    )
}

const styles = StyleSheet.create({
    loader: {
        width: 50,
        height: 50,
        marginTop: 24
    }
})