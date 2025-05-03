import { useEffect, useState } from "react";
import { fetchChampionMastery, fetchRecentlyPlayedGames } from "./apiService";
import {
  CHAMPION_MAP,
  ChampionMastery,
  SteamGame,
  formatMasteryPoints,
  formatPlaytime,
} from "./utils";

function App() {
  //steam
  const [games, setGames] = useState<SteamGame[]>([]);
  const [loadingSteam, setLoadingSteam] = useState<boolean>(true);
  const [errorSteam, setErrorSteam] = useState<string | null>(null);

  //riot
  const [championMastery, setChampionMastery] = useState<ChampionMastery[]>([]);
  const [loadingRiot, setLoadingRiot] = useState<boolean>(true);
  const [errorRiot, setErrorRiot] = useState<string | null>(null);

  useEffect(() => {
    const loadGames = async () => {
      try {
        const recentGames = await fetchRecentlyPlayedGames();
        setGames(recentGames);
      } catch (err) {
        setErrorSteam(
          err instanceof Error ? err.message : "Could not fetch Steam info."
        );
      } finally {
        setLoadingSteam(false);
      }
    };

    const loadMastery = async () => {
      try {
        const championMastery = await fetchChampionMastery();
        setChampionMastery(championMastery);
      } catch (err) {
        setErrorRiot(
          err instanceof Error ? err.message : "Could not fetch Riot info."
        );
      } finally {
        setLoadingRiot(false);
      }
    };

    loadGames();
    loadMastery();
  }, []);

  return (
    <div className="App">
      <p>a minimal depiction of who i am and what i like</p>
      {/* */}
      <dt>music</dt>
      <ul>
        <li>
          <a href="https://open.spotify.com/user/317o54dlzkjt5cmqvk2bdwz4o2rq?si=be2a0b90cfbe41f5">
            spotify
          </a>
        </li>
        <li>
          <a href="https://on.soundcloud.com/RbqppwcGJpxjnZcf8" target="_blank">
            soundcloud (mainly edm, remixes, hardstyle)
          </a>
        </li>
      </ul>
      {/* */}
      <dt>career - software engineer</dt>
      <ul>
        <li>
          <a
            href="https://drive.google.com/file/d/1GW2BV4fjsQt73fEvsutyc8cbxcmGEz3G/view?usp=sharing"
            target="_blank"
          >
            resume
          </a>
        </li>
        <li>
          <a href="https://linkedin.com/in/edwinliiiii/" target="_blank">
            linkedin
          </a>
        </li>
        <li>
          <a href="https://github.com/edwinliiiii" target="_blank">
            github
          </a>
        </li>
      </ul>
      {/* */}
      <dt>cooking</dt>
      <ul>
        <li>
          <a
            href="https://tastecooking.com/recipes/moms-shanghai-red-braised-pork-belly/"
            target="_blank"
          >
            my motha's red-braised pork belly
          </a>
        </li>
        <li>
          <a
            href="https://www.justataste.com/greek-yogurt-banana-bread-recipe/"
            target="_blank"
          >
            moist greek yogurt banana bread
          </a>
        </li>
        <li>
          <a href="https://thewoksoflife.com/katsudon/" target="_blank">
            egg onion and rice katsudon
          </a>
        </li>
        <li> chicken and broccoli for survival </li>
      </ul>
      {/* */}
      <dt>skating - PA suburbs & Boston</dt>
      <ul>
        <li>
          <a
            href="https://retrospec.com/collections/longboards/products/zed-44-inch-longboard"
            target="_blank"
          >
            retrospec zed 44 - my first ever board, sits a bit high and heavy,
            but all-around solid for cruising, 7/10
          </a>
        </li>
        <li>
          <a
            href="https://www.exwayboard.com/products/exway-flex"
            target="_blank"
          >
            exway flex 38 - electric skateboard i rode in high school, managing
            truck tightness for carving vs. speed was tough, but great for human
            centipede LMAO, 9/10
          </a>
        </li>
        <li>
          <a
            href="https://www.pennyskateboards.com/collections/22-skateboards/products/blackout-22"
            target="_blank"
          >
            pennyboard 22 - small, responsive, zippy board lent to me in
            college, great for carves and turns, not so much speed 7.5/10
          </a>
        </li>
        <li>
          <a
            href="https://landyachtz.com/shop/all/skate/boards/longboards/dipper-watercolor/"
            target="_blank"
          >
            landyachtz dipper 36 - my main board summer 2023, carvy and easy
            ride, 8/10
          </a>
        </li>
        <li>
          <a
            href="https://landyachtz.com/shop/discontinued/drop-cat-38-dune-2/"
            target="_blank"
          >
            landyachtz drop cat 38 - my current board of choice, great control
            for carving around the city, my first hammer shape though, 9.5/10
          </a>
        </li>
      </ul>
      {/* */}
      <dt>gaming - achievements</dt>
      <ul>
        <li>
          <a href="https://hearthstone.blizzard.com/en-us" target="_blank">
            hearthstone - peaked rank 1
          </a>
        </li>
        <li>
          <a
            href="https://store.steampowered.com/app/553310/Lethal_League_Blaze/"
            target="_blank"
          >
            lethal league blaze - peaked top 100
          </a>
        </li>
        <li>
          <a href="https://www.leagueoflegends.com/en-us/" target="_blank">
            league - plat
          </a>
        </li>
        <li>
          <a
            href="https://teamfighttactics.leagueoflegends.com/en-us/"
            target="_blank"
          >
            tft - emerald
          </a>
        </li>
        <li>
          <a href="https://playvalorant.com/en-us/" target="_blank">
            valorant - plat
          </a>
        </li>
      </ul>
      {/* */}
      <dt>gaming - recent activity via steam api</dt>
      {loadingSteam ? (
        <p>Loading my Steam games...</p>
      ) : errorSteam ? (
        <p>Error loading Steam data: {errorSteam}</p>
      ) : (
        <ul>
          {games.map((game) => (
            <li key={game.appid}>
              <a
                href={`https://store.steampowered.com/app/${game.appid}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {game.name} - {`${formatPlaytime(game.playtime_forever)} total`}
                {game.playtime_2weeks &&
                  ` (${formatPlaytime(game.playtime_2weeks)} in last 2 weeks)`}
              </a>
            </li>
          ))}
        </ul>
      )}
      <dt>gaming - most played league champions via riot api</dt>
      {loadingRiot ? (
        <p>Loading my Riot data...</p>
      ) : errorRiot ? (
        <p>Error loading champion mastery data: {errorRiot}</p>
      ) : (
        <ul>
          {championMastery.map((champ) => (
            <li key={champ.championId}>
              {CHAMPION_MAP[champ.championId]},{" "}
              {formatMasteryPoints(champ.championPoints)} points
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
