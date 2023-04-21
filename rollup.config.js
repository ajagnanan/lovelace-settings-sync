import resolve from "rollup-plugin-node-resolve";
import typescript from "rollup-plugin-typescript2";
import babel from "rollup-plugin-babel";
import { terser } from "rollup-plugin-terser";

export default {
  input: ["src/settings-sync.ts"],
  output: {
    dir: "./dist",
    format: "es",
    // entryFileNames: 'settings-sync-[hash].js'
  },
  plugins: [
    resolve(),
    typescript(),
    babel({
      exclude: "node_modules/**"
    }),
    terser()
  ]
};