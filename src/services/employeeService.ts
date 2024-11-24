// src/services/employeeService.ts
import prisma from '../prismaClient';

interface CreateEmployeeInput {
  name: string;
  phone: string;
  position: string;
}

interface UpdateEmployeeInput {
  name?: string;
  phone?: string;
  position?: string;
}

const createEmployee = async (data: CreateEmployeeInput) => {
  return await prisma.employee.create({
    data,
  });
};

const getAllEmployees = async () => {
  return await prisma.employee.findMany();
};

const getEmployeeById = async (id: number) => {
  return await prisma.employee.findUnique({
    where: { id },
  });
};

const updateEmployee = async (id: number, data: UpdateEmployeeInput) => {
  return await prisma.employee.update({
    where: { id },
    data,
  });
};

const deleteEmployee = async (id: number) => {
  return await prisma.employee.delete({
    where: { id },
  });
};

export default {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};
