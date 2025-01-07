import { useState } from "react";
import { Input } from "@/components/ui/input";
import { PostCard } from "@/components/PostCard";
import { CreatePostDialog } from "@/components/CreatePostDialog";
import { Badge } from "@/components/ui/badge";

// Mock data for demonstration
const MOCK_POSTS = [
  {
    id: 1,
    title: "Coffee Shop XYZ",
    category: "Food & Beverage",
    tags: ["cozy", "wifi", "quiet"],
    rating: "good" as const,
    trustScore: 85,
    comment: "Great atmosphere for working",
  },
  {
    id: 2,
    title: "Noise-Canceling Headphones ABC",
    category: "Electronics",
    tags: ["quiet", "comfortable", "battery-life"],
    rating: "neutral" as const,
    trustScore: 75,
    comment: "Good but expensive",
  },
  {
    id: 3,
    title: "Local Gym DEF",
    category: "Fitness",
    tags: ["crowded", "equipment", "cleanliness"],
    rating: "bad" as const,
    trustScore: 45,
    comment: "Too crowded during peak hours",
  },
];

const CATEGORIES = ["All", "Food & Beverage", "Electronics", "Fitness", "Fashion", "Services"];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPosts = MOCK_POSTS.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Feature Information Hub</h1>
          <CreatePostDialog />
        </div>

        <div className="space-y-6">
          <Input
            placeholder="Search by title or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-md"
          />

          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <PostCard key={post.id} {...post} />
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              No posts found. Try adjusting your search or create a new post.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;