import { prisma } from "./database.server";

type Expense = {
  title: string;
  amount: number;
  date: Date;
};

export async function addExpense(expenseData: Expense, userId: string) {
  // console.log(userId);
  try {
    return await prisma.expense.create({
      data: {
        title: expenseData.title,
        amount: +expenseData.amount,
        date: new Date(expenseData.date),
        User: {
          connect: { id: userId },
        },
      },
    });
  } catch (error) {
    // throw new Error("Could not add expenses");
  }
}

export async function getExpenses(userId: string) {
  try {
    const expenses = await prisma.expense.findMany({
      where: { userId },
      orderBy: { date: "desc" },
    });
    return expenses;
  } catch (error) {
    throw new Error("Could not get expenses");
  }
}

export async function getExpense(id: string) {
  try {
    const expense = await prisma.expense.findFirst({
      where: { id },
    });
    return expense;
  } catch (error) {
    throw new Error("Could not get expense");
  }
}

export async function updateExpense(id: string, expenseData: Expense) {
  try {
    return await prisma.expense.update({
      where: { id },
      data: {
        title: expenseData.title,
        amount: +expenseData.amount,
        date: new Date(expenseData.date),
      },
    });
  } catch (error) {
    throw new Error("Could not update expense");
  }
}

export async function deleteExpense(id: string) {
  try {
    await prisma.expense.delete({
      where: { id },
    });
  } catch (error) {
    throw new Error("Could not delete expense");
  }
}
