import { useState, useRef } from "react";
import { useAccount, useWriteContract } from "wagmi";
import { Loader2, ImagePlus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { uploadToIPFS, uploadImageToIPFS } from "@/lib/ipfs";
import DecentralizedTwitterABI from "../../contract/artifacts/contracts/DecentralizedTwitter.sol/DecentralizedTwitter.json";
import type { PostMetadata } from "@/types/post";
import { refreshPosts } from "@/lib/necessary-actions";
import useEventStore from "@/store/eventStore";

const CONTRACT_ADDRESS = "0x900935a96f16c5A124967Ad7e5351c031dD2A1e6";

interface CreatePostDialogProps {
  trigger: React.ReactNode;
  onPostCreated?: () => void;
}

export function CreatePostDialog({
  trigger,
  onPostCreated,
}: CreatePostDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { address } = useAccount();

  const { writeContract, isPending } = useWriteContract();
  const { addEvent } = useEventStore();

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newImages = Array.from(e.target.files);
      setImages((prev) => [...prev, ...newImages]);
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      toast.error("Please fill in both title and description");
      return;
    }

    try {
      setIsUploading(true);

      const imageCids = await Promise.all(
        images.map((image) => uploadImageToIPFS(image))
      );

      const metadata: PostMetadata = {
        title: title.trim(),
        description: description.trim(),
        images: imageCids,
        createdAt: Date.now().toString(),
      };

      const metadataCid = await uploadToIPFS(metadata);

      toast.promise(
        new Promise(async (resolve, reject) => {
          try {
            await writeContract({
              address: CONTRACT_ADDRESS as `0x${string}`,
              abi: DecentralizedTwitterABI.abi,
              functionName: "createPost",
              args: [metadataCid],
            });
            setIsOpen(false);
            setTitle("");
            setDescription("");
            setImages([]);
            addEvent(
              `${address} has created the post with metadata ${metadata.title}`
            );

            onPostCreated?.();
            refreshPosts();
            resolve(true);
          } catch (error) {
            reject(error);
          }
        }),
        {
          loading: "Creating your post...",
          success: "Post created successfully!",
          error: "Failed to create post. Please try again.",
        }
      );
    } catch (err) {
      console.error("Error creating post:", err);
      toast.error("Failed to create post. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create New Post</DialogTitle>
            <DialogDescription>
              Share your thoughts with the world. Your post will be stored on
              IPFS and the blockchain.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Enter a title for your post"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="What's on your mind?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="resize-none"
                rows={4}
              />
            </div>
            <div className="grid gap-2">
              <Label>Images</Label>
              <div className="flex flex-wrap gap-2">
                {images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Upload ${index + 1}`}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  className="w-20 h-20 flex flex-col items-center justify-center gap-1"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <ImagePlus className="h-6 w-6" />
                  <span className="text-xs">Add Image</span>
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleImageSelect}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              disabled={isPending || isUploading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending || isUploading}>
              {isPending || isUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isUploading ? "Uploading..." : "Creating..."}
                </>
              ) : (
                "Create Post"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
