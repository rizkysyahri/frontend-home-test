/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: 'nkihbopqxauxphmaqvey.supabase.co'
            },
            {
                hostname:  'images.unsplash.com'
            },
            {
                hostname:  's3.sellerpintar.com'
            }
        ]
    }
};

export default nextConfig;
