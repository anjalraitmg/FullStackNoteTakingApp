import React, { useState } from "react";

export default function NoteForm({ onAddNote }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() && !content.trim()) return;

    onAddNote({ title, content });
    setTitle("");
    setContent("");
    setIsExpanded(false);
  };

  return (
    <div className="w-full flex justify-center my-8">
      {/* 
        Width takes 100% on mobile, 85% on medium, 80% on large, 
        maxing out cleanly so it matches the spacious feel of the cards.
      */}
      <form
        onSubmit={handleSubmit}
        className="w-full sm:w-[93%] lg:w-[93%] max-w-4xl card bg-base-200/90 border border-base-300 shadow-md hover:shadow-lg p-6 transition-all duration-200"
      >
        {isExpanded && (
          <input
            type="text"
            placeholder="Title"
            maxLength={255}  
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input input-ghost font-bold text-xl px-2 focus:bg-transparent focus:outline-none mb-3 w-full"
            autoFocus
          />
        )}

        <textarea
          placeholder="Take a note..."
          value={content}
          onClick={() => setIsExpanded(true)}
          onChange={(e) => setContent(e.target.value)}
          rows={isExpanded ? 4 : 1}
          className="textarea textarea-ghost resize-none px-2 text-base focus:bg-transparent focus:outline-none w-full leading-relaxed"
        />

        {isExpanded && (
          <div className="flex justify-end items-center gap-3 pt-3 border-t border-base-300/80 mt-3">
            <button
              type="button"
              onClick={() => setIsExpanded(false)}
              className="btn btn-ghost btn-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary btn-sm px-5 rounded-lg shadow-sm"
            >
              Add Note
            </button>
          </div>
        )}
      </form>
    </div>
  );
}