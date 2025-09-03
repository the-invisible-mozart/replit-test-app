import { PageHeader } from '../components/PageHeader'
import { tags } from '../data'

export function TagsPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <PageHeader title="Tags" subtitle="Available tags" />
      <ul className="grid gap-3">
        {tags.map((tag) => (
          <li
            key={tag.id}
            className="flex items-center justify-between rounded-md border border-slate-200 p-3"
          >
            <div className="flex items-center gap-3">
              <span className="h-3 w-3 rounded-full" style={{ backgroundColor: tag.colorHex }} />
              <span className="font-medium">{tag.name}</span>
            </div>
            <code className="text-xs text-slate-500">#{tag.slug}</code>
          </li>
        ))}
      </ul>
    </div>
  )
}


