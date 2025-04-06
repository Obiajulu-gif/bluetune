import axios from 'axios';

const OBJECT_ID = process.env.NEXT_PUBLIC_BLUETUNE as string;

interface RawMusicData {
  fields: {
    album: string;
    artist: string;
    blobId: string;
    coverUrl: string;
    dateAdded: string;
    duration: string; 
    genre: string;
    id: { id: string };
    plays: string; // Stored as a string
    title: string;
    type: string;
  };
}

// Define the structure of the transformed music data for your application
interface TransformedMusicData {
  id: string;
  title: string;
  artist: string;
  album: string;
  coverUrl: string;
  audioUrl: string;
  genre: string;
  duration: string;
  plays: number;
  blobId: string;
}

// Transform the raw music data into the desired format
const transformMusicData = (data: RawMusicData[], audioUrlPrefix: string = "https://aggregator.walrus-testnet.walrus.space/v1/blobs/"): TransformedMusicData[] => {
  return data.map((item) => {
    const { fields } = item;

    // Convert duration from seconds to minutes:seconds format
    const durationInSeconds = parseInt(fields.duration, 10);
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = durationInSeconds % 60;
    const formattedDuration = `${minutes}:${seconds.toString().padStart(2, '0')}`;

    return {
      id: fields.id.id,
      title: fields.title,
      artist: fields.artist,
      album: fields.album,
      coverUrl: fields.coverUrl,
      audioUrl: `${audioUrlPrefix}${fields.blobId}`, 
      genre: fields.genre,
      duration: formattedDuration,
      plays: parseInt(fields.plays, 10),
      blobId: fields.blobId,
    };
  });
};

// Query events from the Sui network
export async function queryEvents(): Promise<TransformedMusicData[] | []> {
  const url = "https://fullnode.testnet.sui.io:443"; // Replace with your Sui RPC URL

  const payload = {
    jsonrpc: "2.0",
    id: 1,
    method: "sui_getObject",
    params: [
      OBJECT_ID,
      {
        showType: true,
        showOwner: false,
        showPreviousTransaction: false,
        showDisplay: false,
        showContent: true,
        showBcs: false,
        showStorageRebate: false
      }
    ]
  };

  try {
    const response = await axios.post(url, payload, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const musicData = response.data.result.data.content.fields.music;

    if (!musicData || !Array.isArray(musicData)) {
      console.error('No valid music data found in response.');
      return [];
    }

    const transformedData = transformMusicData(musicData, "https://aggregator.walrus-testnet.walrus.space/v1/blobs/");
    console.log(transformedData);
    return transformedData;

  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error Message:', error.message);
    } else {
      console.error('Unexpected Error:', error);
    }
    return [];
  }
}

// // Example usage
// queryEvents();