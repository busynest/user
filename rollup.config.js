import resolve      from '@rollup/plugin-node-resolve';
import commonjs     from '@rollup/plugin-commonjs';
import babel        from '@rollup/plugin-babel';
import terser       from '@rollup/plugin-terser';
import replace      from '@rollup/plugin-replace';
import summary      from 'rollup-plugin-summary';
import license      from 'rollup-plugin-license';
import typescript   from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import alias from '@rollup/plugin-alias';
import dts from 'rollup-plugin-dts';

// import minifyHTML   from '@lit-labs/rollup-plugin-minify-html-literals'; // Minifies Lit HTML templates, Rollup v4 compatible
// import { copy }     from '@web/rollup-plugin-copy';

const input = {
  'pwa-auth'      : './base/export/pwa-auth.js'
  // 'pwa-helpers'   : './base/export/auth-helpers.js'
};

//   'pwa-helpers'   : './javascript/transpiier/pwa-helpers.js'

const outputs = [

  {
    dir:              'website/javascript',
    entryFileNames:   '[name].js',
    chunkFileNames:   '[name]-[hash].js',
    format:           'es',                   // Format Specification: system // umd // cjs // amd // iife // es fallback.
    name:             'pwaAuth',              // Global var: For script tag; customize per input if needed (advanced: output.name via fn).
    sourcemap:        true,
    // preserveModules: false

    // Externals: Assume CDN; avoids bundling large libs.
    globals: {

      //  jquery: 'jQuery',       // jQuery: Global $ assumed loaded externally.
      lodash: '_'                 // Lodash: Global _ for tree-shaking.

    },

    interop: 'compat'             // Interop: Handles mixed exports; safe for legacy.

  },
  {
    dir:              'demonstration/javascript',
    entryFileNames:   '[name].js',
    chunkFileNames:   '[name]-[hash].js',
    format:           'es',                   // Format Specification: system // umd // cjs // amd // iife // es fallback.
    name:             'pwaAuth',              // Global var: For script tag; customize per input if needed (advanced: output.name via fn).
    sourcemap:        true,
    // preserveModules: false

    // Externals: Assume CDN; avoids bundling large libs.
    globals: {

      //  jquery: 'jQuery',       // jQuery: Global $ assumed loaded externally.
      lodash: '_'                 // Lodash: Global _ for tree-shaking.

    },

    interop: 'compat'             // Interop: Handles mixed exports; safe for legacy.

  },
  {
    dir:              'project/esm',
    entryFileNames:   '[name].js',
    chunkFileNames:   '[name]-[hash].js',
    format:           'es',                   // Format Specification: system // umd // cjs // amd // iife // es fallback.
    name:             'pwaAuth',              // Global var: For script tag; customize per input if needed (advanced: output.name via fn).
    sourcemap:        true,
    // preserveModules: false

    // Externals: Assume CDN; avoids bundling large libs.
    globals: {

      //  jquery: 'jQuery',       // jQuery: Global $ assumed loaded externally.
      lodash: '_'                 // Lodash: Global _ for tree-shaking.

    },

    interop: 'compat'             // Interop: Handles mixed exports; safe for legacy.

  },
  {
    dir:              'base/pwa-auth.d.ts',
    entryFileNames:   'project/esm/[name].d.ts',
    chunkFileNames:   'project/esm/[name]-[hash].d.ts',
    format:           'es',
    sourcemap:        true,
    interop:          'compat'             // Interop: Handles mixed exports; safe for legacy.
  }

];

// Plugins array: Sequential chain; resolve first for dep discovery, then transforms, then optimize last.
const plugins = [

  dts(),

 // nodeResolve(), // Tell Rollup how to find modules in node_modules

  alias({
      entries: [
        {
          find: 'lit-html/lib/shady-render.js',
          replacement: 'node_modules/lit-html/lit-html.js',
        },
      ],
    }),
/*
  typescript({                                  // TS config: Inline tsconfig overrides; tsconfig.json primary.
    tsconfig: './tsconfig.json',                 // Path to TS config: Defines compilerOptions like target: 'esnext'.
    sourceMap: true
  }),
*/
  replace({
    'process.env.NODE_ENV': JSON.stringify('production'), // Fixes Redux/Firebase env issues, optimizes for prod
    'import.meta.env.MODE': JSON.stringify('production'), // Fallback for Lit’s env checks
    preventAssignment: true,
    delimiters: ['', ''] // Replaces raw strings for Lit's dev mode check
  }),

  resolve({                                     // Resolve config: browser: true prioritizes web fields; extensions include .ts for TS support.
    browser: true,                              // Use 'browser' in package.json for conditional exports.
    extensions: ['.js', '.ts', '.json']         // Explicit extensions: Ensures TS/JS resolution.
  }),

  commonjs({                                    // CommonJS config: Dynamic requires handled; extensions align with resolve.
    include: /node_modules/,                    // Scope: Only transform node_modules to avoid double-work on src.
    extensions: ['.js', '.ts']                  // Match resolve for consistency.
  }),

  terser({                                      // Terser config: Uglify options; format for readability in dev (disabled).
    compress: {                                 // Compression: Dead-code removal, etc.; defaults aggressive.
      drop_console: true                        // Drop console.*: Reduces size; customize for warnings.
    },
    format: {                                   // Formatting: Comments preserved if needed.
      comments: false                           // No comments: Full minification.
    },
    mangle: {                                   // Mangling: Shorten vars; toplevel for global scope.
      toplevel: true
    },
    sourceMap: true                             // Maps for minified: Essential for prod debugging.
  }),

  license({
    // Deduplicate and collect license comments
    banner: {
      commentStyle: 'regular', // Use /* */ comments
      content: `
        pwa-auth
        Copyright (c) 2025 Jacek Markiewicz
        Licensed under MIT
      `
    },
    thirdParty: {
      output: {
        file: 'website/javascript/THIRD_PARTY_LICENSES.txt', // Output licenses to a separate file
        template: dependencies => {
          // Deduplicate and format license information
          const uniqueLicenses = new Map();
          dependencies.forEach(dep => {
            if (dep.license) {
              uniqueLicenses.set(dep.name, {
                name: dep.name,
                version: dep.version,
                license: dep.license,
                licenseText: dep.licenseText || 'No license text provided'
              });
            }
          });
          return Array.from(uniqueLicenses.values())
            .map(dep => `${dep.name}@${dep.version}\n${dep.license}\n${dep.licenseText}\n`)
            .join('\n---\n');
        }
      },
      allow: '(MIT OR Apache-2.0 OR BSD-2-Clause OR BSD-3-Clause)' // Only allow common open-source licenses
    }
  }),
/*
  copy({
    patterns: ['images/empty.jpg', 'images/favicon.ico'], // Optional: Copy static files to dist
  }),
*/
  summary()

];









/*
  babel({                                       // Babel config: Transpile after TS; .babelrc for presets/plugins.
    babelHelpers: 'bundled',                    // Bundle helpers: Includes @babel/runtime in output to avoid external dep.
    exclude: 'node_modules/**',                 // Scope: Only src code; node_modules handled by commonjs.
    extensions: ['.js', '.ts'],                 // Process TS post-compilation.
    sourceMaps: true,                           // Generate maps: Chains with TS for full source debugging.
    presets: [
      ['@babel/preset-env', {
        targets:{ browsers: ['last 2 versions', 'not dead'] } // 'defaults',                    // >0.25% global usage, not dead browsers (Chrome 51+, Firefox 45+, etc.)
       // modules: false,                         // Preserve ESM for tree-shaking
       // bugfixes: true,                         // Fix browser-specific JS bugs
       // corejs: 3,                              // Use core-js for polyfills
       // useBuiltIns: 'usage'                    // Add polyfills only for used ES2024+ features
      }]
    ],  // Env preset for targets
    plugins: [  // Array: Additional transforms
      // '@babel/plugin-transform-class-properties',  // Enables class fields; preserves this in props
      ["@babel/plugin-proposal-decorators", { "version": "2023-11" }]
    ]
  }),
*/


/*

// Configuration for copying static assets (excluding @webcomponents)
const copyConfig = {
  targets: [
    { src: 'images', dest: 'build-modern' },
    { src: 'data', dest: 'build-modern' },
    { src: 'index.html', dest: 'build-modern' },
  ],
};

// Modern ES6 build configuration for evergreen browsers
const config = {
  input: 'typescript/export/pwa-auth.ts',
  output: {
    dir: 'typescript/project',
    format: 'es',
    sourcemap: true,
  },
  plugins: [
    alias({
      entries: [
        {
          find: 'lit-html/lib/shady-render.js',
          replacement: 'node_modules/lit-html/lit-html.js',
        },
      ],
    }),
    typescript({
      tsconfig: './tsconfig.json',
      sourceMap: true,
    }),
    minifyHTML(),
    copy(copyConfig),
    resolve(),
    commonjs(),
    terser(),
  ],
  preserveEntrySignatures: false,
};
*/
// export default config;
export default { input, output: outputs, plugins/*, preserveEntrySignatures: false */};


