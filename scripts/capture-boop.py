"""Records Boop's real screen as true-colour PNG frames, for public/media.

It plays wire messages on buddygotchi's native simulator (the firmware's own
drawing, run on the Mac) exactly as buddygotchi's README pictures are made
(internal/tools/mediagen), but keeps every colour: the README GIFs are cut to
96 colours, which bands the gel.

Run it with buddygotchi's tool environment, then encode with capture-boop.sh:

    cd ~/src/buddygotchi
    internal/tools/.venv/bin/python ~/src/boop-website/scripts/capture-boop.py OUT_DIR

It writes OUT_DIR/<clip>/0000.png, 0001.png, ... at 12.5 frames a second.
"""
import sys
from pathlib import Path

BUDDYGOTCHI = Path.cwd()
sys.path.insert(0, str(BUDDYGOTCHI / "internal" / "tools" / "mediagen"))
sys.path.insert(0, str(BUDDYGOTCHI / "internal" / "tools"))

import mediagen  # noqa: E402

out = Path(sys.argv[1])
ATTN = {"agent": "claude", "project": "landing", "more": 0}
WHO = {"agent": "claude", "thread": "fix-nav"}

CLIPS = {
    # The same story as the README's boop.gif, one clip for each beat.
    "moment-naps": [(0, {"t": "state", "base": "asleep", "busy": 0}), (4000, None)],
    "moment-works": [
        (0, {"t": "state", "base": "working", "act": "terminal", "mood": "calm", "busy": 1, "variant": 1}),
        (4800, None),
    ],
    "moment-needs-you": [
        (0, {"t": "state", "base": "working", "act": "terminal", "mood": "calm", "busy": 1, "variant": 1}),
        (800, {"t": "state", "base": "working", "attn": ATTN, "busy": 1}),
        (4800, None),
    ],
    "moment-celebrates": [
        (0, {"t": "state", "base": "idle", "mood": "happy", "busy": 0}),
        (0, {"t": "do", "id": 11, "name": "task_complete", "play": "now",
             "args": {"outcome": "success", "variant": 1, "mood": "excited", "loops": 1, "who": WHO}}),
        (6000, None),
    ],
    "moment-grumbles": [
        (0, {"t": "state", "base": "working", "act": "testing", "mood": mediagen.WORKING_FACE, "busy": 1,
             "variant": 1}),
        (1200, {"t": "state", "base": "idle", "mood": "grumpy", "busy": 0}),
        (1200, {"t": "do", "id": 12, "name": "task_complete", "play": "now",
                "args": {"outcome": "failure", "variant": 1, "mood": "grumpy", "loops": 1, "who": WHO}}),
        (6000, None),
    ],
    # Sleepy at night: heavy lids (energy "tired"), then it dozes off.
    "moment-sleepy": [
        (0, {"t": "state", "base": "idle", "mood": "calm", "busy": 0, "energy": "tired"}),
        (3200, {"t": "state", "base": "asleep", "busy": 0}),
        (6000, None),
    ],
}
for mood in mediagen.MOODS:
    CLIPS[f"mood-{mood}"] = [
        (0, {"t": "state", "base": "idle", "mood": mood, "busy": 0}),
        (400, {"t": "do", "id": 5, "name": "react", "play": "now", "args": {"mood": mood, "loops": 3}}),
        (4400, None),
    ]

only = set(sys.argv[2:])
for name, steps in CLIPS.items():
    if only and name not in only:
        continue
    frames = mediagen.record(steps)
    (out / name).mkdir(parents=True, exist_ok=True)
    for i, frame in enumerate(frames):
        frame.save(out / name / f"{i:04d}.png")
    print(f"{name}: {len(frames)} frames, {frames[0].size[0]}x{frames[0].size[1]}")
