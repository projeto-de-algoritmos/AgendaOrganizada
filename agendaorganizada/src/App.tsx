import React, { useState } from 'react';
import ITask from './utils/itask';
import './index.css';


// Quais são os dados da agenda?
// Tarefa: Nome, Duração, Prazo máximo (campo date)

// Features:
// Cadastrar uma nova tarefa
// Remover uma tarefa



const App: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [duration, setDuration] = useState<string>('');
  const [deadline, setDeadline] = useState<string>('');
  const [tasks, setTasks] = useState<Array<ITask>>([]);
  let id: number = 0;

  // const printaDados = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  //   e.preventDefault();
  //   console.log(name);
  //   console.log(duration);
  //   console.log(deadline);
  // };

  const submitTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const tasksArray = tasks;
    const task: ITask = {
      id,
      name,
      duration,
      deadline,
    };
    id += 1;
    tasksArray.push(task);
    setTasks(tasksArray);
    setName('');
    setDuration('');
    setDeadline('');
  };

  return (
    <div className="App">
      <form onSubmit={(e) => submitTask(e)}>
        <label htmlFor="name">
          Digite o nome da tarefa:
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            placeholder="Nome da tarefa"
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label htmlFor="duration">
          Insira a duração da tarefa:
          <input
            type="time"
            name="duration"
            id="duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </label>
        <label htmlFor="deadline">
          Insira o prazo da tarefa:
          <input
            type="date"
            name="deadline"
            id="deadline"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
        </label>
        <button type="submit">Cadastrar</button>
      </form>
      <div className="taskscontainer">
        <div className="tasks">
          <div className="task">
            <p><strong>Tarefa:</strong></p>
            <p><strong>Duração:</strong></p>
            <p><strong>Prazo:</strong></p>
          </div>
          {tasks.map((task) => (
            <div key={task.id} className="task">
              <p>{task.name}</p>
              <p>{task.duration}</p>
              <p>{task.deadline}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
