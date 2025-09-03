export interface PageHeaderProps {
  title: string
  subtitle?: string
}

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <header className="mb-6">
      <h1 className="text-3xl font-bold">{title}</h1>
      {subtitle ? <p className="text-slate-500 mt-1">{subtitle}</p> : null}
    </header>
  )
}


