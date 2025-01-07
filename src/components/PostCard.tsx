import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { ThumbsDown, ThumbsUp, Minus } from "lucide-react";

interface PostCardProps {
  title: string;
  category: string;
  tags: string[];
  rating: "good" | "neutral" | "bad";
  trustScore: number;
  comment?: string;
}

export const PostCard = ({ title, category, tags, rating, trustScore, comment }: PostCardProps) => {
  const getRatingIcon = () => {
    switch (rating) {
      case "good":
        return <ThumbsUp className="w-5 h-5 text-trust-high" />;
      case "bad":
        return <ThumbsDown className="w-5 h-5 text-trust-low" />;
      default:
        return <Minus className="w-5 h-5 text-trust-medium" />;
    }
  };

  const getTrustColor = () => {
    if (trustScore >= 80) return "text-trust-high";
    if (trustScore >= 50) return "text-trust-medium";
    return "text-trust-low";
  };

  return (
    <Card className="w-full hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-muted-foreground">{category}</p>
        </div>
        <div className="flex items-center gap-2">
          {getRatingIcon()}
          <span className={`font-semibold ${getTrustColor()}`}>{trustScore}% trusted</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
        {comment && <p className="text-sm text-muted-foreground">{comment}</p>}
      </CardContent>
      <CardFooter className="text-sm text-muted-foreground">
        <button className="hover:text-primary transition-colors">Verify this information</button>
      </CardFooter>
    </Card>
  );
};