import { createRequire } from 'node:module';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const root = process.cwd();
const require = createRequire(resolve(root, 'package.json'));

describe('package exports', () => {

  it('resolves . and ./production with types', () => {
    const pkg = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8'));

    expect(pkg.exports['.'].types).toBe('./base/export/pwa-auth.d.ts');
    expect(pkg.exports['.'].default).toBe('./base/export/pwa-auth.js');
    expect(pkg.exports['./production'].types).toBe('./base/export/pwa-auth.d.ts');
    expect(pkg.exports['./production'].default).toBe('./source/pwa-auth.js');
    expect(pkg.typesVersions['*'].production).toEqual(['./base/export/pwa-auth.d.ts']);

    expect(existsSync(resolve(root, 'base/export/pwa-auth.d.ts'))).toBe(true);
    expect(existsSync(resolve(root, 'source/pwa-auth.js'))).toBe(true);
    expect(require.resolve('pwa-auth')).toMatch(/base\/export\/pwa-auth\.js$/);
    expect(require.resolve('pwa-auth/production')).toMatch(/source\/pwa-auth\.js$/);
  });

});
