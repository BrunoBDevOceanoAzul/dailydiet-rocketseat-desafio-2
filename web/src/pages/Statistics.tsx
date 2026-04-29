import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { api } from '../api';

export function Statistics() {
  const navigate = useNavigate();
  const [metrics, setMetrics] = useState<any>(null);

  useEffect(() => {
    async function loadMetrics() {
      try {
        const response = await api.get(`/meals/metrics`);
        setMetrics(response.data);
      } catch (err) {
        navigate('/');
      }
    }
    loadMetrics();
  }, [navigate]);

  if (!metrics) return null;

  const isHealthy = metrics.totalMeals > 0 && (metrics.totalMealsOnDiet / metrics.totalMeals) >= 0.5;
  const percent = metrics.totalMeals > 0 ? (metrics.totalMealsOnDiet / metrics.totalMeals) * 100 : 0;

  return (
    <div style={{ backgroundColor: isHealthy ? 'var(--color-green-light)' : 'var(--color-red-light)', minHeight: '100vh' }}>
      <div className="page-header" style={{ padding: '3rem 1.5rem', flexDirection: 'column', gap: '0.5rem' }}>
        <ArrowLeft size={24} color={isHealthy ? 'var(--color-green-dark)' : 'var(--color-red-dark)'} style={{ cursor: 'pointer', position: 'absolute', top: '2rem', left: '1.5rem' }} onClick={() => navigate('/')} />
        <h1 style={{ fontSize: '2rem', fontWeight: 700, margin: 0 }}>{percent.toFixed(2).replace('.', ',')}%</h1>
        <p style={{ color: 'var(--color-gray-200)', fontSize: '0.875rem' }}>das refeições dentro da dieta</p>
      </div>

      <div className="page-content" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
        <h3 style={{ fontSize: '0.875rem', color: 'var(--color-gray-100)', marginBottom: '1rem' }}>Estatísticas gerais</h3>
        
        <div className="card" style={{ width: '100%' }}>
          <h2>{metrics.bestOnDietSequence}</h2>
          <p>melhor sequência de pratos dentro da dieta</p>
        </div>
        
        <div className="card" style={{ width: '100%' }}>
          <h2>{metrics.totalMeals}</h2>
          <p>refeições registradas</p>
        </div>

        <div className="row" style={{ width: '100%' }}>
          <div className="card green">
            <h2>{metrics.totalMealsOnDiet}</h2>
            <p>refeições dentro da dieta</p>
          </div>
          <div className="card red">
            <h2>{metrics.totalMealsOffDiet}</h2>
            <p>refeições fora da dieta</p>
          </div>
        </div>
      </div>
    </div>
  );
}
