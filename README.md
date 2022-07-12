# GithubSearch
This is a re-implementation of a portion of GitHub's Search feature ([https://github.com/search]()).
The app uses the GitHub v3 REST API to search for users and see a paginated list of results, and function similarly to GitHub's search feature, with some enhancements as I saw fit.

## Back-end
GitHub allows unauthenticated requests to their API, but they are throttled quite severely.
Since this is a front-end application, I cannot expose my Personal Access Token, so I built a proxy using the AWS ecosystem.

### Lambda Function
There are two AWS Lambda functions that proxy the `/search/users` and `/users` endpoints respectively. 
The function simply forwards the request to GitHub injecting my API credentials. 

### Amazon API Gateway
I configured an API Gateway as an interface to the Lambda functions with endpoints `/search` and `/users`.

## Front-end

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.0.

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
