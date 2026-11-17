#!/usr/bin/env bash
set -euo pipefail
: "${IMAGE:?IMAGE required}"
: "${K8S_NAMESPACE:?K8S_NAMESPACE required}"
: "${JOB_NAME:?JOB_NAME required}"
export TEST_GREP="${TEST_GREP:-@smoke}"
export RUN_FAILURE_TEST="${RUN_FAILURE_TEST:-false}"
mkdir -p collected
cleanup() {
  pod=$(kubectl -n "$K8S_NAMESPACE" get pod -l "job-name=$JOB_NAME" -o jsonpath='{.items[0].metadata.name}' 2>/dev/null || true)
  if [[ -n "$pod" ]]; then
    kubectl -n "$K8S_NAMESPACE" logs "$pod" > collected/pod.log 2>&1 || true
    kubectl -n "$K8S_NAMESPACE" cp "$pod:/app/test-results/." collected/test-results -c playwright 2>/dev/null || true
    kubectl -n "$K8S_NAMESPACE" cp "$pod:/app/playwright-report/." collected/playwright-report -c playwright 2>/dev/null || true
  fi
}
trap cleanup EXIT
mkdir -p collected/test-results collected/playwright-report
envsubst '${IMAGE} ${K8S_NAMESPACE} ${JOB_NAME} ${TEST_GREP} ${RUN_FAILURE_TEST}' < k8s/job.yaml > collected/job-rendered.yaml
kubectl apply -f collected/job-rendered.yaml
kubectl -n "$K8S_NAMESPACE" wait --for=condition=complete "job/$JOB_NAME" --timeout=1800s
