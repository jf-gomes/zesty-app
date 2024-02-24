import { View, Text, StyleSheet, FlatList, ScrollView, Image } from "react-native";
import { useState, useEffect, useContext } from "react";
import api from "../services/api";
import { Feather } from '@expo/vector-icons'
import { AuthContext } from "../contexts/auth";

interface Project {
    name: string,
    createdBy: object,
    team: object,
    initialDate: string,
    endDate: string,
    posts: object,
    tasks: object,
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
    const [loader, setLoader] = useState(false)

    const { setCurrentProject }: any = useContext(AuthContext)

    async function getContent(){
        setLoader(false)
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
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Image style={styles.loader} source={require('../../assets/loading.gif')} />
            </View>
        )
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <View>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 24, paddingBottom: 0}}>
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
                                    }} style={{fontWeight: 'bold', textAlign: 'center'}}>{(item as Project).name}</Text>
                                    <Text>Criado em: {(item as Project).initialDate.slice(0, 10)}</Text>
                                    <Text>Termina em: {(item as Project).endDate.slice(0, 10)}</Text>
                                    <Text>Status: {(item as Project).finished ? 'concluído' : 'em andamento'}</Text>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
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
                                    }} style={{fontWeight: 'bold', textAlign: 'center'}}>{(item as Project).name}</Text>
                                    <Text>Criado em: {(item as Project).initialDate.slice(0, 10)}</Text>
                                    <Text>Termina em: {(item as Project).endDate.slice(0, 10)}</Text>
                                    <Text>Status: {(item as Project).finished ? 'concluído' : 'em andamento'}</Text>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
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
                                        <Text style={{fontWeight: 'bold', textAlign: 'center', color: 'white'}}>{(item as Invite).projectName}</Text>
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
    projectView: {
        backgroundColor: '#F8F1FF',
        width: 200,
        height: 200,
        marginLeft: 24,
        borderRadius: 16,
        padding: 16,
        gap: 16
    },
    title: {
        fontWeight: 'bold',
        padding: 24,
        fontSize: 20
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
    },
    loader: {
        width: 50,
        height: 50,
        marginTop: 24
    }
})