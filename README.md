# 🎬 TikTok Quiz Video Generator

**Create viral quiz videos optimized for TikTok & Instagram in seconds!**

A full-stack web application that generates beautifully animated quiz videos perfect for social media. Built with Next.js, Remotion, React, and Tailwind CSS.

## ✨ Features

✅ **Algorithm-Optimized Videos**
- Automatically validates video duration (21-34s sweet spot for TikTok)
- Snappy animations optimized for engagement
- Real-time algorithm status display

✅ **6 Preset Templates**
- 🧠 General Knowledge
- 📚 History Facts
- ⚽ Sports Trivia
- 🎬 Movie Magic
- 💻 Tech Trivia
- 🎵 Music Knowledge

✅ **Live Video Preview**
- Real-time preview before export
- Remotion Player with playback controls
- Video duration and stats display

✅ **Three-Tab Interface**
- 📚 **Templates** - Browse & select presets
- ✏️ **Edit Quiz** - Create custom quizzes or modify templates
- 👁️ **Preview** - Watch video before generating

✅ **Viral-Ready Design**
- Ultra-vibrant colors (neon yellow, green, magenta)
- High-contrast for mobile screens
- Smooth 60 FPS animations
- Professional sound design

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone repository
git clone https://github.com/trieuan2204-hue/Quiz-video.git
cd Quiz-video

# Install dependencies
npm install

# Create environment file
echo "REMOTION_SERVE_URL=http://localhost:3000" > .env.local

# Start development server
npm run dev

# Open browser
# Visit: http://localhost:3000
```

## 📱 How to Use

### Step 1: Choose Template or Create Custom Quiz
1. Click the **📚 Templates** tab
2. Browse available templates or search by keyword
3. Click a template to select it
4. You'll be taken to the **Edit Quiz** tab

### Step 2: Edit & Customize
1. Modify quiz title
2. Edit questions and answers
3. Add explanations for correct answers
4. Add or remove questions as needed

### Step 3: Preview Video
1. Click **👁️ Preview** tab
2. Watch the live video preview
3. Check algorithm status (should show "OPTIMAL" for 21-34s videos)
4. Use playback controls to review

### Step 4: Generate & Download
1. Click **🎬 Generate Video**
2. Wait for rendering (30-60 seconds depending on length)
3. Click **⬇️ Download** when ready
4. Share to TikTok/Instagram!

## 🎯 Algorithm Tips for Maximum Viral Potential

### ✅ DO:
- **Keep videos 21-34 seconds** - Perfect viral window
- **Use bold, high-contrast colors** - Stops scrollers in their tracks
- **Include sound** - Videos with sound get 2.5x more engagement
- **Strong hook in first 3 seconds** - Users decide instantly
- **Add CTAs** - "Comment your score", "Follow", "Tag your friends"
- **Post consistently** - Algorithm rewards active creators

### ❌ DON'T:
- Make videos too long (>60s kills engagement)
- Use dull colors on mobile
- Forget captions/text overlays
- Post at random times (analyze your audience)
- Ignore comments and engagement

## 📁 Project Structure

```
quiz-video-generator/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── globals.css
│   │   ├── page.tsx
│   │   └── api/
│   │       └── generate-video/
│   │           └── route.ts
│   ├── components/
│   │   ├── QuizBuilder.tsx (main interface)
│   │   ├── PresetsGallery.tsx (template browser)
│   │   └── VideoPreview.tsx (live preview)
│   └── remotion/
│       ├── OptimizedQuizVideo.tsx (video component)
│       ├── constants.ts (algorithm config)
│       └── presets.ts (6 preset templates)
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── next.config.js
├── .env.local
├── .gitignore
└── README.md
```

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Video**: Remotion 4.x with @remotion/player
- **Styling**: Tailwind CSS 3
- **Video Rendering**: @remotion/renderer
- **API**: Next.js API Routes

## 🎨 Customization

### Add More Presets
Edit `src/remotion/presets.ts` and add new templates:

```typescript
{
  id: 'your-template-id',
  name: 'Your Template Name',
  description: 'Template description',
  category: 'general',
  thumbnail: '🎯',
  tags: ['tag1', 'tag2'],
  quizData: {
    quiz_title: 'Your Quiz Title',
    questions: [
      {
        question: 'Your question?',
        choices: { A: 'Option A', B: 'Option B', C: 'Option C', D: 'Option D' },
        correct: 'A',
        explanation: 'Explanation here',
      },
    ],
  },
}
```

### Change Colors
Edit `src/remotion/constants.ts` and modify `COLORS` object:

```typescript
export const COLORS = {
  background: {
    primary: '#your-color',
    secondary: '#your-color',
    tertiary: '#your-color',
  },
  // ... more colors
};
```

### Adjust Timing
Edit `src/remotion/constants.ts` and modify `TIMINGS`:

```typescript
export const TIMINGS = {
  intro: 1.2,      // Hook duration
  question: 2.0,   // Question display time
  countdown: 3.0,  // Countdown duration
  reveal: 1.5,     // Answer reveal time
  transition: 0.2, // Between questions
  outro: 1.0,      // End card
};
```

## 🚢 Deployment

### Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Deploy to Other Platforms

- **Railway.app**: `git push` to deploy
- **Render.com**: Connect GitHub repo
- **AWS**: Use Next.js AMI
- **Docker**: Build with `docker build -t quiz-gen .`

## 📊 Performance Notes

- Video generation: ~30-60 seconds per video
- Optimal for 1-4 questions (keeps duration in sweet spot)
- Uses FFmpeg under the hood via Remotion
- Client-side rendering (no server load for rendering)

## 🐛 Troubleshooting

### "Video generation failed"
- Check browser console for errors
- Ensure all questions have valid choices
- Try with fewer questions
- Check system disk space

### "Preview not loading"
- Refresh the page
- Check Network tab in DevTools
- Ensure Remotion Player is installed

### "Download doesn't work"
- Check browser download permissions
- Try a different browser
- Clear browser cache

## 📝 License

MIT License - feel free to use for personal and commercial projects

## 🤝 Contributing

Contributions welcome! Feel free to:
- Add more preset templates
- Suggest new features
- Report bugs
- Submit pull requests

## 📧 Support

Have questions? Issues?
- Check [GitHub Issues](https://github.com/trieuan2204-hue/Quiz-video/issues)
- Open a discussion
- Create a pull request

## 🎉 Getting Started

1. Clone the repo
2. Run `npm install`
3. Run `npm run dev`
4. Visit `http://localhost:3000`
5. Create your first viral quiz!

---

**Happy Quiz Creating! 🚀📱✨**

Made with ❤️ for content creators
