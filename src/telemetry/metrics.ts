export type MetricLabels = Record<string, string>;

export function increment(
  metric: string,
  labels: MetricLabels = {}
) {
  // placeholder futuro (Prometheus / OTEL)
  // por enquanto apenas contrato
}

export function timing(
  metric: string,
  durationMs: number,
  labels: MetricLabels = {}
) {
  // idem
}
