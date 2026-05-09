import { List } from '@/components/list';
import { PokemonDexCard } from '@/components/pokemon-dex-card';
import { MOCK_POKEMON } from '@/constants/mockPokemon';
import { useAuth } from '@/context/AuthContext';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function Dashboard() {
    const { user, signOut } = useAuth();

    const posts = [
        { id: '1', title: 'Item 1', description: 'Descrição 1' },
        { id: '2', title: 'Item 2', description: 'Descrição 2' },
        { id: '3', title: 'Item 3', description: 'Descrição 3' },
    ];

    return (
        <View style={styles.screen}>
            <Text style={styles.heading}>Olá, {user}</Text>
            <Button title="Sair" onPress={signOut} />
    
            <View style={{ flex: 1 }}> 
                <List
                    data={MOCK_POKEMON}
                    onLoadMore={() => {}}
                    minColumnWidth={340}
                    renderItemContent={(item) => <PokemonDexCard pokemon={item} />}
                />
            </View>
        </View>
    );    
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 16,
        gap: 12,
    },
    heading: {
        fontSize: 18,
        fontWeight: '600',
    },
    row: {
        paddingVertical: 8,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#ccc',
        gap: 4,
    },
    rowTitle: {
        fontWeight: '600',
    },
});