import P1 from "../assets/instaReel/1.png"
import P2 from "../assets/instaReel/2.png"
import P3 from "../assets/instaReel/3.png"
import P4 from "../assets/instaReel/4.png"
import creator from "../assets/AboutPhoto.png";

// data/reelsData.js
export const reelsData = [
    {
        id: 1,
        title: "AKUEB CS Practicals XII",     // TODO: real title
        description: "Alright chat, I hear you.... Computer science practical videos coming soon.",
        category: "Practical",
        cover: P1,        // TODO: real cover image
        videoUrl: "https://www.instagram.com/reel/DWWTyCBiJHa/", // TODO: real reel link
        views: "5.4K",   // TODO: real stat, or omit field entirely if unavailable
        likes: "137",
        date: "2026-03-14",
        isLatest: true,
    },
    {
        id: 2,
        title: "Which Programming Language you should master",     // TODO: real title
        description: "Over 8000 programming languages exist but you only need ONE.",
        category: "Development",
        cover: P2,        // TODO: real cover image
        videoUrl: "https://www.instagram.com/reel/DMVluSPMZ61/", // TODO: real reel link
        views: "970",   // TODO: real stat, or omit field entirely if unavailable
        likes: "74",
        date: "2026-03-14",
        isLatest: false,
    },
    {
        id: 3,
        title: "Businesses should get a website",     // TODO: real title
        description: "Get a custom website for your brand or business and sky rocket your sales today.",
        category: "Awareness",
        cover: P3,        // TODO: real cover image
        videoUrl: "https://www.instagram.com/reel/DaNPofHIWZj/", // TODO: real reel link
        views: "1.5K",   // TODO: real stat, or omit field entirely if unavailable
        likes: "78",
        date: "2026-03-14",
        isLatest: true,
    },
    {
        id: 4,
        title: "Computer Science Live Practical",     // TODO: real title
        description: "Practical 01 | Class 12 | AKUEB",
        category: "Practical",
        cover: P4,        // TODO: real cover image
        videoUrl: "https://www.instagram.com/reel/DWb3T7vjOpR/", // TODO: real reel link
        views: "1.8K",   // TODO: real stat, or omit field entirely if unavailable
        likes: "104",
        date: "2026-03-14",
        isLatest: false,
    },
    // ...more reels
]

export const creatorProfile = {
    username: "rafay.guides",
    displayName: "Abdul Rafay Chatriwala",
    bio: "Sharing what I learn building products — dev, design systems, and the process behind the polish.",
    profileUrl: "https://www.instagram.com/rafay.guides/",
    avatar: creator,
    focusTags: ["Development", "UI/UX", "Design Systems", "Productivity"],
    stats: { posts: 78, followers: '240+' }, // TODO: fill in or omit — see note below
}