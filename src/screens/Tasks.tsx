import { View, Text, StyleSheet, FlatList, Modal } from "react-native";
import { AuthContext } from "../contexts/auth";
import { useContext, useState } from "react";

interface Task{
    taskName: string
}

export default function Tasks(){

    const [modalVisible, setModalVisible] = useState(false)
    const [focusedTask, setFocusedTask] = useState<Task>()

    const { currentProject }: any = useContext(AuthContext)

    return (
        <View style={styles.container}>
            <Modal visible={modalVisible}>
                <View style={styles.modalContainer}>
                    <Text>{focusedTask?.taskName}</Text>
                    <Text onPress={() => setModalVisible(false)}>Fechar</Text>
                </View>
            </Modal>
            <Text style={styles.title}>Tarefas</Text>
            <FlatList 
                data={currentProject.tasks}
                renderItem={({item}) => (
                    <View style={styles.taskView}>
                        <Text>{item.taskName}</Text>
                        <Text style={{color: 'grey'}} onPress={() => {
                            setFocusedTask(item)
                            setModalVisible(true)
                        }}>Ver mais</Text>
                    </View>
                )}
            />
        </View>
    )
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
    taskView: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F8F1FF',
        padding: 16,
        margin: 24,
        marginTop: 0,
        borderRadius: 16,
        justifyContent: 'space-between'
    },
    modalContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})