import axios from 'axios';
import { NEXT_PUBLIC_BLUETUNE } from './package_ids';

export type MusicAddedEvent = {
    id: string;
    metadata: TrackMetadata;
  }

type TrackMetadata = {
  id: string;
  artist: string;
  blobId: string;
  blobObjectId: string;
  coverUrl: string;
  duration: string;
  genre: string;
  title: string;
  dateAdded: string;
};

type Entry = {
  fields: {
    key: string;
    value: {
      fields: TrackMetadata;
      type: string;
    };
  };
  type: string;
};

function extractTrackMetadata(data: Entry[]): TrackMetadata[] {
  return data.map(entry => entry.fields.value.fields);
}

// Query events from the Sui network
export async function queryEvents(){
  const url = "https://fullnode.testnet.sui.io:443"; // Replace with your Sui RPC URL

  const payload = {
    jsonrpc: "2.0",
    id: 1,
    method: "sui_getObject",
    params: [
        NEXT_PUBLIC_BLUETUNE,
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

    const musicData = response.data.result.data.content.fields.tracks.fields.contents;
    const transformedData = extractTrackMetadata(musicData);
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

export async function getMusicbyId(id: string): Promise<any> {
    const url = "https://fullnode.testnet.sui.io:443"; // Replace with your Sui RPC URL
  
    const payload = {
      jsonrpc: "2.0",
      id: 1,
      method: "sui_getObject",
      params: [
        id,
        {
          showType: false,
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
    //   console.log(response.data);
      const musicData = response.data.result.data.content.fields.metadata.fields
      console.log(musicData);
      return musicData
    }catch (error) {
      console.error('Error fetching music by ID:', error);
    }
  }
// // Example usage
// queryEvents();