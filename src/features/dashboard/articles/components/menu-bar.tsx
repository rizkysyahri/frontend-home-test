import { Toggle } from "@/components/ui/toggle";
import { Editor } from "@tiptap/react";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Image,
  Italic,
  List,
  Redo2,
  Undo2,
} from "lucide-react";

const MenuBar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) return null;

  const Options = [
    {
      icon: <Undo2 className="size-4" />,
      onClick: () => editor.chain().focus().undo().run(),
      preesed: editor.isActive("undo"),
    },
    {
      icon: <Redo2 className="size-4" />,
      onClick: () => editor.chain().focus().redo().run(),
      preesed: editor.isActive("redo"),
    },
    {
      icon: <Bold className="size-4" />,
      onClick: () => editor.chain().focus().toggleBold().run(),
      preesed: editor.isActive("bold"),
    },
    {
      icon: <Italic className="size-4" />,
      onClick: () => editor.chain().focus().toggleItalic().run(),
      preesed: editor.isActive("italic"),
    },
    {
      icon: <Image className="size-4" />,
      onClick: () => {
        const url = window.prompt("Enter image URL");
        if (url) {
          editor.chain().focus().setImage({ src: url, alt: "Image" }).run();
        }
      },
      preesed: editor.isActive("image"),
    },
    {
      icon: <AlignLeft className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign("left").run(),
      preesed: editor.isActive({ textAlign: "left" }),
    },
    {
      icon: <AlignCenter className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign("center").run(),
      preesed: editor.isActive({ textAlign: "center" }),
    },
    {
      icon: <AlignRight className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign("right").run(),
      preesed: editor.isActive({ textAlign: "right" }),
    },
    {
      icon: <AlignJustify className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign("justify").run(),
      preesed: editor.isActive({ textAlign: "justify" }),
    },
  ];

  return (
    <div className="flex border-b p-1 mb-1 bg-white space-x-1 z-50">
      {Options.map((option, index) => (
        <Toggle
          key={index}
          pressed={option.preesed}
          onPressedChange={option.onClick}
        >
          {option.icon}
        </Toggle>
      ))}
    </div>
  );
};

export default MenuBar;
