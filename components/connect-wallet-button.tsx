"use client";
import { motion } from "framer-motion";
import { ConnectButton, useWallet } from "@suiet/wallet-kit";
import { Button } from "./ui/button";
import { Wallet } from "lucide-react";

export function ConnectWalletButton() {
	const { connected, account } = useWallet();

	const formatAddress = (address: string) => {
		if (!address) return "";
		return `${address.slice(0, 6)}...${address.slice(-4)}`;
	};

	return (
		<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
			<ConnectButton style={{ display: "none" }} id="hidden-connect-button" />

			<Button
				onClick={() => {
					document.getElementById("hidden-connect-button")?.click();
				}}
				className={`relative overflow-hidden font-medium ${
					connected
						? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
						: "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
				}`}
			>
				{connected ? (
					<div className="flex items-center gap-2">
						<Wallet className="h-4 w-4" />
						<span>{formatAddress(account?.address || "")}</span>
					</div>
				) : (
					<div className="flex items-center gap-2">
						<Wallet className="h-4 w-4" />
						<span>Connect Wallet</span>
					</div>
				)}
			</Button>
		</motion.div>
	);
}

// "use client"

// import { Button } from "@/components/ui/button"
// import { Wallet } from "lucide-react"
// import { motion } from "framer-motion"
// import { useWallet } from "@/hooks/use-wallet"

// export function ConnectWalletButton() {
//   const { isConnected, walletAddress, isConnecting, connect, disconnect } = useWallet()

//   const formatAddress = (address: string) => {
//     return `${address.slice(0, 6)}...${address.slice(-4)}`
//   }

//   return (
//     <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//       <Button
//         onClick={isConnected ? disconnect : connect}
//         disabled={isConnecting}
//         className={`relative overflow-hidden font-medium ${
//           isConnected
//             ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
//             : "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
//         }`}
//       >
//         {isConnecting ? (
//           <div className="flex items-center gap-2">
//             <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
//             <span>Connecting...</span>
//           </div>
//         ) : isConnected ? (
//           <div className="flex items-center gap-2">
//             <Wallet className="h-4 w-4" />
//             <span>{formatAddress(walletAddress)}</span>
//           </div>
//         ) : (
//           <div className="flex items-center gap-2">
//             <Wallet className="h-4 w-4" />
//             <span>Connect Wallet</span>
//           </div>
//         )}
//       </Button>
//     </motion.div>
//   )
// }
