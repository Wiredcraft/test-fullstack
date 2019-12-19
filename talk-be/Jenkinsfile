pipeline {
  agent any
  stages {
    stage('检出') {
      steps {
        checkout([$class: 'GitSCM', branches: [[name: env.GIT_BUILD_REF]],
        userRemoteConfigs: [[url: env.GIT_REPO_URL, credentialsId: env.CREDENTIALS_ID]]])
      }
    }
/*
    stage('测试') {
      steps {
        sh 'npm install'
        sh 'npm run test:cov'
      }
    }
*/
    stage('打包镜像') {
      steps {
        sh "docker build -t ${ARTIFACT_IMAGE}:${env.GIT_BUILD_REF} ."
        sh "docker tag ${ARTIFACT_IMAGE}:${env.GIT_BUILD_REF} ${ARTIFACT_IMAGE}:latest"
      }
    }
    stage('推送到制品库') {
      steps {
        script {
          docker.withRegistry("https://${ARTIFACT_BASE}", "${env.DOCKER_REGISTRY_CREDENTIALS_ID}") {
            docker.image("${ARTIFACT_IMAGE}:${env.GIT_BUILD_REF}").push()
            docker.image("${ARTIFACT_IMAGE}:latest").push()
          }
        }
      }
    }
  }
  environment {
    ENTERPRISE = 'nizhengyiming'
    PROJECT = '419-be'
    ARTIFACT = '419-be'
    CODE_DEPOT = '419-be'
    ARTIFACT_BASE = "${ENTERPRISE}-docker.pkg.coding.net"
    ARTIFACT_IMAGE = "${ARTIFACT_BASE}/${PROJECT}/${ARTIFACT}/${CODE_DEPOT}"
  }
}
