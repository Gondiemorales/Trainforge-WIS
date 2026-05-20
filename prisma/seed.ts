// Cargamos las variables del archivo .env.
// Aquí está DATABASE_URL, que conecta con Neon.
import "dotenv/config";

// Importamos bcryptjs para cifrar contraseñas.
// Nunca guardaremos contraseñas en texto normal.
import bcrypt from "bcryptjs";

// Importamos el adaptador de Neon.
// Esto permite que Prisma se conecte correctamente a nuestra base de datos Neon.
import { PrismaNeon } from "@prisma/adapter-neon";

// Importamos Prisma Client y los enums generados desde nuestro schema.
import {
  PrismaClient,
  Role,
  ExperienceLevel,
  FitnessGoal,
  DifficultyLevel,
  SubscriptionPlan,
  SubscriptionStatus,
  TrainingPlanStatus,
  AppointmentType,
  AppointmentStatus,
  CaloricGoal,
  NutritionPlanStatus,
} from "../src/generated/prisma/client";

// Creamos el adaptador usando la URL con pooler de Neon.
// Esta URL viene del archivo .env.
const adapter = new PrismaNeon({
  connectionString: process.env.DATABASE_URL!,
});

// Creamos Prisma Client para poder crear datos en la base de datos.
const prisma = new PrismaClient({
  adapter,
});

// Esta función crea una fecha futura.
// La usamos para que las citas de prueba no queden en el pasado.
function createFutureDate(daysFromToday: number, hour: number) {
  const date = new Date();

  date.setDate(date.getDate() + daysFromToday);
  date.setHours(hour, 0, 0, 0);

  return date;
}

// Esta función borra los datos existentes.
// Sirve para que el seed pueda ejecutarse varias veces sin duplicar datos.
async function cleanDatabase() {
  await prisma.nutritionPlan.deleteMany();
  await prisma.message.deleteMany();
  await prisma.progressLog.deleteMany();
  await prisma.appointment.deleteMany();
  await prisma.planExercise.deleteMany();
  await prisma.trainingPlan.deleteMany();
  await prisma.exerciseDictionary.deleteMany();
  await prisma.subscription.deleteMany();
  await prisma.clientProfile.deleteMany();
  await prisma.trainerProfile.deleteMany();
  await prisma.user.deleteMany();
}

// Esta función crea los datos iniciales de TrainForge.
// Incluye usuarios, perfiles, ejercicios, un plan, una cita y registros de progreso.
async function main() {
  await cleanDatabase();

  // Ciframos una contraseña común para los usuarios demo.
  // La contraseña real será: password123
  const passwordHash = await bcrypt.hash("password123", 10);

  // Creamos el usuario administrador.
  const adminUser = await prisma.user.create({
    data: {
      name: "Admin Demo",
      email: "admin@trainforge.com",
      passwordHash,
      role: Role.ADMIN,
    },
  });

  // Creamos el usuario entrenador.
  const trainerUser = await prisma.user.create({
    data: {
      name: "Alex Trainer",
      email: "trainer@trainforge.com",
      passwordHash,
      role: Role.TRAINER,
    },
  });

  // Creamos el usuario cliente.
  const clientUser = await prisma.user.create({
    data: {
      name: "Jamie Client",
      email: "client@trainforge.com",
      passwordHash,
      role: Role.CLIENT,
    },
  });

  // Creamos el perfil específico del entrenador.
  const trainerProfile = await prisma.trainerProfile.create({
    data: {
      userId: trainerUser.id,
      specialty: "Strength Training",
      bio: "Personal trainer focused on strength, muscle gain and long-term progress.",
      hourlyRate: "75.00",
      availability: {
        monday: ["09:00", "10:00", "15:00"],
        wednesday: ["11:00", "16:00"],
        friday: ["09:00", "14:00"],
      },
    },
  });

  // Creamos una suscripción SaaS para el entrenador.
  await prisma.subscription.create({
    data: {
      trainerId: trainerProfile.id,
      plan: SubscriptionPlan.PRO,
      status: SubscriptionStatus.ACTIVE,
      monthlyPrice: "29.99",
    },
  });

  // Creamos el perfil específico del cliente.
  const clientProfile = await prisma.clientProfile.create({
    data: {
      userId: clientUser.id,
      trainerId: trainerProfile.id,
      goal: FitnessGoal.MUSCLE_GAIN,
      goalDescription: "Build muscle and improve strength over the next 12 weeks.",
      experienceLevel: ExperienceLevel.INTERMEDIATE,
      preferredAppointmentTimes: {
        preferredDays: ["monday", "wednesday"],
        preferredHours: ["09:00", "10:00"],
      },
      notes: "Client prefers structured strength sessions and clear weekly goals.",
      age: 24,
      heightCm: "178.00",
      currentWeightKg: "82.50",
    },
  });

  // Creamos ejercicios de ejemplo para el catálogo.
  const benchPress = await prisma.exerciseDictionary.create({
    data: {
      name: "Bench Press",
      muscleGroup: "Chest",
      description: "Compound upper-body exercise focused on chest, shoulders and triceps.",
      instructions: "Keep your feet planted, lower the bar under control, and press up strongly.",
      difficulty: DifficultyLevel.INTERMEDIATE,
      defaultSets: 4,
      defaultReps: 8,
      loadScheme: {
        beginner: "3 sets of 10 reps with light weight",
        intermediate: "4 sets of 8 reps at moderate intensity",
        advanced: "5 sets of 5 reps at heavy intensity",
      },
      createdByTrainerId: trainerProfile.id,
    },
  });

  // Creamos otro ejercicio de ejemplo.
  const squat = await prisma.exerciseDictionary.create({
    data: {
      name: "Back Squat",
      muscleGroup: "Legs",
      description: "Lower-body compound exercise focused on quadriceps, glutes and core.",
      instructions: "Keep your chest up, brace your core, and reach proper depth safely.",
      difficulty: DifficultyLevel.INTERMEDIATE,
      defaultSets: 4,
      defaultReps: 6,
      loadScheme: {
        beginner: "3 sets of 8 reps with light weight",
        intermediate: "4 sets of 6 reps at moderate intensity",
        advanced: "5 sets of 5 reps at heavy intensity",
      },
      createdByTrainerId: trainerProfile.id,
    },
  });

  // Creamos un tercer ejercicio de ejemplo.
  const deadlift = await prisma.exerciseDictionary.create({
    data: {
      name: "Deadlift",
      muscleGroup: "Back",
      description: "Full-body strength movement focused on posterior chain development.",
      instructions: "Keep the bar close, brace your core, and drive through your legs.",
      difficulty: DifficultyLevel.ADVANCED,
      defaultSets: 3,
      defaultReps: 5,
      loadScheme: {
        beginner: "3 sets of 5 reps with technique focus",
        intermediate: "3 sets of 5 reps at moderate-heavy intensity",
        advanced: "5 sets of 3 reps at heavy intensity",
      },
      createdByTrainerId: trainerProfile.id,
    },
  });

  // Creamos un plan de entrenamiento para el cliente.
  const trainingPlan = await prisma.trainingPlan.create({
    data: {
      trainerId: trainerProfile.id,
      clientId: clientProfile.id,
      title: "12 Week Strength Foundation",
      description: "A simple strength-focused plan designed to improve main compound lifts.",
      status: TrainingPlanStatus.ACTIVE,
      startDate: new Date(),
      endDate: createFutureDate(84, 12),
    },
  });

  // Añadimos Bench Press al plan.
  const benchPlanExercise = await prisma.planExercise.create({
    data: {
      trainingPlanId: trainingPlan.id,
      exerciseId: benchPress.id,
      position: 1,
      dayOfWeek: 1,
      exerciseNameSnapshot: benchPress.name,
      description: "Main upper-body strength movement.",
      sets: 4,
      reps: 8,
      restSeconds: 120,
      intensity: "RPE 7-8",
      difficulty: DifficultyLevel.INTERMEDIATE,
      notes: "Focus on control and stable bar path.",
    },
  });

  // Añadimos Squat al plan.
  const squatPlanExercise = await prisma.planExercise.create({
    data: {
      trainingPlanId: trainingPlan.id,
      exerciseId: squat.id,
      position: 2,
      dayOfWeek: 3,
      exerciseNameSnapshot: squat.name,
      description: "Main lower-body strength movement.",
      sets: 4,
      reps: 6,
      restSeconds: 150,
      intensity: "RPE 8",
      difficulty: DifficultyLevel.INTERMEDIATE,
      notes: "Keep technique consistent before increasing weight.",
    },
  });

  // Añadimos Deadlift al plan.
  const deadliftPlanExercise = await prisma.planExercise.create({
    data: {
      trainingPlanId: trainingPlan.id,
      exerciseId: deadlift.id,
      position: 3,
      dayOfWeek: 5,
      exerciseNameSnapshot: deadlift.name,
      description: "Posterior chain strength movement.",
      sets: 3,
      reps: 5,
      restSeconds: 180,
      intensity: "RPE 8",
      difficulty: DifficultyLevel.ADVANCED,
      notes: "Prioritise safe form and controlled setup.",
    },
  });

  // Creamos una cita de ejemplo entre entrenador y cliente.
  await prisma.appointment.create({
    data: {
      trainerId: trainerProfile.id,
      clientId: clientProfile.id,
      title: "Weekly Progress Check-in",
      type: AppointmentType.VIDEO_CALL,
      status: AppointmentStatus.SCHEDULED,
      startTime: createFutureDate(3, 10),
      endTime: createFutureDate(3, 11),
      meetingUrl: "https://meet.google.com/demo-trainforge",
      notes: "Review weekly progress and adjust training loads.",
    },
  });

  // Creamos un registro de progreso para Bench Press.
  await prisma.progressLog.create({
    data: {
      clientId: clientProfile.id,
      exerciseId: benchPress.id,
      trainingPlanId: trainingPlan.id,
      planExerciseId: benchPlanExercise.id,
      date: createFutureDate(-14, 9),
      weightKg: "60.00",
      reps: 8,
      sets: 4,
      bodyWeightKg: "82.50",
      notes: "Good control, slight difficulty on final set.",
    },
  });

  // Creamos otro registro de progreso para Bench Press.
  await prisma.progressLog.create({
    data: {
      clientId: clientProfile.id,
      exerciseId: benchPress.id,
      trainingPlanId: trainingPlan.id,
      planExerciseId: benchPlanExercise.id,
      date: createFutureDate(-7, 9),
      weightKg: "62.50",
      reps: 8,
      sets: 4,
      bodyWeightKg: "82.80",
      notes: "Improved speed and better technique.",
    },
  });

  // Creamos un registro de progreso para Squat.
  await prisma.progressLog.create({
    data: {
      clientId: clientProfile.id,
      exerciseId: squat.id,
      trainingPlanId: trainingPlan.id,
      planExerciseId: squatPlanExercise.id,
      date: createFutureDate(-5, 10),
      weightKg: "90.00",
      reps: 6,
      sets: 4,
      bodyWeightKg: "82.80",
      notes: "Depth was consistent.",
    },
  });

  // Creamos un registro de progreso para Deadlift.
  await prisma.progressLog.create({
    data: {
      clientId: clientProfile.id,
      exerciseId: deadlift.id,
      trainingPlanId: trainingPlan.id,
      planExerciseId: deadliftPlanExercise.id,
      date: createFutureDate(-3, 11),
      weightKg: "120.00",
      reps: 5,
      sets: 3,
      bodyWeightKg: "83.00",
      notes: "Good session, keep same weight next week.",
    },
  });

  // Creamos un mensaje de ejemplo del entrenador al cliente.
  await prisma.message.create({
    data: {
      senderId: trainerUser.id,
      receiverId: clientUser.id,
      content: "Great work this week. Remember to log your Bench Press after the next session.",
    },
  });

  // Creamos un plan nutricional de ejemplo generado y revisado por el entrenador.
  await prisma.nutritionPlan.create({
    data: {
      trainerId: trainerProfile.id,
      clientId: clientProfile.id,
      trainingPlanId: trainingPlan.id,
      title: "Muscle Gain Weekly Meal Plan",
      status: NutritionPlanStatus.PUBLISHED,
      caloricGoal: CaloricGoal.SURPLUS,
      macroSplit: {
        protein: "30%",
        carbs: "45%",
        fats: "25%",
      },
      allergies: "None",
      dietaryPreferences: "High protein, balanced meals",
      aiPromptData: {
        currentWeightKg: 82.5,
        goal: "muscle gain",
        mealsPerDay: 4,
      },
      meals: {
        monday: [
          {
            meal: "Breakfast",
            name: "Oats with Greek yoghurt and banana",
            estimatedCalories: 650,
          },
          {
            meal: "Lunch",
            name: "Chicken rice bowl",
            estimatedCalories: 800,
          },
          {
            meal: "Dinner",
            name: "Salmon with potatoes and vegetables",
            estimatedCalories: 750,
          },
        ],
      },
      publishedAt: new Date(),
    },
  });

  // Mostramos las cuentas demo en la terminal.
  console.log("Seed completed successfully.");
  console.log("");
  console.log("Demo accounts:");
  console.log("Admin:   admin@trainforge.com / password123");
  console.log("Trainer: trainer@trainforge.com / password123");
  console.log("Client:  client@trainforge.com / password123");

  // Evitamos que TypeScript piense que estas variables no se usan.
  console.log("");
  console.log(`Created admin user: ${adminUser.email}`);
}

// Ejecutamos el seed.
// Si hay un error, lo mostramos en la terminal.
main()
  .catch((error) => {
    console.error("Seed failed:");
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });