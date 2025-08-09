import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
   resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    "process.env": {}, // এটি মূলত একটি খালি অবজেক্ট দিয়ে দেয়া হচ্ছে
  },
  server: {
    host: true, // এইভাবে Vite আপনার লোকাল আইপি ব্যবহার করতে পারবে
    port: 5173, // প্রয়োজন মতো পোর্ট পরিবর্তন করতে পারেন
  },
});
