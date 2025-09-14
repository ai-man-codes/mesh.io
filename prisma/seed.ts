import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  // Create Users
  const user1 = await prisma.user.create({
    data: {
      email: 'alice@example.com',
      name: 'Alice',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'bob@example.com',
      name: 'Bob',
    },
  });

  const user3 = await prisma.user.create({
    data: {
      email: 'charlie@example.com',
      name: 'Charlie',
    },
  });

  console.log('Created users:', user1, user2, user3);

  // Create Vacancies
  const vacancy1 = await prisma.vacancy.create({
    data: {
      role: 'Frontend Developer',
      description: 'We are looking for a skilled frontend developer to join our team. Experience with React and Next.js is a plus.',
      isOpen: true,
      vacantTill: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14), // 2 weeks from now
      // teamId: 'team1',
      createdby: {
        connect: {
          id: user1.id,
        },
      },
    },
  });

  const vacancy2 = await prisma.vacancy.create({
    data: {
      role: 'Backend Engineer',
      description: 'Come work on our cutting-edge backend systems. Knowledge of Node.js and PostgreSQL is required.',
      isOpen: true,
      vacantTill: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 1 month from now
      createdby: {
        connect: {
          id: user1.id,
        },
      },

      // teamId: 'team1',
    },
  });

  const vacancy3 = await prisma.vacancy.create({
    data: {
      role: 'UI/UX Designer',
      description: 'Design beautiful and intuitive user interfaces for our products. A strong portfolio is a must.',
      isOpen: true,
      vacantTill: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 1 week from now
      // teamId: 'team2',
      createdby: {
        connect: {
          id: user1.id,
        },
      },

    },
  });

  const vacancy4 = await prisma.vacancy.create({
    data: {
      role: 'DevOps Engineer',
      description: 'Manage our cloud infrastructure and CI/CD pipelines.',
      isOpen: false, // This one is closed
      vacantTill: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // Expired 5 days ago
      // teamId: 'team2',
      createdby: {
        connect: {
          id: user1.id,
        },
      },
    },
  });

  console.log('Created vacancies:', vacancy1, vacancy2, vacancy3, vacancy4);

  // Create some proposals
  await prisma.proposal.create({
    data: {
      userId: user1.id,
      vacancyId: vacancy1.id,
      message: "I'm very interested in this role and have 3 years of experience with React."
    }
  });

  await prisma.proposal.create({
    data: {
      userId: user2.id,
      vacancyId: vacancy1.id,
      message: "I'm a junior developer but a fast learner. Here is my portfolio."
    }
  });

  await prisma.proposal.create({
    data: {
      userId: user3.id,
      vacancyId: vacancy2.id,
      message: "I have extensive experience with Node.js and scaling backend systems."
    }
  });


  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
