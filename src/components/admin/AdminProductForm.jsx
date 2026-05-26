import { useState } from 'react'
import { CATEGORIES } from '../../lib/constants'
import { useTranslation } from '../../hooks/useTranslation'
import AdminImageUpload from './AdminImageUpload'

const EMPTY = {
  name_ru: '',
  name_tj: '',
  description_ru: '',
  description_tj: '',
  price: '',
  category: CATEGORIES[0].id,
  age_min: 0,
  age_max: 12,
  characteristics: {},
  is_active: true,
}

export default function AdminProductForm({ initial, onSave, onCancel, saving }) {
  const { t } = useTranslation()
  const [form, setForm] = useState(initial || EMPTY)
  const [charKey, setCharKey] = useState('')
  const [charVal, setCharVal] = useState('')
  const [files, setFiles] = useState([])

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }))

  const addChar = () => {
    if (!charKey.trim()) return
    setForm((f) => ({
      ...f,
      characteristics: { ...f.characteristics, [charKey]: charVal },
    }))
    setCharKey('')
    setCharVal('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave({
      ...form,
      price: Number(form.price),
      age_min: Number(form.age_min),
      age_max: Number(form.age_max),
      files,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-4 shadow-sm space-y-3">
      <h3 className="font-bold text-lg">{initial ? t('editProduct') : t('addProduct')}</h3>

      <Input label={t('nameRu')} value={form.name_ru} onChange={(v) => set('name_ru', v)} required />
      <Input label={t('nameTj')} value={form.name_tj} onChange={(v) => set('name_tj', v)} required />
      <Textarea label={t('descRu')} value={form.description_ru} onChange={(v) => set('description_ru', v)} />
      <Textarea label={t('descTj')} value={form.description_tj} onChange={(v) => set('description_tj', v)} />

      <div className="grid grid-cols-2 gap-3">
        <Input label={t('price')} type="number" value={form.price} onChange={(v) => set('price', v)} required />
        <div>
          <label className="text-xs font-semibold text-gray-500">{t('category')}</label>
          <select
            value={form.category}
            onChange={(e) => set('category', e.target.value)}
            className="w-full mt-1 rounded-xl border border-gray-200 px-3 py-2 text-sm"
          >
            {CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>{c.id}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Input label={t('ageMin')} type="number" value={form.age_min} onChange={(v) => set('age_min', v)} />
        <Input label={t('ageMax')} type="number" value={form.age_max} onChange={(v) => set('age_max', v)} />
      </div>

      <div>
        <label className="text-xs font-semibold text-gray-500">{t('characteristics')}</label>
        <div className="flex gap-2 mt-1">
          <input value={charKey} onChange={(e) => setCharKey(e.target.value)} placeholder="Key" className="flex-1 rounded-xl border px-3 py-2 text-sm" />
          <input value={charVal} onChange={(e) => setCharVal(e.target.value)} placeholder="Value" className="flex-1 rounded-xl border px-3 py-2 text-sm" />
          <button type="button" onClick={addChar} className="px-3 rounded-xl bg-gray-100 text-sm">+</button>
        </div>
        {Object.entries(form.characteristics || {}).map(([k, v]) => (
          <p key={k} className="text-xs text-gray-500 mt-1">{k}: {v}</p>
        ))}
      </div>

      {!initial && (
        <AdminImageUpload files={files} onChange={setFiles} max={5} />
      )}

      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={form.is_active} onChange={(e) => set('is_active', e.target.checked)} />
        {form.is_active ? t('active') : t('inactive')}
      </label>

      <div className="flex gap-2 pt-2">
        <button type="submit" disabled={saving} className="flex-1 py-3 rounded-xl bg-brand-red text-white font-semibold">
          {saving ? t('loading') : t('save')}
        </button>
        <button type="button" onClick={onCancel} className="px-4 py-3 rounded-xl border text-gray-600">
          {t('cancel')}
        </button>
      </div>
    </form>
  )
}

function Input({ label, value, onChange, type = 'text', required }) {
  return (
    <div>
      <label className="text-xs font-semibold text-gray-500">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full mt-1 rounded-xl border border-gray-200 px-3 py-2 text-sm"
      />
    </div>
  )
}

function Textarea({ label, value, onChange }) {
  return (
    <div>
      <label className="text-xs font-semibold text-gray-500">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={2}
        className="w-full mt-1 rounded-xl border border-gray-200 px-3 py-2 text-sm"
      />
    </div>
  )
}
