export {};
declare global {
  type JE<E extends keyof JSX.IntrinsicElements> = JSX.IntrinsicElements[E] & {
    condition?: boolean;
  };
  type El<E extends keyof JSX.IntrinsicElements> = JE<E> & {
    as: E;
  };

  interface Project {
    id: string;
    task?: string;
    estimateAt?: string;
    description?: string;
    completedAt?: string;
    varianceAnalysis?: string;
    newTask: boolean;
  }
}
