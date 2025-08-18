import { NextRequest, NextResponse } from 'next/server'

// Helper function to get Spotify access token
async function getSpotifyAccessToken() {
  const clientId = process.env.SPOTIFY_CLIENT_ID
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET
  
  if (!clientId || !clientSecret) {
    throw new Error('Spotify credentials not configured')
  }

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`
    },
    body: 'grant_type=client_credentials'
  })

  if (!response.ok) {
    throw new Error('Failed to get Spotify access token')
  }

  const data = await response.json()
  return data.access_token
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  
  if (!id) {
    return NextResponse.json(
      { error: 'Track ID not provided' },
      { status: 400 }
    )
  }

  try {
    const accessToken = await getSpotifyAccessToken()

    if (!accessToken) {
      return NextResponse.json(
        { error: 'Spotify access token not configured' },
        { status: 500 }
      )
    }

    const response = await fetch(`https://api.spotify.com/v1/tracks/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })

    if (!response.ok) {
      throw new Error(`Spotify API error: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json({
      preview_url: data.preview_url,
      duration_ms: data.duration_ms,
      album: {
        name: data.album.name,
        images: data.album.images, // Add album images
      },
      release_date: data.album.release_date,
      name: data.name, // Add track name
      artists: data.artists.map((artist: any) => artist.name), // Add artist names
    })
  } catch (error: any) {
    return NextResponse.json(
      { 
        error: 'Failed to fetch track data', 
        details: error.message,
        solution: 'Make sure your Spotify credentials in .env.local are correct'
      },
      { status: 500 }
    )
  }
}
