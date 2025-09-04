import React from "react";
import { createRoot } from "react-dom/client";
import "./style.css";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

const container = document.getElementById("app");
if (!container) throw new Error("Missing #app root element");

const router = createRouter({
	routeTree,
});

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

createRoot(container).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>,
);
