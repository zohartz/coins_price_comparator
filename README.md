"# coins_price_comparator"

```
Description : API for crypto coins info 
```

### prerequisite
```
create api-key of crypto compare api 
https://min-api.cryptocompare.com/
```


### Local Running

1 - To run code with docker : 

```bash
$ docker-compose up 
```
2 - To run code on your machine : 
```bash
$ npm install
$ npm start
```

### Tests 

```bash
$ npm tests 
```

### API details on swagger UI :

to get information on API (requests and response) browse to

```
$ {base_api}/api/v1/management/swagger
ex: localhost:5001/api/v1/management/swagger
```

### curl examples

<br>
Compare current coins price & history price ( by date ) 

```
$ curl --location --request GET 'http://localhost:5001/api/v1/coins?coinsList=BTC,ETH,BNB,DOG&date=02/01/2021'
```

Invalid requests( results validation error )

```
curl --location --request GET 'http://localhost:5001/api/v1/coins?coinsList=BTC,ETH,BNB,DOG&date=02/01'
```

```
curl --location --request GET 'http://localhost:5001/api/v1/coins?coinsList=BTC,ETH,BNB,DOG'
```


