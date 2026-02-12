#!/bin/bash

# Script to remove audio from all video files
# This creates new files without audio tracks, preserving video quality

set -e  # Exit on error

VIDEO_DIR="./public/images/videos"
TEMP_DIR="./public/images/videos/temp"

# Check if ffmpeg is installed
if ! command -v ffmpeg &> /dev/null; then
    echo "❌ Error: ffmpeg is not installed"
    echo "Install it with: sudo apt-get install ffmpeg"
    exit 1
fi

echo "🎬 Starting audio removal from videos..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Create temp directory
mkdir -p "$TEMP_DIR"

# Counter for processed files
processed=0
failed=0

# Process each MP4 file
for video in "$VIDEO_DIR"/*.mp4; do
    if [ -f "$video" ]; then
        filename=$(basename "$video")
        temp_output="$TEMP_DIR/$filename"
        
        echo ""
        echo "📹 Processing: $filename"
        
        # Remove audio track using ffmpeg
        # -i: input file
        # -c:v copy: copy video stream without re-encoding (fast, no quality loss)
        # -an: remove all audio streams
        if ffmpeg -i "$video" -c:v copy -an "$temp_output" -y -loglevel error; then
            # Replace original with processed version
            mv "$temp_output" "$video"
            echo "   ✅ Success: Audio removed from $filename"
            ((processed++))
        else
            echo "   ❌ Failed: Could not process $filename"
            ((failed++))
        fi
    fi
done

# Cleanup temp directory
rmdir "$TEMP_DIR" 2>/dev/null || true

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✨ Processing complete!"
echo "   ✅ Successfully processed: $processed videos"
if [ $failed -gt 0 ]; then
    echo "   ❌ Failed: $failed videos"
fi
echo ""
echo "All videos now have their audio tracks removed."

