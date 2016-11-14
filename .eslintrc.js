module.exports = {
  extends: "airbnb",
  plugins: [
    "import",
  ],
  rules: {
    "import/no-extraneous-dependencies": ["error", {"devDependencies": true} ],
  }
}
