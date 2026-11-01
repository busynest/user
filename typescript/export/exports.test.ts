import { createRequire } from 'node:module';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const root = process.cwd();
const require = createRequire(resolve(root, 'package.json'));

const entries = {
  './drawer': 'base/export/drawer.js',
  './login': 'base/export/login.js',
  './settings': 'base/export/settings.js',
  './icon': 'base/export/icon.js',
  './reset': 'base/export/reset.js'
} as const;

/* Other components' modules. A subpath must not evaluate these. */
const foreign: Record<keyof typeof entries, string[]> = {
  './drawer': ['webcomponents/login/page.js', 'webcomponents/settings/settings.js', 'webcomponents/icon/icon.js', 'webcomponents/form/forgot.js'],
  './login': ['webcomponents/drawer/drawer.js', 'webcomponents/settings/settings.js', 'webcomponents/icon/icon.js', 'webcomponents/form/forgot.js'],
  './settings': ['webcomponents/drawer/drawer.js', 'webcomponents/login/page.js', 'webcomponents/icon/icon.js', 'webcomponents/form/forgot.js', 'webcomponents/css/animation.js'],
  './icon': ['webcomponents/drawer/drawer.js', 'webcomponents/login/page.js', 'webcomponents/settings/settings.js', 'webcomponents/form/forgot.js', 'webcomponents/css/animation.js'],
  './reset': ['webcomponents/drawer/drawer.js', 'webcomponents/login/page.js', 'webcomponents/settings/settings.js', 'webcomponents/icon/icon.js', 'webcomponents/css/animation.js']
};

function localImports(file: string): string[] {
  const text = readFileSync(file, 'utf8');
  const specs = new Set<string>();
  for (const match of text.matchAll(/(?:from|import)\s*['"](\.[^'"]+)['"]/g)) specs.add(match[1]);
  return [...specs];
}

function walk(file: string, seen = new Set<string>()): Set<string> {
  const abs = resolve(file);
  if (seen.has(abs) || !existsSync(abs)) return seen;
  seen.add(abs);
  for (const spec of localImports(abs)) walk(resolve(dirname(abs), spec), seen);
  return seen;
}

describe('package exports', () => {

  it('resolves the root, each component, and production', () => {
    const pkg = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8'));

    expect(pkg.main).toBe('./base/export/pwa-auth.js');
    expect(pkg.module).toBe('./base/export/pwa-auth.js');
    expect(pkg.types).toBe('./base/export/pwa-auth.d.ts');
    expect(pkg.license).toBe('MIT');
    expect(pkg.scripts.prepublishOnly).toBe('npm run build && npm run rollup');
    expect(pkg.exports['.'].types).toBe('./base/export/pwa-auth.d.ts');
    expect(pkg.exports['.'].import).toBe('./base/export/pwa-auth.js');
    expect(pkg.exports['./production'].import).toBe('./source/pwa-auth.js');
    expect(pkg.peerDependencies.lit).toBeTruthy();
    expect(pkg.peerDependencies.firebase).toBeTruthy();
    expect(pkg.dependencies['@reduxjs/toolkit']).toBeTruthy();
    expect(pkg.dependencies.redux).toBeTruthy();
    expect(pkg.peerDependencies.redux).toBeUndefined();
    expect(pkg.files).toEqual([
      'base',
      'source/pwa-auth.js',
      'source/pwa-styles.css',
      'source/empty.jpg',
      'README.md',
      'docs/drawer-slide.md',
      'docs/sliders.md',
      'license',
      'LICENSES.txt'
    ]);
    expect(pkg.sideEffects).toContain('./base/export/drawer.js');
    expect(pkg.sideEffects).toContain('./base/webcomponents/**/*.js');
    expect(pkg.sideEffects).toContain('./source/pwa-auth.js');

    expect(existsSync(resolve(root, 'base/export/pwa-auth.d.ts'))).toBe(true);
    expect(existsSync(resolve(root, 'source/pwa-auth.js'))).toBe(true);
    expect(require.resolve('pwa-auth')).toMatch(/base\/export\/pwa-auth\.js$/);
    expect(require.resolve('pwa-auth/production')).toMatch(/source\/pwa-auth\.js$/);

    for (const [sub, file] of Object.entries(entries)) {
      expect(pkg.exports[sub].import).toBe(`./${file}`);
      expect(pkg.exports[sub].types).toBe(`./${file.replace(/\.js$/, '.d.ts')}`);
      expect(existsSync(resolve(root, file))).toBe(true);
      expect(existsSync(resolve(root, file.replace(/\.js$/, '.d.ts')))).toBe(true);
      expect(require.resolve(`pwa-auth${sub.slice(1)}`)).toMatch(new RegExp(`${file}$`));
    }
  });

  it('keeps each component import off the other components', () => {
    for (const [sub, file] of Object.entries(entries)) {
      const loaded = [...walk(resolve(root, file))].map((abs) => abs.slice(root.length + 1));
      for (const banned of foreign[sub as keyof typeof entries]) {
        expect(loaded.some((item) => item.endsWith(banned)), `${sub} loaded ${banned}`).toBe(false);
      }
    }
  });

});
