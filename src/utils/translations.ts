type Translations = {
  [key: string]: {
    [key: string]: string;
  };
};

export const translations: Translations = {
  en: {
    title: "Feature Information Hub",
    searchPlaceholder: "Search by title or tags...",
    createPost: "Create Post",
    createNewPost: "Create a new post",
    title_label: "Title",
    title_placeholder: "Product or store name",
    category_label: "Category",
    category_placeholder: "e.g., Electronics, Food, Fashion",
    tags_label: "Tags (comma separated)",
    tags_placeholder: "e.g., quiet, eco-friendly, spacious",
    rating_label: "Rating",
    good: "Good",
    neutral: "Neutral",
    bad: "Bad",
    comment_label: "Comment",
    comment_required: "(required)",
    comment_placeholder: "Share your experience...",
    trusted: "trusted",
    verify: "Verify this information",
    submit: "Create Post",
    noPostsFound: "No posts found. Try adjusting your search or create a new post.",
    all: "All",
  },
  ja: {
    title: "特徴情報ハブ",
    searchPlaceholder: "タイトルまたはタグで検索...",
    createPost: "投稿を作成",
    createNewPost: "新規投稿を作成",
    title_label: "タイトル",
    title_placeholder: "商品名または店舗名",
    category_label: "カテゴリー",
    category_placeholder: "例：電化製品、飲食、ファッション",
    tags_label: "タグ（カンマ区切り）",
    tags_placeholder: "例：静か、環境に優しい、広々",
    rating_label: "評価",
    good: "良い",
    neutral: "普通",
    bad: "悪い",
    comment_label: "コメント",
    comment_required: "（必須）",
    comment_placeholder: "体験を共有してください...",
    trusted: "信頼度",
    verify: "この情報を確認",
    submit: "投稿を作成",
    noPostsFound: "投稿が見つかりません。検索条件を変更するか、新しい投稿を作成してください。",
    all: "すべて",
  },
};

export type Language = keyof typeof translations;
export const defaultLanguage: Language = "en";

export const getTranslation = (lang: Language, key: string): string => {
  return translations[lang]?.[key] || translations[defaultLanguage][key] || key;
};