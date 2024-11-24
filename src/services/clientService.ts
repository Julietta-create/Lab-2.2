// src/services/clientService.ts
import prisma from '../prismaClient';

interface CreateClientInput {
  name: string;
  phone: string;
}

interface UpdateClientInput {
  name?: string;
  phone?: string;
}

const createClient = async (data: CreateClientInput) => {
  return await prisma.client.create({
    data,
  });
};

const getAllClients = async () => {
  return await prisma.client.findMany();
};

const getClientById = async (id: number) => {
  return await prisma.client.findUnique({
    where: { id },
  });
};

const updateClient = async (id: number, data: UpdateClientInput) => {
  return await prisma.client.update({
    where: { id },
    data,
  });
};

const deleteClient = async (id: number) => {
  return await prisma.client.delete({
    where: { id },
  });
};

export default {
  createClient,
  getAllClients,
  getClientById,
  updateClient,
  deleteClient,
};
