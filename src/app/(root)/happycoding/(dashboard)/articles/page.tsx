"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Checkbox } from "@heroui/react";
import { Input, Textarea } from "@heroui/input";

export default function CreateArticlePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [slug, setSlug] = useState("");
  const [published, setPublished] = useState(false);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [categoryId, setCategoryId] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverImage(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("excerpt", excerpt);
    formData.append("slug", slug);
    formData.append("published", String(published));
    if (coverImage) {
      formData.append("coverImage", coverImage);
    }
    formData.append("categoryId", categoryId);
    formData.append("tags", tags.join(","));

    try {
      const response = await fetch("/api/articles", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setMessage("Article created successfully!");
        // router.push(`/happycoding/dashboard/articles/${data.id}`);
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to create article.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      setError("An unexpected error occurred.");
    }
  };

  return (
    <div className="w-full mx-auto">
      <h1 className="mb-6 text-3xl font-bold">Create New Article</h1>

      {message && (
        <div className="mb-4 rounded bg-green-100 p-3 text-green-700">
          {message}
        </div>
      )}
      {error && (
        <div className="mb-4 rounded bg-red-100 p-3 text-red-700">{error}</div>
      )}

      <form
        onSubmit={handleSubmit}
        className="rounded-lg bg-white p-8 shadow-md"
      >
        <div className="mb-4">
          <label htmlFor="title" className="block font-medium mb-1">
            Title
          </label>
          <Input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="excerpt" className="block font-medium mb-1">
            Excerpt (Optional)
          </label>
          <Textarea
            id="excerpt"
            rows={3}
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="content" className="block font-medium mb-1">
            Content
          </label>
          <Textarea
            id="content"
            rows={10}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="slug" className="block font-medium mb-1">
            Slug (Optional - will be generated from title if empty)
          </label>
          <Input
            type="text"
            id="slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="coverImage" className="block font-medium mb-1">
            Cover Image (Upload)
          </label>
          <input
            type="file"
            id="coverImage"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="categoryId" className="block font-medium mb-1">
            Category ID (Placeholder)
          </label>
          <Input
            type="text"
            id="categoryId"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="tags" className="block font-medium mb-1">
            Tags (Comma-separated names)
          </label>
          <Input
            type="text"
            id="tags"
            value={tags.join(",")}
            onChange={(e) =>
              setTags(e.target.value.split(",").map((tag) => tag.trim()))
            }
          />
        </div>

        <div className="mb-4 flex items-center">
          <Checkbox
            id="published"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
          />
          <label htmlFor="published" className="ml-2 font-medium">
            Published
          </label>
        </div>

        <Button type="submit">Create Article</Button>
      </form>
    </div>
  );
}
