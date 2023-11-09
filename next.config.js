/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
		return [
			{
				source: "/auth-api/:path*",
				destination: "http://localhost:4000/:path*" // change to your own server path
			}
		]
	}
}

module.exports = nextConfig
