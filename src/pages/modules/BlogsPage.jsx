import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Eye, FilePlus2, ImagePlus, Pencil, Plus, Save, Send, Trash2 } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Table from "@/components/ui/Table";
import SearchInput from "@/components/ui/SearchInput";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Select from "@/components/ui/Select";
import StatusBadge from "@/components/ui/StatusBadge";
import { useFetch } from "@/hooks/useFetch";
import { useMutation } from "@/hooks/useMutation";
import { blogImageUrl, blogsService } from "@/features/blogs/blogs.service";
import { categoriesService } from "@/features/categories/categories.service";
import BlogEditor from "@/features/blogs/components/BlogEditor";

const emptyBlog = { title: "", slug: "", short_description: "", content: "<p>Start writing your story…</p>", status: "draft", meta_title: "", meta_description: "", author_name: "Founder Code Team", reading_time: "3", category_id: "", image: null };
const makeSlug = (value) => value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
const stripHtml = (html) => html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

export default function BlogsPage() {
  const [query, setQuery] = useState(""); const [status, setStatus] = useState(""); const [page, setPage] = useState(1);
  const [editing, setEditing] = useState(null); const [removeTarget, setRemoveTarget] = useState(null);
  const { data, loading, error, refetch } = useFetch(() => blogsService.list({ page, limit: 10, status: status || undefined }), { deps: [page, status] });
  const { data: categoriesData } = useFetch(() => categoriesService.list());
  const { mutate: remove, loading: deleting } = useMutation(blogsService.remove, { successMessage: "Blog deleted successfully", onSuccess: () => { setRemoveTarget(null); refetch(); } });
  const posts = useMemo(() => (data?.items || []).filter((post) => !query || post.title?.toLowerCase().includes(query.toLowerCase()) || post.slug?.toLowerCase().includes(query.toLowerCase())), [data, query]);
  if (editing) return <BlogWorkspace initial={editing === "new" ? emptyBlog : editing} categories={categoriesData || []} onBack={() => setEditing(null)} onSaved={() => { setEditing(null); refetch(); }} />;
  const columns = [
    { key: "title", header: "Blog", render: (p) => <div className="min-w-[180px]"><p className="font-semibold">{p.title}</p><p className="mt-0.5 text-xs text-muted">/{p.slug}</p></div> },
    { key: "category_name", header: "Category", render: (p) => <span className="text-muted">{p.category_name || "—"}</span> },
    { key: "author_name", header: "Author" }, { key: "status", header: "Status", render: (p) => <StatusBadge status={p.status} /> },
    { key: "reading_time", header: "Read", render: (p) => `${p.reading_time || 0} min` },
    { key: "actions", header: "", className: "w-24", render: (p) => <div className="flex justify-end gap-1"><button aria-label="Edit" onClick={() => setEditing(p)} className="rounded p-2 text-primary hover:bg-primary-soft"><Pencil size={16} /></button><button aria-label="Delete" onClick={() => setRemoveTarget(p)} className="rounded p-2 text-danger hover:bg-danger/10"><Trash2 size={16} /></button></div> },
  ];
  return <><PageHeader title="Blogs" description="Create, publish and manage your website stories." action={<Button icon={Plus} onClick={() => setEditing("new")}>Create blog</Button>} />
    <Card><div className="flex flex-col gap-3 border-b border-line p-4 sm:flex-row"><SearchInput placeholder="Search blogs..." className="max-w-sm" onChange={setQuery} /><select value={status} onChange={(e) => { setStatus(e.target.value); setPage(1); }} className="input min-h-10 sm:ml-auto sm:w-40"><option value="">All statuses</option><option value="draft">Draft</option><option value="published">Published</option></select></div>
      <Table columns={columns} data={posts} rowKey="id" loading={loading} error={error} onRetry={refetch} emptyIcon={FilePlus2} emptyTitle="No blogs found" emptyText="Create your first blog post to see it here." emptyAction={<Button size="sm" icon={Plus} onClick={() => setEditing("new")}>Create blog</Button>} />
    </Card>
    <ConfirmDialog open={!!removeTarget} onClose={() => !deleting && setRemoveTarget(null)} onConfirm={() => remove(removeTarget.id)} loading={deleting} title="Delete blog?" message={`“${removeTarget?.title || ""}” will be deleted permanently.`} confirmText="Delete" />
  </>;
}

function BlogWorkspace({ initial, categories, onBack, onSaved }) {
  const [form, setForm] = useState(initial); const [preview, setPreview] = useState(false); const [errors, setErrors] = useState({}); const [imagePreview, setImagePreview] = useState(blogImageUrl(initial.image));
  const isNew = !initial.id;
  const { data: blogDetail, loading: loadingDetail, error: detailError, refetch: refetchDetail } = useFetch(
    () => blogsService.getById(initial.id),
    { enabled: !isNew, deps: [initial.id] }
  );
  const { mutate: save, loading } = useMutation(isNew ? blogsService.create : (payload) => blogsService.update(initial.id, payload), { successMessage: isNew ? "Blog created successfully" : "Blog updated successfully", onSuccess: onSaved });
  useEffect(() => {
    if (!blogDetail) return;
    setForm({ ...emptyBlog, ...blogDetail, content: blogDetail.content || emptyBlog.content, image: null });
    setImagePreview(blogImageUrl(blogDetail.image));
  }, [blogDetail]);
  const set = (key, value) => setForm((old) => ({ ...old, [key]: value }));
  const changeTitle = (title) => setForm((old) => ({ ...old, title, slug: old.slug || makeSlug(title), meta_title: old.meta_title || title }));
  const submit = (nextStatus) => {
    const next = { ...form, status: nextStatus || form.status };
    const nextErrors = {}; if (!next.title.trim()) nextErrors.title = "Title is required."; if (!next.slug.trim()) nextErrors.slug = "URL slug is required."; if (!stripHtml(next.content).trim()) nextErrors.content = "Content is required.";
    setErrors(nextErrors); if (Object.keys(nextErrors).length) return;
    save(next);
  };
  const chooseImage = (event) => { const file = event.target.files?.[0]; if (!file) return; set("image", file); setImagePreview(URL.createObjectURL(file)); };
  useEffect(() => () => { if (imagePreview?.startsWith("blob:")) URL.revokeObjectURL(imagePreview); }, [imagePreview]);
  if (loadingDetail) return <div className="grid min-h-[360px] place-items-center text-sm text-muted">Loading blog...</div>;
  if (detailError) return <Card className="p-6 text-center"><p className="mb-4 text-sm text-danger">{detailError}</p><Button variant="outline" onClick={refetchDetail}>Try again</Button></Card>;
  if (preview) return <div><PageHeader title="Preview" description="This is how the article content will render." action={<Button variant="outline" icon={ArrowLeft} onClick={() => setPreview(false)}>Back to editor</Button>} /><article className="blog-public mx-auto max-w-4xl rounded-xl border border-line bg-surface p-6 shadow-card sm:p-10"><p className="text-sm font-semibold text-primary">{form.category_id ? categories.find((c) => String(c.category_id) === String(form.category_id))?.category_name : "Blog"}</p><h1>{form.title || "Untitled post"}</h1><p className="lead">{form.short_description}</p>{imagePreview && <img className="mb-8 max-h-[430px] w-full rounded-xl object-cover" src={imagePreview} alt="Featured" />}<div dangerouslySetInnerHTML={{ __html: form.content }} /></article></div>;
  return <div className="pb-8"><div className="mb-5 flex flex-col gap-3 border-b border-line pb-4 xl:flex-row xl:items-center"><div className="flex items-center gap-3"><Button variant="ghost" icon={ArrowLeft} onClick={onBack}>Blogs</Button><span className="hidden h-6 border-l border-line sm:block" /><div><h1 className="text-lg font-bold">{isNew ? "Create blog" : "Edit blog"}</h1><p className="text-xs text-muted">{form.status === "published" ? "Published article" : "Draft — changes are not public"}</p></div></div><div className="flex flex-wrap gap-2 xl:ml-auto"><Button variant="outline" icon={Eye} onClick={() => setPreview(true)}>Preview</Button><Button variant="outline" icon={Save} loading={loading} onClick={() => submit("draft")}>Save draft</Button><Button icon={form.status === "published" ? Save : Send} loading={loading} onClick={() => submit("published")}>{form.status === "published" ? "Update" : "Publish"}</Button></div></div>
    <div className="grid gap-5 2xl:grid-cols-[minmax(0,1fr)_320px]"><main className="min-w-0 space-y-5"><Input label="Blog title" required value={form.title} onChange={(e) => changeTitle(e.target.value)} error={errors.title} placeholder="Write a compelling title..." className="text-lg font-semibold" /><Textarea label="Short description" value={form.short_description} onChange={(e) => set("short_description", e.target.value)} placeholder="A short excerpt shown in blog cards and search results." rows={2} /><BlogEditor value={form.content} onChange={(content) => set("content", content)} /><p className="text-xs text-danger">{errors.content}</p></main>
      <aside className="space-y-5"><Card className="p-4"><h2 className="mb-4 font-semibold">Publishing</h2><Select label="Status" value={form.status} onChange={(e) => set("status", e.target.value)} options={[{ value: "draft", label: "Draft" }, { value: "published", label: "Published" }]} /><Select label="Category" placeholder="No category" value={form.category_id || ""} onChange={(e) => set("category_id", e.target.value)} options={categories.map((c) => ({ value: c.category_id, label: c.category_name }))} /><Input label="Author" value={form.author_name || ""} onChange={(e) => set("author_name", e.target.value)} /><Input label="Reading time (minutes)" type="number" min="1" value={form.reading_time || ""} onChange={(e) => set("reading_time", e.target.value)} /></Card>
        <Card className="p-4"><h2 className="mb-3 font-semibold">Featured image</h2>{imagePreview ? <img src={imagePreview} alt="Featured preview" className="mb-3 h-40 w-full rounded-lg object-cover" /> : <div className="mb-3 grid h-32 place-items-center rounded-lg border border-dashed border-line-strong bg-surface-2 text-muted"><ImagePlus size={24} /></div>}<label className="block"><span className="sr-only">Choose featured image</span><input type="file" accept="image/*" onChange={chooseImage} className="hidden" /><span className="inline-flex min-h-10 w-full cursor-pointer items-center justify-center rounded-md bg-primary-soft px-4 text-sm font-semibold text-primary hover:bg-primary/20">{imagePreview ? "Replace image" : "Upload image"}</span></label></Card>
        <Card className="p-4"><h2 className="mb-4 font-semibold">SEO settings</h2><Input label="URL slug" required value={form.slug} onChange={(e) => set("slug", makeSlug(e.target.value))} error={errors.slug} hint="Lowercase URL-friendly text." /><Input label="SEO title" value={form.meta_title || ""} onChange={(e) => set("meta_title", e.target.value)} /><Textarea label="Meta description" rows={3} value={form.meta_description || ""} onChange={(e) => set("meta_description", e.target.value)} /></Card></aside></div></div>;
}
