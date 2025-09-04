import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [
		tanstackRouter({
			target: "react",
			autoCodeSplitting: true,
		}),
		react(),
	],
	server: {
		host: "0.0.0.0",
		port: 5000,
		strictPort: true,
		allowedHosts: true,
	},
	preview: {
		port: 5000,
	},
});
