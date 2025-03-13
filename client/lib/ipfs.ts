import { type PostMetadata } from "@/types/post";

const PINATA_API_KEY = process.env.NEXT_PUBLIC_PINATA_API_KEY;
const PINATA_SECRET_KEY = process.env.NEXT_PUBLIC_PINATA_SECRET_KEY;

const IPFS_GATEWAYS = [
  "https://gateway.pinata.cloud/ipfs/",
  "https://ipfs.io/ipfs/",
  "https://cloudflare-ipfs.com/ipfs/",
];

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

async function tryFetchFromGateway(gateway: string, cid: string) {
  try {
    const cleanCid = cid.replace("ipfs://", "");
    const url = `${gateway}${cleanCid}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch from gateway: ${gateway}`);
    return await res.json();
  } catch (error) {
    console.warn(`Failed to fetch from gateway ${gateway}:`, error);
    throw error;
  }
}

export async function getFromIPFS(cid: string): Promise<PostMetadata> {
  if (!cid) throw new Error("No CID provided");

  for (const gateway of IPFS_GATEWAYS) {
    try {
      const data = await tryFetchFromGateway(gateway, cid);
      return data;
    } catch (error) {
      console.warn(`Gateway ${gateway} failed, trying next...`);
      continue;
    }
  }

  throw new Error("Failed to fetch from all IPFS gateways");
}

export function getIPFSImageUrl(cid: string, gatewayIndex = 0): string {
  const cleanCid = cid.replace("ipfs://", "");
  const gateway = IPFS_GATEWAYS[gatewayIndex % IPFS_GATEWAYS.length];
  return `${gateway}${cleanCid}`;
}
