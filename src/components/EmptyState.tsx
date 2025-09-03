export interface EmptyStateProps {
  title: string
  message?: string
}

export function EmptyState({ title, message }: EmptyStateProps) {
  return (
    <div className="text-center py-16">
      <h2 className="text-xl font-semibold">{title}</h2>
      {message ? <p className="text-slate-500 mt-2">{message}</p> : null}
    </div>
  )
}


