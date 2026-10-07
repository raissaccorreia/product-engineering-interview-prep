type Task = {
  id: string;
  done: boolean;
};

const tasks: Task[] = [
  { id: "a", done: false },
  { id: "b", done: true },
  { id: "c", done: false },
];

const pending = tasks.filter((task) => !task.done);
const snapshot = tasks.map((task) => ({ ...task }));

pending[0]!.done = true;

console.log(tasks.map((task) => task.done));
console.log(pending.map((task) => task.id));
console.log(snapshot.map((task) => task.done));
