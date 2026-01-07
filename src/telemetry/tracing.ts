import { randomUUID } from "node:crypto";

export interface TraceContext {
  traceId: string;
  span: string;
  startedAt: number;
}

export function startTrace(span: string): TraceContext {
  return {
    traceId: randomUUID(),
    span,
    startedAt: Date.now(),
  };
}

export function endTrace(trace: TraceContext) {
  return {
    traceId: trace.traceId,
    span: trace.span,
    durationMs: Date.now() - trace.startedAt,
  };
}
