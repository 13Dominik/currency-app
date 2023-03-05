# GBP - PLN calculator

Web application that allows to compute GBP -> PLN and PLN -> GBP using a [NBP API](http://api.nbp.pl/).

## ✨ Features

- Python
- Javascript
- Flask

## :bulb: How does it work
NBP API updates GBP price once a day between 11.45 and 12.15, so to provide newest price application updates GBP price everyday at 12.15. To avoid
delays, for greater stability and in the case NBP update GBP price in different time or one more time in the same day application updates price every two hours. Of course during first 
start on remote/local host price is immediately pulled from API.

## 💁‍♀️ How to use

- Visit my page hosted on Railway.app: https://flask-production-ff82.up.railway.app/
- Git (Linux)
```bash
git clone https://github.com/13Dominik/currency-app.git
cd currency-app
pip3 install -r requirements.txt
export FLASK_APP=main
sudo apt install python3-flask
flask run
```
- Git (Windows)
```bash
git clone https://github.com/13Dominik/currency-app.git
cd currency-app
pip install -r requirements.txt
set FLASK_APP=main
flask run
```
- Docker
```docker
docker run -p 5000:5000 dtomalczyk13/flask-curr:1.0
``` 
And then visit: http://127.0.0.1:5000/

NOTE: Railway.app has a problem with Dockerfile so in a repository Dockerfile is named Dockerfile-dev. In order to work with Docker it would be necessary to rename file as Dockerfile.
