import { EmptyState } from "../components/EmptyState";
import { PageHeader } from "../components/PageHeader";
import { TodoList } from "../components/TodoList";
import { tags, todos } from "../data";
import type { Tag } from "../types";

export function TodosPage() {
	const tagsById = new Map<string, Tag>(tags.map((t) => [t.id, t]));

	return (
		<div className="mx-auto max-w-2xl">
			<PageHeader title="Todos" subtitle="A simple list backed by mock data" />
			{todos.length === 0 ? (
				<EmptyState title="No todos yet" message="All done. Enjoy your day!" />
			) : (
				<TodoList todos={todos} tagsById={tagsById} />
			)}
		</div>
	);
}
