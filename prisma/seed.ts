import {prisma} from "../src/lib/prisma";

async function seed() {
  await prisma.event.create({
    data: {
      id: '560d596a-2f11-4d50-92e5-fe24f516c8ed',
      title: 'Event Test',
      slug: 'event-test',
      details: 'Event Teste Details',
      maximumAttendees: 100
    }
  })
}

seed().then(() => {
  console.log('Database seeded!')
  prisma.$disconnect()
})