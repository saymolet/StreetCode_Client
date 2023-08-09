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
        stage('Docker push') {
            steps {
                script {
                    Date date = new Date()
                    env.DATETAG = date.format("HH-dd-MM-yy", TimeZone.getTimeZone('GMT+3'))
                    withCredentials([usernamePassword(credentialsId: 'docker-login-saymolet', passwordVariable: 'password', usernameVariable: 'username')]){
                        sh 'echo "${password}" | docker login -u ${username} --password-stdin'
                        sh "docker push saymolet/streetcode_client:latest"
                        sh "docker tag saymolet/streetcode:latest saymolet/streetcode_client:${env.DATETAG}"
                        sh "docker push saymolet/streetcode_client:${env.DATETAG}"  
                    }
                }
            }
        }
    }
}
