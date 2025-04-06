"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { Music, Upload, X, Info } from "lucide-react"
import { uploadToWalrus } from "@/lib/walrus-client"
import { Controller } from "react-hook-form";
import { Transaction } from "@mysten/sui/transactions";
import { SuiClient, getFullnodeUrl } from "@mysten/sui/client";
import { useWallet } from "@suiet/wallet-kit";

type UploadFormProps = {
  onUploadSuccess: (trackData: any) => void
}

export function UploadForm({ onUploadSuccess }: UploadFormProps) {
  const { toast } = useToast()
  const [file, setFile] = useState<File | null>(null)
  const [coverImage, setCoverImage] = useState<File | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [isPermanent, setIsPermanent] = useState(true)
  const [estimatedCost, setEstimatedCost] = useState("0.05")

  const wallet = useWallet();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm()

  const { getRootProps: getMusicRootProps, getInputProps: getMusicInputProps } = useDropzone({
    accept: {
      "audio/*": [".mp3", ".wav", ".flac", ".aac"],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        setFile(acceptedFiles[0])
        // Calculate estimated cost based on file size
        const fileSizeInMB = acceptedFiles[0].size / (1024 * 1024)
        const estimatedWalCost = (fileSizeInMB * 0.01).toFixed(2)
        setEstimatedCost(estimatedWalCost)
      }
    },
  })

  const { getRootProps: getCoverRootProps, getInputProps: getCoverInputProps } = useDropzone({
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp"],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        setCoverImage(acceptedFiles[0])
      }
    },
  })

  const onSubmit = async (data: any) => {
    if (!file) {
      toast({
        title: "Error",
        description: "Please upload an audio file",
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 95) {
            clearInterval(progressInterval)
            return prev
          }
          return prev + 5
        })
      }, 300)

      // Simulate Walrus upload with metadata
      const metadata = {
        title: data.title,
        artist: data.artist,
        album: data.album,
        genre: data.genre,
        isPermanent: isPermanent,
        releaseYear: data.releaseYear,
      }

      // In a real implementation, this would call the Walrus API
      const result = await uploadToWalrus(file, coverImage, metadata)
      
      clearInterval(progressInterval)
      setUploadProgress(100)

      setTimeout(() => {
        onUploadSuccess({
          ...metadata,
          id: result.id,
          blobId: result.blobId,
          coverUrl: result.coverUrl || "/placeholder.svg?height=400&width=400",
          audioUrl: result.audioUrl,
          uploadDate: new Date().toISOString(),
        })
      }, 1000)
    } catch (error) {
      console.error("Upload error:", error)
      toast({
        title: "Upload Failed",
        description: "There was an error uploading your track. Please try again.",
        variant: "destructive",
      })
      setIsUploading(false)
    }
  }

  return (
    <Card className="bg-black/40 backdrop-blur-md border-blue-900/50">
      <CardHeader>
        <CardTitle className="text-2xl font-space-grotesk bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
          Upload Your Music
        </CardTitle>
        <CardDescription>Share your music with the world on the Bluetune decentralized platform</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="advanced">Advanced Settings</TabsTrigger>
          </TabsList>

          <form onSubmit={handleSubmit(onSubmit)}>
            <TabsContent value="basic" className="space-y-6">
              {/* Audio File Upload */}
              <div className="space-y-2">
                <Label>Audio File</Label>
                <div
                  {...getMusicRootProps()}
                  className={`border-2 border-dashed rounded-lg p-6 cursor-pointer transition-colors ${
                    file ? "border-blue-500 bg-blue-500/10" : "border-gray-700 hover:border-blue-500/50"
                  }`}
                >
                  <input {...getMusicInputProps()} />
                  {!file ? (
                    <div className="text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                      <p className="text-sm font-medium">Drag and drop your audio file here or click to browse</p>
                      <p className="text-xs text-gray-500 mt-1">Supports MP3, WAV, FLAC (max 100MB)</p>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Music className="h-8 w-8 text-blue-400" />
                        <div>
                          <p className="font-medium truncate max-w-xs">{file.name}</p>
                          <p className="text-xs text-gray-400">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          setFile(null)
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              {/* Cover Image Upload */}
              <div className="space-y-2">
                <Label>Cover Image</Label>
                <div
                  {...getCoverRootProps()}
                  className={`border-2 border-dashed rounded-lg p-6 cursor-pointer transition-colors ${
                    coverImage ? "border-purple-500 bg-purple-500/10" : "border-gray-700 hover:border-purple-500/50"
                  }`}
                >
                  <input {...getCoverInputProps()} />
                  {!coverImage ? (
                    <div className="text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                      <p className="text-sm font-medium">Drag and drop your cover image here or click to browse</p>
                      <p className="text-xs text-gray-500 mt-1">Supports JPG, PNG, WebP (recommended: 1400×1400px)</p>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="h-16 w-16 rounded overflow-hidden">
                          <img
                            src={URL.createObjectURL(coverImage) || "/placeholder.svg"}
                            alt="Cover preview"
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium truncate max-w-xs">{coverImage.name}</p>
                          <p className="text-xs text-gray-400">{(coverImage.size / (1024 * 1024)).toFixed(2)} MB</p>
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          setCoverImage(null)
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              {/* Track Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="Track title"
                    className="bg-black/30 border-gray-700 focus-visible:ring-blue-500"
                    {...register("title", { required: true })}
                  />
                  {errors.title && <p className="text-red-500 text-xs mt-1">Title is required</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="artist">Artist Name</Label>
                  <Input
                    id="artist"
                    placeholder="Artist name"
                    className="bg-black/30 border-gray-700 focus-visible:ring-blue-500"
                    {...register("artist", { required: true })}
                  />
                  {errors.artist && <p className="text-red-500 text-xs mt-1">Artist name is required</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="album">Album (Optional)</Label>
                  <Input
                    id="album"
                    placeholder="Album name"
                    className="bg-black/30 border-gray-700 focus-visible:ring-blue-500"
                    {...register("album")}
                  />
                </div>

                <Controller
                name="genre"
                control={control}
                rules={{ required: "Genre is required" }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value || ""}>
                    <SelectTrigger className="bg-black/30 border-gray-700">
                      <SelectValue placeholder="Select genre" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="electronic">Electronic</SelectItem>
                      <SelectItem value="hiphop">Hip Hop</SelectItem>
                      <SelectItem value="rock">Rock</SelectItem>
                      <SelectItem value="pop">Pop</SelectItem>
                      <SelectItem value="jazz">Jazz</SelectItem>
                      <SelectItem value="classical">Classical</SelectItem>
                      <SelectItem value="ambient">Ambient</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              </div>
            </TabsContent>

            <TabsContent value="advanced" className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="releaseYear">Release Year</Label>
                <Input
                  id="releaseYear"
                  type="number"
                  placeholder="2023"
                  className="bg-black/30 border-gray-700 focus-visible:ring-blue-500"
                  {...register("releaseYear")}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="storage-type">Storage Type</Label>
                  <div className="flex items-center space-x-2">
                    <Switch id="storage-type" checked={isPermanent} onCheckedChange={setIsPermanent} />
                    <span className="text-sm font-medium">{isPermanent ? "Permanent" : "Deletable"}</span>
                  </div>
                </div>
                <p className="text-xs text-gray-400">
                  Permanent storage cannot be deleted and costs more. Deletable storage can be reclaimed later.
                </p>
              </div>

              <div className="bg-blue-900/20 rounded-lg p-4 flex items-start space-x-3">
                <Info className="h-5 w-5 text-blue-400 mt-0.5" />
                <div>
                  <h4 className="font-medium text-sm">Storage Information</h4>
                  <p className="text-xs text-gray-300 mt-1">
                    Your music will be stored on the Walrus Protocol, a decentralized storage solution on the Sui
                    blockchain. This ensures your content remains censorship-resistant and permanently accessible.
                  </p>
                </div>
              </div>

              <div className="bg-purple-900/20 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">Estimated Cost</h4>
                  <div className="flex items-center space-x-1">
                    <span className="text-lg font-bold">{estimatedCost}</span>
                    <span className="text-sm text-gray-300">WAL</span>
                  </div>
                </div>
                <p className="text-xs text-gray-400">
                  This is an estimate based on file size and storage type. Actual cost may vary slightly.
                </p>
              </div>
            </TabsContent>

            {isUploading && (
              <div className="mt-6 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Uploading to Walrus...</span>
                  <span className="text-sm">{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} className="h-2" />
              </div>
            )}

            <CardFooter className="flex justify-end space-x-4 px-0 pt-6">
              <Button type="button" variant="ghost" disabled={isUploading}>
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isUploading}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
              >
                {isUploading ? "Uploading..." : "Upload to Walrus"}
              </Button>
            </CardFooter>
          </form>
        </Tabs>
      </CardContent>
    </Card>
  )
}

