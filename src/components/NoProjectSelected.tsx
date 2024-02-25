import { View, Image, Text } from 'react-native'

export const NoProjectSelected = () => {
    return (
        <View style={{backgroundColor: 'white', flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Image style={{width: 300, height: 300}} source={require('../../assets/noProjectSelected.gif')} />
            <Text style={{textAlign: 'center'}}>Selecione um projeto para começar</Text>
        </View>
    )
}