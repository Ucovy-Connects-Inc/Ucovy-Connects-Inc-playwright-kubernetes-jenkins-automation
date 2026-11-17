# Two-week UCI-288 delivery plan

## Week 1: New framework and Kubernetes packaging
1. Create independent TypeScript Playwright repository, configuration and Page Object Model.
2. Implement SauceDemo positive/negative login, inventory, cart and checkout tests.
3. Add JUnit/HTML reporting, trace-on-failure and screenshot-on-failure.
4. Create Dockerfile with pinned Playwright browser runtime and non-root execution.
5. Create parameterized Kubernetes Job with CPU/memory limits, deadline, TTL and disabled token mounting.
6. Build and smoke-test image locally; publish to approved registry and validate Kubernetes Job once access is granted.

## Week 2: Jenkins CI/CD and acceptance
1. Configure Jenkins kubeconfig credential and namespace-scoped RBAC.
2. Integrate Jenkinsfile and post-deployment downstream trigger.
3. Collect JUnit, HTML, traces and Kubernetes Pod logs as Jenkins artifacts.
4. Verify successful run and intentional failure run propagate correct Jenkins status.
5. Test rerun, timeout, missing image, and unreachable target scenarios.
6. Document handover and obtain signoff; mark Jira Done only after real infrastructure validation.
