import axios from "axios";
import { ChampionMastery, SteamGame } from "./utils";

/**
 * Fetches recently played games from Steam API
 * @returns {Promise<Array>} Array of recently played games with details
 */
export async function fetchRecentlyPlayedGames(): Promise<SteamGame[]> {
  try {
    // Call our internal API route instead of the external Steam API directly
    // This solves CORS and hides the API key from the browser
    const response = await axios.get("/api/steam");

    if (
      response.data &&
      response.data.response &&
      response.data.response.games
    ) {
      return response.data.response.games;
    } else {
      throw new Error("Unexpected response format from Steam API");
    }
  } catch (error) {
    console.error("Error fetching recently played games:", error);
    throw error;
  }
}

export async function fetchChampionMastery(): Promise<ChampionMastery[]> {
  try {
    // Call our internal API route
    const response = await axios.get("/api/riot");

    // Return the champion mastery data
    return response.data;
  } catch (error) {
    console.error("Error fetching champion mastery data:", error);
    throw error;
  }
}
