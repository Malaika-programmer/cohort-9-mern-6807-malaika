export function validateNote(data) {
  const { title, content } = data;

  if (!title || !title.trim()) {
    return "Title is required.";
  }

  if (!content || !content.trim()) {
    return "Content is required.";
  }

  return null;
}