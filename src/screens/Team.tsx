import { View, Text } from "react-native";
import { AuthContext } from "../contexts/auth";
import { useContext } from "react";

export default function Team(){

    const { currentProject }: any = useContext(AuthContext)

    return (
        <View>
            <Text>Equipe</Text>
        </View>
    )
}