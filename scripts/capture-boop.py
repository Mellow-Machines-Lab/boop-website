"""Records Boop's real screen as full-colour PNG frames, for public/media.

It plays wire messages on buddygotchi's native simulator, which is the
firmware's own drawing run on the Mac, on a frozen clock, and takes a
screenshot every 80 ms. This is how buddygotchi's README pictures are made
(internal/tools/mediagen), but every colour is kept: the README GIFs are cut to
96 colours, which bands the gel.

Every message below is one the Mac app really sends. They are copied from the
gel slime's recorded demos (characters/boop/demo/recordings/*.json), with plain
project names. If the firmware changes how something looks, run this again. If
it changes the messages, copy the new ones from the recordings.

Run it from a buddygotchi checkout whose simulator is built (`make -C internal
build`, or `boopctl sim`), then encode with capture-boop.sh:

    cd ~/src/buddygotchi
    internal/tools/.venv/bin/python ~/src/boop-website/scripts/capture-boop.py OUT_DIR [CLIP ...]

It writes OUT_DIR/<clip>/0000.png, 0001.png, ... at 12.5 frames a second.
"""
import sys
from pathlib import Path

sys.path.insert(0, str(Path.cwd() / "internal" / "tools" / "mediagen"))
sys.path.insert(0, str(Path.cwd() / "internal" / "tools"))

import mediagen  # noqa: E402
from mediagen import SIM_PROGRAM, Sim, to_image  # noqa: E402

STEP_MS = 80
DAY = {"vol": 6, "when": ["day"]}
MORNING = {"vol": 6, "when": ["morning"], "energy": "bright"}


def state(base, mood="calm", busy=0, **more):
    return {"t": "state", "base": base, "mood": mood, "busy": busy, **DAY, **more}


def do(ident, name, play="next", **args):
    return {"t": "do", "id": ident, "name": name, "play": play, "ttl": 15000, "args": args}


def finish(ident, thread, mood, loops, **more):
    """A turn's end. loops is its size: 1 Little Win, 2 Confetti, 3 Gold Rush."""
    return do(ident, "task_complete", outcome="success", turn=ident, xp=5,
              who={"agent": "claude", "thread": thread}, say={}, mood=mood, loops=loops, **more)


def working(words, act="tool_use", mood="calm", **more):
    """One agent at work, with what its newest call is doing in the strip."""
    return state("working", mood, 1, act=act, calls=[[0, working.n, words]], **more)


working.n = 0

# A stroke across the face, and a tap on it, as a finger would do them.
STROKE = {"t": "dbg.touch", "x": 150, "y": 190, "to_x": 350, "to_y": 190, "ms": 700}
TAP = {"t": "dbg.touch", "x": 251, "y": 200, "ms": 120}
# Boop leans in and asks for a stroke; the board shows where to touch.
PET = {"skit": "back", "pose": "lean", "touch": "stroke", "payoff": "purr", "label": "pet", "ms": 12000}


def calls(n, words):
    return [[0, n, words]]


CLIPS = {
    # The hero loop (boop-day) is three of these joined by capture-boop.sh:
    # moment-hello, moment-pet and moment-sign.
    "moment-hello": [
        (0, {**state("asleep"), **MORNING}),
        (400, {**state("asleep", "happy", idle=1), **MORNING}),
        (400, do(1, "wake_up", reason="you were away 10 h", greeting=True, say={}, mood="happy", loops=2)),
        (5600, None),
    ],
    # What the agent is doing, in the strip under its face.
    "moment-works": [
        (0, state("working", busy=1)),
        (400, state("working", busy=1, act="analyzing", calls=calls(1, "reading"))),
        (2000, state("working", busy=1, act="analyzing", calls=calls(2, "searching"))),
        (3600, state("working", busy=1, act="tool_use", calls=calls(3, "editing +12"))),
        (5200, state("working", busy=1, act="terminal", calls=calls(4, "running the tests"))),
        (7200, None),
    ],
    # Three agents at once: a mark for each, the one it follows named, and news
    # from another in its own colour.
    "moment-agents": [
        (0, state("working", busy=1)),
        (600, state("working", busy=2, pips="w0w1", watch=1, who="changelog")),
        (1600, state("working", busy=3, pips="w0w1w2", watch=2, who="build-time")),
        (2600, state("working", busy=3, act="tool_use", pips="w0w1w2", watch=2, who="build-time",
                     calls=[[2, 1, "building"]])),
        (4600, state("working", busy=2, idle=1, act="tool_use", pips="w1w2a0", watch=1, who="changelog",
                     pill=[0, "settings finished"], calls=[[1, 1, "editing +4"]])),
        (7600, None),
    ],
    "moment-needs-you": [
        (0, state("working", busy=1, act="terminal", calls=calls(1, "installing packages"))),
        (1000, state("idle", attn={"agent": "claude", "project": "database", "more": 0, "id": 7,
                                   "kind": "approve"})),
        (5000, None),
    ],
    # The biggest finish: a long turn that worked in the end.
    "moment-celebrates": [
        (0, state("working", "focused", 1, act="terminal", calls=calls(1, "running the tests"))),
        (600, state("idle", "focused", idle=1)),
        (600, do(1, "call", a=0, w="done", **{"as": "gather"})),
        (900, finish(2, "search-index", "excited", 3)),
        (900, state("idle", "happy", idle=1)),
        (7400, None),
    ],
    "moment-grumbles": [
        (0, state("working", "focused", 1, act="terminal", calls=calls(1, "running the tests"))),
        (1200, state("idle", "grumpy")),
        (1200, do(1, "task_complete", outcome="failure", turn=1, who={"agent": "claude", "thread": "checkout"},
                  say={}, mood="grumpy", loops=1)),
        (6000, None),
    ],
    # It asks for a stroke, and gets one.
    "moment-pet": [
        (0, state("idle", "happy", idle=1)),
        (300, do(1, "react", reason="", invite=PET, say={}, mood="happy", loops=1)),
        (3400, STROKE),
        (7600, None),
    ],
    # An agent finishes, and Boop holds up what it did.
    "moment-sign": [
        (0, state("working", "happy", 1, act="tool_use", calls=calls(1, "editing +12"))),
        (1600, state("working", "happy", 1, act="terminal", calls=calls(2, "running the tests"))),
        (3200, state("idle", "happy", idle=1)),
        (3200, do(1, "call", a=0, w="done", **{"as": "gather"})),
        (3500, finish(2, "fix-login", "proud", 2)),
        (9600, None),
    ],
    # A wave from another Boop, somewhere in the world.
    "moment-world": [
        (0, state("idle", "calm", idle=1)),
        (500, do(1, "react", sign="hi, friend!", reason="Boop got a wave", say={}, mood="happy", loops=1)),
        (5200, None),
    ],
    # It asks you something, you tap an answer, and it keeps it. Days later
    # it brings the answer up again.
    "moment-remembers": [
        (0, state("idle", "calm", idle=1)),
        (400, do(1, "react", sign="fav snack?", ask={"q": "snack", "a": "cookie", "b": "pizza"}, say={},
                 mood="curious", loops=1)),
        (4200, {"t": "dbg.touch", "x": 190, "y": 385, "ms": 120}),
        (4500, do(2, "react", sign="nom nom", reason="Boop will remember", say={}, mood="happy", loops=1)),
        (8200, {**state("idle", "calm", idle=1), "when": ["morning"], "energy": "bright"}),
        (8500, do(3, "react", sign="snack time?", say={}, mood="happy", loops=1)),
        (12600, None),
    ],
    # Sleepy at night: heavy lids, then it dozes off.
    "moment-sleepy": [
        (0, {**state("idle"), "when": ["night"], "energy": "tired"}),
        (3200, {**state("asleep"), "when": ["night"]}),
        (6000, None),
    ],
}
for mood in mediagen.MOODS:
    CLIPS[f"mood-{mood}"] = [
        (0, state("idle", mood)),
        (400, do(5, "react", play="now", mood=mood, loops=3)),
        (4400, None),
    ]


def record(steps):
    frames = []
    with Sim(str(SIM_PROGRAM)) as sim:
        sim.request({"t": "dbg.reset"})
        i = 0
        for t in range(0, steps[-1][0], STEP_MS):
            while i < len(steps) and steps[i][0] <= t:
                message = steps[i][1]
                if message:
                    (sim.request if message["t"].startswith("dbg.") else sim.send)(message)
                i += 1
            sim.request({"t": "dbg.clock", "freeze": t})
            frames.append(to_image(sim.shot()).convert("RGB"))
    return frames


out = Path(sys.argv[1])
only = set(sys.argv[2:])
for name, steps in CLIPS.items():
    if only and name not in only:
        continue
    frames = record(steps)
    (out / name).mkdir(parents=True, exist_ok=True)
    for old in (out / name).glob("*.png"):
        old.unlink()
    for i, frame in enumerate(frames):
        frame.save(out / name / f"{i:04d}.png")
    print(f"{name}: {len(frames)} frames, {frames[0].size[0]}x{frames[0].size[1]}")
