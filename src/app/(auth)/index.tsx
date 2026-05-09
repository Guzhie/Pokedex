import { useAuth } from '@/context/AuthContext';
import { router } from 'expo-router';
import { useState } from 'react';
import {
    Pressable, StyleSheet, Text,
    TextInput, View,
} from 'react-native';

const BLUE_BG   = '#E6F1FB';
const BLUE_MID  = '#185FA5';
const BLUE_DARK = '#042C53';
const RED_BG    = '#FCEBEB';
const RED_BORDER = '#F09595';
const RED_TEXT  = '#A32D2D';

export default function Index() {
  const [name, setName]   = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const { signIn } = useAuth();

  function validateCredentials() {
    if (name === 'Kleber' && senha === 'Lancer') {
      setError('');
      signIn(name);
      router.push({ pathname: '/dashboard', params: { username: name } });
    } else {
      setError('Usuário ou senha inválidos. Tente novamente.');
    }
  }

  return (
    <View style={styles.screen}>

      {/* Marca */}
      <View style={styles.brand}>
        <View style={styles.brandIcon}>
          <Text style={styles.brandIconText}>P</Text>
        </View>
        <Text style={styles.brandTitle}>Pokédex</Text>
        <Text style={styles.brandSub}>Faça login para continuar</Text>
      </View>

      {/* Formulário */}
      <View style={styles.card}>
        <View style={styles.fieldWrap}>
          <Text style={styles.label}>Usuário</Text>
          <TextInput
            style={styles.field}
            placeholder="Digite seu usuário"
            placeholderTextColor="#999"
            value={name}
            onChangeText={t => { setName(t); setError(''); }}
            autoCapitalize="none"
          />
        </View>

        <View style={styles.fieldWrap}>
          <Text style={styles.label}>Senha</Text>
          <TextInput
            style={styles.field}
            placeholder="Digite sua senha"
            placeholderTextColor="#999"
            secureTextEntry
            value={senha}
            onChangeText={t => { setSenha(t); setError(''); }}
          />
        </View>

        {error !== '' && (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        <Pressable
          style={({ pressed }) => [styles.btn, pressed && styles.btnPressed]}
          onPress={validateCredentials}
        >
          <Text style={styles.btnText}>Entrar</Text>
        </Pressable>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    justifyContent: 'center',
    padding: 24,
    gap: 24,
  },

  // Marca
  brand: {
    alignItems: 'center',
    gap: 8,
  },
  brandIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: BLUE_BG,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  brandIconText: {
    fontSize: 24,
    fontWeight: '600',
    color: BLUE_DARK,
  },
  brandTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: BLUE_DARK,
  },
  brandSub: {
    fontSize: 13,
    color: '#888',
  },

  // Card do form
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 0.5,
    borderColor: '#D0D0D0',
    padding: 20,
    gap: 16,
  },
  fieldWrap: { gap: 4 },
  label: {
    fontSize: 12,
    fontWeight: '500',
    color: '#555',
  },
  field: {
    borderWidth: 0.5,
    borderColor: '#D0D0D0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#121214',
    backgroundColor: '#FAFAFA',
  },

  // Erro
  errorBox: {
    backgroundColor: RED_BG,
    borderWidth: 0.5,
    borderColor: RED_BORDER,
    borderRadius: 8,
    padding: 10,
  },
  errorText: {
    fontSize: 12,
    color: RED_TEXT,
  },

  // Botão
  btn: {
    backgroundColor: BLUE_MID,
    borderRadius: 8,
    paddingVertical: 13,
    alignItems: 'center',
    marginTop: 4,
  },
  btnPressed: {
    opacity: 0.85,
  },
  btnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
});