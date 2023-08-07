pipeline {
    agent { 
        label 'stage' 
    }
    stages {
        stage('Docker build') {
            steps {
                script {
                    Date date = new Date()
                    env.DATETAG = date.format("HH-dd-MM-yy", TimeZone.getTimeZone('GMT+3'))
                    sh "docker build -t saymolet/streetcode_client:${env.DATETAG} ."
                }
            }
        }
        stage('Docker push') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-login-saymolet', passwordVariable: 'password', usernameVariable: 'username')]){
                    sh 'echo "${password} | docker login -u ${username} --password-stdin"'
                    sh "docker push saymolet/streetcode_client:${env.DATETAG}"     
                }
            }
        }
        stage('Docker prune') {
            steps {
                sh "docker compose down"   
                sh "docker system prune --force --filter "until=168h"   
            }
        }
        stage('Docker compose up') {
            steps {
                sh "docker compose up -d"   
            }
        }
    }
}
