import type { Tag } from '../types'

export interface TagBadgeProps {
  tag: Tag
}

export function TagBadge({ tag }: TagBadgeProps) {
  return (
    <span
      className="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium"
      style={{ backgroundColor: `${tag.colorHex}1a`, color: tag.colorHex }}
    >
      {tag.name}
    </span>
  )
}


