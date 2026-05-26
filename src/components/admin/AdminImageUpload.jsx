import { useTranslation } from '../../hooks/useTranslation'

export default function AdminImageUpload({ files, onChange, max = 5 }) {
  const { t } = useTranslation()

  const handleChange = (e) => {
    const selected = Array.from(e.target.files || []).slice(0, max)
    onChange(selected)
  }

  return (
    <div>
      <label className="text-xs font-semibold text-gray-500">{t('uploadImages')}</label>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleChange}
        className="mt-1 block w-full text-sm text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-gray-100 file:font-semibold"
      />
      {files.length > 0 && (
        <div className="flex gap-2 mt-2 flex-wrap">
          {files.map((f, i) => (
            <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded-lg">{f.name}</span>
          ))}
        </div>
      )}
    </div>
  )
}
