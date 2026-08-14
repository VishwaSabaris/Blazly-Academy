import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { dev, isServer, webpack }) => {
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

