// ─────────────────────────────────────────────────────────────
//  PERSONALIZE YOUR BIRTHDAY SURPRISE HERE ✨
//  Everything shown in the app is driven by this one file.
// ─────────────────────────────────────────────────────────────

export const config = {
  // Name of the birthday person (shown on the cake screen & finale)
  name: 'Vrushy',

  // Words revealed as each balloon is popped (4 balloons = 4 words)
  balloonWords: ['You', 'are', 'so', 'special'],

  // Polaroid photo cards for the "Some Sweet Moments" screen.
  // Put your own photos in /public/photos and reference them like '/photos/one.jpg'
  moments: [
    { src: '/photos/moment-1.svg', caption: 'Celebrating you 🎉' },
    { src: '/photos/moment-2.svg', caption: 'My favourite person 💕' },
    { src: '/photos/moment-3.svg', caption: 'Every moment with you ✨' },
  ],

  // The letter revealed from the envelope (each string = one paragraph,
  // typed out with a handwriting effect)
  letter: [
    'Happy Birthday to someone truly special! 🎂',
    "You are Sweet, Loyal, My rock, and I'm so grateful to have you in my life.",
    'You bring so much warmth and sweetness into my life. Every moment with you is precious.',
    'On your special day, I wish you all the happiness, love, and joy that you deserve. May this year bring you countless beautiful moments and wonderful memories.',
    "Here's to celebrating you today and always! 🎉",
    'With love and best wishes ❤️',
  ],

  // Finale text
  finale: {
    title: 'Lots of love for you ❤️',
    message: 'Once again, Happy Birthday Vrushy! Hope you loved your surprise.',
  },
}
