import * as universal from '../entries/pages/_page.ts.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+page.ts";
export const imports = ["_app/immutable/nodes/2.C0N2tzhM.js","_app/immutable/chunks/u0r2Zlvz.js","_app/immutable/chunks/D3LPtx18.js","_app/immutable/chunks/C5lK5wDJ.js","_app/immutable/chunks/DLkFGf4J.js","_app/immutable/chunks/C3_eVD8M.js","_app/immutable/chunks/BuEuSOV3.js","_app/immutable/chunks/C_ccE8x9.js"];
export const stylesheets = ["_app/immutable/assets/2.DALBA_4-.css"];
export const fonts = [];
