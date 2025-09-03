import { useEffect, useSyncExternalStore } from 'react'
import { TagsPage } from './pages/TagsPage'
import { TodosPage } from './pages/TodosPage'

type RouteName = 'todos' | 'tags'

function subscribe(listener: () => void) {
  window.addEventListener('hashchange', listener)
  return () => window.removeEventListener('hashchange', listener)
}

function getSnapshot(): RouteName {
  const hash = window.location.hash.replace(/^#\/?/, '')
  if (hash.startsWith('tags')) return 'tags'
  return 'todos'
}

export function App() {
  const route = useSyncExternalStore(subscribe, getSnapshot, () => 'todos')

  useEffect(() => {
    if (!window.location.hash) {
      window.location.hash = '/todos'
    }
  }, [])

  return (
    <div>
      {route === 'tags' ? <TagsPage /> : <TodosPage />}
    </div>
  )
}


