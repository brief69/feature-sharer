import { useState } from "react";
import { Input } from "@/components/ui/input";
import { PostCard } from "@/components/PostCard";
import { CreatePostDialog } from "@/components/CreatePostDialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Language, defaultLanguage, getTranslation } from "@/utils/translations";

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
  const [language, setLanguage] = useState<Language>(defaultLanguage);

  const t = (key: string) => getTranslation(language, key);

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
          <h1 className="text-3xl font-bold">{t("title")}</h1>
          <div className="flex gap-4 items-center">
            <Button
              variant="outline"
              onClick={() => setLanguage(language === "en" ? "ja" : "en")}
            >
              {language === "en" ? "日本語" : "English"}
            </Button>
            <CreatePostDialog language={language} />
          </div>
        </div>

        <div className="space-y-6">
          <Input
            placeholder={t("searchPlaceholder")}
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
                {category === "All" ? t("all") : category}
              </Badge>
            ))}
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <PostCard key={post.id} {...post} language={language} />
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              {t("noPostsFound")}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
