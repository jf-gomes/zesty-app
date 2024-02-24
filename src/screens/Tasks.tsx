import { View, Text, StyleSheet, FlatList, Modal } from "react-native";
import { AuthContext } from "../contexts/auth";
import { useContext, useState } from "react";
import RNPickerSelect from 'react-native-picker-select';
import { Feather } from '@expo/vector-icons'

interface Task{
    taskName: string
    assignedTo: string
    status: 'to do' | 'doing' | 'done',
    description: string
}

export default function Tasks(){

    const [modalVisible, setModalVisible] = useState(false)
    const [focusedTask, setFocusedTask] = useState<Task>()

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
                <Modal visible={modalVisible}>
                    <View style={styles.modalContainer}>
                        <Text style={{fontSize: 20, textAlign: 'center', padding: 24}}>{focusedTask?.taskName}</Text>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={styles.modalLabel}>Tarefa atribuída a: </Text>
                            <Text style={{textAlign: 'center', width: '50%', textDecorationLine: 'underline'}}>{focusedTask?.assignedTo}</Text>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                            <Text style={styles.modalLabel}>Status:</Text>
                            <RNPickerSelect
                                value={'baseball'}
                                placeholder={{}}
                                onValueChange={(value) => console.log(value)}
                                items={[
                                    { label: 'Football', value: 'football' },
                                    { label: 'Baseball', value: 'baseball' },
                                    { label: 'Hockey', value: 'hockey' },
                                ]}
                                style={{inputAndroid: {
                                    width: 250
                                }, inputIOS: {
                                    width: 250
                                }}}
                            />
                        </View>
                        <View style={{flexDirection: 'row', width: '80%'}}>
                            <Text style={styles.modalLabel}>Descrição: </Text>
                            <Text style={{textAlign: 'justify'}}>{focusedTask?.description}</Text>
                        </View>
                        <View style={{alignItems: 'center', marginTop: 24}}>
                            <Feather name="arrow-left-circle" size={32} onPress={() => setModalVisible(false)} />
                            <Text>Voltar</Text>
                        </View>
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
        justifyContent: 'center',
        margin: 24,
        gap: 16
    },
    modalLabel: {
        fontWeight: 'bold'
    }
})