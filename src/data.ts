import type { Tag, Todo } from './types.ts'

export const tags: Tag[] = [
  { id: 't1', slug: 'work', name: 'Work', colorHex: '#2563eb' },
  { id: 't2', slug: 'personal', name: 'Personal', colorHex: '#16a34a' },
  { id: 't3', slug: 'urgent', name: 'Urgent', colorHex: '#dc2626' },
]

export const todos: Todo[] = [
  { id: '1', title: 'Write project README', completed: false, tagIds: ['t1'] },
  { id: '2', title: 'Plan weekend hike', completed: true, tagIds: ['t2'] },
  { id: '3', title: 'Fix prod issue #142', completed: false, tagIds: ['t1', 't3'] },
  { id: '4', title: 'Buy groceries', completed: false, tagIds: ['t2'] },
]

export function getTagsByIds(ids: string[]): Tag[] {
  const idSet = new Set(ids)
  return tags.filter((t) => idSet.has(t.id))
}


