import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Pencil, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { api } from '../api';

export function MealDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [meal, setMeal] = useState<any>(null);

  useEffect(() => {
    async function loadMeal() {
      try {
        const response = await api.get(`/meals/${id}`);
        setMeal(response.data.meal);
      } catch (err) {
        navigate('/');
      }
    }
    loadMeal();
  }, [id, navigate]);

  async function handleDelete() {
    if (confirm('Deseja realmente excluir o registro da refeição?')) {
      await api.delete(`/meals/${id}`);
      navigate('/');
    }
  }

  if (!meal) return null;

  const bgClass = meal.is_on_diet ? 'bg-green' : 'bg-red';

  return (
    <div style={{ backgroundColor: meal.is_on_diet ? 'var(--color-green-light)' : 'var(--color-red-light)', minHeight: '100vh' }}>
      <div className="page-header">
        <ArrowLeft size={24} color="var(--color-gray-200)" style={{ cursor: 'pointer', position: 'absolute', left: '1.5rem' }} onClick={() => navigate('/')} />
        <h1>Refeição</h1>
      </div>

      <div className="page-content">
        <h2 className="details-name">{meal.name}</h2>
        <p className="details-description">{meal.description}</p>

        <h3 className="details-label">Data e hora</h3>
        <p className="details-description">{format(new Date(meal.date), "dd/MM/yyyy 'às' HH:mm")}</p>

        <div className="tag">
          <div className={`circle ${meal.is_on_diet ? 'green' : 'red'}`}></div>
          {meal.is_on_diet ? 'dentro da dieta' : 'fora da dieta'}
        </div>

        <div className="bottom-buttons">
          <button className="btn btn-primary" onClick={() => alert('Edição em breve!')}>
            <Pencil size={18} />
            Editar refeição
          </button>
          <button className="btn btn-outline" onClick={handleDelete}>
            <Trash2 size={18} />
            Excluir refeição
          </button>
        </div>
      </div>
    </div>
  );
}
