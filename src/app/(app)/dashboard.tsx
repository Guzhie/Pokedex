import { List } from '@/components/list';
import { PokemonDexCard } from '@/components/pokemon-dex-card';
import { MOCK_POKEMON } from '@/constants/mockPokemon';
import { useAuth } from '@/context/AuthContext';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function Dashboard() {
  const { user, signOut } = useAuth();

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <View style={styles.avatarWrap}>
          <Text style={styles.avatarText}>{user?.[0]?.toUpperCase()}</Text>
        </View>
        <Text style={styles.username}>{user}</Text>
        <Pressable style={styles.exitBtn} onPress={signOut}>
          <Text style={styles.exitText}>Sair</Text>
        </Pressable>
      </View>

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
  screen: { flex: 1, backgroundColor: '#F2F2F2', padding: 16, gap: 12 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingBottom: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#D0D0D0',
  },
  avatarWrap: {
    width: 34, height: 34, borderRadius: 17,
    backgroundColor: '#E6F1FB',
    justifyContent: 'center', alignItems: 'center',
  },
  avatarText: { fontSize: 13, fontWeight: '500', color: '#0C447C' },
  username: { flex: 1, fontSize: 15, fontWeight: '500', color: '#121214' },
  exitBtn: {
    backgroundColor: '#FCEBEB',
    borderWidth: 0.5,
    borderColor: '#F09595',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  exitText: { fontSize: 12, color: '#A32D2D' },
});