import nodeResolve from 'rollup-plugin-node-resolve';

export default {
  entry: 'src/public/js/index.js',
  dest: 'build/bundle.js',
  useStrict: false,
  format: 'iife',
  moduleName: 'HiSayer',
  sourceMap: true,
  sourceMapFile: 'bundle/bundle.js',
  plugins: [nodeResolve({
    jsnext: true,
    main: true,
    browser: true
  })]
};
