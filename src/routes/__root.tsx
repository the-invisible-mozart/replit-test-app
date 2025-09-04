import { createRootRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
	component: function RootComponent() {
		return (
			<div>
				<header className="border-b bg-white/50 backdrop-blur-sm sticky top-0">
					<div className="mx-auto max-w-3xl flex items-center justify-between p-4">
						<Link to="/todos" className="font-bold">
							Replit Test App
						</Link>
						<nav className="flex gap-4 text-sm">
							<Link to="/todos" className="hover:underline">
								Todos
							</Link>
							<Link to="/tags" className="hover:underline">
								Tags
							</Link>
						</nav>
					</div>
				</header>
				<main className="mx-auto max-w-3xl p-4">
					<Outlet />
				</main>
			</div>
		);
	},
});
