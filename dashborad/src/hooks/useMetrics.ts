import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export interface DashboardMetrics {
  labels: string[];
  conversion: number[];
  cancellation: number[];
  conversion_latest: number;
  cancellation_latest: number;
  total_counts: number[];
  converted_counts: number[];
  canceled_counts: number[];
}

// Função que chama o backend
const fetchMetrics = async (): Promise<DashboardMetrics> => {
  const { data } = await api.get('/api/dashboard/metrics/');
  return data;
};

// O Hook que você vai usar no componente
export const useDashboardMetrics = () => {
  return useQuery({
    queryKey: ['dashboard-metrics'],
    queryFn: fetchMetrics,
    refetchInterval: 1000 * 60 * 5, // Atualiza a cada 5 minutos
  });
};