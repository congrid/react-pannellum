import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import external from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import resolve from "rollup-plugin-node-resolve";
import url from "@rollup/plugin-url";

import pkg from "./package.json";

export default {
  input: "src/index.js",
  output: [
    {
      file: pkg.main,
      format: "cjs",
      sourcemap: false,
    },
    {
      file: pkg.module,
      format: "esm",
      sourcemap: false,
    },
  ],
  plugins: [
    resolve({ preferBuiltins: true, browser: true }),
    external(),
    postcss({
      extensions: [".css"],
    }),
    url(),
    babel({
      exclude: "node_modules/**",
      plugins: [
        ["@babel/plugin-proposal-decorators", { legacy: true }],
        ["@babel/plugin-proposal-class-properties", { loose: true }],
      ],
    }),
    resolve(),
    commonjs(),
  ],
};
