import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { PlusCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Language, getTranslation } from "@/utils/translations";

interface CreatePostDialogProps {
  language: Language;
}

export const CreatePostDialog = ({ language }: CreatePostDialogProps) => {
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [rating, setRating] = useState<"good" | "neutral" | "bad">("neutral");
  const [comment, setComment] = useState("");

  const t = (key: string) => getTranslation(language, key);

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

    toast({
      title: "Post created",
      description: "Your post has been created successfully",
    });

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
          {t("createPost")}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t("createNewPost")}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">{t("title_label")}</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={t("title_placeholder")}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">{t("category_label")}</Label>
            <Input
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder={t("category_placeholder")}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tags">{t("tags_label")}</Label>
            <Input
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder={t("tags_placeholder")}
            />
          </div>
          <div className="space-y-2">
            <Label>{t("rating_label")}</Label>
            <RadioGroup
              value={rating}
              onValueChange={(value: "good" | "neutral" | "bad") => setRating(value)}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="good" id="good" />
                <Label htmlFor="good">{t("good")}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="neutral" id="neutral" />
                <Label htmlFor="neutral">{t("neutral")}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="bad" id="bad" />
                <Label htmlFor="bad">{t("bad")}</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="space-y-2">
            <Label htmlFor="comment">
              {t("comment_label")} {rating === "bad" && t("comment_required")}
            </Label>
            <Textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder={t("comment_placeholder")}
            />
          </div>
          <Button type="submit" className="w-full">{t("submit")}</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};