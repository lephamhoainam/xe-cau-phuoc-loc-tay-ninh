"use client";

import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";

function Btn({
  onClick,
  active,
  title,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      title={title}
      // onMouseDown + preventDefault để bấm nút không làm mất vị trí con trỏ trong ô soạn thảo
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className={`rounded px-2 py-1 text-sm ${
        active ? "bg-amber-400 text-neutral-900" : "text-neutral-300 hover:bg-neutral-800"
      }`}
    >
      {children}
    </button>
  );
}

function Toolbar({ editor }: { editor: Editor }) {
  function setLink() {
    const prev = (editor.getAttributes("link").href as string | undefined) ?? "";
    const url = prompt("Nhập đường link (để trống để gỡ link):", prev);
    if (url === null) return;

    if (url.trim() === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    // Chỉ cho phép http, https, mailto
    if (!/^(https?:\/\/|mailto:)/i.test(url.trim())) {
      alert("Link phải bắt đầu bằng http://, https:// hoặc mailto:");
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url.trim() }).run();
  }

  return (
    <div className="flex flex-wrap gap-1 border-b border-neutral-800 p-1">
      <Btn title="Tiêu đề lớn" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive("heading", { level: 2 })}>
        H2
      </Btn>
      <Btn title="Tiêu đề nhỏ" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive("heading", { level: 3 })}>
        H3
      </Btn>
      <Btn title="In đậm" onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")}>
        <b>B</b>
      </Btn>
      <Btn title="In nghiêng" onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")}>
        <i>I</i>
      </Btn>
      <Btn title="Danh sách chấm" onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")}>
        • Danh sách
      </Btn>
      <Btn title="Danh sách số" onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive("orderedList")}>
        1. Danh sách
      </Btn>
      <Btn title="Chèn link" onClick={setLink} active={editor.isActive("link")}>
        Link
      </Btn>
      <Btn title="Trích dẫn" onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive("blockquote")}>
        “ ”
      </Btn>
    </div>
  );
}

export default function RichEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (html: string) => void;
}) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3] } }),
      Link.configure({ openOnClick: false }),
    ],
    content: value,
    // Bắt buộc với Next.js để tránh lỗi hydration
    immediatelyRender: false,
    onUpdate: ({ editor }) => onChange(editor.isEmpty ? "" : editor.getHTML()),
    editorProps: {
      attributes: {
        class: "prose-editor min-h-[160px] px-3 py-2 text-sm outline-none",
      },
    },
  });

  if (!editor) {
    return <div className="min-h-[200px] rounded-lg border border-neutral-700 bg-neutral-950" />;
  }

  return (
    <div className="rounded-lg border border-neutral-700 bg-neutral-950 focus-within:border-amber-400">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}