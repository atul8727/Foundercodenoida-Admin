import { useEffect, useRef, useState } from "react";
import {
  AlignCenter, AlignJustify, AlignLeft, AlignRight, Bold, Code2, Columns2, ImagePlus, Link,
  List, ListOrdered, Minus, Palette, Quote, Table2, Type, Underline, Video, Wand2,
} from "lucide-react";
import Button from "@/components/ui/Button";

const fonts = ["Outfit", "Arial", "Georgia", "Times New Roman", "Verdana", "Courier New"];
const blocks = [
  ["Paragraph", Type, "p"], ["Heading", Type, "h2"], ["Image", ImagePlus, "image"], ["Gallery", ImagePlus, "gallery"],
  ["Quote", Quote, "quote"], ["Code", Code2, "code"], ["Table", Table2, "table"], ["Video", Video, "video"],
  ["Button", Wand2, "button"], ["Divider", Minus, "divider"], ["Two columns", Columns2, "columns"],
];

const toolButton = "rounded-md p-2 text-muted transition hover:bg-surface-2 hover:text-ink disabled:opacity-40";

export default function BlogEditor({ value, onChange, onSelectImage }) {
  const ref = useRef(null);
  const savedRange = useRef(null);
  const [imageUrl, setImageUrl] = useState("");
  const [showImageUrl, setShowImageUrl] = useState(false);

  useEffect(() => {
    if (ref.current && ref.current.innerHTML !== (value || "")) ref.current.innerHTML = value || "<p>Start writing your story…</p>";
  }, [value]);

  const emit = () => onChange?.(ref.current?.innerHTML || "");
  const saveSelection = () => {
    const selection = window.getSelection();
    if (selection?.rangeCount) savedRange.current = selection.getRangeAt(0).cloneRange();
  };
  const restoreSelection = () => {
    const selection = window.getSelection();
    if (savedRange.current && selection) { selection.removeAllRanges(); selection.addRange(savedRange.current); }
    ref.current?.focus();
  };
  const command = (name, arg) => { restoreSelection(); document.execCommand(name, false, arg); emit(); saveSelection(); };
  const insertHtml = (html) => { restoreSelection(); document.execCommand("insertHTML", false, html); emit(); };
  const insertBlock = (kind) => {
    const map = {
      p: "<p>Write your paragraph here…</p>", h2: "<h2>Section heading</h2><p>Start writing here…</p>",
      quote: "<blockquote>Write an inspiring quote.</blockquote>", code: "<pre><code>// Your code goes here</code></pre>",
      table: "<table><thead><tr><th>Column one</th><th>Column two</th></tr></thead><tbody><tr><td>Content</td><td>Content</td></tr><tr><td>Content</td><td>Content</td></tr></tbody></table>",
      video: "<div class=\"blog-video\" contenteditable=\"false\">Paste a YouTube or Vimeo embed URL.</div>",
      button: "<p><a class=\"blog-cta\" href=\"#\">Call to action</a></p>", divider: "<hr />",
      columns: "<div class=\"blog-columns\"><div><h3>First column</h3><p>Add content here.</p></div><div><h3>Second column</h3><p>Add content here.</p></div></div>",
      gallery: "<div class=\"blog-gallery\"><div>Gallery image 1</div><div>Gallery image 2</div><div>Gallery image 3</div></div>",
    };
    if (kind === "image") return setShowImageUrl(true);
    insertHtml(map[kind]);
  };
  const insertImage = () => {
    if (!imageUrl.trim()) return;
    const safeUrl = imageUrl.trim().replace(/"/g, "");
    insertHtml(`<figure class="image-center"><img src="${safeUrl}" alt="" /><figcaption>Image caption</figcaption></figure><p></p>`);
    setImageUrl(""); setShowImageUrl(false);
  };
  const link = () => { const url = window.prompt("Link URL"); if (url) command("createLink", url); };

  return (
    <div className="overflow-hidden rounded-xl border border-line bg-surface shadow-card">
      <div className="flex flex-wrap items-center gap-0.5 border-b border-line bg-surface-2/60 p-2">
        <select aria-label="Text style" defaultValue="p" onChange={(e) => command("formatBlock", e.target.value)} className="h-9 rounded-md border border-line bg-surface px-2 text-xs">
          <option value="p">Paragraph</option>{[1, 2, 3, 4, 5, 6].map((n) => <option key={n} value={`h${n}`}>Heading {n}</option>)}
        </select>
        <select aria-label="Font family" defaultValue="Outfit" onChange={(e) => command("fontName", e.target.value)} className="h-9 rounded-md border border-line bg-surface px-2 text-xs">
          {fonts.map((font) => <option key={font}>{font}</option>)}
        </select>
        <select aria-label="Font size" defaultValue="16" onChange={(e) => command("fontSize", Math.max(1, Math.min(7, Math.round(Number(e.target.value) / 10))))} className="h-9 w-16 rounded-md border border-line bg-surface px-1 text-xs">
          {[12, 14, 16, 18, 20, 24, 30, 36, 48, 60, 72].map((n) => <option key={n}>{n}</option>)}
        </select>
        <span className="mx-1 h-5 border-l border-line" />
        <button className={toolButton} title="Bold" onMouseDown={(e) => e.preventDefault()} onClick={() => command("bold")}><Bold size={16} /></button>
        <button className={toolButton} title="Italic" onMouseDown={(e) => e.preventDefault()} onClick={() => command("italic")}><em className="font-serif text-base">I</em></button>
        <button className={toolButton} title="Underline" onMouseDown={(e) => e.preventDefault()} onClick={() => command("underline")}><Underline size={16} /></button>
        <button className={toolButton} title="Strike through" onMouseDown={(e) => e.preventDefault()} onClick={() => command("strikeThrough")}><s className="text-sm">S</s></button>
        <input aria-label="Text colour" type="color" className="h-7 w-7 cursor-pointer rounded border-0 bg-transparent" onChange={(e) => command("foreColor", e.target.value)} />
        <input aria-label="Highlight colour" type="color" className="h-7 w-7 cursor-pointer rounded border-0 bg-transparent" onChange={(e) => command("hiliteColor", e.target.value)} />
        <button className={toolButton} title="Link" onMouseDown={(e) => e.preventDefault()} onClick={link}><Link size={16} /></button>
        <button className={toolButton} title="Clear formatting" onMouseDown={(e) => e.preventDefault()} onClick={() => command("removeFormat")}><Palette size={16} /></button>
        <span className="mx-1 h-5 border-l border-line" />
        <button className={toolButton} title="Bulleted list" onClick={() => command("insertUnorderedList")}><List size={16} /></button>
        <button className={toolButton} title="Numbered list" onClick={() => command("insertOrderedList")}><ListOrdered size={16} /></button>
        {[[AlignLeft, "justifyLeft"], [AlignCenter, "justifyCenter"], [AlignRight, "justifyRight"], [AlignJustify, "justifyFull"]].map(([Icon, name]) => <button key={name} className={toolButton} title={name} onClick={() => command(name)}><Icon size={16} /></button>)}
      </div>

      <div className="grid min-h-[560px] lg:grid-cols-[190px_minmax(0,1fr)]">
        <aside className="border-b border-line bg-surface-2/30 p-3 lg:border-b-0 lg:border-r">
          <p className="mb-2 px-1 text-xs font-bold uppercase tracking-wider text-muted">Add a block</p>
          <div className="grid grid-cols-2 gap-1 lg:grid-cols-1">{blocks.map(([label, Icon, kind]) => <button key={kind} onClick={() => insertBlock(kind)} className="flex items-center gap-2 rounded-md px-2.5 py-2 text-left text-xs font-medium hover:bg-primary-soft hover:text-primary"><Icon size={15} />{label}</button>)}</div>
        </aside>
        <div className="relative bg-surface p-5 sm:p-8">
          {showImageUrl && <div className="mb-5 flex flex-wrap gap-2 rounded-lg border border-line bg-surface-2 p-3"><input autoFocus value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} onKeyDown={(e) => e.key === "Enter" && insertImage()} placeholder="https://example.com/image.jpg" className="input min-h-9 flex-1 py-1.5" /><Button size="sm" onClick={insertImage}>Insert image</Button><Button size="sm" variant="ghost" onClick={() => setShowImageUrl(false)}>Cancel</Button></div>}
          <article ref={ref} contentEditable suppressContentEditableWarning role="textbox" aria-multiline="true" onInput={emit} onKeyUp={saveSelection} onMouseUp={saveSelection} className="blog-canvas min-h-[500px] outline-none" />
        </div>
      </div>
      {onSelectImage && <input className="hidden" type="file" accept="image/*" onChange={onSelectImage} />}
    </div>
  );
}
