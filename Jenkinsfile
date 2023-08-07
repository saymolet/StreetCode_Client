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
    }
}
