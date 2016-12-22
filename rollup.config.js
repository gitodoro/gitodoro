import nodeResolve from 'rollup-plugin-node-resolve';
export default {
  entry: 'src/public/js/index.js',
  dest: 'build/bundle.js',
  format: 'iife',
  moduleName: 'HiSayer',
  plugins: [nodeResolve({
    jsnext: true,
    main: true,
    browser: true
  })]
};
