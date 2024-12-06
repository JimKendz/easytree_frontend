/** @type {import('next').NextConfig} */
//const fs = require('fs');
//const path = require('path');

const nextConfig = {
    /*async rewrites() {
      return [
        {
          source: '/auth/login',
          destination: 'http://localhost:3000/api/user',
        },
      ]
    }, */
    /*typescript: {
      ignoreBuildErrors: true,
    },*/
    async headers() {
      return [
          {
              // matching all API routes
              // source: "/api/:path*",
              source: "/api/:path*",
              headers: [
                  { key: "Access-Control-Allow-Credentials", value: "true" },
                  { key: "Access-Control-Allow-Origin", value: "*" }, // replace this your actual origin
                  { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
                  { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
              ]
          }
      ]
    }
    /*server: {
        https: {
          key: fs.readFileSync(path.resolve('./cert/private.key')),
          cert: fs.readFileSync(path.resolve('./cert/public.crt')),
        },
      }, */
}

module.exports = nextConfig
