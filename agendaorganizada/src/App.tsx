import React, { useState, useEffect } from 'react';
import ITask from './utils/itask';
import minimizeLateness from './utils/minimizeLateness';
import transformDate from './utils/transformDate';
import getTodayDate from './utils/getTodayDate';
import './index.css';

// Quais são os dados da agenda?
// Tarefa: Nome, Duração, Prazo máximo (campo date)

// Features:
// Cadastrar uma nova tarefa
// Remover uma tarefa

const App: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [duration, setDuration] = useState<number>(0);
  const [deadline, setDeadline] = useState<string>('');
  const [deadlineHour, setDeadlineHour] = useState<string>('');
  const [tasks, setTasks] = useState<Array<ITask>>([]);
  const [lateness, setLateness] = useState<number>(0);

  useEffect(() => {
    const tasksArray: ITask[] = JSON.parse(localStorage.getItem('tasksArray') || '[]');
    setLateness(minimizeLateness(tasksArray));
    setTasks(tasksArray);
  }, []);

  const deleteSchedule = () => {
    localStorage.removeItem('tasksArray');
    setTasks([]);
  };

  const submitTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const tasksArray = tasks;
    const task: ITask = {
      name,
      duration,
      transformedDeadline: transformDate(deadline),
      deadlineHour,
      deadline,
    };
    tasksArray.push(task);
    setLateness(minimizeLateness(tasksArray));
    setTasks(tasksArray);
    setName('');
    setDuration(0);
    setDeadline('');

    localStorage.setItem('tasksArray', JSON.stringify(tasksArray));
  };

  return (
    <div className="App">
      <form onSubmit={(e) => submitTask(e)}>
        <label htmlFor="name">
          Nome da tarefa:
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            placeholder="Nome da tarefa"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label htmlFor="duration">
          Duração da tarefa(em horas):
          <input
            type="number"
            name="duration"
            id="duration"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            required
            min="0"
          />
        </label>
        <label htmlFor="deadline">
          Prazo da tarefa:
          <input
            type="date"
            name="deadline"
            id="deadline"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            required
            min={getTodayDate()}
          />
        </label>
        <label htmlFor="deadlineHour">
          Horário de entrega:
          <input
            type="time"
            name="deadline_hour"
            id="deadline_hour"
            value={deadlineHour}
            onChange={(e) => setDeadlineHour(e.target.value)}
            required
          />
        </label>
        <button type="submit">Cadastrar</button>
      </form>
      <div className="taskscontainer">
        <div className="tasksheader">
          <h1>
            Atraso mínimo:
            {' '}
            {lateness}
            h
          </h1>
          <button onClick={deleteSchedule} type="button">Limpar agenda</button>
        </div>
        <div className="tasks">
          <div className="task">
            <p><strong>Tarefa:</strong></p>
            <p><strong>Duração:</strong></p>
            <p><strong>Prazo:</strong></p>
          </div>
          {tasks.map((task) => (
            <div key={task.name} className="task">
              <p>{task.name}</p>
              <p>
                {task.duration}
                h
              </p>
              <p>{`${task.transformedDeadline} ${task.deadlineHour}`}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
