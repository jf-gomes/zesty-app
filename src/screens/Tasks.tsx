import { View, Text, StyleSheet, FlatList, Modal, Image, Alert } from "react-native";
import { AuthContext } from "../contexts/auth";
import { useContext, useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import RNPickerSelect from 'react-native-picker-select';
import { Feather } from '@expo/vector-icons'
import api from "../services/api";
import { Loader } from "../components/Loader";
import { NoProjectSelected } from "../components/NoProjectSelected";

interface Task{
    taskName?: string
    assignedTo?: string
    status?: 'to do' | 'doing' | 'done',
    value?: 'to do' | 'doing' | 'done',
    description?: string
}

export default function Tasks(){

    async function getTasks(){
        if (currentProject){
            setLoader(true)
            try {
                const response = await api.get('/projects/gettasks/' + currentProject._id)
                setTasks(response.data[0].tasks)
                setLoader(false)
                return response
            } catch (err) {
                console.log(err)
                setLoader(false)
            }
        } else {
            return
        }
    }

    async function changeStatus({value}: Task){
        deleteTask()
        console.log(deleteTask)
        const rebuildTask = await api.patch('/projects/addtask/' + currentProject._id, {
            taskName: focusedTask?.taskName,
            assignedTo: focusedTask?.assignedTo,
            status: value,
            description: focusedTask?.description
        })
        console.log(rebuildTask)
        setModalVisible(false)
        getTasks()
    }

    async function deleteTask(){
        const deleteTask = await api.patch('/projects/deletetask/' + currentProject._id, {
            taskName: focusedTask?.taskName,
            assignedTo: focusedTask?.assignedTo,
            status: focusedTask?.status,
            description: focusedTask?.description
        })
        console.log(deleteTask)
        getTasks()
        setModalVisible(false)
    }

    useFocusEffect(
        useCallback(() => {
            getTasks()
        }, [])
    )

    const [modalVisible, setModalVisible] = useState<boolean>(false)
    const [focusedTask, setFocusedTask] = useState<Task>()
    const [tasks, setTasks] = useState([])
    const [loader, setLoader] = useState<boolean>(false)

    const { currentProject }: any = useContext(AuthContext)

    if (!currentProject){
        return <NoProjectSelected />
    } else if (loader) {
        return <Loader />
    } else {
        return (
            <View style={styles.container}>
                <Modal visible={modalVisible}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>{focusedTask?.taskName}</Text>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={styles.modalLabel}>Tarefa atribuída a: </Text>
                            <Text style={{textAlign: 'center', width: '50%', textDecorationLine: 'underline'}}>{focusedTask?.assignedTo}</Text>
                        </View>
                        <View style={styles.statusView}>
                            <Text style={styles.modalLabel}>Status: </Text>
                            <Text>{focusedTask?.status}</Text>
                            <RNPickerSelect
                                placeholder={{
                                    label: 'Alterar status'
                                }}
                                onValueChange={(value) => changeStatus({value})}
                                items={[
                                    { label: 'Para fazer', value: 'to do' },
                                    { label: 'Fazendo', value: 'doing' },
                                    { label: 'Feito', value: 'done' },
                                ]}
                                style={{inputAndroid: {
                                    width: 250
                                }, inputIOS: {
                                    width: 250
                                }}}
                            />
                        </View>
                        <View style={styles.descriptionView}>
                            <Text style={styles.modalLabel}>Descrição: </Text>
                            <Text style={{textAlign: 'justify'}}>{focusedTask?.description}</Text>
                        </View>
                        <View style={styles.modalBottomButtonsView}>
                            <View style={styles.modalBtn}>
                                <Feather name="arrow-left-circle" size={32} onPress={() => setModalVisible(false)} />
                                <Text>Voltar</Text>
                            </View>
                            <View style={styles.modalBtn}>
                                <Feather name="trash" size={32} onPress={() => {
                                    Alert.alert('Excluir tarefa', `Confirma exclusão da tarefa "${focusedTask?.taskName}"?`, [
                                        {
                                            text: 'Não',
                                            onPress: () => null
                                        },
                                        {
                                            text: 'Sim',
                                            onPress: () => deleteTask()
                                        }
                                    ])
                                }} />
                                <Text>Excluir</Text>
                            </View>
                        </View>
                    </View>
                </Modal>
                <Text style={styles.title}>Tarefas</Text>
                {loader ? <Text>Carregando</Text> : null}
                <FlatList 
                    data={tasks}
                    renderItem={({item}) => (
                        <View style={styles.taskView}>
                            <Text>{(item as Task).taskName}</Text>
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
    modalTitle: {
        fontSize: 20,
        textAlign: 'center',
        padding: 24
    },
    modalLabel: {
        fontWeight: 'bold'
    },
    descriptionView: {
        flexDirection: 'row',
        width: '80%'
    },
    statusView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    modalBottomButtonsView: {
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 24,
        flexDirection: 'row',
        gap: 16
    },
    modalBtn: {
        justifyContent: 'center',
        alignItems: 'center'
    },
})