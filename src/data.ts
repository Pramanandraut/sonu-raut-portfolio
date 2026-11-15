// ===== EDIT YOUR CONTENT HERE. Bracketed text is a placeholder. =====
export const NAV = ['Home','About','Education','Achievements','Projects','Skills','Contact']
export const profile = {
  name: 'Pramanand Raut',
  photo: '/profile.jpg',                 // put your photo in /public/profile.jpg
  resume: '/Pramanand_Raut_Resume.pdf',       // put your resume in /public/Sonu_Raut_Resume.pdf
  resumeFilename: 'Pramanand_Raut_Resume.pdf',
  email: 'pramanandraut42@gmail.com',                             // e.g. 'you@example.com'
  typing: ['Software Engineering','Artificial Intelligence & Machine Learning','Web Development','Problem Solving','Computer Networking','Emerging Technologies'],
  interests: ['Software Engineering','AI & Machine Learning','Web Development','Programming & Problem Solving','Computer Networking','Emerging Technologies'],
  about: [
    'I’m Pramanand Raut, a B.Tech Computer Science and Engineering student at SRM Institute of Science and Technology, Tiruchirappalli Campus.',
    'I’m interested in software engineering, AI and machine learning, web development, problem solving and computer networking, and I enjoy exploring emerging technologies.',
    'My goal is to become a skilled software engineer and build innovative technology solutions. '
  ]
}
export const education = [
  { t: 'B.Tech in Computer Science and Engineering', o: 'SRM Institute of Science and Technology, Tiruchirappalli Campus',y:'Years=2026-2030'  },
  { t: 'Higher Secondary (+2)', o: 'Capital College And Research Center , Koteshwor ,KTM', y: 'Years=2024-2026', d: 'Percentage=86%' },
  { t: 'School Education', o: 'Shree Chandra Model Secondary School Bode Barsain-5 Saptari, Nepal', d: 'Percentage = 88%' }
]
export const achievements = [
  { k: '🎓', t: 'Academic Achievements', d: 'First position in cricket in college tournament and Silver medal in running competition in school .' },
  
]
export interface Project { t: string; c: string; d: string; tech: string[]; gh: string; live: string; more: string; img?: string }
export const projects: Project[] = [
  { t: 'Project One', c: 'Web', d: 'Speeding Fine & Penalty Point Calculator ', tech: ['C','Ai'], gh: '', live: '', more: 'Save time in calculating traffic fines and reduce manual calculation errors.' },
]
export const skills: Record<string, string[]> = {
  'Programming Languages': ['C','C++'],
  
  'Frontend Development': ['HTML','CSS'],
  'Computer Science Fundamentals': ['DBMS','CS Fundamentals'],
  
}
export const social = [
  { n: 'GitHub', i: 'GH', u: 'https://github.com/Pramanandraut' }, { n: 'LinkedIn', i: 'in', u: 'https://www.linkedin.com/in/pramanand-raut-b9695742b/' }, 

]
export const socialHref = (s: { n: string; u: string }) => (s.n === 'Email' ? (profile.email ? `mailto:${profile.email}` : '') : s.u)
