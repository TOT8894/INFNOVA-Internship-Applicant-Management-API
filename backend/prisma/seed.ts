import { PrismaClient } from '../src/generated/prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import * as bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const databaseUrl = process.env.DATABASE_URL?.trim();
const email = process.env.ADMIN_EMAIL?.trim();
const password = process.env.ADMIN_PASSWORD;

if (!databaseUrl) {
  throw new Error('DATABASE_URL is required');
}

const adapter = new PrismaBetterSqlite3({
  url: databaseUrl,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  if (!email || !password) {
    throw new Error('ADMIN_EMAIL and ADMIN_PASSWORD are required');
  }

  // Create administrator
  const hashedPassword = await bcrypt.hash(password, 10);

  const admin = await prisma.admin.upsert({
    where: {
      email,
    },
    update: {},
    create: {
      email,
      password: hashedPassword,
    },
  });

  console.log(`Admin created: ${admin.email}`);

  await prisma.applicant.createMany({
    data: [
      {
        name: 'Abebe Tesfaye',
        email: 'abebe.tesfaye1@example.com',
        track: 'BACKEND_DEVELOPMENT',
        status: 'PENDING',
        notes: 'Strong backend fundamentals and good API design experience.',
      },
      {
        name: 'Natan Belay',
        email: 'natan.belay61@example.com',
        track: 'BACKEND_DEVELOPMENT',
        status: 'PENDING',
        notes: 'Shows good interest in backend development and API design.',
      },
      {
        name: 'Hiwot Assefa',
        email: 'hiwot.assefa62@example.com',
        track: 'FRONTEND_DEVELOPMENT',
        status: 'SHORTLISTED',
        notes: 'Good understanding of frontend development fundamentals.',
      },
      {
        name: 'Robel Tadesse',
        email: 'robel.tadesse63@example.com',
        track: 'MOBILE_DEVELOPMENT',
        status: 'ACCEPTED',
        notes: 'Demonstrates strong interest in mobile application development.',
      },
      {
        name: 'Eden Gebremariam',
        email: 'eden.gebremariam64@example.com',
        track: 'UI_UX_DESIGN',
        status: 'PENDING',
        notes: 'Shows creativity and interest in user-centered design.',
      },
      {
        name: 'Mihret Tesfaye',
        email: 'mihret.tesfaye65@example.com',
        track: 'DATA_ANALYTICS',
        status: 'SHORTLISTED',
        notes: 'Good analytical thinking and interest in data visualization.',
      },
      {
        name: 'Yonas Abebe',
        email: 'yonas.abebe66@example.com',
        track: 'FRONTEND_DEVELOPMENT',
        status: 'ACCEPTED',
        notes: 'Good understanding of JavaScript and responsive web development.',
      },
      {
        name: 'Kalkidan Worku',
        email: 'kalkidan.worku67@example.com',
        track: 'BACKEND_DEVELOPMENT',
        status: 'REJECTED',
        notes: 'Needs more experience building production-ready backend systems.',
      },
      {
        name: 'Saron Fikru',
        email: 'saron.fikru68@example.com',
        track: 'UI_UX_DESIGN',
        status: 'SHORTLISTED',
        notes: 'Good understanding of visual design and user experience principles.',
      },
      {
        name: 'Eyob Ayele',
        email: 'eyob.ayele69@example.com',
        track: 'MOBILE_DEVELOPMENT',
        status: 'PENDING',
        notes: 'Shows enthusiasm for learning mobile development technologies.',
      },
      {
        name: 'Marta Haile',
        email: 'marta.haile70@example.com',
        track: 'DATA_ANALYTICS',
        status: 'ACCEPTED',
        notes: 'Strong interest in data analysis and solving business problems.',
      },
      {
        name: 'Nahom Girma',
        email: 'nahom.girma71@example.com',
        track: 'BACKEND_DEVELOPMENT',
        status: 'SHORTLISTED',
        notes: 'Good knowledge of databases and server-side programming.',
      },
      {
        name: 'Ruth Mekonnen',
        email: 'ruth.mekonnen72@example.com',
        track: 'FRONTEND_DEVELOPMENT',
        status: 'PENDING',
        notes: 'Shows potential in building modern and responsive web interfaces.',
      },
      {
        name: 'Kidus Hailu',
        email: 'kidus.hailu73@example.com',
        track: 'MOBILE_DEVELOPMENT',
        status: 'REJECTED',
        notes: 'Needs additional practical experience in mobile application development.',
      },
      {
        name: 'Liya Tadesse',
        email: 'liya.tadesse74@example.com',
        track: 'UI_UX_DESIGN',
        status: 'ACCEPTED',
        notes: 'Demonstrates good design thinking and attention to detail.',
      },
      {
        name: 'Bereket Solomon',
        email: 'bereket.solomon75@example.com',
        track: 'DATA_ANALYTICS',
        status: 'SHORTLISTED',
        notes: 'Shows good problem-solving skills and interest in analytics.',
      },
      {
        name: 'Hana Bekele',
        email: 'hana.bekele76@example.com',
        track: 'FRONTEND_DEVELOPMENT',
        status: 'PENDING',
        notes: 'Interested in React development and modern frontend tools.',
      },
      {
        name: 'Samuel Desta',
        email: 'samuel.desta77@example.com',
        track: 'BACKEND_DEVELOPMENT',
        status: 'ACCEPTED',
        notes: 'Strong programming fundamentals and interest in API development.',
      },
      {
        name: 'Meron Asefa',
        email: 'meron.asefa78@example.com',
        track: 'MOBILE_DEVELOPMENT',
        status: 'SHORTLISTED',
        notes: 'Shows good potential in cross-platform mobile development.',
      },
      {
        name: 'Tigist Wondimu',
        email: 'tigist.wondimu79@example.com',
        track: 'UI_UX_DESIGN',
        status: 'PENDING',
        notes: 'Interested in creating accessible and user-friendly interfaces.',
      },
      {
        name: 'Fasil Demissie',
        email: 'fasil.demissie80@example.com',
        track: 'DATA_ANALYTICS',
        status: 'ACCEPTED',
        notes: 'Good analytical skills and interest in working with data.',
      },
      {
        name: 'Yared Berhanu',
        email: 'yared.berhanu41@example.com',
        track: 'BACKEND_DEVELOPMENT',
        status: 'PENDING',
        notes: 'Shows good understanding of server-side application development.',
      },
      {
        name: 'Martha Teshome',
        email: 'martha.teshome42@example.com',
        track: 'FRONTEND_DEVELOPMENT',
        status: 'SHORTLISTED',
        notes: 'Good knowledge of responsive design and frontend development.',
      },
    {
      name: 'Samuel Abebe',
      email: 'samuel.abebe43@example.com',
      track: 'MOBILE_DEVELOPMENT',
      status: 'ACCEPTED',
      notes: 'Has practical experience building cross-platform mobile applications.',
    },
    {
      name: 'Hanna Woldemariam',
      email: 'hanna.woldemariam44@example.com',
      track: 'UI_UX_DESIGN',
      status: 'PENDING',
      notes: 'Shows strong interest in user research and interface design.',
    },
    {
      name: 'Biniam Ayele',
      email: 'biniam.ayele45@example.com',
      track: 'DATA_ANALYTICS',
      status: 'SHORTLISTED',
      notes: 'Demonstrates good analytical thinking and interest in data.',
    },
    {
      name: 'Lidya Girma',
      email: 'lidya.girma46@example.com',
      track: 'FRONTEND_DEVELOPMENT',
      status: 'ACCEPTED',
      notes: 'Good understanding of JavaScript and modern web development.',
    },
    {
      name: 'Tewodros Haile',
      email: 'tewodros.haile47@example.com',
      track: 'BACKEND_DEVELOPMENT',
      status: 'REJECTED',
      notes: 'Needs more practical experience with backend technologies.',
    },
    {
      name: 'Selamawit Desta',
      email: 'selamawit.desta48@example.com',
      track: 'UI_UX_DESIGN',
      status: 'SHORTLISTED',
      notes: 'Good visual design skills and understanding of user experience.',
    },
    {
      name: 'Abel Tadesse',
      email: 'abel.tadesse49@example.com',
      track: 'MOBILE_DEVELOPMENT',
      status: 'PENDING',
      notes: 'Shows enthusiasm for learning mobile application development.',
    },
    {
      name: 'Rahel Fikadu',
      email: 'rahel.fikadu50@example.com',
      track: 'DATA_ANALYTICS',
      status: 'ACCEPTED',
      notes: 'Strong interest in data analysis and data-driven decision making.',
    },
    {
      name: 'Michael Asefa',
      email: 'michael.asefa51@example.com',
      track: 'BACKEND_DEVELOPMENT',
      status: 'SHORTLISTED',
      notes: 'Good understanding of APIs, databases, and backend architecture.',
    },
    {
      name: 'Eyerusalem Mengistu',
      email: 'eyerusalem.mengistu52@example.com',
      track: 'FRONTEND_DEVELOPMENT',
      status: 'PENDING',
      notes: 'Shows good potential in building interactive web applications.',
    },
    {
      name: 'Henok Solomon',
      email: 'henok.solomon53@example.com',
      track: 'MOBILE_DEVELOPMENT',
      status: 'REJECTED',
      notes: 'Needs additional practical experience with mobile development.',
    },
    {
      name: 'Tigist Alemu',
      email: 'tigist.alemu54@example.com',
      track: 'UI_UX_DESIGN',
      status: 'ACCEPTED',
      notes: 'Demonstrates creativity and strong attention to user needs.',
    },
    {
      name: 'Yohannes Kebede',
      email: 'yohannes.kebede55@example.com',
      track: 'DATA_ANALYTICS',
      status: 'SHORTLISTED',
      notes: 'Good analytical skills and interest in working with datasets.',
    },
    {
      name: 'Meron Tesfaye',
      email: 'meron.tesfaye56@example.com',
      track: 'FRONTEND_DEVELOPMENT',
      status: 'PENDING',
      notes: 'Interested in React and modern frontend application development.',
    },
    {
      name: 'Fikru Worku',
      email: 'fikru.worku57@example.com',
      track: 'BACKEND_DEVELOPMENT',
      status: 'ACCEPTED',
      notes: 'Shows strong programming fundamentals and problem-solving skills.',
    },
    {
      name: 'Bethlehem Hailu',
      email: 'bethlehem.hailu58@example.com',
      track: 'MOBILE_DEVELOPMENT',
      status: 'SHORTLISTED',
      notes: 'Good interest in building useful mobile applications.',
    },
    {
      name: 'Desta Mekonnen',
      email: 'desta.mekonnen59@example.com',
      track: 'UI_UX_DESIGN',
      status: 'PENDING',
      notes: 'Shows interest in product design and user-centered solutions.',
    },
    {
      name: 'Amanuel Girma',
      email: 'amanuel.girma60@example.com',
      track: 'DATA_ANALYTICS',
      status: 'ACCEPTED',
      notes: 'Good problem-solving ability and interest in data analytics.',
    },
      {
        name: 'Mekdes Alemu',
        email: 'mekdes.alemu2@example.com',
        track: 'FRONTEND_DEVELOPMENT',
        status: 'SHORTLISTED',
        notes: 'Good understanding of React and modern frontend development.',
      },
      {
        name: 'Dawit Kebede',
        email: 'dawit.kebede3@example.com',
        track: 'MOBILE_DEVELOPMENT',
        status: 'ACCEPTED',
        notes: 'Has experience building mobile applications with React Native.',
      },
      {
        name: 'Hana Getachew',
        email: 'hana.getachew4@example.com',
        track: 'UI_UX_DESIGN',
        status: 'PENDING',
        notes: 'Strong interest in user-centered design and prototyping.',
      },
      {
        name: 'Yonas Worku',
        email: 'yonas.worku5@example.com',
        track: 'DATA_ANALYTICS',
        status: 'SHORTLISTED',
        notes: 'Good analytical thinking and interest in data visualization.',
      },
      {
        name: 'Selam Tadesse',
        email: 'selam.tadesse6@example.com',
        track: 'FRONTEND_DEVELOPMENT',
        status: 'ACCEPTED',
        notes: 'Demonstrates good knowledge of JavaScript and frontend tools.',
      },
      {
        name: 'Nahom Bekele',
        email: 'nahom.bekele7@example.com',
        track: 'BACKEND_DEVELOPMENT',
        status: 'REJECTED',
        notes: 'Needs more practical experience with backend systems.',
      },
      {
        name: 'Bethel Mengistu',
        email: 'bethel.mengistu8@example.com',
        track: 'UI_UX_DESIGN',
        status: 'PENDING',
        notes: 'Shows creativity and good attention to user experience.',
      },
      {
        name: 'Samuel Hailu',
        email: 'samuel.hailu9@example.com',
        track: 'BACKEND_DEVELOPMENT',
        status: 'SHORTLISTED',
        notes: 'Good understanding of REST APIs and databases.',
      },
      {
        name: 'Liya Girma',
        email: 'liya.girma10@example.com',
        track: 'MOBILE_DEVELOPMENT',
        status: 'PENDING',
        notes: 'Interested in mobile development and cross-platform applications.',
      },
      {
        name: 'Bereket Assefa',
        email: 'bereket.assefa11@example.com',
        track: 'DATA_ANALYTICS',
        status: 'ACCEPTED',
        notes: 'Strong interest in data analysis and problem solving.',
      },
      {
        name: 'Rahel Mulugeta',
        email: 'rahel.mulugeta12@example.com',
        track: 'FRONTEND_DEVELOPMENT',
        status: 'SHORTLISTED',
        notes: 'Has experience creating responsive web interfaces.',
      },
      {
        name: 'Eyob Kassa',
        email: 'eyob.kassa13@example.com',
        track: 'BACKEND_DEVELOPMENT',
        status: 'PENDING',
        notes: 'Shows good potential in server-side development.',
      },
      {
        name: 'Meron Tamiru',
        email: 'meron.tamiru14@example.com',
        track: 'UI_UX_DESIGN',
        status: 'REJECTED',
        notes: 'Needs additional experience with design systems.',
      },
      {
        name: 'Henok Yilma',
        email: 'henok.yilma15@example.com',
        track: 'MOBILE_DEVELOPMENT',
        status: 'SHORTLISTED',
        notes: 'Good understanding of mobile application development.',
      },
      {
        name: 'Saron Wondimu',
        email: 'saron.wondimu16@example.com',
        track: 'FRONTEND_DEVELOPMENT',
        status: 'PENDING',
        notes: 'Shows enthusiasm for learning modern frontend technologies.',
      },
      {
        name: 'Michael Demissie',
        email: 'michael.demissie17@example.com',
        track: 'BACKEND_DEVELOPMENT',
        status: 'ACCEPTED',
        notes: 'Strong programming fundamentals and database knowledge.',
      },
      {
        name: 'Tigist Mekonnen',
        email: 'tigist.mekonnen18@example.com',
        track: 'DATA_ANALYTICS',
        status: 'SHORTLISTED',
        notes: 'Good analytical skills and interest in working with data.',
      },
      {
        name: 'Yonatan Abebe',
        email: 'yonatan.abebe19@example.com',
        track: 'MOBILE_DEVELOPMENT',
        status: 'PENDING',
        notes: 'Interested in building useful mobile applications.',
      },
      {
        name: 'Marta Solomon',
        email: 'marta.solomon20@example.com',
        track: 'UI_UX_DESIGN',
        status: 'ACCEPTED',
        notes: 'Strong visual design skills and good user experience awareness.',
      },
      {
        name: 'Daniel Fikru',
        email: 'daniel.fikru21@example.com',
        track: 'BACKEND_DEVELOPMENT',
        status: 'PENDING',
        notes: 'Good understanding of Node.js and REST API development.',
      },
      {
        name: 'Eden Solomon',
        email: 'eden.solomon22@example.com',
        track: 'FRONTEND_DEVELOPMENT',
        status: 'SHORTLISTED',
        notes: 'Shows strong interest in modern frontend technologies.',
      },
      {
        name: 'Fasil Girma',
        email: 'fasil.girma23@example.com',
        track: 'DATA_ANALYTICS',
        status: 'ACCEPTED',
        notes: 'Demonstrates strong analytical and problem-solving skills.',
      },
      {
        name: 'Almaz Hailu',
        email: 'almaz.hailu24@example.com',
        track: 'UI_UX_DESIGN',
        status: 'PENDING',
        notes: 'Interested in user research and interface design.',
      },
      {
        name: 'Natnael Kassa',
        email: 'natnael.kassa25@example.com',
        track: 'MOBILE_DEVELOPMENT',
        status: 'SHORTLISTED',
        notes: 'Has experience developing cross-platform mobile applications.',
      },
      {
        name: 'Ruth Bekele',
        email: 'ruth.bekele26@example.com',
        track: 'FRONTEND_DEVELOPMENT',
        status: 'PENDING',
        notes: 'Good knowledge of HTML, CSS, JavaScript, and React.',
      },
      {
        name: 'Kidus Tadesse',
        email: 'kidus.tadesse27@example.com',
        track: 'BACKEND_DEVELOPMENT',
        status: 'ACCEPTED',
        notes: 'Strong understanding of databases and backend architecture.',
      },
      {
        name: 'Mimi Alemu',
        email: 'mimi.alemu28@example.com',
        track: 'UI_UX_DESIGN',
        status: 'SHORTLISTED',
        notes: 'Creative candidate with strong interest in product design.',
      },
      {
        name: 'Solomon Worku',
        email: 'solomon.worku29@example.com',
        track: 'DATA_ANALYTICS',
        status: 'PENDING',
        notes: 'Interested in data visualization and business intelligence.',
      },
      {
        name: 'Bethlehem Yilma',
        email: 'bethlehem.yilma30@example.com',
        track: 'MOBILE_DEVELOPMENT',
        status: 'REJECTED',
        notes: 'Needs more practical experience with mobile development.',
      },
      {
        name: 'Kalkidan Tesfaye',
        email: 'kalkidan.tesfaye31@example.com',
        track: 'FRONTEND_DEVELOPMENT',
        status: 'ACCEPTED',
        notes: 'Good experience building responsive web applications.',
      },
      {
        name: 'Robel Kebede',
        email: 'robel.kebede32@example.com',
        track: 'BACKEND_DEVELOPMENT',
        status: 'SHORTLISTED',
        notes: 'Shows good understanding of authentication and APIs.',
      },
      {
        name: 'Mahirom Gebre',
        email: 'mahirom.gebre33@example.com',
        track: 'MOBILE_DEVELOPMENT',
        status: 'PENDING',
        notes: 'Interested in developing mobile solutions for real-world problems.',
      },
      {
        name: 'Frehiwot Assefa',
        email: 'frehiwot.assefa34@example.com',
        track: 'UI_UX_DESIGN',
        status: 'ACCEPTED',
        notes: 'Strong understanding of design principles and user experience.',
      },
      {
        name: 'Henok Demissie',
        email: 'henok.demissie35@example.com',
        track: 'DATA_ANALYTICS',
        status: 'SHORTLISTED',
        notes: 'Good problem-solving skills and interest in data analysis.',
      },
      {
        name: 'Sara Mekonnen',
        email: 'sara.mekonnen36@example.com',
        track: 'FRONTEND_DEVELOPMENT',
        status: 'PENDING',
        notes: 'Shows good potential in frontend application development.',
      },
      {
        name: 'Abel Wondimu',
        email: 'abel.wondimu37@example.com',
        track: 'BACKEND_DEVELOPMENT',
        status: 'REJECTED',
        notes: 'Requires more experience with production backend systems.',
      },
      {
        name: 'Hirut Getachew',
        email: 'hirut.getachew38@example.com',
        track: 'DATA_ANALYTICS',
        status: 'ACCEPTED',
        notes: 'Demonstrates good analytical thinking and attention to detail.',
      },
      {
        name: 'Mulugeta Fekadu',
        email: 'mulugeta.fekadu39@example.com',
        track: 'MOBILE_DEVELOPMENT',
        status: 'SHORTLISTED',
        notes: 'Good understanding of mobile application development concepts.',
      },
      {
        name: 'Selamawit Desta',
        email: 'selamawit.desta40@example.com',
        track: 'UI_UX_DESIGN',
        status: 'PENDING',
        notes: 'Shows creativity and interest in solving user problems.',
      },
    ],
  });

  console.log('applicants created successfully');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });