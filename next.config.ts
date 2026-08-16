import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  webpack: (config, { dev, isServer, webpack }) => {
    // Keep a single @firebase/app instance in the client bundle.
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        "@firebase/app": path.resolve(__dirname, "node_modules/@firebase/app"),
        "@firebase/auth": path.resolve(__dirname, "node_modules/@firebase/auth"),
        "@firebase/util": path.resolve(__dirname, "node_modules/@firebase/util"),
      };
    }

    if (dev && !isServer) {
      config.plugins.push(
        new webpack.DefinePlugin({
          'process.env.__NEXT_HMR_URL': JSON.stringify(
            process.env.NEXT_PUBLIC_HMR_URL || 'wss://elongated-plutonium-tribunal.ngrok-free.dev/_next/webpack-hmr'
          ),
        })
      );
    }
    return config;
  },
};

export default nextConfig;

