import React, { useState } from 'react';
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

  const printaDados = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    console.log(name);
    console.log(duration);
    console.log(deadline);
  };

  return (
    <div className="App">
      <form>
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
        <button type="submit" onClick={(e) => printaDados(e)}>Cadastrar</button>
      </form>
      <div className="taskscontainer">
        <div className="tasks">
          <div className="task">
            <p><strong>Tarefa:</strong></p>
            <p><strong>Duração:</strong></p>
            <p><strong>Prazo:</strong></p>
          </div>
          <div className="task">
            <p>Trabalho de PA</p>
            <p>24h</p>
            <p>22/03/2021-10:00:00</p>
          </div>
          <div className="task">
            <p>Trabalho de PA</p>
            <p>24h</p>
            <p>22/03/2021-10:00:00</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
