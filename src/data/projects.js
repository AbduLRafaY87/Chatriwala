import P1 from "../assets/projects/1.png"
import P2 from "../assets/projects/2.png"
import P3 from "../assets/projects/3.png"
import P4 from "../assets/projects/4.png"
import P5 from "../assets/projects/5.png"
import P6 from "../assets/projects/6.png"
import P7 from "../assets/projects/7.png"
import P8 from "../assets/projects/8.png"
import P9 from "../assets/projects/9.png"
import P10 from "../assets/projects/10.png"
import P11 from "../assets/projects/11.png"
import P12 from "../assets/projects/12.png"


const projects = [
    {
        title: 'CosheShell - In-Browser Code Editor',
        category: 'app',
        techStack: ['CSS', 'React.js', 'Monaco Editor'],
        image: P5,
        description: 'A browser-based code editor with live preview and syntax highlighting for HTML, CSS, and JavaScript using Monaco Editor.',
        slug: "inbrowser-code-editor",
        longDescription: `CosheShell is a full-featured in-browser code editor designed for frontend web development practice and demos. Built using React.js and powered by the Monaco Editor (used in VS Code), this tool supports syntax highlighting, code auto-completion, and real-time preview of HTML, CSS, and JavaScript. Users can write and test code instantly without the need to install any software, making it ideal for beginners, educators, and quick prototyping. The layout is organized with a sidebar, editor panels, and a live preview window.`,
        liveLink: "https://code-shell.vercel.app/html"
    },
    {
        title: 'Beyond YLC - Youth Leadership Platform',
        category: 'website',
        techStack: ['Next.js', 'React.js', 'Tailwind CSS'],
        image: P1,
        description: 'A community platform for young change-makers, continuing the legacy of the Young Leaders Conference with social action projects and collaboration tools.',
        slug: "beyond-ylc-platform",
        longDescription: `Beyond YLC is an open community platform built to extend the multi-decade legacy of the Young Leaders Conference into an ongoing, global space for youth-led social action. The site connects young change-makers so they can discover initiatives, collaborate on projects, and turn ideas into real-world impact. It's designed as a nonprofit-facing hub under the School Of Leadership, with a focus on accessibility and a welcoming, modern presentation for a youth audience.`,
        liveLink: "https://beyondylc.sol.edu.pk"
    },
    {
        title: 'Sorella - Creamery & Coffee Website',
        category: 'website',
        techStack: ['React.js', 'Tailwind CSS'],
        image: P7,
        description: 'A vibrant brand website for a Karachi dessert and coffee shop, featuring a menu, a build-your-own ice cream flow, and social ordering links.',
        slug: "sorella-creamery-coffee",
        longDescription: `Sorella is a stylish brand and marketing website built for a real fruit ice cream, specialty coffee, and dessert shop in DHA Phase 8, Karachi. The site leads with bold, animated hero sections and a marquee of signature offerings, then guides visitors through a curated menu, an interactive "build your own ice cream" experience, and a gallery of the in-store atmosphere. Location details, opening hours, and quick links to Instagram and FoodPanda ordering are woven throughout, giving the brand a polished, conversion-focused online presence.`,
        liveLink: "https://sorella.ars-chatriwala.workers.dev"
    },
    {
        title: 'Prime Creators - Digital Agency Website',
        category: 'website',
        techStack: ['React.js', 'JavaScript', 'CSS'],
        image: P11,
        description: 'A digital agency site for a Karachi-based studio offering web development, graphic design, and digital marketing services.',
        slug: "prime-creators-agency",
        longDescription: `Prime Creators is the marketing website for a Karachi-based digital agency offering web development, graphic design, digital marketing, and custom software solutions. Built as a fully interactive single-page application, the site presents the agency's services and brand identity to potential clients, with a strong visual theme and clear contact pathways for businesses looking to work with the team.`,
        liveLink: "https://primecreators.co"
    },
    {
        title: 'DevSphere - Personal Developer Portfolio',
        category: 'portfolio',
        techStack: ['HTML', 'CSS', 'JavaScript'],
        image: P2,
        description: 'A professional and interactive portfolio showcasing development projects, skills, and integrated email contact functionality.',
        slug: "developer-portfolio",
        longDescription: `DevSphere is a personal developer portfolio created to professionally present skills, projects, and services. The website includes a smooth scroll navigation, project gallery, and sections for technical stack, about, and testimonials. An integrated email contact form allows potential clients or employers to reach out easily. This portfolio was crafted with performance, accessibility, and clean code practices in mind. It serves as a digital resume and a showcase of front-end development capabilities.`,
        liveLink: "https://ars-developers.netlify.app"
    },
    {
        title: 'Artfolio - Premium Sketch Artist Portfolio',
        category: 'portfolio',
        techStack: ['CSS', 'React.js'],
        image: P6,
        description: 'A creative portfolio site for a sketch artist, showcasing artwork galleries, client reviews, and appointment scheduling options.',
        slug: "artist-premium-portfolio-website",
        longDescription: `Artfolio is a modern, minimalist portfolio website designed for a premium sketch artist. Developed using React.js and styled with custom CSS, it features high-quality image galleries, categorized by style and medium. Visitors can view client reviews, learn about the artist's journey, and schedule appointments via a contact module. Special attention was given to visual hierarchy, page speed, and mobile responsiveness to ensure the artist's work is the main focal point.`,
        liveLink: "https://adeena-sajjad.vercel.app/portfolio"
    },
    {
        title: 'PgsEducation - Math & Aptitude Learning Platform',
        category: 'app',
        techStack: ['React.js', 'Vite', 'JavaScript'],
        image: P10,
        description: 'An educational web app offering XI & XII math resources, aptitude prep, and competition practice for AKUEB and Karachi Board students.',
        slug: "pgs-education-platform",
        longDescription: `PgsEducation is a learning platform built for Class XI and XII students following the AKUEB and Karachi Board curricula. It centralizes math resources, aptitude preparation, revision notes, past papers, and practice questions in one place, alongside information on academic competitions. The app-style interface is designed to make focused exam preparation easy to navigate for students working through board-specific material.`,
        liveLink: "https://pgseducation.com"
    },
    {
        title: 'SSC - Beauty Products E-commerce',
        category: 'ecommerce',
        techStack: ['HTML', 'CSS', 'JavaScript'],
        image: P4,
        description: 'A responsive e-commerce platform for cosmetics, featuring product filtering, shopping cart functionality, and secure user authentication.',
        slug: "cosmetics-website",
        longDescription: `This project is a sleek and responsive e-commerce platform built specifically for selling beauty and cosmetic products online. It features a dynamic product listing page, filtering by category or price, and a fully functional shopping cart. Users can add or remove items, view totals, and check out securely. The site also includes user authentication with registration and login features to ensure a personalized shopping experience. Built using HTML, CSS, and JavaScript, the frontend is mobile-optimized and provides a smooth user experience throughout.`,
        liveLink: "https://sanasajjadcosmetics.netlify.app"
    },
    {
        title: 'Amwaj - Human Development Training Website',
        category: 'website',
        techStack: ['React.js', 'Tailwind CSS'],
        image: P12,
        description: 'A corporate website for a leadership and soft-skills training company, presenting their curriculum design, retreats, and large-scale learning programs.',
        slug: "amwaj-trainings",
        longDescription: `Amwaj is a corporate marketing website for a company specializing in human development training, covering leadership development, soft skills, curriculum and framework design, experiential learning, and retreats. The site is built to communicate the breadth of Amwaj's large-scale learning engagements to potential corporate and institutional clients, with a clean, modern layout suited to a professional training and consultancy brand.`,
        liveLink: "https://amwaj-trainings.vercel.app"
    },

    {
        title: 'Fit & Flex - Premium Gym Website',
        category: 'website',
        techStack: ['HTML', 'CSS', 'JavaScript'],
        image: P8,
        description: 'A bold, single-page website for a Karachi gym, covering services, trainers, membership pricing, and an embedded location map.',
        slug: "fit-and-flex-gym",
        longDescription: `Fit & Flex is a high-energy single-page website built for a premium gym in Jamshed Quarters, Karachi. It introduces the facility with a strong hero section and key stats, then walks visitors through the gym's story, its strength, cardio, and personal training offerings, and a transparent three-tier membership pricing table. A facility gallery, trainer profiles, and an embedded map with contact and timing details round out the page, making it easy for prospective members to explore the gym and reach out to join.`,
        liveLink: "https://fit-and-flex.netlify.app"
    },
    {
        title: 'SmileCare - Dental Clinic Website',
        category: 'website',
        techStack: ['HTML', 'CSS'],
        image: P3,
        description: 'A clean and modern website for a dental clinic, featuring service information, doctor bios, and an appointment booking form.',
        slug: "dental-clinic-website",
        longDescription: `SmileCare is a sleek and informative website built for a local dental clinic. It presents an overview of services like cleanings, braces, and implants in a simple and visually calming design. The site includes detailed dentist profiles with photos and credentials, patient testimonials, and an easy-to-use appointment booking form. Optimized for mobile users, the website helps patients find relevant information quickly and encourages engagement through clear calls to action.`,
        liveLink: "https://drbillo.netlify.app"
    },
    {
        title: 'Mr Fixer Dubai - Appliance Repair Website',
        category: 'website',
        techStack: ['HTML', 'CSS', 'JavaScript'],
        image: P9,
        description: 'A multi-page service website for a Dubai appliance repair company, with dedicated pages per service, WhatsApp booking, and a contact form.',
        slug: "mr-fixer-dubai",
        longDescription: `Mr Fixer Dubai is a service-business website built for an appliance repair company operating across Dubai and Sharjah. It features dedicated pages for each repair service — including washing machines, fridges, dishwashers, ovens, and coffee machines — along with an about page, service center information, and a booking contact form. Quick WhatsApp and call links are placed throughout to make it fast for customers to reach a technician, and trust-building elements like experience stats and brand logos reinforce credibility.`,
        liveLink: "https://mrfixerdubai.com"
    },
];

export default projects;