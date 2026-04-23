import React, { useState, useEffect } from 'react';
import { BookOpen, Plus, Trash2, Globe, FileText, Tag, RefreshCw, X, CheckCircle, AlertCircle, Loader2, ExternalLink, Search } from 'lucide-react';
import { supabase } from '../utils/supabase';

type KnowledgeDoc = {
  id: string;
  title: string;
  source_url: string | null;
  source_type: string;
  category: string;
  content: string;
  created_at: string;
};

const CATEGORIES = [
  { value: 'general',    label: 'General' },
  { value: 'unhcr',      label: 'UNHCR Guidelines' },
  { value: 'government', label: 'Government Policy' },
  { value: 'legal',      label: 'Legal' },
  { value: 'policy',     label: 'Policy & Procedure' },
  { value: 'training',   label: 'Training Material' },
];

const CATEGORY_COLORS: Record<string, string> = {
  general:    'bg-gray-100 text-gray-600',
  unhcr:      'bg-blue-100 text-blue-700',
  government: 'bg-purple-100 text-purple-700',
  legal:      'bg-yellow-100 text-yellow-700',
  policy:     'bg-green-100 text-green-700',
  training:   'bg-orange-100 text-orange-700',
};

const BLANK = { title: '', source_url: '', source_type: 'manual', category: 'general', content: '' };

export const KnowledgeBase = () => {
  const [docs, setDocs] = useState<KnowledgeDoc[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(BLANK);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [canManage, setCanManage] = useState(false);

  const fetchDocs = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('knowledge_documents')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) setDocs(data as KnowledgeDoc[]);
    setLoading(false);
  };

  useEffect(() => {
    fetchDocs();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) return;
      supabase.from('profiles').select('role').eq('id', user.id).single().then(({ data }) => {
        if (data && ['caseworker', 'ngo', 'government', 'admin'].includes(data.role)) {
          setCanManage(true);
        }
      });
    });
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveError('');
    if (!form.title.trim()) { setSaveError('Title is required.'); return; }
    if (!form.content.trim()) { setSaveError('Content is required.'); return; }
    setSaving(true);
    const { data: { user } } = await supabase.auth.getUser();
    const { error } = await supabase.from('knowledge_documents').insert({
      title: form.title.trim(),
      source_url: form.source_url.trim() || null,
      source_type: form.source_type,
      category: form.category,
      content: form.content.trim(),
      added_by: user?.id ?? null,
    });
    if (error) {
      setSaveError(error.message);
    } else {
      setSaveSuccess(true);
      setForm(BLANK);
      fetchDocs();
      setTimeout(() => { setSaveSuccess(false); setShowForm(false); }, 1800);
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Remove this document from the knowledge base?')) return;
    setDeleting(id);
    await supabase.from('knowledge_documents').delete().eq('id', id);
    setDocs(prev => prev.filter(d => d.id !== id));
    setDeleting(null);
  };

  const filtered = docs.filter(d => {
    const matchCat = filterCat === 'all' || d.category === filterCat;
    const matchSearch = !search || d.title.toLowerCase().includes(search.toLowerCase()) || d.content.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="h-full">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-1">AI Knowledge Base</h1>
          <p className="text-gray-600">Documents and guidelines that power the GovRise AI assistant.</p>
        </div>
        {canManage && (
          <button onClick={() => { setShowForm(true); setSaveError(''); setSaveSuccess(false); }}
            className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
            <Plus size={15} className="mr-1.5" /> Add Document
          </button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Documents', value: docs.length },
          { label: 'UNHCR Guidelines', value: docs.filter(d => d.category === 'unhcr').length },
          { label: 'Government Policies', value: docs.filter(d => d.category === 'government').length },
          { label: 'Legal Resources', value: docs.filter(d => d.category === 'legal').length },
        ].map((s, i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-lg p-4 text-center shadow-sm">
            <div className="text-2xl font-bold text-blue-600 mb-0.5">{s.value}</div>
            <div className="text-xs text-gray-500">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-5">
        <div className="relative flex-1 min-w-[180px]">
          <Search size={14} className="absolute left-3 top-2.5 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search documents…" />
        </div>
        <select value={filterCat} onChange={e => setFilterCat(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="all">All Categories</option>
          {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
        </select>
        <button onClick={fetchDocs} className="px-3 py-2 border border-gray-300 rounded-lg text-gray-500 hover:text-gray-700 text-sm">
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
        </button>
      </div>

      {/* Document List */}
      {loading && docs.length === 0 ? (
        <div className="flex items-center justify-center py-16 text-gray-400">
          <Loader2 size={20} className="animate-spin mr-2" /> Loading…
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-lg py-16 text-center text-gray-400">
          <BookOpen size={32} className="mx-auto mb-3 opacity-40" />
          <p className="font-medium">No documents yet</p>
          {canManage && <p className="text-sm mt-1">Click "Add Document" to get started.</p>}
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(doc => (
            <div key={doc.id} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
              <div className="flex items-start p-4 gap-3">
                <div className="p-2 bg-blue-50 rounded-lg flex-shrink-0">
                  {doc.source_type === 'url' ? <Globe size={16} className="text-blue-600" /> : <FileText size={16} className="text-blue-600" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center flex-wrap gap-2 mb-1">
                    <h3 className="font-semibold text-gray-900 text-sm">{doc.title}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${CATEGORY_COLORS[doc.category] ?? 'bg-gray-100 text-gray-600'}`}>
                      {CATEGORIES.find(c => c.value === doc.category)?.label ?? doc.category}
                    </span>
                  </div>
                  {doc.source_url && (
                    <a href={doc.source_url} target="_blank" rel="noopener noreferrer"
                      className="text-xs text-blue-600 hover:underline flex items-center mb-1">
                      <ExternalLink size={11} className="mr-1" /> {doc.source_url}
                    </a>
                  )}
                  <p className="text-xs text-gray-500">
                    {expanded === doc.id ? doc.content : doc.content.slice(0, 200) + (doc.content.length > 200 ? '…' : '')}
                  </p>
                  {doc.content.length > 200 && (
                    <button onClick={() => setExpanded(expanded === doc.id ? null : doc.id)}
                      className="text-xs text-blue-600 hover:underline mt-1">
                      {expanded === doc.id ? 'Show less' : 'Show more'}
                    </button>
                  )}
                  <p className="text-xs text-gray-400 mt-1">{new Date(doc.created_at).toLocaleDateString()}</p>
                </div>
                {canManage && (
                  <button onClick={() => handleDelete(doc.id)} disabled={deleting === doc.id}
                    className="text-gray-300 hover:text-red-500 transition-colors flex-shrink-0">
                    {deleting === doc.id ? <Loader2 size={15} className="animate-spin" /> : <Trash2 size={15} />}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Document Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl my-4">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h2 className="font-bold text-gray-900 text-lg">Add to Knowledge Base</h2>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
            </div>

            {saveSuccess ? (
              <div className="flex flex-col items-center py-10">
                <CheckCircle size={40} className="text-green-500 mb-3" />
                <p className="font-semibold text-gray-900">Document added!</p>
                <p className="text-sm text-gray-500">The AI will use this in future conversations.</p>
              </div>
            ) : (
              <form onSubmit={handleSave} className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-xs font-medium text-gray-700 mb-1">Title *</label>
                    <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g. UNHCR Guidelines on Refugee Children 2023" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Category</label>
                    <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                      {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Source Type</label>
                    <select value={form.source_type} onChange={e => setForm(f => ({ ...f, source_type: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="manual">Manually entered</option>
                      <option value="url">From a URL/website</option>
                      <option value="pdf">From a PDF</option>
                    </select>
                  </div>
                  <div className="col-span-2">
                    <label className="block text-xs font-medium text-gray-700 mb-1">Source URL (optional)</label>
                    <input value={form.source_url} onChange={e => setForm(f => ({ ...f, source_url: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="https://www.unhcr.org/…" />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Content * <span className="text-gray-400 font-normal">(paste the text from the PDF or page)</span>
                    </label>
                    <textarea value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} required rows={10}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
                      placeholder="Paste the full text content here. The AI will use this to answer questions accurately…" />
                    <p className="text-xs text-gray-400 mt-1">{form.content.length} characters</p>
                  </div>
                </div>

                {saveError && (
                  <div className="flex items-center p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                    <AlertCircle size={14} className="mr-2 flex-shrink-0" /> {saveError}
                  </div>
                )}

                <div className="flex justify-end space-x-3 pt-2">
                  <button type="button" onClick={() => setShowForm(false)}
                    className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
                  <button type="submit" disabled={saving}
                    className="px-5 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg text-sm font-medium flex items-center">
                    {saving ? <><Loader2 size={14} className="animate-spin mr-2" />Saving…</> : <><Plus size={14} className="mr-1.5" />Add to Knowledge Base</>}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
