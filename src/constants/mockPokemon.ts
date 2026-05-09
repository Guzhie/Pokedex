export type PokemonStats = {
  hp: number;
  attack: number;
  defense: number;
  spAtk: number;
  spDef: number;
  speed: number;
};

/** Habilidade com parte em itálico (ex.: "Telepatia por *pressão*") */
export type PokemonAbilityDisplay = {
  before: string;
  italic: string;
  after?: string;
};

export type PokemonMock = {
  id: string;
  dexNumber: number;
  name: string;
  spriteUri: string;
  height: string;
  weight: string;
  category: string;
  types: string;
  ability: PokemonAbilityDisplay;
  weaknesses: string;
  evolution: string;
  stats: PokemonStats;
  total: number;
};

function officialArt(id: number) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}

export const MOCK_POKEMON: PokemonMock[] = [
  {
    id: '483',
    dexNumber: 483,
    name: 'Dialga',
    spriteUri: officialArt(483),
    height: '5,4 m',
    weight: '683 kg',
    category: 'Pokémon Temporal',
    types: 'Aço, Dragão',
    ability: { before: 'Telepatia por ', italic: 'pressão' },
    weaknesses: 'Lutador, Terrestre',
    evolution: 'Não evolui',
    stats: { hp: 100, attack: 120, defense: 120, spAtk: 150, spDef: 100, speed: 90 },
    total: 680,
  },
  {
    id: '484',
    dexNumber: 484,
    name: 'Palkia',
    spriteUri: officialArt(484),
    height: '4,2 m',
    weight: '336 kg',
    category: 'Pokémon Espacial',
    types: 'Água, Dragão',
    ability: { before: 'Telepatia por ', italic: 'pressão' },
    weaknesses: 'Dragão, Fada',
    evolution: 'Não evolui',
    stats: { hp: 90, attack: 120, defense: 100, spAtk: 150, spDef: 120, speed: 100 },
    total: 680,
  },
  {
    id: '487',
    dexNumber: 487,
    name: 'Giratina',
    spriteUri: officialArt(487),
    height: '4,5 m',
    weight: '750 kg',
    category: 'Pokémon Renegado',
    types: 'Fantasma, Dragão',
    ability: { before: 'Telepatia por ', italic: 'pressão' },
    weaknesses: 'Fantasma, Fada, Noturno, Gelo, Dragão',
    evolution: 'Não evolui',
    stats: { hp: 150, attack: 100, defense: 120, spAtk: 100, spDef: 120, speed: 90 },
    total: 680,
  },
];