import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    "process.env": {}, // এটি মূলত একটি খালি অবজেক্ট দিয়ে দেয়া হচ্ছে
  },
});
