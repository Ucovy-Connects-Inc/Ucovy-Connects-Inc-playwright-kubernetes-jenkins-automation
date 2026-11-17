pipeline {
  agent any
  options { timestamps(); timeout(time: 45, unit: 'MINUTES') }
  parameters {
    string(name: 'IMAGE', defaultValue: '', description: 'Approved registry image digest or tag')
    string(name: 'K8S_NAMESPACE', defaultValue: 'qa-automation', description: 'Approved namespace')
    booleanParam(name: 'FAILURE_VALIDATION', defaultValue: false, description: 'Run intentional failure test instead of smoke suite')
  }
  stages {
    stage('Validate') {
      steps {
        script {
          if (!params.IMAGE.trim() || !(params.IMAGE ==~ /^[a-zA-Z0-9._:\/@-]+$/)) error('Invalid IMAGE')
          if (!(params.K8S_NAMESPACE ==~ /^[a-z0-9]([-a-z0-9]*[a-z0-9])?$/)) error('Invalid namespace')
          env.JOB_NAME = "pw-${env.BUILD_NUMBER}".toLowerCase()
          env.TEST_GREP = params.FAILURE_VALIDATION ? '@intentional-failure' : '@smoke'
          env.RUN_FAILURE_TEST = params.FAILURE_VALIDATION ? 'true' : 'false'
          env.IMAGE = params.IMAGE
          env.K8S_NAMESPACE = params.K8S_NAMESPACE
        }
      }
    }
    stage('Execute in Kubernetes') {
      steps {
        withCredentials([file(credentialsId: 'qa-kubeconfig', variable: 'KUBECONFIG')]) {
          sh './scripts/run-k8s.sh'
        }
      }
    }
  }
  post {
    always {
      archiveArtifacts artifacts: 'collected/**/*', allowEmptyArchive: true
      junit testResults: 'collected/test-results/*.xml', allowEmptyResults: true
    }
  }
}