import { View, Text, StyleSheet, FlatList } from "react-native";
import { AuthContext } from "../contexts/auth";
import { useContext } from "react";
import { Feather } from '@expo/vector-icons'

export default function Team(){

    const { currentProject }: any = useContext(AuthContext)

    if (!currentProject){
        return (
            <View>
                <Text>Selecione um projeto</Text>
            </View>
        )
    } else {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Equipe</Text>
                <FlatList 
                    data={currentProject.team}
                    renderItem={({ item }) => (
                        <View style={styles.memberView}>
                            <View style={{flexDirection: 'row', gap: 16}}>
                                <Feather name="user" size={24} color='white' />
                                <Text style={{color: 'white'}}>{item.name}</Text>
                            </View>
                            <View style={{flexDirection: 'row', gap: 16}}>
                                <Feather name="user-x" size={24} color='white' />
                                <Feather name="message-circle" color='white' size={24} />
                            </View>
                        </View>
                    )}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 24,
        paddingBottom: 24
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        padding: 24
    },
    memberView: {
        marginLeft: 24,
        marginEnd: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#1B998B',
        padding: 16,
        borderRadius: 16
    }
})