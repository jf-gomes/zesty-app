import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from "react-native"
import api from "../services/api"
import { useState } from "react"

export default function Signup({ navigation }: any){

    const [loader, setLoader] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')

    async function handleSubmit(){
        if (!email || !password) {
            alert ('Usuário ou senha inválido(s).')
        } else {
            setLoader(true)
            try{
                const response = await api.post('/users/login', {
                    email: email,
                    password: password
                })
                const login = await api.get('/users/' + response.data.id, {
                    headers: {
                        'Authorization': `Bearer ${response.data.token}`
                    }
                })
                if (login.status == 200){
                    // setToken(`${response.data.token}`)
                    // setUserData(response.data.user)
                    // navigate('/zesty-frontend/user')
                    setLoader(false)
                    navigation.navigate('projects')
                }
            } catch(err: any){
                console.log(err)
                if (err.response.status != 200){
                    alert('Usuário ou senha inválido(s)!')
                }
                setLoader(false)
            }
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <View style={{alignItems: 'center'}}>
                    <Image style={styles.img} source={require('../../assets/logo.png')} />
                </View>
                <Text>Nome</Text>
                <TextInput style={styles.input} onChangeText={(v) => setName(v)} />
                <Text>E-mail</Text>
                <TextInput style={styles.input} onChangeText={(v) => setEmail(v)} />
                <Text>Senha</Text>
                <TextInput style={styles.input} onChangeText={(v) => setPassword(v)} />
                <Text>Confirme a senha</Text>
                <TextInput style={styles.input} onChangeText={(v) => setPasswordConfirmation(v)} />
                <View style={{alignItems: 'center'}}>
                    <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
                        <Text style={styles.btnText}>Cadastrar</Text>
                    </TouchableOpacity>
                </View>
                <Text>Já possui conta? <Text style={styles.link} onPress={() => navigation.navigate('login')}>Entrar!</Text></Text>
                {loader ? <View style={{alignItems: 'center'}}>
                    <Image style={styles.loader} source={require('../../assets/loading.gif')} />
                </View> : null}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F1FF',
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        backgroundColor: '#F1F1F1'
    },
    form: {
        backgroundColor: 'white',
        width: '90%',
        padding: 24,
        borderRadius: 18
    },
    btn: {
        backgroundColor: '#1B998B',
        width: 100,
        margin: 24,
        borderRadius: 18
    },
    btnText: {
        color: 'white',
        textAlign: 'center'
    },
    img: {
        width: 100,
        height: 80,
        marginBottom: 24
    },
    link: {
        textDecorationLine: 'underline',
        fontWeight: 'bold'
    },
    loader: {
        width: 50,
        height: 50,
        marginTop: 24
    }
})