/**
 * Interface for Champion Mastery data returned from Riot API
 */
export interface ChampionMastery {
  championId: number; // Champion ID
  championLevel: number; // Mastery level for the champion (1-7)
  championPoints: number; // Total mastery points for the champion
  lastPlayTime: number; // Last time the champion was played (epoch milliseconds)
  championPointsSinceLastLevel: number; // Points earned since current level
  championPointsUntilNextLevel: number; // Points needed for next level
  chestGranted: boolean; // If a chest has been granted for this champion
  tokensEarned: number; // Tokens earned for this champion (relevant for levels 5-7)
  summonerId: string; // Encrypted summoner ID
  puuid: string; // Player universally unique identifier
}

/**
 * Represents a single game from the Steam API response
 */
export interface SteamGame {
  appid: number;
  name: string;
  playtime_2weeks?: number; // Optional as it's only present if played in last 2 weeks
  playtime_forever: number;
  img_icon_url: string;
  playtime_windows_forever: number;
  playtime_mac_forever: number;
  playtime_linux_forever: number;
  playtime_deck_forever: number;
}

export const formatPlaytime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours === 0) {
    return `${minutes} minutes`;
  } else if (remainingMinutes === 0) {
    return `${hours} hours`;
  } else {
    return `${hours} hours, ${remainingMinutes} minutes`;
  }
};

export const formatMasteryPoints = (points: number): string => {
  return points.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const CHAMPION_MAP: Record<number, string> = {
  266: "Aatrox",
  103: "Ahri",
  84: "Akali",
  166: "Akshan",
  12: "Alistar",
  32: "Amumu",
  34: "Anivia",
  1: "Annie",
  523: "Aphelios",
  22: "Ashe",
  136: "Aurelion Sol",
  268: "Azir",
  432: "Bard",
  200: "Bel'Veth",
  53: "Blitzcrank",
  63: "Brand",
  201: "Braum",
  51: "Caitlyn",
  164: "Camille",
  69: "Cassiopeia",
  31: "Cho'Gath",
  42: "Corki",
  122: "Darius",
  131: "Diana",
  119: "Draven",
  36: "Dr. Mundo",
  245: "Ekko",
  60: "Elise",
  28: "Evelynn",
  81: "Ezreal",
  9: "Fiddlesticks",
  114: "Fiora",
  105: "Fizz",
  3: "Galio",
  41: "Gangplank",
  86: "Garen",
  150: "Gnar",
  79: "Gragas",
  104: "Graves",
  887: "Gwen",
  120: "Hecarim",
  74: "Heimerdinger",
  420: "Illaoi",
  39: "Irelia",
  427: "Ivern",
  40: "Janna",
  59: "Jarvan IV",
  24: "Jax",
  126: "Jayce",
  202: "Jhin",
  222: "Jinx",
  145: "Kai'Sa",
  429: "Kalista",
  43: "Karma",
  30: "Karthus",
  38: "Kassadin",
  55: "Katarina",
  10: "Kayle",
  141: "Kayn",
  85: "Kennen",
  121: "Kha'Zix",
  203: "Kindred",
  240: "Kled",
  96: "Kog'Maw",
  897: "K'Sante",
  7: "LeBlanc",
  64: "Lee Sin",
  89: "Leona",
  876: "Lillia",
  127: "Lissandra",
  236: "Lucian",
  117: "Lulu",
  99: "Lux",
  54: "Malphite",
  90: "Malzahar",
  57: "Maokai",
  11: "Master Yi",
  21: "Miss Fortune",
  62: "Wukong",
  82: "Mordekaiser",
  25: "Morgana",
  267: "Nami",
  75: "Nasus",
  111: "Nautilus",
  518: "Neeko",
  76: "Nidalee",
  56: "Nocturne",
  20: "Nunu & Willump",
  2: "Olaf",
  61: "Orianna",
  516: "Ornn",
  80: "Pantheon",
  78: "Poppy",
  555: "Pyke",
  246: "Qiyana",
  133: "Quinn",
  497: "Rakan",
  33: "Rammus",
  421: "Rek'Sai",
  526: "Rell",
  888: "Renata Glasc",
  58: "Renekton",
  107: "Rengar",
  92: "Riven",
  68: "Rumble",
  13: "Ryze",
  360: "Samira",
  113: "Sejuani",
  235: "Senna",
  147: "Seraphine",
  875: "Sett",
  35: "Shaco",
  98: "Shen",
  102: "Shyvana",
  27: "Singed",
  14: "Sion",
  15: "Sivir",
  72: "Skarner",
  37: "Sona",
  16: "Soraka",
  50: "Swain",
  517: "Sylas",
  134: "Syndra",
  223: "Tahm Kench",
  163: "Taliyah",
  91: "Talon",
  44: "Taric",
  17: "Teemo",
  412: "Thresh",
  18: "Tristana",
  48: "Trundle",
  23: "Tryndamere",
  4: "Twisted Fate",
  29: "Twitch",
  77: "Udyr",
  6: "Urgot",
  110: "Varus",
  67: "Vayne",
  45: "Veigar",
  161: "Vel'Koz",
  711: "Vex",
  254: "Vi",
  234: "Viego",
  112: "Viktor",
  8: "Vladimir",
  106: "Volibear",
  19: "Warwick",
  498: "Xayah",
  101: "Xerath",
  5: "Xin Zhao",
  157: "Yasuo",
  777: "Yone",
  83: "Yorick",
  350: "Yuumi",
  154: "Zac",
  238: "Zed",
  221: "Zeri",
  115: "Ziggs",
  26: "Zilean",
  142: "Zoe",
  143: "Zyra",
};
