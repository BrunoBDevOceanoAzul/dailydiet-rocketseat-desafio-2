import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, ArrowUpRight, Utensils } from 'lucide-react';
import { format } from 'date-fns';
import { api } from '../api';

interface Meal {
  id: string;
  name: string;
  date: number;
  is_on_diet: boolean;
}

export function Home() {
  const navigate = useNavigate();
  const [meals, setMeals] = useState<Meal[]>([]);
  const [percent, setPercent] = useState<number>(0);
  const [isHealthy, setIsHealthy] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const metricsRes = await api.get('/meals/metrics');
        const { totalMeals, totalMealsOnDiet } = metricsRes.data;
        
        if (totalMeals > 0) {
          const p = (totalMealsOnDiet / totalMeals) * 100;
          setPercent(p);
          setIsHealthy(p >= 50);
        }

        const mealsRes = await api.get('/meals');
        setMeals(mealsRes.data.meals);
      } catch (error: any) {
        if (error.response?.status === 401) {
          // Auto create a user just for demo purposes if no cookie
          await api.post('/users', { name: 'Bruno', email: 'bruno@example.com' }).catch(() => {});
          const metricsRes = await api.get('/meals/metrics');
          setPercent(metricsRes.data.totalMeals > 0 ? (metricsRes.data.totalMealsOnDiet / metricsRes.data.totalMeals) * 100 : 0);
          const mealsRes = await api.get('/meals');
          setMeals(mealsRes.data.meals);
        }
      }
    }
    fetchData();
  }, []);

  const groupedMeals = meals.reduce((acc, meal) => {
    const dateStr = format(new Date(meal.date), 'dd.MM.yy');
    if (!acc[dateStr]) acc[dateStr] = [];
    acc[dateStr].push(meal);
    return acc;
  }, {} as Record<string, Meal[]>);

  return (
    <div className="container">
      <header className="header">
        <div className="header-logo">
          <Utensils color="#1B1D1E" />
          <span>Daily Diet</span>
        </div>
        <img src="https://github.com/BrunoBDevOceanoAzul.png" alt="Profile" className="avatar" />
      </header>

      <div 
        className={`card ${isHealthy ? 'green' : 'red'}`} 
        onClick={() => navigate('/stats')}
        style={{ cursor: 'pointer' }}
      >
        <ArrowUpRight className="icon-top-right" color={isHealthy ? 'var(--color-green-dark)' : 'var(--color-red-dark)'} />
        <h2>{percent.toFixed(2).replace('.', ',')}%</h2>
        <p>das refeições dentro da dieta</p>
      </div>

      <div className="meal-list-section">
        <h3>Refeições</h3>
        <button className="btn btn-primary" onClick={() => navigate('/new')}>
          <Plus size={18} />
          Nova refeição
        </button>

        {Object.entries(groupedMeals).map(([date, dateMeals]) => (
          <div key={date}>
            <div className="meal-date">{date}</div>
            {dateMeals.map(meal => (
              <div key={meal.id} className="meal-item" onClick={() => navigate(`/meal/${meal.id}`)}>
                <span className="meal-time">{format(new Date(meal.date), 'HH:mm')}</span>
                <div className="meal-divider"></div>
                <span className="meal-name">{meal.name}</span>
                <div className={`circle ${meal.is_on_diet ? 'green' : 'red'}`}></div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
