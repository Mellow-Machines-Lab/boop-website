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

encode moment-naps 0010
encode moment-works 0020
encode moment-needs-you 0040
encode moment-celebrates 0030
encode moment-grumbles 0040
encode moment-sleepy 0030
for clip in "$frames"/mood-*/; do encode "$(basename "$clip")" 0020; done

# The hero: needs you, a big finish, a nap, back to work.
list=$(mktemp)
for clip in moment-needs-you moment-celebrates moment-naps moment-works; do
  echo "file '$media/$clip.mp4'" >> "$list"
done
ffmpeg -v error -y -f concat -safe 0 -i "$list" -c copy -movflags +faststart "$media/boop-day.mp4"
cp "$media/moment-needs-you.webp" "$media/boop-day.webp"
rm -f "$list"
