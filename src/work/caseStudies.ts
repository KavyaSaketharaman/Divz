export type CaseStudySection = {
  heading: string
  body: string
  image?: boolean
}

export type CaseStudy = {
  id: number
  slug: string
  title: string
  category: string
  year: string
  tagline: string
  description: string
  overview: string
  role: string
  duration: string
  tools: string[]
  sections: CaseStudySection[]
}

export const caseStudies: CaseStudy[] = [
  {
    id: 1,
    slug: 'hilton-gem-platform',
    title: 'Hilton Worldwide - GEM Platform',
    category: 'Enterprise UX',
    year: '2019',
    tagline: 'Reducing friction for support agents on a legacy enterprise tool.',
    description:
      "Redesigned Hilton's internal support tooling to reduce onboarding friction and speed up agent workflows.",
    overview: `As one of the most recognized and historic names in hospitality, Hilton strives to offer not just luxurious stays
but exceptional service at every stage of the guest journey - including behind the scenes, where customer care
agents play a crucial role.

The GEM platform was at the heart of Hilton's customer care operations. It was a legacy internal tool used daily
by support agents across the globe. While seasoned agents had adapted to its limitations, the platform was
unintuitive, difficult to navigate, and posed significant onboarding challenges for new team members.

I played a key role in working with the Salesforce Lightning system, contributing significantly to sprint planning
and executing tasks within an Agile methodology. As a major contributor to sprint-based projects, I collaborated
closely with cross-functional teams to ensure efficient delivery and alignment with business objectives. My
involvement in this fast-paced, iterative environment was crucial in driving timely and high-quality results.

Note: Due to the proprietary nature of the GEM platform and its role as an internal tool at Hilton, I'm unable to
share specific screens or detailed visuals from this project. However, I'd be happy to discuss the process, challenges,
and solutions in more detail in a one-on-one conversation.

In the meantime, I've included other design work I contributed to on Hilton's public-facing websites, which
reflects my approach to user experience, design thinking, and cross-functional collaboration.`,
    role: 'UX Architect',
    duration: 'Multi-year engagement',
    tools: ['Salesforce Lightning', 'Figma', 'Sketch', 'Agile'],
    sections: [
      {
        heading: 'Work Process',
        body: `The challenge?
Reimagine GEM to serve a modern, diverse workforce — one that needed speed, clarity, flexibility, and a
seamless user experience, whether working from a global support center or remotely.
Our goal was to transform GEM into a user-first, scalable solution that made Hilton’s support processes
smoother, faster, and more accessible — all without disrupting the existing workflows that agents relied on. We
focused on:
Creating a modern, intuitive UI that required minimal training
Streamlining complex workflows for both experienced and newly onboarded agents
Ensuring accessibility and consistency across devices and geographies
This initiative was about more than just upgrading software — it was about empowering Hilton’s agents to
provide world-class service with confidence and ease.`,
        
      },
      {
        heading: 'Workflow',
        body: `As part of the redesign of Hilton’s internal customer care platform, GEM, it was essential to ensure that the new
interface not only looked better but actually improved the day-to-day experience of customer care agents. To
validate our work, we moved beyond design reviews and took our prototypes directly into the field.`,
        
      },
      {
        heading: 'Approach',
        body: `We conducted live action usability testing by shadowing agents as they used early versions of the new platform in
real-world scenarios. This hands-on approach allowed us to:
• Observe how agents naturally interacted with the updated interface
• Identify pain points, confusion, and areas that needed better clarity
• Provide immediate, contextual guidance and gather real-time feedback
• Teach and demonstrate new flows directly within their daily workflows
Insights & Iterations
By spending time with the agents, we gained a deeper understanding of their routines, expectations, and
unspoken needs. We quickly learned what they were looking for, what functionality they prioritized, and where
they hesitated or struggled. This feedback loop allowed us to:
• Refine UI elements for better clarity
• Reorder tasks and actions to match their mental models
• Add micro interactions and cues to improve ease of use`,
      },
      {
        heading: 'Outcome',
        body: `This iterative process not only improved adoption of the new system but also built a stronger sense of trust and
collaboration between the design team and the people we were building for. The final product was more intuitive,
more accessible, and tailored to the realities of Hilton’s customer care operations.`,
      },
    ],
  },
  {
    id: 2,
    slug: 'Hilton Worldwide – Customer Support Pages &Email',
    title: 'Hilton Worldwide – Customer Support Pages &Email',
    category: 'Product Design',
    year: '2024',
    tagline: '',
    description:
      '',
    overview:
      `Through in-depth user research and behavioral analysis, we set out to understand what truly matters to Hilton’s
public-facing audience. This involved analyzing search data to uncover what users were looking for, who they
were, when they engaged, and — most importantly — why they came to the site.
We conducted heatmapping studies on the legacy website to observe user interaction patterns, identify content
blind spots, and highlight areas of friction or disengagement. These insights allowed us to recognize both what
users were struggling to find and what they instinctively gravitated toward.
Armed with this data, we restructured the content architecture and redesigned the interface to prioritize highdemand information in a more accessible and intuitive format — ultimately creating a digital experience that
was not only cleaner but also deeply aligned with real user needs and behaviors.`,
    role: 'Product Designer',
    duration: '6 months',
    tools: ['Figma', 'Principle', 'Notion', 'UserTesting'],
    sections: [
      {
        heading: 'EMAIL',
        body: `In addition to the core design work, I also took the initiative to design and implement a post-call survey,
delivered via email to customers immediately after their interaction with the support team. This survey was
strategically integrated with a third-party survey platform, allowing us to gather real-time feedback on the
customer experience.
By linking the survey results directly to the platform, we were able to seamlessly analyze data and gain
actionable insights into user satisfaction, service quality, and areas for improvement. This not only helped refine
the customer support process but also ensured that every call was a valuable opportunity for continuous
improvement.`,
        
      },
      {
        heading: 'Outcome',
        body:`• Reduced call time by at least 35%, enabling agents to assist more customers in less time.
• Streamlined workflows, significantly minimizing manual note-taking and simplifying daily tasks.
• Enhanced ease of use, improving agent efficiency and reducing friction in everyday processes.
• The revamped platform was loved by agents, who found the new design more intuitive and user-friendly.
• Seamless integration of new features, which enhanced the platform without disrupting existing
workflows.`,
        
      },
      {
        heading: 'Highlight',
        body:`One of the most significant highlights of this project was the comparison feature redesign. By simplifying the
design and making it highly intuitive, we were able to reduce agents’ workload by nearly 95%. This dramatic
improvement not only streamlined the process but also resulted in a 28% increase in usage of the feature,
demonstrating its value and effectiveness in enhancing the overall workflow.`,
        
      },
     
    ],
  },
  {
    id: 3,
    slug: 'Verizon – SASE SHyN &CAMP (Unmanaged)',
    title: 'Verizon – SASE SHyN &CAMP (Unmanaged)',
    category: 'UX Research & Design',
    year: '',
    tagline: '',
    description:
      '',
    overview:`Verizon, a leading global provider of telecommunications and network solutions, serves a wide range of enterprise
clients, helping organizations manage complex networks and secure modern applications. On the business side, Verizon
focuses on delivering scalable, reliable, and secure digital solutions that improve operational efficiency and customer
experience.
The company developed two key solutions for enterprise customers:
Enterprise Network Management App – A centralized platform for large organizations to monitor, manage, and
optimize their network systems. It provides real-time insights, device management, and tools to quickly identify and
resolve network issues.
Unmanaged Services (SaaS Platform) – A cloud-native platform that simplifies deploying, securing, and managing
distributed applications across data centers, public clouds, and edge locations. It consolidates services such as load
balancing, WAF, bot mitigation, API security, and DDoS protection into a single, centrally managed solution, enabling
secure and efficient application operations.
Together, these solutions support Verizon’s enterprise clients by enhancing network visibility, operational
efficiency, and application security, aligning with Verizon’s business goal of delivering high-value, scalable
technology solutions.`,
    role: '',
    duration: '',
    tools: ['Figma', 'Dovetail', 'Optimal Workshop', 'Lookback'],
    sections: [
      {
        heading: 'The Challenge',
        body: `• First experience with networking concepts: This was my first time designing for network management
systems, and the domain felt completely new—initially like “Greek and Latin.”
• Understanding technical fundamentals: I had to quickly learn networking basics, including how
enterprises use networks daily, which required guidance from my manager, reading books like Networking for
Dummies, and taking online courses.
• Defining user needs: Identifying the core users (enterprise IT teams, network admins) and understanding
their workflows, pain points, and priorities was challenging due to the technical complexity.
• Designing for specialized users: The app was meant for highly technical users, so designing an intuitive
experience while respecting advanced requirements was difficult.
• Translating complexity into usability: Bridging the gap between complex network operations and a clear,
usable interface required careful research, iteration, and validation.
• Aligning with business goals: Ensuring the design solved real user problems while supporting Verizon’s
enterprise objectives added an extra layer of challenge.`,
        
      },
      {
        heading: 'Note',
body:`Due to NDA and confidentiality constraints, I’m unable to showcase detailed case study information, final
designs, or high-fidelity screens from this project. However, to provide visibility into my design approach, I’ve included a
curated selection of early-stage sketches and low-fidelity wireframes. These artifacts highlight my problem-solving
process, ideation, and the foundational thinking that guided the overall user experience.`,
        
      },
      
    ],
  },
  {
    id: 4,
    slug: 'Nuvee Corp – Fleet Box and Fleet Manager',
    title: 'Nuvee Corp – Fleet Box and Fleet Manager',
    category: 'Visual Design',
    year: '',
    tagline: '',
    description:
      '',
    overview:
`The Nuvve suite of applications was designed to support efficient and sustainable fleet energy management for
commercial vehicles. The projects focused on creating user-friendly digital tools for both fleet operators and drivers to
monitor, manage, and optimize electric vehicle (EV) operations.
FleetBox App – A mobile application built for all the car owners as a personal vehicle nabling them to track their
assigned vehicles, view charging schedules, monitor battery levels, and stay informed about route and charging station
updates. The app simplifies day-to-day vehicle management, ensuring smooth coordination and optimized energy
usage.
Fleet Manager (Desktop & iPad Application) – A comprehensive platform designed for fleet operators and
administrators to oversee large-scale EV fleets. It provides tools for monitoring vehicle performance, scheduling
charging sessions, analyzing energy consumption, and managing costs. The responsive desktop and iPad interfaces
offer flexibility and real-time visibility into fleet operations.
Together, these applications aim to make EV fleet management more intuitive, efficient, and sustainable, aligning with
Nuvve’s mission to accelerate the adoption of clean energy solutions through intelligent vehicle-grid integration.`,    
role: '',
    duration: '',
    tools: ['Illustrator', 'Figma', 'After Effects', 'InDesign'],
    sections: [
      {
        heading: 'The Challenge',
        body: ` Understanding a new domain: Working in the electric vehicle (EV) and fleet energy management space was a
new experience, requiring a quick grasp of technical concepts like charging infrastructure, vehicle-grid
integration, and fleet operations.
• Diverse user groups: Designing for two distinct user types — fleet managers and drivers — presented
challenges in balancing functionality with simplicity. Each group had different goals, workflows, and technical
comfort levels.
• Complex data visualization: Translating real-time energy, charging, and fleet data into clear, actionable visuals
required careful information hierarchy and iterative testing.
• Platform consistency: Ensuring a seamless experience across mobile, tablet, and desktop platforms while
maintaining usability and clarity was a key design challenge.
• Limited direct user access: Gaining feedback from drivers and operators during the research phase was
challenging due to scheduling and operational constraints, requiring reliance on proxy insights and iterative
validation.
• Designing for scalability: The system had to support fleets of varying sizes and vehicle types, which demanded
flexible design solutions adaptable to different operational scales.`,
        
      },
      
      {
        heading: 'Design Process',
body:`Design Approach & Contributions – FleetBox App
• User Research & Grounded Insights: Worked closely with the CX Director to gather user data and understand
real-world needs. Conducted field studies and interviews with drivers to observe workflows, uncover pain
points, and explore desired improvements.
• Iterative Sketching & Wireframing: Started with extensive sketches and low-fidelity wireframes, iterating
rapidly to explore multiple solutions for both drivers and fleet managers.
• Cross-Functional Collaboration: Maintained daily discussions with the CX Director and collaborated with an
offshore developer to ensure designs were accurately implemented. Presented work regularly to the Tech
Director to demonstrate how UX improvements could enhance efficiency and customer satisfaction.
Key Contributions to the App:
• Redesigned the loading/onboarding screens to create a smoother, more engaging first impression.
• Optimized user flows, improving navigation and reducing friction for drivers and fleet managers.
• Enhanced the visual design for clarity and ease of understanding, adding interactive features that increased
usability.
• Made the app compatible with dark mode across both mobile and desktop platforms.
• User-Centered Problem Solving: Explored parallel workflow scenarios and iterative testing to ensure the app
was intuitive, visually appealing, and aligned with operational realities.
• Scalability & Accessibility: Designed with flexibility to accommodate both desktop and mobile platforms,
ensuring consistent user experience across devices.
Design Approach & Contributions – Fleet Manager App
• Ground-Up Design & User Research: Started the project from scratch, collaborating closely with CX Directors
to gather requirements and understand the needs of truck and bus drivers. Conducted user research to map
workflows, pain points, and operational challenges.
• Dashboard & Information Architecture: Designed a high-level dashboard giving fleet managers easy access to
critical information: number of buses/trucks, battery levels, charging status, and vehicle-to-grid contributions.
Ensured data is presented clearly for quick decision-making.
• Trip & Fleet Planning Tools: Created visual scheduling tools, including a calendar view, to plan fleet operations
efficiently. Added features to calculate travel distance based on battery levels, optimize trips, and plan ahead to
maximize energy and cost benefits.
• Iterative Wireframing & Prototyping: Explored multiple layouts through sketches and low-fidelity wireframes,
iteratively refining flows based on feedback from CX Directors and internal stakeholders.
• Cross-Functional Collaboration: Worked closely with offshore developers to ensure design intent was translated
accurately into the platform. Maintained regular reviews with the Tech and CX Directors to align on
functionality, usability, and strategic goals.
• Enhanced Visual Design & Accessibility: Focused on clear visual hierarchies, intuitive iconography, and easyto-understand metrics to improve operational efficiency. Incorporated accessibility and responsive design for
both desktop and tablet use.
• Data-Driven Problem Solving: Ensured features addressed real operational needs—like scheduling, adding new
vehicles, monitoring battery status, and pre-trip planning—supporting users to make faster, more informed
decisions.
• User-Centered Iteration: Continuously tested workflows and dashboards with stakeholders to optimize
usability, streamline interactions, and enhance overall user experience.`,
        image: true,
      },

      {
        heading: 'Results & Impact',
        body: 'Brand recognition increased by 48% in target markets. Social media engagement doubled within 3 months of the rebrand. The identity system was successfully applied across 15+ touchpoints with full consistency.',
      },
      {
        heading: 'Research & Discovery',
        body: 'Conducted brand workshops with stakeholders, analyzed competitor visual languages, and surveyed 200 target customers about brand perception. The research revealed a desire for warmth, authenticity, and modern minimalism.',
        image: true,
      },
    ],
  },
  {
    id: 5,
    slug: 'saas-onboarding-flow',
    title: 'SaaS Onboarding Flow',
    category: 'Interaction Design',
    year: '2023',
    tagline: 'Turning signups into active, engaged users.',
    description:
      'Redesigned a B2B SaaS onboarding flow to improve activation, retention, and time-to-value.',
    overview:
      'Streamlined the onboarding experience for a B2B SaaS analytics tool, improving activation rates by 40% through progressive disclosure, contextual guidance, and personalized setup flows.',
    role: 'Interaction Designer',
    duration: '3 months',
    tools: ['Figma', 'ProtoPie', 'Amplitude', 'FullStory'],
    sections: [
      {
        heading: 'The Challenge',
        body: 'Only 25% of new signups completed onboarding, and just 12% reached the "aha moment" of generating their first report. The existing flow was a 15-step linear wizard that overwhelmed users with configuration options.',
        image: true,
      },
      {
        heading: 'Research & Discovery',
        body: 'Analyzed funnel drop-off data for 5,000 users, conducted 10 user interviews with churned accounts, and reviewed 50 session recordings. The primary issue was asking for too much information before delivering any value.',
        image: true,
      },
      {
        heading: 'Design Process',
        body: 'Redesigned the flow around a "value first" principle - users see sample data immediately and configure as they go. Created role-based paths (marketer vs. analyst vs. executive) that personalize the experience. Built micro-interactions to celebrate progress.',
        image: true,
      },
      {
        heading: 'Results & Impact',
        body: 'Activation rate improved from 25% to 65%. Time-to-first-value decreased from 45 minutes to 8 minutes. 30-day retention increased by 28%. The approach was adopted as a template for 2 other products in the company portfolio.',
      },
    ],
  },
  {
    id: 6,
    slug: 'design-system',
    title: 'Design System',
    category: 'Systems Design',
    year: '2022',
    tagline: 'One source of truth for three product teams.',
    description:
      'Built a shared component library and governance model for three product teams.',
    overview:
      'Built a scalable component library and design system used across 3 product teams, establishing shared patterns, tokens, and governance processes that reduced design-to-dev handoff time by 60%.',
    role: 'Design Systems Lead',
    duration: '8 months',
    tools: ['Figma', 'Storybook', 'Tokens Studio', 'Zeroheight'],
    sections: [
      {
        heading: 'The Challenge',
        body: 'Three product teams were independently creating components, leading to visual inconsistencies, duplicated effort, and a fragmented user experience. There was no shared design language or component library.',
        image: true,
      },
      {
        heading: 'Research & Discovery',
        body: 'Audited all three products and cataloged 340+ unique components, finding 60% overlap. Interviewed 15 designers and 20 engineers about pain points. The biggest friction was inconsistent naming, undocumented states, and no single source of truth.',
        image: true,
      },
      {
        heading: 'Design Process',
        body: 'Established design tokens for color, typography, spacing, and elevation. Built a core component library of 45 components with documented variants, states, and usage guidelines. Created a contribution model and governance process for system evolution.',
        image: true,
      },
      {
        heading: 'Results & Impact',
        body: 'Design-to-dev handoff time reduced by 60%. Component reuse across teams reached 85%. New feature delivery speed improved by 35%. The system became the foundation for all new product development.',
      },
    ],
  },
]

export const caseStudiesBySlug = Object.fromEntries(
  caseStudies.map((study) => [study.slug, study]),
) as Record<string, CaseStudy>
