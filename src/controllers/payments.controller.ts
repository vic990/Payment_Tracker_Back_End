import { Payments } from "../entities/payments";
import { Request, Response } from "express";
import { AppDataSource } from "../database/data-source";

export async function getPayments(request: Request, response: Response) {
  const repositoryPayments = AppDataSource.getRepository(Payments);

  const payments = await repositoryPayments.find();

  response.send({
    message: payments.length === 0 ? "No hay pagos registrados" : payments,
  });
}

export async function getPaymentsById(request: Request, response: Response) {
  const repositoryPayments = await AppDataSource.getRepository(
    Payments
  ).findOne({
    where: { id: parseInt(request.params.id) },
  });

  response.send(
    repositoryPayments ? repositoryPayments : { message: "Pago no encontrado" }
  );
}

export async function insertPayments(request: Request, response: Response) {
  let paymentsaved;
  const repositoryPayments = AppDataSource.getRepository(Payments);

  const newpayment = await AppDataSource.getRepository(Payments).create(
    request.body
  );
  paymentsaved = await AppDataSource.getRepository(Payments).save(newpayment);

  response.send({
    message: paymentsaved ? "Pago realizado" : "No se pudo realizar el pago",
  });
}

export async function updatePayment(request: Request, response: Response) {
  let updatedPayment;
  const repositoryPayment = await AppDataSource.getRepository(Payments).findOne(
    {
      where: { id: parseInt(request.params.id) },
    }
  );

  AppDataSource.getRepository(Payments).merge(repositoryPayment, request.body);
  updatedPayment = (
    await AppDataSource.getRepository(Payments).save(repositoryPayment)
  ).amount;

  response.send({
    message: updatePayment
      ? "Pago actualizado"
      : "No se pudo actualizar el pago",
  });
}

export async function deletePayment(request: Request, response: Response) {
  const deletedPayment = await AppDataSource.getRepository(Payments).delete(
    parseInt(request.params.id)
  );

  response.send({
    message:
      deletedPayment.affected != 0
        ? "Pago eliminado"
        : "El pago no se pudo eliminar",
  });
}
