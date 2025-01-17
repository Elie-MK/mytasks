export type RootStackParamList = {
  Main: undefined;
  CreateTask: { datas?: number[]; idTask?: number };
  Coworker: { datas: number[] };
  Onboarding: undefined;
  SignIn: undefined;
  SignUp: undefined;
  HomeMain: undefined;
  TaskDetail: { idTask: number };
};
