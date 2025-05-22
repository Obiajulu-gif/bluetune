
import { NEXT_PUBLIC_PACKAGEID } from "@/backend/package_ids";
export const getObject = async (address: string) => {
    const nftType = `${NEXT_PUBLIC_PACKAGEID}::bluetune::Creator`;
    const request = {
        "jsonrpc": "2.0",
        "id": 1,
        "method": "suix_getOwnedObjects",
        "params": [
            address,
            {
                "filter": {
                    "StructType": nftType
                },
                "options": {
                    "showType": true,
                    "showOwner": true,
                    "showContent": true,
                    "showDisplay": true,
                    "showBcs": false,
                    "showStorageRebate": false
                }
            }
        ]
    };

    const response = await fetch('https://fullnode.testnet.sui.io:443', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(request)
    });

    try {
        return await response.json().then((res) => res.result.data[0].data.objectId);
    } catch (error) {
        return false;
    }
};