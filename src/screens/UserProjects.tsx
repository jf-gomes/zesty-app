import { View, Text, StyleSheet, FlatList, ScrollView, Image } from "react-native";
import { useState, useEffect, useContext } from "react";
import api from "../services/api";
import { Feather } from '@expo/vector-icons'
import { AuthContext } from "../contexts/auth";
import { Loader } from "../components/Loader";

interface Project {
    name: string,
    createdBy: object,
    initialDate: string,
    endDate: string,
    finished: boolean,
    createdAt: string
}

interface Invite {
    inviteFrom: string,
    inviteTo: string,
    projectName: string,
    projectId: string,
    accepted: boolean
}

export default function UserProjects({ navigation }: any){

    const [myProjects, setMyProjects] = useState([])
    const [otherProjects, setOtherProjects] = useState([])
    const [invites, setInvites] = useState([])
    const [loader, setLoader] = useState(true)

    const { setCurrentProject }: any = useContext(AuthContext)

    async function getContent(){
        setLoader(true)
        const projects = await api.get('/projects/' + '65bc29cf9f87eda02834a09a')
        console.log(projects)
        setMyProjects(projects.data.myProjects)
        setOtherProjects(projects.data.otherProjects)
        const invites = await api.get('/getinvites/' + '65bc29cf9f87eda02834a09a')
        setInvites(invites.data[0].invites)
        setLoader(false)
    }

    useEffect(() => {
        getContent()
    }, [])

    if (loader){
        return (
            <Loader />
        )
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <View>
                    <View style={styles.header}>
                        <Text style={{fontSize: 24}}>Bem vindo(a), <Text style={{fontWeight: 'bold'}}>João!</Text></Text>
                        <Feather name="log-out" size={20} />
                    </View>
                    <Text style={styles.title}>Seus projetos</Text>
                    <View>
                        <FlatList
                            data={myProjects}
                            renderItem={({item}) => (
                                <View style={styles.projectView}>
                                    <Text onPress={() => {
                                        setCurrentProject(item)
                                        navigation.navigate('team')
                                    }} style={styles.projectTitle}>{(item as Project).name}</Text>
                                    <Text>Criado em: {(item as Project).initialDate.slice(0, 10)}</Text>
                                    <Text>Termina em: {(item as Project).endDate.slice(0, 10)}</Text>
                                    <Text>Status: {(item as Project).finished ? 'concluído' : 'em andamento'}</Text>
                                    <View style={styles.projectBottomButtons}>
                                        <Feather name='trash' size={20} />
                                        <Feather name='check' size={20} />
                                    </View>
                                </View>
                            )}
                            horizontal={true}
                        />
                    </View>
                </View>
                <View>
                    <Text style={styles.title}>Projetos dos seus colegas</Text>
                    <View>
                        <FlatList
                            data={otherProjects}
                            renderItem={({item}) => (
                                <View style={styles.projectView}>
                                    <Text onPress={() => {
                                        setCurrentProject(item)
                                        navigation.navigate('team')
                                    }} style={styles.projectTitle}>{(item as Project).name}</Text>
                                    <Text>Criado em: {(item as Project).initialDate.slice(0, 10)}</Text>
                                    <Text>Termina em: {(item as Project).endDate.slice(0, 10)}</Text>
                                    <Text>Status: {(item as Project).finished ? 'concluído' : 'em andamento'}</Text>
                                    <View style={styles.projectBottomButtons}>
                                        <Feather name='trash' size={20} />
                                        <Feather name='check' size={20} />
                                    </View>
                                </View>
                            )}
                            horizontal={true}
                        />
                    </View>
                </View>
                <View>
                    <Text style={styles.title}>Convites</Text>
                    <View>
                        <FlatList
                            data={invites}
                            renderItem={({item}) => (
                                <View style={styles.inviteView}>
                                    <View style={{gap: 16}}>
                                        <Text style={styles.inviteTitle}>{(item as Invite).projectName}</Text>
                                        <Text style={{color: 'white'}}>Convite enviado por: {(item as Invite).inviteFrom}</Text>
                                    </View>
                                    <View style={{gap: 16}}>
                                        <Feather name="x" size={20} color='white' />
                                        <Feather name="check" size={20} color='white' />
                                    </View>
                                </View>
                            )}
                            horizontal={true}
                        />
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 24,
        paddingBottom: 24
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 24,
        paddingBottom: 0
    },
    title: {
        fontWeight: 'bold',
        padding: 24,
        fontSize: 20
    },
    projectTitle: {
        fontWeight: 'bold',
        textAlign: 'center'
    },
    inviteTitle: {
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white'
    },
    projectView: {
        backgroundColor: '#F8F1FF',
        width: 200,
        height: 200,
        marginLeft: 24,
        borderRadius: 16,
        padding: 16,
        gap: 16
    },
    projectBottomButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    inviteView: {
        width: 300,
        backgroundColor: '#656176',
        marginLeft: 24,
        borderRadius: 16,
        padding: 16,
        gap: 16,
        color: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})