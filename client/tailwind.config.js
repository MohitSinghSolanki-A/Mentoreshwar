const colors = require("./src/colors.config.js").colors; // Use require instead of import

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                midnight: colors.midnight, // Now it will work!
            },
        },
    },
    plugins: [],
};
