import axios from "axios";
                                          
export async function uploadToWalrus(file: File, coverImage: File | null, metadata: any) {
  console.log("Uploading to Walrus...")

  try {
    const res = await axios.put(
        'https://publisher.walrus-testnet.walrus.space/v1/blobs?epochs=50&deletable=true',
        file,
        {
            headers: { 'Content-Type': 'multipart/form-data' }
        }
    );
    const blobId = res.data.newlyCreated.blobObject.blobId;
    console.log("Blob ID:", blobId);
    if (coverImage) {
        console.log(URL.createObjectURL(coverImage));
    } else {
        console.log("No cover image provided.");
    }

  return {
    blobId,
    coverUrl: coverImage ? URL.createObjectURL(coverImage) : null,
    audioUrl: URL.createObjectURL(file),
    ...metadata,
  }
  } catch (err) {
    console.log(err);
  }

  
}

export async function fetchFromWalrus(blobId: string) {
  // Simulate a delay for the fetch
  await new Promise((resolve) => setTimeout(resolve, 500))

  // In a real implementation, this would fetch the file from Walrus
  // For now, we'll just return a mock response
  return {
    url: "https://example.com/audio.mp3",
    metadata: {
      title: "Mock Track",
      artist: "Mock Artist",
      album: "Mock Album",
      genre: "electronic",
    },
  }
}

export async function deleteFromWalrus(blobId: string) {
  // Simulate a delay for the delete
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // In a real implementation, this would delete the file from Walrus
  // For now, we'll just return a mock response
  return {
    success: true,
    message: "Blob deleted successfully",
  }
}

export async function listWalrusBlobs(options: { limit?: number; offset?: number } = {}) {
  // Simulate a delay for the list operation
  await new Promise((resolve) => setTimeout(resolve, 800))

  const { limit = 10, offset = 0 } = options

  // Generate mock blob data
  const blobs = Array.from({ length: limit }, (_, i) => ({
    id: "0x" + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join(""),
    metadata: {
      title: `Track ${offset + i + 1}`,
      artist: `Artist ${Math.floor(Math.random() * 5) + 1}`,
      album: `Album ${Math.floor(Math.random() * 3) + 1}`,
      genre: ["electronic", "hiphop", "rock", "pop", "ambient"][Math.floor(Math.random() * 5)],
    },
    createdAt: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
    size: Math.floor(Math.random() * 10000000) + 1000000,
  }))

  return {
    blobs,
    total: 100, // Mock total count
    hasMore: offset + limit < 100,
  }
}

