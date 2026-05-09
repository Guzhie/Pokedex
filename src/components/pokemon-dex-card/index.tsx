import { Colors } from '@/constants/colors';
import type { PokemonMock } from '@/constants/mockPokemon';
import { useState } from 'react';
import {
  Image, Modal, Pressable, ScrollView,
  StyleSheet, Text, View,
} from 'react-native';

type Props = { pokemon: PokemonMock };

function formatDexNo(n: number) {
  return String(n).padStart(4, '0');
}

export function PokemonDexCard({ pokemon }: Props) {
  const [open, setOpen] = useState(false);
  const { stats } = pokemon;

  return (
    <>
      {/* ── Card compacto ── */}
      <Pressable style={styles.card} onPress={() => setOpen(true)}>
        <View style={styles.imgBox}>
          <Image
            source={{ uri: pokemon.spriteUri }}
            style={styles.sprite}
            resizeMode="contain"
          />
        </View>
        <View style={styles.info}>
          <View style={styles.header}>
            <Text style={styles.name} numberOfLines={1}>{pokemon.name}</Text>
            <Text style={styles.dexNo}>{formatDexNo(pokemon.dexNumber)}</Text>
          </View>
          <Text style={styles.type} numberOfLines={1}>{pokemon.types}</Text>
          <View style={styles.divider} />
          <View style={styles.statsGrid}>
            <Text style={styles.stat}>HP <Text style={styles.statNum}>{stats.hp}</Text></Text>
            <Text style={styles.stat}>Vel <Text style={styles.statNum}>{stats.speed}</Text></Text>
            <Text style={styles.stat}>Atk <Text style={styles.statNum}>{stats.attack}</Text></Text>
            <Text style={styles.stat}>Def <Text style={styles.statNum}>{stats.defense}</Text></Text>
            <Text style={styles.stat}>SpA <Text style={styles.statNum}>{stats.spAtk}</Text></Text>
            <Text style={styles.stat}>SpD <Text style={styles.statNum}>{stats.spDef}</Text></Text>
          </View>
          <Text style={styles.total}>TOTAL: {pokemon.total}</Text>
        </View>
      </Pressable>

      {/* ── Modal de detalhes ── */}
      <Modal
        visible={open}
        animationType="slide"
        transparent
        onRequestClose={() => setOpen(false)}
      >
        <Pressable style={styles.backdrop} onPress={() => setOpen(false)}>
          <Pressable style={styles.sheet} onPress={() => {}}>
            <ScrollView showsVerticalScrollIndicator={false}>

              {/* Cabeçalho */}
              <View style={styles.modalHeader}>
                <Image
                  source={{ uri: pokemon.spriteUri }}
                  style={styles.modalSprite}
                  resizeMode="contain"
                />
                <View style={styles.modalTitleBlock}>
                  <Text style={styles.modalName}>{pokemon.name}</Text>
                  <Text style={styles.modalNo}>Nº {formatDexNo(pokemon.dexNumber)}</Text>
                  <Text style={styles.modalCategory}>{pokemon.category}</Text>
                </View>
              </View>

              <View style={styles.modalDivider} />

              {/* Infos */}
              <Row label="Altura" value={pokemon.height} />
              <Row label="Peso" value={pokemon.weight} />
              <Row label="Tipo" value={pokemon.types} />
              <Row label="Fraquezas" value={pokemon.weaknesses} />
              <Row label="Evolução" value={pokemon.evolution} />

              {/* Habilidade com itálico */}
              <View style={styles.row}>
                <Text style={styles.rowLabel}>Habilidades</Text>
                <Text style={styles.rowValue}>
                  {pokemon.ability.before}
                  <Text style={styles.italic}>{pokemon.ability.italic}</Text>
                  {pokemon.ability.after ?? ''}
                </Text>
              </View>

              <View style={styles.modalDivider} />

              {/* Stats */}
              <Text style={styles.statsTitle}>Estatísticas</Text>
              <View style={styles.modalStatsGrid}>
                <StatBox label="HP"           value={stats.hp} />
                <StatBox label="Velocidade"   value={stats.speed} />
                <StatBox label="Ataque"       value={stats.attack} />
                <StatBox label="Defesa"       value={stats.defense} />
                <StatBox label="Atq. Esp."    value={stats.spAtk} />
                <StatBox label="Def. Esp."    value={stats.spDef} />
              </View>
              <Text style={styles.modalTotal}>TOTAL: {pokemon.total}</Text>

              <Pressable style={styles.closeBtn} onPress={() => setOpen(false)}>
                <Text style={styles.closeBtnText}>Fechar</Text>
              </Pressable>

            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );
}

function StatBox({ label, value }: { label: string; value: number }) {
  return (
    <View style={styles.statBox}>
      <Text style={styles.statBoxNum}>{value}</Text>
      <Text style={styles.statBoxLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  // ── Card compacto ──
  card: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: Colors.black,
    borderRadius: 6,
    overflow: 'hidden',
    backgroundColor: Colors.white,
  },
  imgBox: {
    width: 72,
    height: 72,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: StyleSheet.hairlineWidth,
    borderRightColor: Colors.black,
    backgroundColor: Colors.background,
  },
  sprite: { width: 60, height: 60 },
  info: { flex: 1, minWidth: 0, padding: 6, gap: 2 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 2,
  },
  name: { flex: 1, fontSize: 13, fontWeight: '600', color: Colors.black },
  dexNo: { fontSize: 10, color: Colors.gray[500], marginLeft: 4 },
  type: { fontSize: 10, color: Colors.gray[500] },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.gray[500],
    marginVertical: 3,
  },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 2 },
  stat: { width: '48%', fontSize: 9, color: Colors.gray[500] },
  statNum: { color: Colors.black, fontWeight: '600' },
  total: { fontSize: 9, fontWeight: '700', color: Colors.black, marginTop: 2 },

  // ── Modal ──
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 20,
    maxHeight: '85%',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 12,
  },
  modalSprite: { width: 96, height: 96 },
  modalTitleBlock: { flex: 1, gap: 2 },
  modalName: { fontSize: 24, fontWeight: '700', color: Colors.black },
  modalNo: { fontSize: 13, color: Colors.gray[500] },
  modalCategory: { fontSize: 12, color: Colors.gray[500], fontStyle: 'italic' },
  modalDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.gray[500],
    marginVertical: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
    gap: 8,
  },
  rowLabel: { fontSize: 13, fontWeight: '600', color: Colors.black, minWidth: 80 },
  rowValue: { fontSize: 13, color: Colors.black, flex: 1, textAlign: 'right' },
  italic: { fontStyle: 'italic' },
  statsTitle: { fontSize: 14, fontWeight: '700', color: Colors.black, marginBottom: 8 },
  modalStatsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  statBox: {
    width: '30%',
    backgroundColor: Colors.background,
    borderRadius: 6,
    padding: 8,
    alignItems: 'center',
  },
  statBoxNum: { fontSize: 18, fontWeight: '700', color: Colors.black },
  statBoxLabel: { fontSize: 10, color: Colors.gray[500], marginTop: 2 },
  modalTotal: {
    fontSize: 14,
    fontWeight: '700',
    fontStyle: 'italic',
    color: Colors.black,
    marginTop: 12,
    textAlign: 'right',
  },
  closeBtn: {
    marginTop: 20,
    backgroundColor: Colors.btnPrimary,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  closeBtnText: { color: Colors.labelPrimary, fontWeight: '600', fontSize: 15 },
});