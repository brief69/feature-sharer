import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { PlusCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const CreatePostDialog = () => {
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [rating, setRating] = useState<"good" | "neutral" | "bad">("neutral");
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !category || !tags) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (rating === "bad" && !comment) {
      toast({
        title: "Comment required",
        description: "Please provide a comment for negative ratings",
        variant: "destructive",
      });
      return;
    }

    // Here we would normally submit to an API
    toast({
      title: "Post created",
      description: "Your post has been created successfully",
    });

    // Reset form
    setTitle("");
    setCategory("");
    setTags("");
    setRating("neutral");
    setComment("");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <PlusCircle className="w-4 h-4" />
          Create Post
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a new post</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Product or store name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g., Electronics, Food, Fashion"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tags">Tags (comma separated)</Label>
            <Input
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="e.g., quiet, eco-friendly, spacious"
            />
          </div>
          <div className="space-y-2">
            <Label>Rating</Label>
            <RadioGroup
              value={rating}
              onValueChange={(value: "good" | "neutral" | "bad") => setRating(value)}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="good" id="good" />
                <Label htmlFor="good">Good</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="neutral" id="neutral" />
                <Label htmlFor="neutral">Neutral</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="bad" id="bad" />
                <Label htmlFor="bad">Bad</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="space-y-2">
            <Label htmlFor="comment">Comment {rating === "bad" && "(required)"}</Label>
            <Textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience..."
            />
          </div>
          <Button type="submit" className="w-full">Create Post</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};