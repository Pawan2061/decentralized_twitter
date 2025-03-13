import { useState } from "react";
import { useWriteContract } from "wagmi";
import { Loader2 } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import DecentralizedTwitterABI from "../../contract/artifacts/contracts/DecentralizedTwitter.sol/DecentralizedTwitter.json";

const CONTRACT_ADDRESS = "0x8b39cD68dB11AcCD24DC2f5f0Df18b75F05f6Fb4";

interface CreatePostDialogProps {
  trigger: React.ReactNode;
  onPostCreated?: () => void;
}

export function CreatePostDialog({
  trigger,
  onPostCreated,
}: CreatePostDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState("");

  const { writeContract, isPending } = useWriteContract();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!content.trim()) {
      toast.error("Please enter some content for your post");
      return;
    }

    try {
      toast.promise(
        new Promise(async (resolve, reject) => {
          try {
            await writeContract({
              address: CONTRACT_ADDRESS as `0x${string}`,
              abi: DecentralizedTwitterABI.abi,
              functionName: "createPost",
              args: [content],
            });
            setIsOpen(false);
            setContent("");
            onPostCreated?.();
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
              the blockchain.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                placeholder="What's on your mind?"
                value={content}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setContent(e.target.value)
                }
                className="resize-none"
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
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
