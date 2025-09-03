import type { Tag, Todo } from "../types";
import { TodoItem } from "./TodoItem";

export interface TodoListProps {
	todos: Todo[];
	tagsById: Map<string, Tag>;
}

export function TodoList({ todos, tagsById }: TodoListProps) {
	return (
		<ul className="grid gap-3">
			{todos.map((todo) => {
				const tags = todo.tagIds
					.map((id) => tagsById.get(id))
					.filter(Boolean) as Tag[];
				return <TodoItem key={todo.id} todo={todo} tags={tags} />;
			})}
		</ul>
	);
}
