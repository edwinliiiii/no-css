import axios from "axios";
import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  try {
    const riotUrl = process.env.REACT_APP_RIOTURL;

    if (!riotUrl) {
      console.error("Environment variable REACT_APP_RIOTURL is missing");
      return response.status(500).json({
        error: "Riot API URL not configured",
        details: "Check Vercel environment variables for REACT_APP_RIOTURL",
      });
    }

    const riotResponse = await axios.get(riotUrl);

    response.setHeader(
      "Cache-Control",
      "s-maxage=60, stale-while-revalidate=30"
    );

    return response.status(200).json(riotResponse.data);
  } catch (error: any) {
    console.error("Riot API Error:", error.message || error);
    return response.status(500).json({
      error: "Failed to fetch Riot data",
      message: error.message,
      code: error.code,
    });
  }
}
