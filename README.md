# MODA Model Call Dashboard


Simple dashboard to simplify the process of aggreggating photos and pairing them with model call candidate information and designer choices. In previous years, this part of the event has taken up 20 - 30 minutes to accomplish as more than 100+ photos would have to be upload all at once. Additionally, the process of model selection would take another 15 minutes as it was not automatic and required a call and response format. This app automates all of the processes above. Designers can instantly view model photos and all their associated information. Photos are posted to special flickr app and model data is submitted through google form and link to app with google sheets api. These data sources are polled every 15 seconds currently. During the actual event this will likely be lowered to 10 seconds


App also comes with additional backstage functionality only accessible with correct admin code

https://cryptic-dusk-89190.herokuapp.com/


## Built With

* [Reactjs](https://reactjs.org/)
  * [CoreUI](https://coreui.io/react/) - free admin template this application started from
* [Nodejs](https://nodejs.org/en/) - Javascript runtime environment, handles connections
* [Expressjs](https://expressjs.com/) - Web framework used for app middleware
* [Heroku](https://www.heroku.com/platform) - Cloud application platform

## Usage

Install [nodemon](https://github.com/remy/nodemon) globally

```
npm i nodemon -g
```

Install server and client dependencies

```
yarn
cd client
yarn
```

To start the server and client at the same time (from the root of the project)

```
yarn dev
```

## Contributing

Feel free to make any change or improvement you see fit. Provide ample detail of your changes at the bottom of the README for review. 

## Versioning

[SemVer](http://semver.org/) is used for versioning. 

V 1.0

## Authors

* **Leslie Jones-Dove** - *Initial work* - [Lazlojd](https://github.com/lazlojd)


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

