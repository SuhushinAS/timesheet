const { patchWebpackConfig } = require('next-global-css');

/** @type {import('next').NextConfig} */
module.exports = {
  env: {
    NEXT_TELEMETRY_DISABLED: 1,
  },
  reactStrictMode: true,
  rewrites() {
    return [
      {
        source: '/tracker/:path*',
        destination: 'https://api.tracker.yandex.net/:path*',
      },
    ];
  },
  webpack: (config, options) => {
    patchWebpackConfig(config, options);
    const { resolve = {} } = config;

    return {
      ...config,
      resolve: {
        ...resolve,
        modules: ['src', 'node_modules'],
      },
    };
  },
};
