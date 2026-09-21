import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.resolve(__dirname, "../public");

// Base SVG with dark background for maskable and standard icons
const createSvg = (size, paddingRatio = 0.1, withBg = true) => {
  const contentSize = size * (1 - paddingRatio * 2);
  const offset = size * paddingRatio;
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
      <defs>
        <radialGradient id="bgGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#141c2e"/>
          <stop offset="100%" stop-color="#07090f"/>
        </radialGradient>
        <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="${size * 0.035}" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <filter id="coreGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="${size * 0.025}" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      
      ${withBg ? `<rect width="${size}" height="${size}" rx="${size * 0.18}" fill="url(#bgGrad)"/>` : ""}
      
      <g transform="translate(${offset}, ${offset}) scale(${contentSize / 100})">
        <!-- Outer Slime Aura -->
        <path d="M50,18 C22,18 12,45 12,65 C12,82 30,88 50,88 C70,88 88,82 88,65 C88,45 78,18 50,18 Z" 
              fill="rgba(0, 240, 255, 0.22)" 
              stroke="#00f0ff" 
              stroke-width="3.5" 
              filter="url(#glow)"/>
        
        <!-- Internal Flame Core (Arson Devs Core) -->
        <path d="M50,40 C39,40 35,53 35,65 C35,76 42,81 50,81 C58,81 65,76 65,65 C65,51 50,44 50,40 Z" 
              fill="#ff5e00" 
              opacity="0.9" 
              filter="url(#coreGlow)"/>
        
        <!-- Core highlight -->
        <path d="M50,48 C44,48 41,56 41,64 C41,71 45,75 50,75 C55,75 59,71 59,64 C59,54 50,51 50,48 Z" 
              fill="#ffcc00" 
              opacity="0.75"/>
        
        <!-- Slime Face Features -->
        <circle cx="42" cy="58" r="3.2" fill="#00f0ff"/>
        <circle cx="58" cy="58" r="3.2" fill="#00f0ff"/>
        <path d="M47,66 Q50,68.5 53,66" fill="none" stroke="#00f0ff" stroke-width="2" stroke-linecap="round"/>
      </g>
    </svg>
  `;
};

async function generate() {
  console.log("Generating PWA Icons in public/...");

  // 192x192
  const svg192 = Buffer.from(createSvg(192, 0.08, true));
  await sharp(svg192).png().toFile(path.join(publicDir, "pwa-192x192.png"));
  console.log("✓ Created pwa-192x192.png");

  // 512x512
  const svg512 = Buffer.from(createSvg(512, 0.08, true));
  await sharp(svg512).png().toFile(path.join(publicDir, "pwa-512x512.png"));
  console.log("✓ Created pwa-512x512.png");

  // Maskable 512x512 (larger padding for safe zone)
  const svgMaskable = Buffer.from(createSvg(512, 0.18, true));
  await sharp(svgMaskable).png().toFile(path.join(publicDir, "pwa-maskable-512x512.png"));
  console.log("✓ Created pwa-maskable-512x512.png");

  // Apple touch icon (180x180)
  const svgApple = Buffer.from(createSvg(180, 0.06, true));
  await sharp(svgApple).png().toFile(path.join(publicDir, "apple-touch-icon.png"));
  console.log("✓ Created apple-touch-icon.png");

  // Favicon PNG (64x64)
  const svgFavicon = Buffer.from(createSvg(64, 0.05, false));
  await sharp(svgFavicon).png().toFile(path.join(publicDir, "favicon.png"));
  console.log("✓ Created favicon.png");

  console.log("All icons generated successfully!");
}

generate().catch((err) => {
  console.error("Error generating icons:", err);
  process.exit(1);
});
