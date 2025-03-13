import { type PostMetadata } from "@/types/post";

const PINATA_API_KEY = process.env.NEXT_PUBLIC_PINATA_API_KEY;
const PINATA_SECRET_KEY = process.env.NEXT_PUBLIC_PINATA_SECRET_KEY;
const PINATA_GATEWAY = "https://gateway.pinata.cloud/ipfs/";

export async function uploadToIPFS(data: PostMetadata): Promise<string> {
  try {
    const jsonString = JSON.stringify(data);

    const formData = new FormData();
    const blob = new Blob([jsonString], { type: "application/json" });
    formData.append("file", blob, "metadata.json");

    const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
      method: "POST",
      headers: {
        pinata_api_key: PINATA_API_KEY || "",
        pinata_secret_api_key: PINATA_SECRET_KEY || "",
      },
      body: formData,
    });

    const data_res = await res.json();

    if (!res.ok) {
      throw new Error("Failed to upload to Pinata");
    }

    return data_res.IpfsHash;
  } catch (error) {
    console.error("Error uploading to IPFS:", error);
    throw error;
  }
}

export async function uploadImageToIPFS(file: File): Promise<string> {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
      method: "POST",
      headers: {
        pinata_api_key: PINATA_API_KEY || "",
        pinata_secret_api_key: PINATA_SECRET_KEY || "",
      },
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error("Failed to upload to Pinata");
    }

    return data.IpfsHash;
  } catch (error) {
    console.error("Error uploading image to IPFS:", error);
    throw error;
  }
}

export async function getFromIPFS(cid: string): Promise<PostMetadata> {
  try {
    const res = await fetch(`${PINATA_GATEWAY}${cid}`);
    if (!res.ok) throw new Error("Failed to fetch from IPFS");
    return res.json();
  } catch (error) {
    console.error("Error fetching from IPFS:", error);
    throw error;
  }
}
