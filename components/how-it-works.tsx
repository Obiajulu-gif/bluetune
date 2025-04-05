"use client"

import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Upload, Wallet, Play, Coins } from "lucide-react"

export function HowItWorks() {
  const steps = [
    {
      icon: <Wallet className="h-8 w-8 text-blue-400" />,
      title: "Connect Wallet",
      description: "Connect your Sui wallet to access the Bluetune platform.",
    },
    {
      icon: <Upload className="h-8 w-8 text-purple-400" />,
      title: "Upload Music",
      description: "Artists can upload their music as blobs on the Walrus storage system.",
    },
    {
      icon: <Play className="h-8 w-8 text-blue-400" />,
      title: "Stream Tracks",
      description: "Listen to high-quality music streamed directly from decentralized storage.",
    },
    {
      icon: <Coins className="h-8 w-8 text-purple-400" />,
      title: "Support Artists",
      description: "Artists receive direct payments in WAL/SUI tokens for every stream.",
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <section className="py-20 bg-black/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-space-grotesk mb-4">
            How{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">Bluetune</span>{" "}
            Works
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Our decentralized platform revolutionizes how music is shared, streamed, and monetized.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {steps.map((step, index) => (
            <motion.div key={index} variants={item}>
              <Card className="bg-black/40 backdrop-blur-sm border-blue-900/50 hover:border-blue-500/50 transition-all duration-300 h-full">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="mb-4 p-3 rounded-full bg-blue-900/30">{step.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-400">{step.description}</p>
                  <div className="mt-4 flex justify-center">
                    {index < steps.length - 1 && (
                      <div className="hidden lg:flex items-center justify-center">
                        <motion.div
                          animate={{
                            x: [0, 10, 0],
                          }}
                          transition={{
                            repeat: Number.POSITIVE_INFINITY,
                            duration: 1.5,
                          }}
                          className="text-blue-500 text-2xl"
                        >
                          →
                        </motion.div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

