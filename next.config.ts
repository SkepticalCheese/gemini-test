import type { NextConfig } from "next";

const nextConfig: NextConfig = 
  process.env.NODE_ENV === 'production'
    ? {devIndicators: false} 
    : {}
;

export default nextConfig;
