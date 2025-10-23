#!/usr/bin/env python3
from PIL import Image, ImageDraw, ImageFont
import os

# Create icons directory
icons_dir = os.path.join(os.path.dirname(__file__), '..', 'public', 'icons')
os.makedirs(icons_dir, exist_ok=True)

def create_icon(size):
    # Create image with emerald background
    img = Image.new('RGB', (size, size), color='#10b981')
    draw = ImageDraw.Draw(img)

    # Calculate sizes based on icon size
    scale = size / 512

    # Draw rounded rectangle background
    # (PIL doesn't have native rounded rectangle, so we'll keep it simple)

    # Draw eyes
    center_x = size // 2
    center_y = int(size * 0.4)

    # Left eye
    left_eye_x = center_x - int(60 * scale)
    # White part
    draw.ellipse([
        left_eye_x - int(50 * scale), center_y - int(60 * scale),
        left_eye_x + int(50 * scale), center_y + int(60 * scale)
    ], fill='white')
    # Pupil
    draw.ellipse([
        left_eye_x - int(28 * scale), center_y - int(30 * scale),
        left_eye_x + int(28 * scale), center_y + int(40 * scale)
    ], fill='#1f2937')
    # Highlight
    draw.ellipse([
        left_eye_x - int(12 * scale) - int(10 * scale), center_y - int(15 * scale) - int(10 * scale),
        left_eye_x + int(12 * scale) - int(10 * scale), center_y + int(15 * scale) - int(10 * scale)
    ], fill='white')

    # Right eye
    right_eye_x = center_x + int(60 * scale)
    # White part
    draw.ellipse([
        right_eye_x - int(50 * scale), center_y - int(60 * scale),
        right_eye_x + int(50 * scale), center_y + int(60 * scale)
    ], fill='white')
    # Pupil
    draw.ellipse([
        right_eye_x - int(28 * scale), center_y - int(30 * scale),
        right_eye_x + int(28 * scale), center_y + int(40 * scale)
    ], fill='#1f2937')
    # Highlight
    draw.ellipse([
        right_eye_x + int(10 * scale) - int(12 * scale), center_y - int(15 * scale) - int(10 * scale),
        right_eye_x + int(10 * scale) + int(12 * scale), center_y + int(15 * scale) - int(10 * scale)
    ], fill='white')

    # Draw Q text
    try:
        font_size = int(140 * scale)
        # Try to use a system font
        try:
            font = ImageFont.truetype("/System/Library/Fonts/Supplemental/Arial Bold.ttf", font_size)
        except:
            try:
                font = ImageFont.truetype("/Library/Fonts/Arial Bold.ttf", font_size)
            except:
                font = ImageFont.load_default()
    except:
        font = ImageFont.load_default()

    text = "Q"
    # Get text bounding box
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]

    text_x = (size - text_width) // 2
    text_y = int(size * 0.75) - text_height // 2

    draw.text((text_x, text_y), text, fill='white', font=font)

    return img

# Create all icon sizes
print("Creating PWA icons...")

# 192x192
icon_192 = create_icon(192)
icon_192.save(os.path.join(icons_dir, 'icon-192x192.png'))
print("✅ Created icon-192x192.png")

# 512x512
icon_512 = create_icon(512)
icon_512.save(os.path.join(icons_dir, 'icon-512x512.png'))
print("✅ Created icon-512x512.png")

# 180x180 for Apple
icon_180 = create_icon(180)
icon_180.save(os.path.join(icons_dir, 'apple-touch-icon.png'))
print("✅ Created apple-touch-icon.png")

print("\n🎉 All PWA icons created successfully!")
print(f"📁 Icons saved to: {icons_dir}")
