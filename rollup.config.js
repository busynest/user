import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import replace from '@rollup/plugin-replace';
import minifyHTML from '@lit-labs/rollup-plugin-minify-html-literals'; // Minifies Lit HTML templates, Rollup v4 compatible
import summary from 'rollup-plugin-summary';
import { copy } from '@web/rollup-plugin-copy';
import { babel } from '@rollup/plugin-babel';

import license from 'rollup-plugin-license';

// Lit is in dev mode. Not recommended for production! See https://lit.dev/msg/dev-mode for more information.
//     typescript({ // Compiles TypeScript; adjust tsconfig.json if needed
//      tsconfig: './tsconfig.json', // Assumes tsconfig.json exists; create if missing
//    }),

/*
output: [
    {
      file: 'finish/index.cjs.js',
      format: 'cjs',
      sourcemap: true,
      plugins: [terser()]
    },
    {
      file: 'finish/index.esm.js',
      format: 'esm',
      sourcemap: true,
      plugins: [terser()]
    },
    {
      file: 'finish/index.umd.js',
      format: 'umd',
      name: 'MyPackage',
      sourcemap: true,
      plugins: [terser()]
    }
  ],
  */

export default {
  input: 'pwa-auth.js', // HTML entry point with script tags for app logic
  output: {
    // dir: 'dist', // Outputs processed HTML and JS bundle (e.g., dist/
    // entryFileNames: 'bundle.js', // Names the JS bundle as dist/bundle.js
    file: 'website/pwa-auth.js', // Single bundle for browser script tag
    // file: 'public/pwa-auth.js', // Single bundled output
    format: 'iife', // IIFE for direct browser script tag use worldwide
    name: 'PwaAuth', // Global namespace if needed
    // sourcemap: true, // For debugging; remove in full prod
    plugins: [terser({
                      format: {
                        comments: false // Explicitly remove all comments
                      }
                  })]
  },
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'), // Fixes Redux/Firebase env issues, optimizes for prod
      'import.meta.env.MODE': JSON.stringify('production'), // Fallback for Lit’s env checks
      preventAssignment: true,
      delimiters: ['', ''] // Replaces raw strings for Lit's dev mode check
    }),
    resolve({ browser: true }), // Resolves modules for browser compatibility
    commonjs(), // Handles any CommonJS for older module support
    babel({
      babelHelpers: 'bundled', // Avoids external Babel runtime
      exclude: 'node_modules/**', // Skip transpiling dependencies
      presets: [
        ['@babel/preset-env', {
          targets: 'defaults', // >0.25% global usage, not dead browsers (Chrome 51+, Firefox 45+, etc.)
          modules: false, // Preserve ESM for tree-shaking
          bugfixes: true, // Fix browser-specific JS bugs
          corejs: 3, // Use core-js for polyfills
          useBuiltIns: 'usage' // Add polyfills only for used ES2024+ features
        }],
      ],
    }), // Transpiles to compatible JS "language" level
    minifyHTML(), // Minifies Lit template literals (~20-30% size reduction)
    // minifyHTML.default(), // Minifies Lit's HTML templates
    // htmlLiterals(),
    terser({
      ecma: 2015, // Base for transpiled output (ES6+ after Babel)
      module: true,
      warnings: true,
    }), // Minifies for prod efficiency
    summary(), // Prints bundle size summary for optimization checks
    copy({
      patterns: ['images/empty.jpg', 'images/favicon.ico'], // Optional: Copy static files to dist
    }),

    license({
      // Deduplicate and collect license comments
      banner: {
        commentStyle: 'regular', // Use /* */ comments
        content: `
          My Package Name
          Copyright (c) <%= moment().format('YYYY') %> Your Name
          Licensed under MIT
        `
      },
      thirdParty: {
        output: {
          file: 'npm/THIRD_PARTY_LICENSES.txt', // Output licenses to a separate file
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

  ],

  // No externals; bundle everything including Firebase/Redux/Lit
};

// import minifyHTML from 'rollup-plugin-minify-html-literals';
// import htmlLiterals from 'rollup-plugin-html-literals'; // Fallback for Lit HTML minification
