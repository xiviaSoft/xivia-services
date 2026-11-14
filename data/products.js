export const products = [
  {
    slug: "flagwhiz",
    name: "FlagWhiz",
    tagline: "Geography Quiz: Guess flags of the world",
    category: "Mobile Game",
    platform: "Android",
    ratingLabel: "Everyone",
    developer: "XiviaSoft",
    icon: "/images/flagwhiz-icon.webp",
    coverImage: "/images/flagwhiz-icon.webp",
    bannerImage: "/images/flagwhiz-banner.jpg",
    deviceImage: "/images/flagwhiz-device.jpg",
    worldImage: "/images/flagwhiz-world.svg",
    gallery: [
      {
        title: "Classic",
        caption: "Learn every flag at your pace",
        emoji: "🧭",
        accent: "linear-gradient(160deg, #dff3f7, #e8f7f1)",
      },
      {
        title: "Time Attack",
        caption: "Beat the clock, climb ranks",
        emoji: "⚡",
        accent: "linear-gradient(160deg, #d7eef8, #cfe8e2)",
      },
      {
        title: "Challenge",
        caption: "Harder rounds for elites",
        emoji: "🎯",
        accent: "linear-gradient(160deg, #e4f4ef, #d5eaf4)",
      },
      {
        title: "Leaderboard",
        caption: "Compete across the globe",
        emoji: "🏅",
        accent: "linear-gradient(160deg, #eaf6fb, #e3f3ea)",
      },
    ],

    storeUrl:
      "https://play.google.com/store/apps/details?id=com.flagwhiz&hl=en",
    storeName: "Google Play",
    short:
      "A sleek flag quiz that turns geography into a fast, beautiful game — learn 200+ national flags while you compete.",
    headline: "Play. Learn. Compete. Become a world flag expert.",
    summary:
      "FlagWhiz is XiviaSoft’s geography quiz on Google Play — crafted for students, travelers, and trivia lovers who want a premium, smooth way to master the world’s flags.",
    about: {
      title: "About FlagWhiz",
      body: "Are you a true globetrotter? Put your geography skills to the ultimate test. FlagWhiz is an engaging, visually polished flag quiz that takes you from the Star-Spangled Banner to the symbols of distant island nations — a fast-paced journey across seven continents.",
    },
    stats: [
      { value: "200+", label: "National flags" },
      { value: "3", label: "Game modes" },
      { value: "7", label: "Continents" },
      { value: "0", label: "Data collected" },
    ],
    floatingFlags: ["🇯🇵", "🇧🇷", "🇨🇦", "🇰🇪", "🇫🇷", "🇦🇺"],
    continents: [
      { label: "Asia", style: { top: "14%", left: "10%" } },
      { label: "Europe", style: { top: "18%", right: "12%" } },
      { label: "Africa", style: { bottom: "22%", left: "14%" } },
      { label: "Americas", style: { bottom: "16%", right: "10%" } },
    ],
    modes: [
      {
        title: "Classic Mode",
        body: "Take your time and learn at your own pace. Perfect for mastering all 200+ flags.",
        icon: "🧭",
        gradient: "linear-gradient(145deg, #1f8a9d 0%, #5eb3c1 55%, #a8d8c8 100%)",
      },
      {
        title: "Time Attack",
        body: "Feel the adrenaline. How many flags can you identify before the clock hits zero?",
        icon: "⏱️",
        gradient: "linear-gradient(145deg, #146f7f 0%, #1f8a9d 50%, #7fc4d4 100%)",
      },
      {
        title: "Challenge Mode",
        body: "Only for the elite. Face increasingly difficult levels that push your memory to the limit.",
        icon: "🏆",
        gradient: "linear-gradient(145deg, #0f5f6d 0%, #1f8a9d 45%, #9ad0c2 100%)",
      },
    ],
    features: [
      {
        title: "200+ national flags",
        body: "A massive library of national symbols from every corner of the globe.",
        icon: "🏳️",
      },
      {
        title: "Global leaderboards",
        body: "Compete with players worldwide and climb toward the top spot.",
        icon: "📈",
      },
      {
        title: "Stats & achievements",
        body: "Track growth over time with detailed progress and unlockable milestones.",
        icon: "✨",
      },
      {
        title: "Premium feel",
        body: "Smooth animations, crisp sound, and a modern interface designed for effortless play.",
        icon: "💎",
      },
    ],
    comingSoon: [
      "Flag Packs — region-specific challenges (Europe, Asia, Africa, and more)",
      "Multiplayer Duels — go head-to-head with friends in real time",
      "Daily Quests — new ways to earn rewards every day",
    ],
    privacy: [
      {
        title: "No third-party sharing",
        body: "Your play stays yours — nothing is shared with third parties.",
        icon: "🔒",
      },
      {
        title: "No data collected",
        body: "A lightweight experience with a privacy-first approach.",
        icon: "🛡️",
      },
    ],
    whatsNew:
      "Added support for additional languages, enhanced the UI for a smoother experience, and improved overall performance and stability.",
  },
];

export function getProduct(slug) {
  return products.find((product) => product.slug === slug) || null;
}

export function getAllProductSlugs() {
  return products.map((product) => product.slug);
}
