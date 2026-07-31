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
    'Happy 25th Birthday, my love 🎂✨',
    'Twenty-five years ago, the world quietly became a more beautiful place — and then one day you walked into my life, and mine did too.',
    'You are my calm in every storm, my loudest laugh, my softest place to land. Loving you is the easiest and best thing I have ever done.',
    'I love the way your eyes light up over the smallest things, the way you care so deeply for everyone around you, and the way even my worst days go quiet the moment I see you.',
    'This year, I wish you everything you quietly wish for yourself when no one is listening — and I promise to stand beside you for every single one of those dreams, holding your hand through it all.',
    "Here's to 25 years of wonderful you… and to a forever of us. 🥂",
    'Yours — always, completely, and then a little more each day ❤️',
  ],

  // Finale text
  finale: {
    title: 'Lots of love for you ❤️',
    message: 'Once again, Happy Birthday Vrushy! Hope you loved your surprise.',
  },
}
