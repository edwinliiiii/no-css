import axios from 'axios';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  try {
    const steamUrl = process.env.REACT_APP_STEAMURL;

    if (!steamUrl) {
      return response.status(500).json({ error: 'Steam API URL not configured' });
    }

    const steamResponse = await axios.get(steamUrl);
    
    // Add cache headers to make it even faster for repeat visits
    response.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=30');
    
    return response.status(200).json(steamResponse.data);
  } catch (error) {
    console.error('Steam API Error:', error);
    return response.status(500).json({ error: 'Failed to fetch Steam data' });
  }
}
