import axios from 'axios';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  try {
    const steamUrl = process.env.REACT_APP_STEAMURL;

    if (!steamUrl) {
      console.error('Environment variable REACT_APP_STEAMURL is missing');
      return response.status(500).json({ 
        error: 'Steam API URL not configured',
        details: 'Check Vercel environment variables for REACT_APP_STEAMURL'
      });
    }

    const steamResponse = await axios.get(steamUrl);
    
    response.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=30');
    return response.status(200).json(steamResponse.data);
  } catch (error: any) {
    console.error('Steam API Error:', error.message || error);
    return response.status(500).json({ 
      error: 'Failed to fetch Steam data',
      message: error.message,
      code: error.code
    });
  }
}
