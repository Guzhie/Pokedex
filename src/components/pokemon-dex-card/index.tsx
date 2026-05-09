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

function TypeBadge({ label }: { label: string }) {
  return <View style={styles.badge}><Text style={styles.badgeText}>{label}</Text></View>;
}

function InfoRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <View style={styles.infoValueWrap}>{children}</View>
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

export function PokemonDexCard({ pokemon }: Props) {
  const [open, setOpen] = useState(false);
  const { stats } = pokemon;
  const types = pokemon.types.split(', ');

  return (
    <>
      {/* ── Card compacto ── */}
      <Pressable style={styles.card} onPress={() => setOpen(true)}>
        <View style={styles.imgBox}>
          <Image source={{ uri: pokemon.spriteUri }} style={styles.sprite} resizeMode="contain" />
        </View>
        <View style={styles.body}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardName} numberOfLines={1}>{pokemon.name}</Text>
            <Text style={styles.cardNo}>{formatDexNo(pokemon.dexNumber)}</Text>
          </View>
          <View style={styles.badgeRow}>
            {types.map(t => <TypeBadge key={t} label={t} />)}
          </View>
          <View style={styles.cardDivider} />
          <View style={styles.statRow}>
            <Text style={styles.statInline}>HP <Text style={styles.statInlineNum}>{stats.hp}</Text></Text>
            <Text style={styles.statInline}>Atk <Text style={styles.statInlineNum}>{stats.attack}</Text></Text>
            <Text style={styles.statInline}>Def <Text style={styles.statInlineNum}>{stats.defense}</Text></Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statInline}>SpA <Text style={styles.statInlineNum}>{stats.spAtk}</Text></Text>
            <Text style={styles.statInline}>SpD <Text style={styles.statInlineNum}>{stats.spDef}</Text></Text>
            <Text style={styles.statInline}>Vel <Text style={styles.statInlineNum}>{stats.speed}</Text></Text>
          </View>
          <Text style={styles.cardTotal}>Total: {pokemon.total}</Text>
        </View>
      </Pressable>

      {/* ── Modal ── */}
      <Modal visible={open} animationType="slide" transparent onRequestClose={() => setOpen(false)}>
        <Pressable style={styles.backdrop} onPress={() => setOpen(false)}>
          <Pressable style={styles.sheet} onPress={() => {}}>
            <ScrollView showsVerticalScrollIndicator={false} bounces={false}>

              {/* Hero */}
              <View style={styles.hero}>
                <Image source={{ uri: pokemon.spriteUri }} style={styles.heroSprite} resizeMode="contain" />
                <View>
                  <Text style={styles.heroName}>{pokemon.name}</Text>
                  <Text style={styles.heroNo}>Nº {formatDexNo(pokemon.dexNumber)}</Text>
                  <Text style={styles.heroCat}>{pokemon.category}</Text>
                </View>
              </View>

              <View style={styles.modalBody}>
                {/* Infos */}
                <View style={styles.infoBlock}>
                  <InfoRow label="Altura"><Text style={styles.infoValue}>{pokemon.height}</Text></InfoRow>
                  <InfoRow label="Peso"><Text style={styles.infoValue}>{pokemon.weight}</Text></InfoRow>
                  <InfoRow label="Tipo"><Text style={styles.infoValue}>{pokemon.types}</Text></InfoRow>
                  <InfoRow label="Fraquezas"><Text style={styles.infoValue}>{pokemon.weaknesses}</Text></InfoRow>
                  <InfoRow label="Evolução"><Text style={styles.infoValue}>{pokemon.evolution}</Text></InfoRow>
                  <InfoRow label="Habilidades">
                    <Text style={styles.infoValue}>
                      {pokemon.ability.before}
                      <Text style={styles.italic}>{pokemon.ability.italic}</Text>
                      {pokemon.ability.after ?? ''}
                    </Text>
                  </InfoRow>
                </View>

                {/* Stats */}
                <Text style={styles.sectionTitle}>Estatísticas</Text>
                <View style={styles.statsGrid}>
                  <StatBox label="HP"        value={stats.hp} />
                  <StatBox label="Velocidade" value={stats.speed} />
                  <StatBox label="Ataque"    value={stats.attack} />
                  <StatBox label="Defesa"    value={stats.defense} />
                  <StatBox label="Atq. Esp." value={stats.spAtk} />
                  <StatBox label="Def. Esp." value={stats.spDef} />
                </View>

                <View style={styles.totalRow}>
                  <Text style={styles.totalText}>Total: <Text style={styles.totalNum}>{pokemon.total}</Text></Text>
                </View>

                <Pressable style={styles.closeBtn} onPress={() => setOpen(false)}>
                  <Text style={styles.closeBtnText}>Fechar</Text>
                </Pressable>
              </View>

            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

const BLUE_BG   = '#E6F1FB';
const BLUE_MID  = '#185FA5';
const BLUE_DARK = '#042C53';
const RED_SOLID = '#E24B4A';

const styles = StyleSheet.create({
  // ── Card compacto ──
  card: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderWidth: 0.5,
    borderColor: '#D0D0D0',
    borderRadius: 12,
    overflow: 'hidden',
  },
  imgBox: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BLUE_BG,
  },
  sprite: { width: 64, height: 64 },
  body: { flex: 1, minWidth: 0, padding: 10, gap: 3 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardName: { fontSize: 15, fontWeight: '500', color: Colors.txtPrimary, flex: 1 },
  cardNo: { fontSize: 11, color: Colors.gray[500], marginLeft: 4 },
  badgeRow: { flexDirection: 'row', gap: 4 },
  badge: { backgroundColor: BLUE_BG, borderRadius: 4, paddingHorizontal: 7, paddingVertical: 2 },
  badgeText: { fontSize: 11, color: BLUE_MID },
  cardDivider: { height: StyleSheet.hairlineWidth, backgroundColor: '#D0D0D0', marginVertical: 2 },
  statRow: { flexDirection: 'row', gap: 12 },
  statInline: { fontSize: 11, color: Colors.gray[500], flex: 1 },
  statInlineNum: { color: Colors.txtPrimary, fontWeight: '500' },
  cardTotal: { fontSize: 11, color: Colors.gray[500], fontWeight: '500' },

  // ── Modal ──
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden',
    maxHeight: '88%',
  },
  hero: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    backgroundColor: BLUE_BG,
    padding: 20,
  },
  heroSprite: { width: 88, height: 88 },
  heroName: { fontSize: 22, fontWeight: '500', color: BLUE_DARK },
  heroNo: { fontSize: 12, color: BLUE_MID, marginTop: 2 },
  heroCat: { fontSize: 12, color: BLUE_MID, fontStyle: 'italic', marginTop: 2 },
  modalBody: { padding: 16, gap: 12 },
  infoBlock: { gap: 0 },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 6,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#D0D0D0',
    gap: 8,
  },
  infoLabel: { fontSize: 12, color: Colors.gray[500], minWidth: 80 },
  infoValueWrap: { flex: 1, alignItems: 'flex-end' },
  infoValue: { fontSize: 12, color: Colors.txtPrimary, fontWeight: '500', textAlign: 'right' },
  italic: { fontStyle: 'italic', fontWeight: '400' },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '500',
    color: Colors.gray[500],
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  statBox: {
    width: '31%',
    backgroundColor: Colors.background,
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
  },
  statBoxNum: { fontSize: 20, fontWeight: '500', color: Colors.txtPrimary },
  statBoxLabel: { fontSize: 10, color: Colors.gray[500], marginTop: 2 },
  totalRow: { alignItems: 'flex-end' },
  totalText: { fontSize: 13, color: Colors.gray[500], fontWeight: '500' },
  totalNum: { color: Colors.txtPrimary },
  closeBtn: {
    backgroundColor: RED_SOLID,
    borderRadius: 8,
    paddingVertical: 13,
    alignItems: 'center',
    marginTop: 4,
  },
  closeBtnText: { color: Colors.white, fontSize: 14, fontWeight: '500' },
});