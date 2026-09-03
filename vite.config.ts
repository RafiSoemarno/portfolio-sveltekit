import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, searchForWorkspaceRoot } from 'vite';

const workspaceRoot = searchForWorkspaceRoot(process.cwd());
// same as resolve(workspaceRoot, '../../../node_modules'), but without node:path
// (keeps `npm run check` passing without @types/node)
const mainNodeModules = new URL('../../../node_modules/', import.meta.url).pathname;

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		fs: {
			// oc-tree worktrees live at <repo>/worktrees/<type>/<name>; deps resolve
			// to the main checkout's node_modules, outside the worktree's allow list
			allow: [workspaceRoot, mainNodeModules]
		}
	}
});
