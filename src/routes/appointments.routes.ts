import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import AppointmentsRepository from '../repositories/Appointments.repository';
import CreateAppointmentService from '../services/CreateAppointment.service';
import esnureAuthenticated from '../middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

appointmentsRouter.use(esnureAuthenticated);

appointmentsRouter.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentsRepository.find();

  return response.json(appointments);
});

appointmentsRouter.post('/', async (request, response) => {
  try {
    const { provider_id, date } = request.body;

    const parsedDate = parseISO(date);

    const appointmentCreate = new CreateAppointmentService();

    const appointment = await appointmentCreate.execute({
      date: parsedDate,
      provider_id,
    });

    return response.json(appointment);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default appointmentsRouter;
