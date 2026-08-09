/** @type {import('next').NextConfig} */
const nextConfig = {
  // Страницы обновляются часто, поэтому браузер должен проверять свежесть,
  // а не показывать сохраненную копию.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=0, must-revalidate" }],
      },
      {
        source: "/:file(covers|art)/:name*",
        headers: [{ key: "Cache-Control", value: "public, max-age=604800" }],
      },
    ];
  },
  images: {
    remotePatterns: [{ protocol: "https", hostname: "static.wixstatic.com" }],
  },
};
export default nextConfig;
