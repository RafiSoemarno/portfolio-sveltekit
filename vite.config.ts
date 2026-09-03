import { resolve } from 'node:path';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, searchForWorkspaceRoot } from 'vite';

const workspaceRoot = searchForWorkspaceRoot(process.cwd());

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		fs: {
			// oc-tree worktrees live at <repo>/worktrees/<type>/<name>; deps resolve
			// to the main checkout's node_modules, outside the worktree's allow list
			allow: [workspaceRoot, resolve(workspaceRoot, '../../../node_modules')]
		}
	}
});
