export interface Tag {
  id: string
  slug: string
  name: string
  colorHex: string
}

export interface Todo {
  id: string
  title: string
  completed: boolean
  tagIds: string[]
}

export type RouteName = 'todos' | 'tags'


