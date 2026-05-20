import { IcoAI, IcoCal, IcoChart, IcoLock, IcoPlan, IcoUsers } from "./landing-icons";

export type FeatureItem = {
  icon: React.ReactNode;
  title: string;
  desc: string;
};

export type StepItem = {
  n: string;
  title: string;
  desc: string;
};

export const FEATURES: FeatureItem[] = [
  {
    icon: <IcoUsers />,
    title: "Client Management",
    desc: "Full client profiles with goals, body metrics, experience levels and preferred schedules. Everything in one place.",
  },
  {
    icon: <IcoPlan />,
    title: "Training Plans",
    desc: "Build personalised programs with exercises, sets, reps and intensity levels. Assign and manage with one click.",
  },
  {
    icon: <IcoCal />,
    title: "Smart Calendar",
    desc: "Schedule video calls, in-person sessions and consultations. Full monthly view with colour-coded appointments.",
  },
  {
    icon: <IcoChart />,
    title: "Progress Tracking",
    desc: "Log weights, reps and sets per session. Monitor each client's evolution with a detailed performance history.",
  },
  {
    icon: <IcoAI />,
    title: "AI Nutrition Plans",
    desc: "Generate complete 7-day meal plans powered by Gemini AI. Review and publish tailored plans for every client.",
  },
  {
    icon: <IcoLock />,
    title: "Secure by Design",
    desc: "Role-based access for admins and trainers. Your data is isolated, encrypted and never shared.",
  },
];

export const STEPS: StepItem[] = [
  {
    n: "01",
    title: "Create your account",
    desc: "Sign up as a trainer in seconds. No setup complexity, no hidden configuration.",
  },
  {
    n: "02",
    title: "Add your clients",
    desc: "Build rich client profiles with goals, body data and preferred session times.",
  },
  {
    n: "03",
    title: "Build programs",
    desc: "Assign personalised training plans built from your own exercise catalogue.",
  },
  {
    n: "04",
    title: "Track everything",
    desc: "Log sessions, monitor progress, schedule sessions and generate AI nutrition plans.",
  },
];

export const STATS = [
  { v: "100%", l: "Free to start" },
  { v: "<2 min", l: "To first client" },
  { v: "7-day", l: "AI meal plans" },
  { v: "∞", l: "Clients & plans" },
];
