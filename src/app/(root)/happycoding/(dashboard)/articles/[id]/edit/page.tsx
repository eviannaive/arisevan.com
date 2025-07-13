"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type Article = {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  slug: string;
  published: boolean;
  coverImage?: string;
  categoryId: string;
  tags: string[];
};

export default function EditArticlePage({ params }: { params: { id: string } }) {
  const { id } = params;
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [slug, setSlug] = useState("");
  const [published, setPublished] = useState(false);
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [categoryId, setCategoryId] = useState(""); // Placeholder
  const [tags, setTags] = useState<string[]>([]); // Placeholder
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(`/api/articles/${id}`);
        if (response.ok) {
          const data: Article = await response.json();
          setTitle(data.title);
          setContent(data.content);
          setExcerpt(data.excerpt || "");
          setSlug(data.slug);
          setPublished(data.published);
          setCoverImage(data.coverImage || null);
          setCategoryId(data.categoryId);
          setTags(data.tags || []);
        } else {
          setError("Article not found.");
        }
      } catch (err) {
        console.error("Error fetching article:", err);
        setError("Failed to load article.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchArticle();
    }
  }, [id]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    try {
      const response = await fetch(`/api/articles/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
          excerpt,
          slug,
          published,
          coverImage,
          categoryId,
          tags,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage("Article updated successfully!");
        router.push(`/happycoding/dashboard/articles/${data.id}`);
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to update article.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      setError("An unexpected error occurred.");
    }
  };

  if (loading) {
    return <div className="container mx-auto p-6">Loading article...</div>;
  }

  if (error && !loading) {
    return <div className="container mx-auto p-6 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-6 text-3xl font-bold">Edit Article</h1>

      {message && <div className="mb-4 rounded bg-green-100 p-3 text-green-700">{message}</div>}
      {error && <div className="mb-4 rounded bg-red-100 p-3 text-red-700">{error}</div>}

      <form onSubmit={handleSubmit} className="rounded-lg bg-white p-8 shadow-md">
        <div className="mb-4">
          <label htmlFor="title" className="mb-2 block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="content" className="mb-2 block text-sm font-medium text-gray-700">
            Content
          </label>
          <textarea
            id="content"
            className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
            rows={10}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>

        <div className="mb-4">
          <label htmlFor="excerpt" className="mb-2 block text-sm font-medium text-gray-700">
            Excerpt (Optional)
          </label>
          <textarea
            id="excerpt"
            className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
            rows={3}
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
          ></textarea>
        </div>

        <div className="mb-4">
          <label htmlFor="slug" className="mb-2 block text-sm font-medium text-gray-700">
            Slug
          </label>
          <input
            type="text"
            id="slug"
            className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="coverImage" className="mb-2 block text-sm font-medium text-gray-700">
            Cover Image (Upload)
          </label>
          <input
            type="file"
            id="coverImage"
            accept="image/*"
            className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
            onChange={handleFileChange}
          />
          {coverImage && (
            <img src={coverImage} alt="Cover Preview" className="mt-4 h-32 w-32 object-cover" />
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="categoryId" className="mb-2 block text-sm font-medium text-gray-700">
            Category ID (Placeholder)
          </label>
          <input
            type="text"
            id="categoryId"
            className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="tags" className="mb-2 block text-sm font-medium text-gray-700">
            Tags (Comma-separated IDs - Placeholder)
          </label>
          <input
            type="text"
            id="tags"
            className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
            value={tags.join(",")}
            onChange={(e) => setTags(e.target.value.split(",").map(tag => tag.trim()))}
          />
        </div>

        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            id="published"
            className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
          />
          <label htmlFor="published" className="text-sm font-medium text-gray-700">
            Published
          </label>
        </div>

        <button
          type="submit"
          className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Update Article
        </button>
      </form>
    </div>
  );
}
