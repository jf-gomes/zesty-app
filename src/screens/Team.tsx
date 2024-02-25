import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from 'react'
import { AuthContext } from "../contexts/auth";
import { useContext, useState } from "react";
import { Feather } from '@expo/vector-icons'
import api from "../services/api";
import { Loader } from "../components/Loader";
import { NoProjectSelected } from "../components/NoProjectSelected";

interface TeamMember{
    id: string,
    name: string,
    role: string
}

export default function Team(){

    async function getTeam(){
        setLoader(true)
        try {
            const response = await api.get('/projects/getone/' + currentProject._id)
            const projectResponse = response.data.project[0]
            const team = projectResponse.team.filter((member: TeamMember) => member.id != userData._id)
            if (projectResponse.createdBy[0].id != userData._id){
                team.push(projectResponse.createdBy[0])
            }
            setTeam(team)
            setLoader(false)
        } catch (err) {
            console.log(err)
            setLoader(false)
        }
        
    }

    const { currentProject, userData }: any = useContext(AuthContext)

    const [loader, setLoader] = useState<boolean>(false)
    const [team, setTeam] = useState([])

    useFocusEffect(
        useCallback(() => {
            getTeam()
        }, [])
    )

    if (!currentProject){
        return <NoProjectSelected />
    } else if (loader) {
        return <Loader />
    } else {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Equipe</Text>
                <FlatList 
                    data={team}
                    renderItem={({ item }) => (
                        <View style={styles.memberViewContainer}>
                            <View style={styles.memberView}>
                                <Feather name="user" size={24} color='white' />
                                <Text style={{color: 'white'}}>{(item as TeamMember).name}</Text>
                            </View>
                            <View style={styles.memberView}>
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
    memberViewContainer: {
        marginLeft: 24,
        marginEnd: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#1B998B',
        padding: 16,
        borderRadius: 16,
        marginBottom: 16
    },
    memberView: {
        flexDirection: 'row',
        gap: 16
    }
})