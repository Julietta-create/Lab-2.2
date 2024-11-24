// src/index.ts
import clientService from './services/clientService';
import prisma from './prismaClient';

const main = async () => {
  // CRUD операції для Client
  console.log('--- CRUD Operations for Client ---');

  // Створення нового клієнта
  const newClient = await clientService.createClient({
    name: 'Іван Іванов',
    phone: '0123456789',
  });
  console.log('Created Client:', newClient);

  // Отримання всіх клієнтів
  const allClients = await clientService.getAllClients();
  console.log('All Clients:', allClients);

  // Отримання клієнта за ID
  const client = await clientService.getClientById(newClient.id);
  console.log(`Client with ID ${newClient.id}:`, client);

  // Оновлення клієнта
  const updatedClient = await clientService.updateClient(newClient.id, {
    phone: '0987654321',
  });
  console.log('Updated Client:', updatedClient);

  // Видалення клієнта
  const deletedClient = await clientService.deleteClient(newClient.id);
  console.log('Deleted Client:', deletedClient);

  // Приклад запиту з об’єднанням таблиць (Reservations з Clients та Rooms)
  console.log('\n--- Reservations with Clients and Rooms ---');
  const reservationsWithClients = await prisma.reservation.findMany({
    include: {
      client: true,
      room: true,
    },
  });
  console.log('Reservations with Clients and Rooms:', reservationsWithClients);

  // Приклад фільтрації (броювання на конкретну дату)
  console.log('\n--- Reservations on 2024-12-01 ---');
  const specificDateReservations = await prisma.reservation.findMany({
    where: {
      reservationDate: new Date('2024-12-01'),
    },
  });
  console.log('Reservations on 2024-12-01:', specificDateReservations);

  // Приклад агрегатних функцій (загальна сума оплат)
  console.log('\n--- Total Payment Amount ---');
  const totalPayments = await prisma.payment.aggregate({
    _sum: {
      amount: true,
    },
  });
  console.log('Total Payment Amount:', totalPayments._sum.amount);

  // Додатковий приклад: Середня сума оплат
  console.log('\n--- Average Payment Amount ---');
  const averagePayments = await prisma.payment.aggregate({
    _avg: {
      amount: true,
    },
  });
  console.log('Average Payment Amount:', averagePayments._avg.amount);
};

main()
  .catch((e) => {
    console.error('Error:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
