// src/services/roomService.ts
import prisma from '../prismaClient';

interface CreateRoomInput {
  status: string;
  number: string;
}

interface UpdateRoomInput {
  status?: string;
  number?: string;
}

const createRoom = async (data: CreateRoomInput) => {
  return await prisma.room.create({
    data,
  });
};

const getAllRooms = async () => {
  return await prisma.room.findMany();
};

const getRoomById = async (id: number) => {
  return await prisma.room.findUnique({
    where: { id },
  });
};

const updateRoom = async (id: number, data: UpdateRoomInput) => {
  return await prisma.room.update({
    where: { id },
    data,
  });
};

const deleteRoom = async (id: number) => {
  return await prisma.room.delete({
    where: { id },
  });
};

export default {
  createRoom,
  getAllRooms,
  getRoomById,
  updateRoom,
  deleteRoom,
};
