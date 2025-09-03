import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";
import type { Tag, Todo } from "../types";
import { TagBadge } from "./TagBadge";

export interface TodoItemProps {
	todo: Todo;
	tags: Tag[];
}

export function TodoItem({ todo, tags }: TodoItemProps) {
	return (
		<li className="flex items-start gap-3 rounded-md border border-slate-200 p-3">
			<Checkbox.Root
				checked={todo.completed}
				disabled
				className="mt-1 h-4 w-4 rounded border border-slate-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 grid place-items-center"
			>
				<Checkbox.Indicator>
					<CheckIcon className="h-3.5 w-3.5 text-white" />
				</Checkbox.Indicator>
			</Checkbox.Root>

			<div className="flex-1">
				<p
					className={`font-medium ${todo.completed ? "line-through text-slate-400" : ""}`}
				>
					{todo.title}
				</p>
				{tags.length > 0 ? (
					<div className="mt-2 flex flex-wrap gap-2">
						{tags.map((t) => (
							<TagBadge key={t.id} tag={t} />
						))}
					</div>
				) : null}
			</div>
		</li>
	);
}
