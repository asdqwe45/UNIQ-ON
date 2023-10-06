import proxy from "http-proxy-middleware"

// spring proxy 설정
const springProxy = proxy.createProxyMiddleware({
  target: process.env.SPRING_SERVER_URI,
  changeOrigin: true,
});

export default springProxy