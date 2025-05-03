import axios from "axios";
import { ChampionMastery, SteamGame } from "./utils";

/**
 * Fetches recently played games from Steam API
 * @returns {Promise<Array>} Array of recently played games with details
 */
export async function fetchRecentlyPlayedGames(): Promise<SteamGame[]> {
  try {
    // Get the API URL from environment variables
    const apiUrl = process.env.REACT_APP_STEAMURL;

    if (!apiUrl) {
      throw new Error("Steam API URL not found in environment variables");
    }

    // Add a CORS proxy in front of the URL
    const corsProxyUrl = `https://corsproxy.io/?${encodeURIComponent(apiUrl)}`;

    // Make the request to the Steam API
    const response = await axios.get(corsProxyUrl);

    // Check if the response contains the expected data
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
    // Construct the API URL
    const apiUrl = process.env.REACT_APP_RIOTURL;

    if (!apiUrl) {
      throw new Error("Riot API URL not found in environment variables");
    }

    // Make the request to the Riot API
    const response = await axios.get(apiUrl);

    // Return the champion mastery data
    return response.data;
  } catch (error) {
    console.error("Error fetching champion mastery data:", error);
    throw error;
  }
}
