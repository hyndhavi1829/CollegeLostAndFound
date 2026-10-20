
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

                bat '''
                if not exist index.html exit /b 1
                if not exist style.css exit /b 1
                if not exist script.js exit /b 1
                if not exist Dockerfile exit /b 1
                echo All required files are present.
                '''
            }
        }

        stage('Check Docker') {
            steps {
                bat '"C:\\Users\\meher\\AppData\\Local\\Programs\\DockerDesktop\\resources\\bin\\docker.exe" --version'
                bat '"C:\\Users\\meher\\AppData\\Local\\Programs\\DockerDesktop\\resources\\bin\\docker.exe" info'
            }
        }

        stage('Build Docker Image') {
            steps {
                bat '"C:\\Users\\meher\\AppData\\Local\\Programs\\DockerDesktop\\resources\\bin\\docker.exe" build -t college-lost-found .'
            }
        }

        stage('Deploy Container') {
            steps {
                bat '''
                "C:\\Users\\meher\\AppData\\Local\\Programs\\DockerDesktop\\resources\\bin\\docker.exe" rm -f lost-found-app 2>NUL
                "C:\\Users\\meher\\AppData\\Local\\Programs\\DockerDesktop\\resources\\bin\\docker.exe" run -d --name lost-found-app -p 8080:80 college-lost-found
                '''
            }
        }
    }

    post {
        success {
            echo 'SUCCESS: College Lost and Found System deployed!'
            echo 'Open http://localhost:8080 to view the website.'
        }

        failure {
            echo 'BUILD FAILED: Check the Console Output for the error.'
        }
    }
}
