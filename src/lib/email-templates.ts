// GENERATED: edit emails/*.md then `npm run emails:build`

export const EMAIL_TEMPLATES = {
  "waitlist-confirmation": {
    "id": "waitlist-confirmation",
    "subject": "You're on the Boop waitlist",
    "from": "Boop <hello@adoptaboop.com>",
    "replyTo": "hello@adoptaboop.com",
    "trigger": "first successful waitlist signup (src/app/api/waitlist/route.ts)",
    "placeholders": [
      "position"
    ],
    "heading": "You're on the list.",
    "subline": "Boop is pleased, and is pretending it was never worried.",
    "body": "You'll get one email when a ready-made Boop is available. We won't promise a date we might miss, so until then this is the last thing we send.\n\nBoop is a little desk pet that keeps an eye on your AI coding agents. The software is free and open source, and there is no subscription.\n\nIf you change your mind, reply to this email and we'll take you off the list and delete your address, no questions asked.\n\nBoop, from Mellow Machines Lab\nadoptaboop.com\n"
  },
};

export const WAITLIST_CONFIRMATION_TEMPLATE = EMAIL_TEMPLATES["waitlist-confirmation"];
