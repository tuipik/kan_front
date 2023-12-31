### Install dependencies
`npm install`

### Run locally
`npm start`

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### Build docker image
`docker build -t kan-front --build-arg "api_base_url=http://127.0.0.1:8000/api/v1/" .`

### Run docker container on 80 port
`docker run -p 80:80 --network kan_default --link kan_api  --name kan_front kan-front`