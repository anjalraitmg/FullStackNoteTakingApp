import React, { useState } from "react";

export default function NoteCard({ note, onUpdate, onDelete }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  const handleSave = () => {
    onUpdate(note.id, { title, content });
    setIsEditing(false);
  };

  const handleClose = () => {
    // Reset any unsaved edits when closing modal
    setTitle(note.title);
    setContent(note.content);
    setIsEditing(false);
    setIsOpen(false);
  };

  const togglePin = (e) => {
    e.stopPropagation(); // Don't trigger the card modal when clicking the pin
    onUpdate(note.id, { is_pinned: !note.is_pinned });
  };

  const handleDelete = (e) => {
    e.stopPropagation(); // Don't trigger the card modal when clicking delete
    onDelete(note.id);
  };

  return (
    <>
      {/* 1. COMPACT CARD IN GRID (Fixed maximum height) */}
      <div
        onClick={() => setIsOpen(true)}
        className={`card bg-base-200/90 border cursor-pointer hover:border-primary/50 transition-all duration-200 shadow-sm hover:shadow-md flex flex-col justify-between h-[230px] overflow-hidden ${
          note.is_pinned
            ? "border-primary ring-1 ring-primary/40 bg-base-200"
            : "border-base-300"
        }`}
      >
        <div className="card-body p-4 flex flex-col justify-between h-full overflow-hidden">
          <div className="overflow-hidden">
            {/* Header: Title & Pin */}
            <div className="flex justify-between items-start gap-2 mb-1.5">
              <h3 className="font-semibold text-base leading-snug truncate text-base-content flex-1">
                {note.title || (
                  <span className="opacity-40 italic font-normal">Untitled</span>
                )}
              </h3>
              <button
                type="button"
                onClick={togglePin}
                title={note.is_pinned ? "Unpin note" : "Pin note"}
                className={`btn btn-circle btn-ghost btn-xs -mr-1 -mt-1 ${
                  note.is_pinned
                    ? "opacity-100 text-primary"
                    : "opacity-40 hover:opacity-100"
                }`}
              >
                📌
              </button>
            </div>

            {/* Content: Clamped to 4 lines maximum */}
            <p className="text-sm text-base-content/75 line-clamp-5 whitespace-pre-wrap break-words leading-relaxed">
              {note.content}
            </p>
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center pt-2 mt-auto border-t border-base-300/60 text-xs text-base-content/50">
            <span className="text-[11px] hover:text-primary transition-colors">
              Click to view full note
            </span>
            <button
              type="button"
              onClick={handleDelete}
              className="btn btn-ghost btn-xs text-error hover:bg-error/10"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* 2. FULL EXPANDED VIEW / EDIT MODAL */}
      {isOpen && (
        <div className="modal modal-open">
          <div className="modal-box max-w-2xl bg-base-200 border border-base-300 shadow-2xl p-6 relative">
            <button
              type="button"
              onClick={handleClose}
              className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3 text-base-content/70 hover:text-base-content"
            >
              ✕
            </button>

            {isEditing ? (
              /* Edit View inside modal */
              <div className="flex flex-col gap-3 mt-4">
                <input
                  type="text"
                  value={title}
                  maxLength={255}
                  onChange={(e) => setTitle(e.target.value)}
                  className="input input-bordered w-full font-bold text-lg"
                  placeholder="Title"
                />
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="textarea textarea-bordered w-full text-base resize-none min-h-[260px] max-h-[60vh]"
                  placeholder="Note content..."
                />
                <div className="modal-action justify-end gap-2 mt-2">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="btn btn-ghost btn-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSave}
                    className="btn btn-primary btn-sm px-5"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            ) : (
              /* Read View inside modal */
              <div className="flex flex-col gap-4 mt-2">
                <div className="flex justify-between items-start pr-8">
                  <h2 className="text-xl font-bold text-base-content break-words">
                    {note.title || (
                      <span className="opacity-40 italic">Untitled</span>
                    )}
                  </h2>
                </div>

                <div className="text-base text-base-content/85 whitespace-pre-wrap break-words max-h-[60vh] overflow-y-auto pr-2 leading-relaxed">
                  {note.content}
                </div>

                <div className="modal-action justify-between items-center border-t border-base-300/80 pt-4 mt-4">
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="btn btn-outline btn-error btn-sm"
                  >
                    Delete Note
                  </button>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setIsEditing(true)}
                      className="btn btn-primary btn-sm px-5"
                    >
                      Edit Note
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="modal-backdrop bg-black/60" onClick={handleClose}></div>
        </div>
      )}
    </>
  );
}