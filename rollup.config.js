import nodeResolve from 'rollup-plugin-node-resolve';
import init from 'rollup-plugin-init';

export default {
  entry: 'src/public/js/index.js',
  dest: process.env.NODE_ENV === 'test' ? 'build/bundle_init.js' :'build/bundle.js',
  useStrict: false,
  format: 'iife',
  moduleName: 'gitodoro',
  sourceMap: true,
  sourceMapFile: 'bundle/bundle.js',
  plugins: [nodeResolve({
    jsnext: true,
    main: true,
    browser: true
  })].concat(process.env.NODE_ENV === 'test' ? [ init() ] : [])
};
