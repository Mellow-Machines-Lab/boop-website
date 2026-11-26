/*
  All user-facing copy lives here. The source of truth for every claim is the
  README of Mellow-Machines-Lab/buddygotchi: if the product changes, change
  this file to match it.

  Copy rules (enforced by tests/copy-rules.test.mjs):
    - No hype words and no exclamation marks.
    - No em dashes. Use commas, colons or full stops.
    - Sentence case. Boop's own captions are lower case, like its screen.
    - An adult desk gadget for developers. A waitlist with no ship date.
    - Boop only watches. It never decides anything for an agent.
*/

export const REPO_URL = "https://github.com/Mellow-Machines-Lab/buddygotchi";

export const copy = {
  meta: {
    title: "Boop, a little desk pet that watches your AI agents",
    description:
      "Boop is a gel slime on a small screen beside your Mac. It naps while nothing runs, works along with Claude Code and Codex, and knocks when one of them needs you. Free, open-source software. Join the waitlist for a ready-made one.",
    ogAlt: "Boop, a glossy blue gel slime with a closed-eye smile, on a peach background",
  },

  brand: {
    wordmark: "Boop",
    maker: "Mellow Machines Lab",
    byline: "a desk pet from Mellow Machines Lab",
  },

  hero: {
    headline: "A little desk pet that keeps an eye on your AI agents.",
    subhead:
      "Boop is a gel slime that lives on a small screen beside your Mac. It naps while nothing runs, works along while your agents work, and knocks when one of them needs you.",
    ctaLabel: "Join the waitlist",
    placeholder: "you@where-you-code.com",
    small: "One email when a ready-made Boop is available. No date yet, and no spam.",
    scribble: "the real screen, watch-face sized",
    screenAlt:
      "Boop's real screen: the blue gel slime under an amber sign that says an agent needs you, then celebrating a finish, napping, and typing along at its tiny desk",
    filmAlt: "Boop on a desk beside a Mac",
  },

  day: {
    heading: "A day with Boop",
    intro: "These are captures of the real screen. The captions are Boop's own view of events.",
    moments: [
      {
        id: "naps",
        media: "moment-naps",
        title: "It naps while no agent is open.",
        voice: "nothing is running. it would like you to know that was its idea.",
        alt: "Boop asleep on a dark screen, eyes closed",
      },
      {
        id: "works",
        media: "moment-works",
        title: "It works along while your agents work.",
        voice: "claude is typing, so it is typing. it expects to be credited.",
        alt: "Boop at a tiny desk with a monitor and keyboard, typing along",
      },
      {
        id: "needs-you",
        media: "moment-needs-you",
        title: "It lights up amber and knocks when one needs you.",
        voice: "claude is waiting on you. it will keep knocking. it has all day.",
        alt: "An amber sign over Boop reads: needs you, continue on your Mac. Below it, the agent and project are named",
        amber: true,
      },
      {
        id: "celebrates",
        media: "moment-celebrates",
        title: "It celebrates a finish that earns it.",
        voice: "a big finish. it did none of the work and it has never been prouder.",
        alt: "Boop beaming under a trophy, with the finished thread named below it",
      },
      {
        id: "grumbles",
        media: "mood-grumpy",
        title: "It grumbles at a failed test. Never at you.",
        voice: "it saw the test fail. it is choosing to be brave about it.",
        alt: "Boop with a small frown and slanted brows",
      },
      {
        id: "dreams",
        media: "mood-tired",
        title: "It gets sleepy at night, and dreams about your day.",
        voice: "it will tell you the dream when you come back. it was mostly about tests.",
        alt: "Boop with heavy eyelids and a small yawn",
      },
    ],
  },

  how: {
    heading: "How it works",
    steps: [
      {
        title: "The Mac app watches your agents.",
        body: "A menu-bar app listens to hooks from Claude Code and Codex. The hooks only report what is happening. If Boop is not running, your agents carry on as normal.",
      },
      {
        title: "The board shows you.",
        body: "A 2.06 inch AMOLED touch screen on an ESP32 board. It plugs into USB-C for power and talks to your Mac over Bluetooth or USB.",
      },
      {
        title: "Tap or press to jump.",
        body: "Under its face, Boop counts who is done. Press its button and your Mac opens the agent that needs you first, then the one that finished last. Tap its face and it pokes back.",
      },
    ],
    watchOnly:
      "Boop only watches. It never approves, denies or blocks anything an agent does.",
    popoverAlt:
      "Boop's menu-bar popover on the Mac: a card says Codex is waiting for you, above a list of Claude Code and Codex sessions and what each one is doing",
    popoverCaption: "The menu-bar popover on the Mac. Every session, and who is waiting.",
  },

  moods: {
    heading: "It has feelings, and it remembers.",
    body: "Boop has lasting moods: calm, happy, focused, proud, cross, sad and lonely. A rough afternoon leaves it cross for a while. A kind word helps. There is no reset button.",
    faces: [
      { id: "excited", label: "excited" },
      { id: "proud", label: "proud" },
      { id: "curious", label: "curious" },
      { id: "calm", label: "calm" },
      { id: "grumpy", label: "grumpy" },
      { id: "sad", label: "sad" },
      { id: "tired", label: "tired" },
      { id: "wounded", label: "wounded" },
    ],
    faceAltTemplate: "Boop's {mood} face",
    scribble: "easily wounded. always on your side.",
  },

  flavors: {
    heading: "Boop is the first.",
    body: "We make little desk pets for people who work with AI agents. The gel slime came first: overconfident, theatrical and easily wounded. More characters will follow when they are ready. We will not name one before it is.",
    open: "The software is free and open source, so you can also make a character of your own.",
    scribble: "not telling yet",
    silhouetteAlt: "Outlines of desk pets that do not exist yet",
  },

  offer: {
    heading: "What you would get",
    items: [
      {
        title: "A ready-made Boop",
        body: "A flashed board in a shell. Plug it into USB-C, open the Mac app, and it finds its body.",
      },
      {
        title: "No subscription, no account",
        body: "The software is free and stays MIT licensed. You pay once for the hardware and nothing after.",
      },
      {
        title: "A brain that works alone",
        body: "Boop's own rules pick its reactions on your Mac. A small hosted model called Jev can pick them instead if you add a key. Nothing is required.",
      },
    ],
  },

  faq: [
    {
      q: "Is it a subscription?",
      a: "No. There is no subscription and no account. The software is free and open source.",
    },
    {
      q: "Does it touch my code?",
      a: "No. It sees activity, not source: that a test ran, that an agent is waiting. Your code, files, commands and prompts stay on your Mac. Boop can share its name and a few counts with other Boops in a weekly league, and you can turn that off.",
    },
    {
      q: "Does it approve things for me?",
      a: "No. It only watches. When an agent needs your approval, Boop tells you which one, and you answer on your Mac as usual.",
    },
    {
      q: "Mac only?",
      a: "For now. It needs macOS 14 or later, and it works with Claude Code and Codex.",
    },
    {
      q: "Can I build my own?",
      a: "Yes. The software is open source under the MIT licence. Buy the board, clone the repository and run make flash.",
      link: { label: "The repository on GitHub", url: REPO_URL },
    },
    {
      q: "When does it ship?",
      a: "There is no date yet, and we will not promise one we might miss. Join the waitlist and you get one email when a ready-made Boop is available.",
    },
  ],

  footer: {
    heading: "Want one on your desk?",
    body: "Leave your email. You get one message when a ready-made Boop is available.",
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
