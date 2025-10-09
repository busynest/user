{

  "include": [
    "pwa-auth.ts",
    "pwa-helpers.ts"
  ],

  "exclude": [
    "../typescript/**/*.ts",
    "../demonstration/**/*.ts",
    "../typescript/development/**/*.ts"
  ],

  "compilerOptions": {

    "outDir":                             "../src-transpiled",

    "target":                             "ES2022",
    "module":                             "ESNext",
    "moduleResolution":                   "node",
    "lib":                                ["ES2022", "DOM", "DOM.Iterable"],

    "strict":                             true,
    "esModuleInterop":                    true,
    "skipLibCheck":                       true,

    "noUnusedLocals":                     true,
    "noUnusedParameters":                 true,
    "noImplicitReturns":                  true,
    "noFallthroughCasesInSwitch":         true,

    // Lit - Declaration
    "declaration":                        true,
    "declarationMap":                     true,
    "experimentalDecorators":             true,
    "emitDecoratorMetadata":              true,

    "useDefineForClassFields":            false,
    // true: Object.defineProperty, false: constructor
    // true: Fields are initialized after the parent class constructor runs.
    // false: Fields are initialized as assignments within the constructor.

    // Comments
    "removeComments":                     true,

    "allowSyntheticDefaultImports":       true, // Simplifies imports for Redux/Firebase
    "forceConsistentCasingInFileNames":   true,

    "pretty":                             true

  }

}
