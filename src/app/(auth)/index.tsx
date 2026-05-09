import { useAuth } from '@/context/AuthContext';
import { router } from 'expo-router';
import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function Index() {
    const [name, setName] = useState<string>('');
    const [senha, setSenha] = useState<string>('');

    const [isAlertVisible, setIsAlertVisible] = useState(false);
    const [alertData, setAlertData] = useState({ title: '', message: '' });

    const { signIn } = useAuth();

    function validateCredentials() {
        if(name === 'Kleber' && senha === 'Lancer') {
            signIn(name);

            router.push({
                pathname: '/dashboard',
                params: { username: name } 
            });
        } else {
            setAlertData({
                title: 'Erro de Login',
                message: 'Credenciais inválidas. Tente novamente.',
            });
            setIsAlertVisible(true);
        }
    }

    return (
        <View style={styles.screen}>
            <Text style={styles.heading}>Login</Text>
            <TextInput
                style={styles.field}
                placeholder="Usuario"
                value={name}
                onChangeText={setName}
                autoCapitalize="none"
            />
            <TextInput
                style={styles.field}
                placeholder="Senha"
                secureTextEntry
                value={senha}
                onChangeText={setSenha}
            />
            <Button title="Entrar" onPress={validateCredentials} />

            {isAlertVisible && (
                <View style={styles.notice}>
                    <Text>{alertData.title}</Text>
                    <Text>{alertData.message}</Text>
                    <Button title="Fechar" onPress={() => setIsAlertVisible(false)} />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
        gap: 12,
    },
    heading: {
        fontSize: 18,
        fontWeight: '600',
    },
    field: {
        borderWidth: 1,
        borderColor: '#ccc',
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    notice: {
        marginTop: 8,
        gap: 8,
    },
});
