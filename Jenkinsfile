pipeline {
    agent { 
        label 'stage' 
    }
    stages {
        stage('Docker build') {
            steps {
                sh "docker build -t saymolet/streetcode_client:latest ."
            }
        }
        stage('Docker prune') {
            steps {
                script {
                    sh 'docker image prune --force --all --filter "until=72h"'
                    sh 'docker system prune --force --all --filter "until=72h"'
                }
            }
        }
        stage('Docker push') {
            steps {
                script {
                    Date date = new Date()
                    env.DATETAG = date.format("HH-dd-MM-yy", TimeZone.getTimeZone('GMT+3'))
                    withCredentials([usernamePassword(credentialsId: 'docker-login-saymolet', passwordVariable: 'password', usernameVariable: 'username')]){
                        sh 'echo "${password}" | docker login -u ${username} --password-stdin'
                        sh "docker push saymolet/streetcode_client:latest"
                        sh "docker tag saymolet/streetcode_client:latest saymolet/streetcode_client:${env.DATETAG}"
                        sh "docker push saymolet/streetcode_client:${env.DATETAG}"  
                    }
                }
            }
        }
    }
}
