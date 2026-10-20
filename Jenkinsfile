
pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/hyndhavi1829/CollegeLostAndFound.git'
            }
        }

        stage('Validate Files') {
            steps {
                bat 'dir'
                bat 'if not exist index.html exit /b 1'
                bat 'if not exist style.css exit /b 1'
                bat 'if not exist script.js exit /b 1'
                bat 'if not exist Dockerfile exit /b 1'
            }
        }

        stage('Build Docker Image') {
            steps {
                bat 'docker build -t college-lost-found .'
            }
        }

        stage('Deploy Container') {
            steps {
                bat '''
                    docker rm -f lost-found-app 2>NUL
                    docker run -d --name lost-found-app -p 8080:80 college-lost-found
                '''
            }
        }
    }

    post {
        success {
            echo 'Build and deployment completed successfully!'
        }
        failure {
            echo 'Pipeline failed. Check the console output.'
        }
    }
}
