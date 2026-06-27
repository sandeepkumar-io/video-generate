# Production Deployment Guide

## Overview
This guide explains how to deploy the Free Image to Video Generator to production serverless environments.

---

## ✅ Prerequisites

- Node.js 18+ installed
- pnpm package manager
- AWS Account (for Lambda) or alternative serverless platform
- Domain name (optional but recommended)

---

## 🚀 Deployment Options

### Option 1: Vercel (Recommended - Easiest)

Vercel is the easiest deployment option as it's optimized for Next.js.

#### Steps:
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your GitHub repository
5. Configure environment variables:
   ```
   NEXT_PUBLIC_APP_URL=https://yourdomain.com
   REMOTION_CHROMIUM_EXECUTABLE=/usr/bin/chromium-browser
   ```
6. Deploy!

#### Important Notes:
- Vercel automatically handles the `remotion` folder
- The `REMOTION_ENTRY_POINT` env var is NOT needed
- Runtime limit: 120 seconds (configured in code)

---

### Option 2: AWS Lambda + API Gateway

For custom AWS deployments or if you need more control.

#### Setup:

1. **Install Serverless Framework:**
   ```bash
   npm install -g serverless
   ```

2. **Configure AWS Credentials:**
   ```bash
   serverless config credentials --provider aws --key YOUR_KEY --secret YOUR_SECRET
   ```

3. **Create `serverless.yml`:**
   ```yaml
   service: image-to-video-generator

   provider:
     name: aws
     runtime: nodejs18.x
     region: us-east-1
     memorySize: 3008
     timeout: 120
     environment:
       NEXT_PUBLIC_APP_URL: ${env:NEXT_PUBLIC_APP_URL}
       REMOTION_CHROMIUM_EXECUTABLE: /opt/chrome/chrome
       REMOTION_ENTRY_POINT: /var/task/remotion/index.ts
     apiGateway:
       shouldStartNameWithService: true

   functions:
     api:
       handler: .next/server/pages/api/render.handler
       events:
         - http:
             path: api/render
             method: POST
             cors: true

   plugins:
     - serverless-offline
     - serverless-plugin-tracing

   package:
     individually: false
     patterns:
       - '!node_modules/**'
       - 'node_modules/@remotion/**'
       - 'node_modules/@rspack/**'
       - '.next/**'
       - 'remotion/**'
       - 'public/**'
   ```

4. **Build and Deploy:**
   ```bash
   npm run build
   serverless deploy
   ```

#### Key Points:
- Set `REMOTION_ENTRY_POINT=/var/task/remotion/index.ts`
- Memory: 3008 MB (minimum for video rendering)
- Timeout: 120 seconds
- Include `remotion/**` in package patterns

---

### Option 3: Docker (Custom Server)

For full control over the environment.

1. **Create `Dockerfile`:**
   ```dockerfile
   FROM node:18-alpine

   RUN apk add --no-cache \
     chromium \
     freetype \
     harfbuzz \
     ttf-freefont

   WORKDIR /app

   COPY package*.json ./
   COPY pnpm-lock.yaml ./
   RUN npm install -g pnpm && pnpm install

   COPY . .

   RUN pnpm build

   EXPOSE 3000

   ENV REMOTION_CHROMIUM_EXECUTABLE=/usr/bin/chromium
   ENV NEXT_PUBLIC_APP_URL=https://yourdomain.com

   CMD ["pnpm", "start"]
   ```

2. **Build and Run:**
   ```bash
   docker build -t image-to-video .
   docker run -p 3000:3000 image-to-video
   ```

---

## 🔧 Environment Variables

### Required Variables:
```env
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

### Optional Variables:
```env
# Chromium executable path (for custom installations)
REMOTION_CHROMIUM_EXECUTABLE=/usr/bin/chromium

# For serverless: absolute path to remotion/index.ts
REMOTION_ENTRY_POINT=/var/task/remotion/index.ts
```

---

## 🐛 Troubleshooting Production Issues

### Issue: "Module not found: Error: Can't resolve './Root'"

**Cause:** The `remotion` folder is not properly included in the deployment.

**Solution:**
1. For **Vercel**: This should be automatic. If it fails, check that `remotion/` folder is in your repo.
2. For **AWS Lambda**: Ensure `remotion/**` is included in the `package` patterns in `serverless.yml`.
3. For **Docker**: Make sure `COPY . .` includes the `remotion` folder.

### Issue: "CHROMIUM_EXECUTABLE not found"

**Cause:** Chromium is not installed in the serverless environment.

**Solutions:**
- **Vercel**: No action needed - Chromium is pre-installed
- **AWS Lambda**: Add Chromium layer or use custom runtime
- **Docker**: Ensure Chromium is installed in the Dockerfile

### Issue: "Video rendering timeout"

**Cause:** Video is too large or rendering is taking too long.

**Solutions:**
- Reduce resolution (use 720p instead of 1080p)
- Reduce duration (2-3 seconds instead of 10)
- Reduce FPS (30fps is faster than 60fps)
- Increase Lambda memory to 3008 MB

---

## ✅ Testing Production Deployment

### 1. Test with cURL:
```bash
curl -X POST https://yourdomain.com/api/render \
  -H "Content-Type: application/json" \
  -d '{
    "images": [{"src": "data:image/png;base64,...", "name": "test.png"}],
    "animation": "zoom-in",
    "duration": 3,
    "resolution": "1080p",
    "aspectRatio": "16:9"
  }' \
  --output video.mp4
```

### 2. Test from Browser:
1. Go to `https://yourdomain.com`
2. Upload an image
3. Select animation settings
4. Click "Generate MP4"
5. Download and verify video plays

### 3. Monitor Logs:
- **Vercel**: Vercel Dashboard → Logs
- **AWS**: CloudWatch Logs
- **Docker**: `docker logs <container_id>`

---

## 📊 Performance Optimization

### For Production:

1. **Enable CDN caching** for static files
2. **Use CloudFront** (AWS) or Vercel's built-in CDN
3. **Monitor Core Web Vitals**
4. **Set up error tracking** (Sentry, etc.)
5. **Use analytics** (Google Analytics 4)

### Build Optimization:
```bash
# Production build
pnpm build

# Check bundle size
pnpm analyze
```

---

## 🔐 Security Checklist

- [ ] Environment variables are secret (not in git)
- [ ] CORS properly configured
- [ ] Input validation on API endpoint
- [ ] Rate limiting enabled
- [ ] HTTPS enforced
- [ ] API keys protected (if using external services)

---

## 📈 Scaling Considerations

### Vercel (Auto-scaling)
- Automatic scaling based on traffic
- Cost: Per execution

### AWS Lambda
- Set reserved concurrency for predictability
- Monitor Lambda metrics
- Scale memory as needed

### Docker
- Use auto-scaling groups
- Load balancer for traffic distribution
- CDN for static content

---

## 💡 Pro Tips

1. **Cache bundle results**: Set longer TTL in CloudFront
2. **Monitor bandwidth**: Video downloads can be expensive
3. **Use compression**: Enable gzip compression
4. **Optimize images**: Compress user uploads before processing
5. **Set timeouts**: Configure proper timeout values

---

## 🆘 Getting Help

If you encounter deployment issues:

1. Check the logs (see Troubleshooting section)
2. Verify environment variables are set
3. Ensure the `remotion` folder is included
4. Test locally first: `pnpm dev`
5. Check the [Remotion docs](https://www.remotion.dev/docs)

---

## 📝 Deployment Checklist

### Pre-Deployment:
- [ ] All tests passing locally
- [ ] Environment variables configured
- [ ] Domain ready
- [ ] SSL certificate available
- [ ] Backups configured

### Post-Deployment:
- [ ] Verify all pages load
- [ ] Test video generation
- [ ] Monitor error logs
- [ ] Set up analytics
- [ ] Configure alerts
- [ ] Update DNS (if needed)
- [ ] Test from different devices

---

Last Updated: 2026-06-27
