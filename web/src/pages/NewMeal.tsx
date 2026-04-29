import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { api } from '../api';

export function NewMeal() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [dateStr, setDateStr] = useState('');
  const [timeStr, setTimeStr] = useState('');
  const [isOnDiet, setIsOnDiet] = useState<boolean | null>(null);

  async function handleSave() {
    if (!name || !description || !dateStr || !timeStr || isOnDiet === null) {
      alert('Preencha todos os campos!');
      return;
    }

    const [year, month, day] = dateStr.split('-');
    const [hours, minutes] = timeStr.split('-');
    const date = new Date(Number(year), Number(month) - 1, Number(day), Number(hours || timeStr.split(':')[0]), Number(minutes || timeStr.split(':')[1]));

    await api.post('/meals', {
      name,
      description,
      isOnDiet,
      date: date.toISOString(),
    });

    navigate('/');
  }

  return (
    <div style={{ backgroundColor: 'var(--color-gray-500)', minHeight: '100vh' }}>
      <div className="page-header">
        <ArrowLeft size={24} color="var(--color-gray-200)" style={{ cursor: 'pointer', position: 'absolute', left: '1.5rem' }} onClick={() => navigate('/')} />
        <h1>Nova refeição</h1>
      </div>

      <div className="page-content">
        <div className="input-group">
          <label>Nome</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} />
        </div>

        <div className="input-group">
          <label>Descrição</label>
          <textarea rows={4} value={description} onChange={e => setDescription(e.target.value)}></textarea>
        </div>

        <div className="row">
          <div className="input-group">
            <label>Data</label>
            <input type="date" value={dateStr} onChange={e => setDateStr(e.target.value)} />
          </div>
          <div className="input-group">
            <label>Hora</label>
            <input type="time" value={timeStr} onChange={e => setTimeStr(e.target.value)} />
          </div>
        </div>

        <div className="input-group">
          <label>Está dentro da dieta?</label>
          <div className="radio-group">
            <button 
              className={`radio-btn ${isOnDiet === true ? 'active green' : ''}`}
              onClick={() => setIsOnDiet(true)}
            >
              <div className="circle green"></div> Sim
            </button>
            <button 
              className={`radio-btn ${isOnDiet === false ? 'active red' : ''}`}
              onClick={() => setIsOnDiet(false)}
            >
              <div className="circle red"></div> Não
            </button>
          </div>
        </div>

        <div className="bottom-buttons">
          <button className="btn btn-primary" onClick={handleSave}>Cadastrar refeição</button>
        </div>
      </div>
    </div>
  );
}
