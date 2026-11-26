#!/bin/sh
# Encodes the frames from capture-boop.py into public/media: a muted MP4 loop
# and a WebP poster for each clip, and the hero's boop-day loop.
#
#   scripts/capture-boop.sh FRAMES_DIR
#
# Needs ffmpeg and cwebp. The poster is the frame given after the clip's name.
set -eu
frames=$1
media=$(cd "$(dirname "$0")/.." && pwd)/public/media

encode() { # clip poster-frame
  ffmpeg -v error -y -framerate 12.5 -i "$frames/$1/%04d.png" \
    -vf "format=yuv420p" -c:v libx264 -crf 20 -preset veryslow -movflags +faststart -an "$media/$1.mp4"
  cwebp -quiet -q 90 "$frames/$1/$2.png" -o "$media/$1.webp"
}

encode moment-hello 0030
encode moment-works 0045
encode moment-agents 0040
encode moment-needs-you 0040
encode moment-celebrates 0030
encode moment-grumbles 0040
encode moment-pet 0060
encode moment-world 0020
encode moment-remembers 0030
encode moment-sign 0070
encode moment-sleepy 0030
for clip in "$frames"/mood-*/; do encode "$(basename "$clip")" 0020; done

# The hero: good morning, a stroke, then what the agent finished.
list=$(mktemp)
for clip in moment-hello moment-pet moment-sign; do
  echo "file '$media/$clip.mp4'" >> "$list"
done
ffmpeg -v error -y -f concat -safe 0 -i "$list" -c copy -movflags +faststart "$media/boop-day.mp4"
cp "$media/moment-hello.webp" "$media/boop-day.webp"
# moment-sign is only used inside the hero loop.
rm -f "$list" "$media/moment-sign.mp4" "$media/moment-sign.webp"
