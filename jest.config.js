module.exports = {
    collectCoverageFrom: ["src/**/*.{js,jsx,mjs}"],
    //testMatch: ["__tests__/**/*.{js,jsx,mjs}", "src/**/?(*.)(spec|test).{js,jsx,mjs}"],
    transform: {
      "^.+\\.(js|jsx|mjs)$": "./jest-transformer.js"
    },
    transformIgnorePatterns: ["[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs)$"]
  };