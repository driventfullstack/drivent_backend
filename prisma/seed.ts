import { PrismaClient } from '@prisma/client';
import dayjs from 'dayjs';
const prisma = new PrismaClient();

async function main() {
  let event = await prisma.event.findFirst();
  if (!event) {
    event = await prisma.event.create({
      data: {
        title: 'Driven.t',
        logoImageUrl: 'https://files.driveneducation.com.br/images/logo-rounded.png',
        backgroundImageUrl: 'linear-gradient(to right, #FA4098, #FFD77F)',
        startsAt: dayjs().toDate(),
        endsAt: dayjs().add(21, 'days').toDate(),
      },
    });
  }

  let ticketType = await prisma.ticketType.findFirst();
  if (!ticketType) {
    await prisma.ticketType.createMany({
      data: [
        {
          name: 'semHoteleRemoto',
          price: 100,
          isRemote: true,
          includesHotel: false,
        },
        {
          name: 'comHotelePresencial',
          price: 200,
          isRemote: false,
          includesHotel: true,
        },
      ],
    });
  }

  let hotelTest = await prisma.hotel.findFirst();
  if (!hotelTest) {
    await prisma.hotel.createMany({
      data: [
        {
          name: 'Cativeiro A',
          image: 'https://pbs.twimg.com/media/D-ZgkyQXoAADbqZ?format=jpg&name=900x900',
        },
        {
          name: 'Cativeiro B',
          image:
            'https://s2.glbimg.com/en14oahqtOxbLiX1ZbdZr3dYv2Q=/smart/e.glbimg.com/og/ed/f/original/2020/09/11/anuncio-apartamento-viraliza-04.jpg',
        },
      ],
    });
  }

  let roomTest = await prisma.room.findFirst();
  if (!roomTest) {
    let hotel = await prisma.hotel.findFirst();
    if (!hotel) return;
    await prisma.room.createMany({
      data: [
        {
          name: 'quarto 1',
          capacity: 3,
          hotelId: hotel.id,
        },
        {
          name: 'quarto 2',
          capacity: 2,
          hotelId: hotel.id,
        },
        {
          name: 'quarto 3',
          capacity: 3,
          hotelId: hotel.id,
        },
        {
          name: 'quarto 4',
          capacity: 3,
          hotelId: hotel.id,
        },
      ],
    });
  }

  console.log({ event });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
