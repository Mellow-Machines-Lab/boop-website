/*
  All user-facing copy lives here. The source of truth for every claim is the
  README of Mellow-Machines-Lab/buddygotchi: if the product changes, change
  this file to match it.

  Copy rules (enforced by tests/copy-rules.test.mjs):
    - No hype words and no exclamation marks.
    - No em dashes. Use commas, colons or full stops.
    - Sentence case. Short, plain sentences that say what Boop does.
    - An adult desk gadget for developers. A waitlist with no ship date.
    - Boop only watches. It never decides anything for an agent.
*/

export const REPO_URL = "https://github.com/Mellow-Machines-Lab/buddygotchi";

export const copy = {
  meta: {
    title: "Boop, the desk pet that watches your AI agents",
    description:
      "Boop is a little gel slime on a screen beside your Mac. It says good morning, works along with Claude Code and Codex, and tells you when one finishes or needs you. Join the waitlist for a ready-made one.",
    ogAlt: "Boop, a glossy blue gel slime with a closed-eye smile, on a peach background",
  },

  brand: {
    wordmark: "Boop",
    maker: "Mellow Machines Lab",
    byline: "a desk pet from Mellow Machines Lab",
  },

  hero: {
    headline: "Meet Boop, the desk pet that watches your AI agents.",
    subhead:
      "Boop lives on a little screen beside your Mac. It says good morning, keeps Claude Code and Codex company while they work, and shows you what they finished.",
    ctaLabel: "Join the waitlist",
    placeholder: "you@where-you-code.com",
    small: "Be first to know when you can get one. One email, no spam.",
    scribble: "the real screen, watch-face sized",
    screenAlt:
      "Boop's real screen: the blue gel slime wakes up and greets you, leans in for a stroke and purrs, then types along with an agent and holds up a sign with the name of the work it finished",
    filmAlt: "Boop on a desk beside a Mac",
  },

  day: {
    heading: "A day with Boop",
    intro: "Every clip is Boop's real screen.",
    moments: [
      {
        id: "hello",
        media: "moment-hello",
        title: "Says good morning.",
        body: "Sit down at your desk and Boop wakes up, glad you came back.",
        alt: "Boop wakes up and smiles, with a note that you were away ten hours",
      },
      {
        id: "works",
        media: "moment-works",
        title: "Shows what your agent is doing.",
        body: "Reading, searching, editing, running the tests. The current step is always under its face.",
        alt: "Boop at a tiny desk, typing, while the line under it changes from reading to searching to editing to running the tests",
      },
      {
        id: "agents",
        media: "moment-agents",
        title: "Keeps track of all of them.",
        body: "Each agent gets its own colour. Swipe to follow a different one.",
        alt: "Three coloured marks under Boop, one for each agent, and a pill that says the settings agent finished",
      },
      {
        id: "needs-you",
        media: "moment-needs-you",
        title: "Knocks when one needs you.",
        body: "The screen turns amber and names the agent that is waiting, so you can stop checking terminals.",
        alt: "An amber sign over Boop says needs you, a yes or no, and names the agent and project",
        amber: true,
      },
      {
        id: "celebrates",
        media: "moment-celebrates",
        title: "Celebrates the big finishes.",
        body: "A quick fix gets a small hop. A long job that finally passes gets the gold treatment.",
        alt: "Gold rays and confetti behind a beaming Boop under a trophy, with the finished work named below",
      },
      {
        id: "grumbles",
        media: "moment-grumbles",
        title: "Takes failed tests personally.",
        body: "It grumbles at the test. Never at you.",
        alt: "Boop frowning inside a red rim, with the failed work named below",
      },
      {
        id: "pet",
        media: "moment-pet",
        title: "Asks for a pet.",
        body: "Stroke the screen and it purrs. Leave it waiting and it sulks.",
        alt: "Boop leans in with a spot marked pet, then squints happily with hearts as it is stroked",
      },
      {
        id: "sleepy",
        media: "moment-sleepy",
        title: "Gets sleepy at night.",
        body: "It dozes off, dreams about your day, and tells you about it in the morning.",
        alt: "Boop with heavy eyelids, then asleep",
      },
    ],
  },

  mac: {
    heading: "On your Mac, every agent at a glance.",
    body: "Boop comes with a menu-bar app. It lists every Claude Code and Codex session, what each one is doing, and which ones are waiting for you. Press the button on Boop and your Mac opens the agent that needs you.",
    facts: [
      { label: "Works with", value: "Claude Code and Codex" },
      { label: "Screen", value: "2.06 inch AMOLED touch screen" },
      { label: "Power", value: "USB-C, always plugged in" },
      { label: "Connects over", value: "Bluetooth or USB" },
    ],
    watchOnly: "Boop only watches. It never approves, denies or blocks anything an agent does.",
    popoverAlt:
      "Boop's menu-bar popover on the Mac: an amber card says Codex is asking for a yes or no, with a button to open it, above a list of Claude Code and Codex agents and what each one is doing",
    popoverCaption: "The menu-bar app. Yes, that is Boop in the corner.",
  },

  moods: {
    heading: "It has moods, and they last.",
    body: "A good day makes it proud. A string of failed tests makes it cross, and it stays cross for a while. There is no reset button.",
    faces: [
      { id: "excited", label: "excited" },
      { id: "proud", label: "proud" },
      { id: "curious", label: "curious" },
      { id: "calm", label: "calm" },
      { id: "focused", label: "focused" },
      { id: "grumpy", label: "grumpy" },
      { id: "sad", label: "sad" },
      { id: "wounded", label: "wounded" },
    ],
    faceAltTemplate: "Boop's {mood} face",
  },

  flavors: {
    heading: "Boop is the first.",
    body: "We make little desk pets for people who work with AI agents. Boop, the gel slime, came first: overconfident, theatrical, easily wounded, and always on your side. More characters are on the way.",
    scribble: "not telling yet",
    firstLabel: "no. 1: Boop",
    silhouetteAlt: "A desk pet that does not exist yet",
  },

  offer: {
    heading: "What you get",
    items: [
      {
        title: "A ready-made Boop",
        body: "The board, set up and in its shell. Plug in USB-C, open the Mac app, and say hello.",
      },
      {
        title: "Yours to keep, and to hack",
        body: "Pay once. There is no subscription and no account, and the software is free and open source.",
      },
    ],
  },

  faqHeading: "Questions",

  faq: [
    {
      q: "When can I get one?",
      a: "There is no date yet, and we will not promise one we might miss. Join the waitlist and you get one email when ready-made Boops are available.",
    },
    {
      q: "Is there a subscription?",
      a: "No. You pay once for the hardware. The software is free.",
    },
    {
      q: "Does it see my code?",
      a: "No. Boop sees activity, not source: a test ran, an agent is waiting. Your code, files, commands and prompts stay on your Mac. Boop can share its name and a few counts with other Boops in a weekly league, and you can turn that off.",
    },
    {
      q: "Does it approve things for me?",
      a: "No. Boop only watches. When an agent needs your approval, Boop tells you which one, and you answer on your Mac as usual.",
    },
    {
      q: "What do I need?",
      a: "A Mac with macOS 14 or later, and Claude Code or Codex.",
    },
    {
      q: "Can I build my own?",
      a: "Yes. The software is open source under the MIT licence. Buy the board, clone the repository and run make flash.",
      link: { label: "The repository on GitHub", url: REPO_URL },
    },
  ],

  footer: {
    heading: "Want one on your desk?",
    body: "Join the waitlist and be first to know when you can get one.",
    ctaLabel: "Join the waitlist",
    placeholder: "you@where-you-code.com",
    // Rendered only when url is non-empty.
    followBuild: { label: "follow the build", url: "" },
    signoff: "Made by people who also forgot a task finished 40 minutes ago.",
    source: "source",
    help: "help",
    privacy: "privacy",
    contact: "contact",
    // LAUNCH BLOCKER: hello@adoptaboop.com is not a working inbox yet. Set it
    // up (and the Resend sending domain) before this page gets real traffic.
    contactEmail: "hello@adoptaboop.com",
    copyright: "© 2026 Mellow Machines Lab",
  },

  form: {
    emailLabel: "Email address",
    loading: "Joining",
    error: "Something hiccuped. Try once more?",
  },

  welcome: {
    title: "You're on the list",
    heading: "You're on the list.",
    subline:
      "Boop is pleased, and is pretending it was never worried. You get one email when a ready-made Boop is available.",
    avatarAlt: "Boop, smiling with its eyes closed",
    survey: {
      label: "two quick questions, both optional",
      thanks: "Noted. Boop is taking the credit.",
      submitLabel: "Send",
      video: {
        question: "Which video brought you here?",
        placeholder: "describe it or paste the link",
      },
      price: {
        question: "What would you honestly expect a ready-made Boop to cost?",
        placeholder: "your honest number",
      },
    },
    backHome: "back to Boop",
  },

  privacy: {
    title: "Privacy",
    heading: "The short, honest version.",
    sections: [
      {
        heading: "This website",
        paragraphs: [
          "When you join the waitlist we store your email address, the page section you signed up from, and how you found us: the campaign tags in the link you followed (for example utm_source=tiktok) and the site that referred you. If you answer the optional questions, we store those answers with your signup.",
          "We keep this in a Postgres database hosted by Neon. We send the confirmation email through Resend. We use your address to email you about the waitlist, and for little else.",
          "A first-party cookie remembers the campaign tags from your first visit for 30 days, so a later signup is counted for the right link.",
          "To slow down abuse of the form, we keep a scrambled copy of your IP address and a count of recent attempts. We delete these within a day.",
        ],
      },
      {
        heading: "Analytics and ads",
        paragraphs: [
          "We use Vercel Web Analytics to count page views and a few events, such as a signup. It does not use cookies and does not follow you across other sites.",
          "When we run TikTok ads, this site also loads the TikTok Pixel. It tells TikTok that a page was viewed and that a signup happened, so we can see which videos work. TikTok may set its own cookies when it does. We do not send your email address to TikTok.",
          "Nothing is sold or rented. You can unsubscribe from any email, and we will delete your address if you ask.",
        ],
      },
      {
        heading: "The Boop app",
        paragraphs: [
          "The Boop app is separate from this website, and this site's analytics are not in it. The app runs on your Mac and reads activity from your agents, not your source code.",
          "The app can share your buddy's name and a few counts with other Boops, and it sends a short summary to the optional Jev model only if you add a key. The repository's README lists exactly what leaves your Mac.",
        ],
      },
    ],
    readmeLink: { label: "What leaves your Mac, in full", url: `${REPO_URL}#what-leaves-your-mac` },
    backHome: "back to Boop",
  },

  help: {
    title: "Help",
    heading: "When something's off.",
    intro:
      "Boop is open source, and the repository is the best place for help. This page covers the basics.",
    hooks: {
      heading: "What the hooks do",
      items: [
        "Hooks in Claude Code and Codex tell Boop when a session starts, a prompt goes in, a tool runs and work finishes.",
        "Hooks only report. Boop never approves, denies or blocks anything an agent does.",
        "Hooks fail open. If Boop is not running, your agent behaves as it always does.",
        "Restart open agent sessions after you install Boop, so they pick up the hooks.",
      ],
    },
    board: {
      heading: "The board",
      items: [
        "The board is powered over USB-C and stays plugged in.",
        "It talks to your Mac over Bluetooth or USB. If it does not connect, use a USB cable that carries data.",
        "Tap the screen to poke Boop. Press its button while an agent waits and your Mac opens that agent.",
        "To put the firmware on again, follow the flashing steps.",
      ],
      flashLink: "flashing steps",
    },
    uninstall: {
      heading: "Uninstall",
      body: "In Boop's Settings, under App, choose Uninstall. Boop removes its own hook entries and leaves the rest of your agent settings alone.",
    },
    more: {
      heading: "Everything else",
      body: "The README has setup, everyday commands and a full list of what leaves your Mac. If something is broken, open an issue.",
      readme: { label: "Read the README", url: `${REPO_URL}#readme` },
      issues: { label: "Open an issue", url: `${REPO_URL}/issues` },
    },
    contact: "Or write to",
    backHome: "back to Boop",
  },

  flash: {
    title: "Flash a board",
    heading: "Flash a board yourself.",
    intro:
      "You do not need to buy anything from us. Boop's firmware is open source, and it runs on a Waveshare ESP32-S3-Touch-AMOLED-2.06 board.",
    steps: [
      {
        title: "Clone the repository.",
        code: "git clone --recurse-submodules https://github.com/Mellow-Machines-Lab/buddygotchi.git && cd buddygotchi",
      },
      {
        title: "Plug the board in over USB and flash it.",
        code: "make flash",
        note: "The first run installs the toolchain inside the checkout. It takes a few minutes.",
      },
      {
        title: "Build the Mac app and open it.",
        code: "make bundle && open .build/Boop.app",
        note: "Boop walks you through the rest and connects your agents.",
      },
    ],
    needs: "You need a Mac with macOS 14 or later and Command Line Tools. The README has the full list.",
    readme: { label: "The full guide on GitHub", url: `${REPO_URL}#get-started` },
    helpLink: "need help?",
    backHome: "back to Boop",
  },
} as const;

export type Copy = typeof copy;
