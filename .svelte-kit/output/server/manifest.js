export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([".nojekyll","CNAME","favicon.svg","robots.txt"]),
	mimeTypes: {".svg":"image/svg+xml",".txt":"text/plain"},
	_: {
		client: {start:"_app/immutable/entry/start.CXyJR0m_.js",app:"_app/immutable/entry/app.CXSAr83-.js",imports:["_app/immutable/entry/start.CXyJR0m_.js","_app/immutable/chunks/DwjTPPIv.js","_app/immutable/chunks/D3LPtx18.js","_app/immutable/entry/app.CXSAr83-.js","_app/immutable/chunks/D3LPtx18.js","_app/immutable/chunks/DwLogGsI.js","_app/immutable/chunks/DLkFGf4J.js","_app/immutable/chunks/u0r2Zlvz.js","_app/immutable/chunks/DLDWN_Mr.js","_app/immutable/chunks/C_ccE8x9.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./nodes/0.js')),
			__memo(() => import('./nodes/1.js'))
		],
		remotes: {
			
		},
		routes: [
			
		],
		prerendered_routes: new Set(["/"]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
