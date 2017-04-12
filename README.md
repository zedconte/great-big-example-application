
[![Build Status](https://travis-ci.org/dancancro/great-big-angular2-example.svg?branch=master)](https://travis-ci.org/dancancro/great-big-angular2-example)
[![Dependency Status](https://david-dm.org/dancancro/great-big-angular2-example.svg)](https://david-dm.org/dancancro/great-big-angular2-example)


[Live Demo](http://great-big-angular2-example.herokuapp.com) (There's a problem unique to the Travis build so this isn't the latest version)

# Background and Motivation

This project is my attempt to infer from available demos what the codebase might look like for the real-world, 
commercial codebases that you don't get to see until you are hired by a real company and sign an NDA.

The rationale behind this is pretty simple...

    1. Real, complete code examples are better than docs, lessons and Gitter Q&A. And MUCH better 
    than ellipses (...).

    2. If you want a job making commercial-grade code, you should study commercial-grade code,
    not tutorial-grade code. Anything you learn in a tutorial must be approached with caution 
    because corners have probably been cut, it's probably been simplified and it probably doesn't 
    show you the exact way anyone does it on a real job. The difference between exact and almost 
    exact is huge. Tutorials show you how you *can* use a feature of the technology but often they 
    do so in situations when in real life you would not do things that way. This can cost a lot of 
    time. It's just as important to know how to use a technology's features as it is to know when.

    3. If you want to know how fast a big Angular app will build, run and test before investing
    the time to learn Angular - and you should - then you need source code for a big app before
    you even write Hello World.

    4. If you want to know the complexity limits a technology will place on your app before you
    commit to using it, there's no better way than to see a complex example made with that technology.

    5. It's a whole lot easier to vet an idea or accept an approach others have taken when you have
    a complete application with all of its edge cases to show you what needs to be accommodated. 
    By containing many edge cases, a big application will quickly answer the common learner's question:
    "Why isn't this done the easy way I think it should be done?", or "What if we tried X instead?"

Hopefully, when the project is done it will make the learning process for others much easier and prepare them to
make real things rather than instructional ones. I expect it to reduce the time to implement your own real
application from months to days.

Coming from different demos, the features of the app are not related to each other and it won't make any sense
to have them together but the point is just to demonstrate how things should work technically, so that's okay.

A huge thanks to those who created the example demos from which I put together this amalgam. 

To make this big app from the small ones, I took these projects and integrated/restructured/restyled their code
according to the following prioritization. Disagreements in approach between two influences are resolved by the
lower authority yielding to the higher one:

1. [Angular Style Guide](https://angular.io/docs/ts/latest/guide/style-guide.html) by Google
2. [Tour of Heroes (ngModules, Routing, App Specs, HTTP, Server Communication versions)](https://github.com/dancancro/tour-of-heroes-versions) by Google
3. [Redux Docs](http://redux.js.org/) Redux.org
4. [FAMN example](https://github.com/implustech/famn) by [@implustech](https://github.com/implustech)
5. [Angular CLI](https://github.com/angular/angular-cli) by Google and the community
6. [ngrx example app - book collection](https://github.com/ngrx/example-app) by [@MikeRyan52](https://github.com/MikeRyan52)
7. [angular-seed-advanced](https://github.com/NathanWalker/angular-seed-advanced) by Minko Gechev + Nathan Walker + community
8. [ng2-state-talk - drag/editable notes](https://github.com/JavascriptMick/ng2-state-talk) by [@JavascriptMick](https://github.com/JavascriptMick) 
9. [rangle-starter Angular 2 with TypeScript and Redux version - counter](https://www.npmjs.com/package/rangle-starter) by [@SethDavenport](https://github.com/SethDavenport)
10. [feathers-starter-react-redux-login-roles - Feathers back end with auth](https://github.com/eddyystop/feathers-starter-react-redux-login-roles) by [@eddyystop](https://github.com/eddyystop)

In addition to the features from these demos, I added one of my own. I replaced

11. [this other project](http://www.bernierebuttals.org) 

which was made with JQuery and Google Scripts. The data is 
contained in [this Google Sheet](https://docs.google.com/spreadsheets/d/1RdIhMdNCRJ-xtl6IgbT2SdChtLIYW8VXeloq7rR1lqY/edit#gid=50602236) 
and served as JSON by a Google script.

See the [Angular Change log](https://angular.io/docs/ts/latest/guide/change-log.html) for updates to the Angular team's opinions.

# My Innovations

While the goal of the project is to combine the wisdom of different experts, nobody can resist introducing improvements when there's 
no obvious case against doing so. So you will see a couple of practices in this project that came from my head rather than the sources 
of expertise from which the project was assembled. If you can think of reasons not to do these things, please let me know.

1. I have put the Redux store reducers in `app/core/store` separate from the feature directories located under `app` and did not make folders
for `reducers`, `actions`, and `effects`. There is a many-to-many relationship between Redux store slices and features. So putting the Redux
code for a given slice into the same directory as one of the features that uses it doesn't make sense. How do you decide which feature gets it?

2. As much as practical the names of files in a directory begin with the directory name. I did this to prevent directories from having a mixture of 
unrelated concerns. If a directory in a source demo had files for two different things, I created more directories. I thought about 
removing that part of the file name, `src/app/app.page.ts` -> `src/app/page.ts`, for the sake of DRY, but that makes it too confusing when
you are working on multiple files with the same names and different directories.

3. I noticed a lot of duplication and boilerplate of identical CRUD code for each of my types of entities. So I made utility functions and 
the related actions and models for each of three types of store slice - [entities](https://github.com/dancancro/great-big-angular2-example/tree/master/src/app/core/store/entity), [id lists](https://github.com/dancancro/great-big-angular2-example/tree/master/src/app/core/store/id), and [slices](https://github.com/dancancro/great-big-angular2-example/tree/master/src/app/core/store/slice) (everything else).

4. I came up with a mini lexicon of file types to keep file names shorter and more expressive. A "page" is understood to be a smart `@Component`
class that fills the page and might have a router-outlet and route configurations. A "guard" is understood to be an `@Injectable` "service" class that
returns a boolean. A "routing" is a `@NgModule` class that contains route configurations. So I memorize this simple lexicon, and drop the
redundant, less-clear words from the names. For example, I use the name `app.page.ts` rather than `app.component.ts` or `app-page.component.ts`.
I use `auth.guard.ts` instead of `auth-guard.service.ts`. I use `books.routing.ts` instead of `books-routing.module.ts`.

| A | is a class decorated with | that | Example file name | Example class name |
|:--- | :--- | :--- | :--- | :--- |
| page | @Component | more or less fills the screen - a "smart" component that gets data from something other than `@Input`s and dispatches actions to change state | app.page.ts | AppPage |
| component | @Component | has to be contained by a page or other components - a "dumb" component that only gets data from `@Input`s | login.component.ts | LoginComponent |
| guard | @Injectable | returns a boolean and [does whatever an Angular guard does](https://angular.io/docs/ts/latest/guide/router.html#!#guards) | auth.guard.ts | AuthGuard |
| service | @Injectable | provides a service or data | auth.service.ts | AuthService |
| routing | @NgModule | contains route configurations | books.routing.ts | BooksRouting |
| module | @NgModule | associates related components and providers | books.module.ts | BooksModule |

That's it. It shouldn't be too hard to remember these, and in return you will have consistent, short, expressive file names.

# Prerequisites

## Get Git
You will need to have [Git](https://git-scm.com/) and [Node.js + NPM](http://nodejs.org) installed on your machine. 

## Get Docker
If you want to Dockerize your app, go [here](http://www.dzurico.com/dockerize-angular-application) to setup Docker.

## Get MongoDB
Install MongoDB and start it by running `mongod` from any directory.

# Make it go

```
## Download the code
$ git clone https://github.com/dancancro/great-big-angular2-example.git
$ cd great-big-angular2-example

```

#### local

```sh
# Get nodemon to reload the app automatically, and ts-node to use TypeScript for the node code
npm i nodemon ts-node typescript@latest

# or use yarn
yarn add nodemon ts-node typescript@latest

# build client code
yarn run build:client:dev

## Put some data in the database
1. Run `$ npm install -g node-mongo-seeds` to install the mongo seed tool globally
2. Run `$ cd app && seed` to seed the mongodb with data from the /seeds folder. Running this again
will wipe out data in these collections and replace it with what's in the json files.

## start server with webpack hmr
yarn run start:hmr
```

#### docker (recommended)

```sh
# docker way which is recommended
docker-compose -f ./docker/docker-compose.dev.yml up --build

# real time service, check the new message in message module after running below command
curl -H 'Content-Type: application/json' \
  --data-binary '{ "email": "yourname@yourdomain.com", "message": "Hello FAMN" }' \
  http://localhost:3030/messages/'
```

Go to `http://localhost:3130` with default created user `mo@po.da`, password `do`

### Deploy

```sh
docker-compose -f ./docker/docker-compose.prod.yml up --build -d
```

### Other commands

#### build

```sh
# build client for dev
yarn run build:client:dev
# build client for prod
yarn run build:client:prod
# build client with AOT for prod
yarn run build:client:aot:prod
# build server for prod
yarn run build:server:prod
```

Then navigate to [http://localhost:3130](http://localhost:3130) in your browser. If you get stuck on anything, no matter how little, 
please let me know. I know how the little things are what cause the problems and I don't want you to have any problems.

# FAQ

## 1) In many Redux examples it seems like there is a lot of boilerplate and duplicate code per store slice. Why not have the Action Types be created dynamically by combining the store slice name nouns and action name verbs?

I agree. That's why I created utility functions to hold all the common code and got rid of plural names to enable generic handling, 
and I replaced static action type definitions with dynamic functions that combine slice nouns and action verbs. It also turns out that most of 
the tricky RxJS code is also boilerplate code that now resides inside functions that you don't have to mess with most of the time. So you
should be able to get productive on an app that uses Observables without first having to be an expert at them, which is hard.

That's a pretty big benefit. What could be seen as costs of doing that?

1) You lose some static type checking of action types. 
> Given that most Redux apps are done with React and React doesn't have any static type checking at all, I decided that was a small 
price to pay. You can also mix this approach and the other one if you really want to. Use the general, un-type-checked, CRUD stuff for
ordinary parts of your app (most of it), and use hard-coded, specialty action types when you really need TypeScript's compiler to help you.

Here's some code from the ngrx example app that gives you type checking for the action types. You won't get these checks using my approach.
```
export function reducer(state: Entities<Book> = initialEntities<Book>({}, slices.BOOK, actions, {}),
  action: book.Actions | collection.Actions): Entities<Book> {
  switch (action.type) {
    ...

```
`action: book.Actions | collection.Actions` means that `action` must be an object of a class in this union of two unions of class definitions

That gives us two checks: `action.type` must be a string value among the union of `string` values of the `type` properties of the classes that `action` can be. If any
of the case values are not among this union of string values, Typescript will point that out to you.
And same with `action.payload`. It must be an object with the structure of the payload property of one of the classes that `action` can be.

2) Using only generic action classes like `LoadSuccess` instead of `SearchComplete`, the dispatch calls in your components will be 
more explicit and refer to details of the store.
> I see this as a plus in most cases. Otherwise you have extraneous levels of abstraction and you have to look into three files to see exactly 
what's going on. In most cases, the same person is writing the component, action and reducer files, so what's the point in hiding details 
in one of them from the other? Now you can get the whole story by reading one line of code. You should decouple things when the need arises, 
but you can overdo it too.

## 2) Why are entities modeled as a hash (map) of objects and an array of IDs instead of just an array of objects?

I got the idea from the ngrx example app. I asked about it once and was told that it was done for performance reasons but I'm not sure under what conditions they apply.

## 3) Why do you generate IDs on the client side, not the server side?

This makes it possible to have the application work offline. It also lets your objects have some persisted attributes and some transient, UI attributes without it affecting the
api code. The way this works is that the UI lets you display things before they have been persisted to the server. Then a request to persist happens. The request only sends persistent
attributes because the api is ignorant of the user interface. When the response comes back you can find the original object by its previously established ID and handle it accordingly. 
If successful, you'd likely do nothing that the user sees. However, if you hadn't given it an ID, it would be discarded and recreated from the object in the response. This response 
object would not have all the transient attributes of the object in the request. So, for example, if its location on the screen were a transient attribute, then the user would see it 
jump to a default location since the former location would be lost.

Any other questions?  Just ask.

# Demonstrations and Features

| **Developer Experience** |[great big angular2 example](https://github.com/dancancro/great-big-angular2-example)|[Angular-kitchen-sink](https://github.com/born2net/Angular-kitchen-sink)|[ngrx example app](https://github.com/ngrx/example-app/issues/100#issuecomment-275451726)|[angular-redux-starter](https://github.com/rangle/angular-redux-starter)|[mgechev's angular-seed](https://github.com/mgechev/angular-seed)|
|:------ | :------: | :------: | :------: | :------: | :------: |
[Authentication](https://github.com/jhipster/jhipster-sample-app/blob/5bec9d09ac1fc523fcea5cb97769153b7e97aaf2/src/main/webapp/bower_components/swagger-ui/src/main/javascript/view/AuthView.js "")|[X](https://github.com/dancancro/great-big-angular2-example/blob/master/src/app/core/store/session/session.effects.ts#L26 "")|[X](https://github.com/born2net/Angular-kitchen-sink/blob/7260a89a3f968243e642b20c9fd6775ba59eaf41/src/services/DefaultAuthService.ts "")| |[X](https://github.com/rangle/angular2-redux-example/blob/master/src/epics/session.epics.ts#L20 "")| |
[Authentication, with two-factor authentication](https://github.com/born2net/Angular-kitchen-sink/blob/08ff94405b80ee24acff09d0de270e56ba4bace2/src/actions/SampleActions.js#L22 "")| |[UNIQUE](https://github.com/born2net/Angular-kitchen-sink/blob/08ff94405b80ee24acff09d0de270e56ba4bace2/src/actions/SampleActions.js#L22 "")| | | |
[Client side validation](https://github.com/dancancro/great-big-angular2-example/blob/master/src/app/login/login-form/login-form.component.ts#L37 "")|[X](https://github.com/dancancro/great-big-angular2-example/blob/master/src/app/login/login-form/login-form.component.ts#L37 "")|X| |[X](https://github.com/rangle/angular2-redux-example/blob/2c541e5ce057111c32464ccee3624ab50d84f084/src/components/login/login-form.ts#L37 "")|X|
[Client-side unit tests](https://github.com/born2net/Angular-kitchen-sink/blob/132ddece2635d13e983ce873742ba962fc5c7fce/src/app/app.component.spec.ts "")|[X](https://github.com/dancancro/great-big-angular2-example/blob/master/src/app/debate/claim/claim.component.spec.ts "")|[X](https://github.com/born2net/Angular-kitchen-sink/blob/132ddece2635d13e983ce873742ba962fc5c7fce/src/app/app.component.spec.ts "")| |[X](https://github.com/rangle/angular2-redux-example/blob/master/src/components/button/button.component.test.ts "")|[X](https://github.com/mgechev/angular-seed/blob/master/src/client/app/app.component.spec.ts "")|
[Code coverage reporting (?)](http://blog.johnryding.com/post/46757192364/javascript-code-coverage-with-phantomjs-jasmine-and "Generate reports that tell you how much of your code is being tested")|X|[X](http://mochajs.org/ "")|[X](http://mochajs.org/ "")|X| |
[Command line interface (CLI)](https://github.com/angular/angular-cli "")|[X](https://github.com/facebookincubator/create-react-app "")|[X](https://github.com/angular/angular-cli "")|[X](https://github.com/angular/angular-cli "")|X| |
[Compiled, supports ahead of time (AOT) compilation](https://github.com/mgechev/angular-seed/blob/18a6e44da97d2734d7e81377df49e52ac70d2354/tools/tasks/seed/build.js.prod.aot.ts "")|X| | | |[X](https://github.com/mgechev/angular-seed/blob/18a6e44da97d2734d7e81377df49e52ac70d2354/tools/tasks/seed/build.js.prod.aot.ts "")|
[Components communicate with events](https://github.com/born2net/Angular-kitchen-sink/blob/65b01608a769578a94850bc39254d7e81f82d239/src/comps/app3/starwars/components/films-component.ts#L11 "")|[X](https://github.com/dancancro/great-big-angular2-example/blob/master/src/app/debate/debate.page.html#L9 "")|[X](https://github.com/born2net/Angular-kitchen-sink/blob/65b01608a769578a94850bc39254d7e81f82d239/src/comps/app3/starwars/components/films-component.ts#L11 "")|X| | |
[Concurrency (synchronization), immutable data (?)](https://vuejs.org/v2/guide/comparison.html#Update-Performance "With mutable objects, developers pass objects to functions by reference and then end up mutating those objects - in fact, the language encourages them to do so.  This can lead to subtle, hard to detect bugs.    Immutable data solves concurrency problems because values in a set of values are guaranteed to not change between the time the first one is read and the last one is read.    However, immutability can make strongly typed stores harder to accomplish.")|X|X|X|X| |
[Core Module](https://angular.io/docs/ts/latest/guide/style-guide.html#!#04-12 "")|[UNIQUE](https://github.com/dancancro/great-big-angular2-example/blob/master/src/app/core/core.module.ts "")| | | | |
CSS style checking|X| | |X| |
[Deployment automation, using Docker (?)](https://www.docker.io/ "This is for making the app lightweight, portable and self sufficient so you can run it anywhere")|[X](https://github.com/dancancro/great-big-angular2-example/blob/master/docker-compose.yml "")| | |[X](https://github.com/rangle/angular2-redux-example/blob/master/Dockerfile "")|[X](https://github.com/mgechev/angular-seed/blob/master/docker-compose.production.yml "")|
[Deployment automation, using Heroku (?)](https://github.com/jhipster/generator-jhipster/issues/1288 "Generates a dist folder that is deployment ready for heroku.com    Heroku is an interface to Amazon's US East EC2 region")|[X](http://great-big-angular2-example.herokuapp.com "")| | |[X](https://github.com/rangle/angular2-redux-example/blob/master/server/node-server.js#L15 "")| |
[Error handling, Client-side logging](http://www.bennadel.com/blog/2542-logging-client-side-errors-with-angularjs-and-stacktrace-js.htm "")| | | |UNIQUE| |
[Hot Module Replacement (?)](https://github.com/qdouble/angular-webpack2-starter/blob/498dc04957011e71bd1d0cd3c9eab36bc848349e/package.json#L14 "After a code change the page will reload and put you in the same place you were in before without losing state.")|UNIQUE| | | | |
In-memory server-side database| |UNIQUE| | | |
[Local storage](https://github.com/jhipster/jhipster-sample-app/blob/5bec9d09ac1fc523fcea5cb97769153b7e97aaf2/src/main/webapp/app/blocks/config/localstorage.config.js "")|[X](https://github.com/dancancro/great-big-angular2-example/blob/e29a656b8f923ad9fb5867288f4628674994b697/src/app/core/store/index.ts#L123 "")|[X](https://github.com/born2net/Angular-kitchen-sink/blob/65b01608a769578a94850bc39254d7e81f82d239/src/services/LocalStorage.ts "")|X|X| |
No pluralization|UNIQUE| | | | |
[Object-relational mapping (?)](http://hibernate.org/orm/what-is-an-orm/ "A system for managing the difference between data that is stored in rows but used as objects.  This only applies to SQL databases, not NoSQL databases.    Examples:  ActiveRecord for Rails  Hibernate for Java")|[UNIQUE](https://docs.feathersjs.com/why/vs/readme.html "")| | | | |
[Persistent, server-side data storage (?)](http://hammerprinciple.com/databases "See link for a good explanation of NoSQL options and solutions to normalization issues")|UNIQUE| | | | |
[Production build, generate docs (?)](https://github.com/yeoman/yeoman/issues/152 "By reading comments in your code or maintaining separate docs:  https://github.com/millermedeiros/mdoc    examples:  ngDoc  YUIdoc")| |[UNIQUE](http://typedoc.org/ "")| | | |
[Separation of smart containers and dumb components (?)](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.vkyyo356c "Such components typically do the following things: subscribe to data, fetch data from those subscriptions, and fetch global client-side state from stores.  Ideally, once a smart component has assembled such a set of data, it passes it off to a reusable component child to render with. Smart components usually don’t render anything apart from one or more reusable children. This makes it easy to separate rendering and data loading in your tests.")|X| |X| | |
[Server-side integration & unit tests](http://www.letscodejavascript.com/v3/episodes/live/1 "")| |X|X| | |
[Shared Module](https://angular.io/docs/ts/latest/guide/style-guide.html#!#04-10 "")|[X](https://github.com/dancancro/great-big-angular2-example/blob/master/src/app/shared/shared.module.ts "")|[X](https://github.com/born2net/Angular-kitchen-sink/blob/8cc88024f22156f397f2aa95dc142460f720f50f/src/comps/app1/lazyone/SharedModule.ts "")| | | |
[Single source of truth, central state management (?)](https://vuejs.org/v2/guide/state-management.html "only one piece of the application flow is tasked with mutating state data")|[X](http://www.reddit.com/r/javascript/comments/2uvz0x/whats_so_great_about_reactjs/ ",")|X|X|X| |
[Single source of truth, central state management, without lots of boilerplate (?)](https://github.com/dancancro/great-big-angular2-example/tree/4431d3f9f361fbf944f083f266e59722d8601dfe/src/app/core/store/entity "Usually with Redux implementations your app will have lots of similar code in action, reducer and effect files for each slice of the store.    To avoid this, takes imposing some conventions and creating utility functions.")|[UNIQUE](https://github.com/dancancro/great-big-angular2-example/tree/4431d3f9f361fbf944f083f266e59722d8601dfe/src/app/core/store/entity "")| | | | |
State inspection tools|X|X|X|X| |
[Style guide for code (?)](https://github.com/Swiip/generator-gulp-angular/pull/469 "Provides consistency and best practices")|[X](https://angular.io/docs/ts/latest/guide/style-guide.html "")| | | |[X](https://angular.io/docs/ts/latest/guide/style-guide.html "")|
[There is a book about it](http://www.amazon.com/MEAN-Web-Development-Amos-Haviv-ebook/dp/B00NXWI1BM/ref=dp_kinw_strp_1 "")| | | |[UNIQUE](http://angular-2-training-book.rangle.io/ "")| |
[Time travel, undo (?)](http://redux.js.org/docs/recipes/ImplementingUndoHistory.html "You can move forward and backward through a series of state changes")|X|X|X|X| |
[Update generated code in an existing app](https://jhipster.github.io/upgrading-an-application/ "")| | | | |[UNIQUE](https://github.com/mgechev/angular-seed/wiki/Architecture-and-usage-of-angular2-seed#build "")|
Used in-house to make vendor's business critical applications|[UNIQUE](https://docs.feathersjs.com/why/vs/readme.html "")| | | | |
[Virtual, shadow DOM (?)](https://plus.google.com/u/0/+AngularJS/posts/eZNUbuXwbCm "writes out a full render virtually, and then checks the difference between the virtual render and what’s actually on the DOM and creates a patch.    Includes concepts such as <content> tags, projection, and selection")|[UNIQUE](https://www.packtpub.com/books/content/try-something-new-today-reactjs "")| | | | |
|  | | | | |
| **User Experience** |[great big angular2 example](https://github.com/dancancro/great-big-angular2-example)|[Angular-kitchen-sink](https://github.com/born2net/Angular-kitchen-sink)|[ngrx example app](https://github.com/ngrx/example-app/issues/100#issuecomment-275451726)|[angular-redux-starter](https://github.com/rangle/angular-redux-starter)|[mgechev's angular-seed](https://github.com/mgechev/angular-seed)|
Account Management, add/remove user|UNIQUE| | | | |
[Account Management, Forgotten Password with Resetting](https://github.com/meanjs/mean/issues/30 "")| |[UNIQUE](https://github.com/born2net/Angular-kitchen-sink/blob/08ff94405b80ee24acff09d0de270e56ba4bace2/src/comps/entry/ForgotPass.ts "")| | | |
[Account Management, login/logout](https://github.com/born2net/Angular-kitchen-sink/blob/65b01608a769578a94850bc39254d7e81f82d239/src/comps/entry/EntryPanel.ts "")|X|[X](https://github.com/born2net/Angular-kitchen-sink/blob/65b01608a769578a94850bc39254d7e81f82d239/src/comps/entry/EntryPanel.ts "")| |[X](https://github.com/rangle/angular2-redux-example/tree/master/src/components/login "")| |
[Account Management, register](http://208.68.38.122/themes/emerald/dev/htmls/pages/sign_in.html "")|UNIQUE| | | | |
[Asynchronously loaded data example](https://github.com/dancancro/great-big-angular2-example/blob/master/src/app/core/store/rest.service.ts#L32 "")|[X](https://github.com/dancancro/great-big-angular2-example/blob/master/src/app/core/store/rest.service.ts#L32 "")|X|X| | |
[Breadcrumbs (?)](https://github.com/born2net/Angular-kitchen-sink/tree/master/src/comps/breadcrumb "Breadcrumbs are the series of links displayed at the top of a page which take you to any of the ancestral pages between the home page and the one you're on")| |[UNIQUE](https://github.com/born2net/Angular-kitchen-sink/tree/master/src/comps/breadcrumb "")| | | |
[Derived, computed properties](http://redux.js.org/docs/recipes/ComputingDerivedData.html "")|[X](https://github.com/dancancro/great-big-angular2-example/blob/master/src/app/core/store/claim/claim.model.ts#L27-L29 "")|[X](https://github.com/born2net/Angular-kitchen-sink/blob/master/src/models/ServerModel.js#L35 "")| | | |
[Dynamic component creation](https://github.com/born2net/Angular-kitchen-sink/tree/08ff94405b80ee24acff09d0de270e56ba4bace2/src/comps/dynmiaccomp "")| |[UNIQUE](https://github.com/born2net/Angular-kitchen-sink/tree/08ff94405b80ee24acff09d0de270e56ba4bace2/src/comps/dynmiaccomp "")| | | |
[External, 3rd party, API interaction](https://github.com/born2net/Angular-kitchen-sink/blob/master/src/services/SearchSpotifyService.ts "")|[X](https://github.com/dancancro/great-big-angular2-example/blob/master/src/app/core/store/book/google-books.service.ts "")|[X](https://github.com/born2net/Angular-kitchen-sink/blob/master/src/services/SearchSpotifyService.ts "")|X| | |
[Footer](https://github.com/born2net/Angular-kitchen-sink/blob/08ff94405b80ee24acff09d0de270e56ba4bace2/src/comps/footer/Footer.ts "")|X|[X](https://github.com/born2net/Angular-kitchen-sink/blob/08ff94405b80ee24acff09d0de270e56ba4bace2/src/comps/footer/Footer.ts "")| | | |
[Front-end CRUD](https://github.com/born2net/Angular-kitchen-sink/tree/65b01608a769578a94850bc39254d7e81f82d239/src/comps/app1/todos "")|[X](https://github.com/dancancro/great-big-angular2-example/tree/master/src/app/contact "")|[X](https://github.com/born2net/Angular-kitchen-sink/tree/65b01608a769578a94850bc39254d7e81f82d239/src/comps/app1/todos "")| | | |
[Full-stack CRUD (?)](https://github.com/born2net/Angular-kitchen-sink/tree/65b01608a769578a94850bc39254d7e81f82d239/src/comps/app1/todos "CRUD = Create,Read,Update, Delete    The example demonstrates creating, reading, updating and deleting from a backend file system or database through a web page user interface.  It includes seed data and does not require a lot of work to get the app connected to a database")|[X](https://github.com/dancancro/great-big-angular2-example/tree/master/src/app/contact "")|[X](https://github.com/born2net/Angular-kitchen-sink/tree/65b01608a769578a94850bc39254d7e81f82d239/src/comps/app1/todos "")| | | |
[Full-stack CRUD, with Create, Update and Delete](https://github.com/born2net/Angular-kitchen-sink/tree/65b01608a769578a94850bc39254d7e81f82d239/src/comps/app1/todos "")|[X](https://github.com/dancancro/great-big-angular2-example/tree/master/src/app/contact "")|[X](https://github.com/born2net/Angular-kitchen-sink/tree/65b01608a769578a94850bc39254d7e81f82d239/src/comps/app1/todos "")| | | |
[Full-stack CRUD, with Create, Update and Delete, individual records](https://github.com/born2net/Angular-kitchen-sink/tree/65b01608a769578a94850bc39254d7e81f82d239/src/comps/app1/todos "")|[X](https://github.com/dancancro/great-big-angular2-example/tree/master/src/app/contact "")|[X](https://github.com/born2net/Angular-kitchen-sink/tree/65b01608a769578a94850bc39254d7e81f82d239/src/comps/app1/todos "")| | | |
[Full-stack CRUD, with Create, Update and Delete, whole data structures](https://github.com/dancancro/great-big-angular2-example/blob/master/src/app/core/store/rest.service.ts "")|[UNIQUE](https://github.com/dancancro/great-big-angular2-example/blob/master/src/app/core/store/rest.service.ts "")| | | | |
[Full-stack CRUD, with Read](https://github.com/born2net/Angular-kitchen-sink/tree/65b01608a769578a94850bc39254d7e81f82d239/src/comps/app1/todos "")|[X](https://github.com/dancancro/great-big-angular2-example/tree/master/src/app/contact "")|[X](https://github.com/born2net/Angular-kitchen-sink/tree/65b01608a769578a94850bc39254d7e81f82d239/src/comps/app1/todos "")| | | |
[Grid](http://blog.durandal.io/2015/05/20/porting-an-angular-2-0-app-to-aurelia/#comment-2039711426 "")|UNIQUE| | | | |
[i18n, localization (?)](https://jhipster.github.io/installing-new-languages/ "Internationalization or localization    Text for different languages are stored in separate places and used to fill in placeholders in the view depending on the user's preferences")| | | | |[UNIQUE](https://github.com/mgechev/angular-seed/blob/master/src/client/app/i18n.providers.ts "")|
[Many-to-many data](https://github.com/dancancro/great-big-angular2-example/blob/master/src/app/core/store/index.ts#L265 "")|[UNIQUE](https://github.com/dancancro/great-big-angular2-example/blob/master/src/app/core/store/index.ts#L265 "")| | | | |
[Modals (popups, dialogs) (?)](https://material.angularjs.org/latest/demo/dialog "A popup window that when opened disables the rest of the application")|UNIQUE| | | | |
[Navigation bar](https://github.com/jhipster/jhipster-sample-app/tree/master/src/main/webapp/app/layouts/navbar "")|[X](https://github.com/dancancro/great-big-angular2-example/blob/master/src/app/app.page.html "")|[X](https://github.com/dancancro/great-big-angular2-example/blob/master/src/app/app.page.html "")|[X](https://github.com/ngrx/example-app/blob/master/src/app/containers/app.ts#L15 "")| | |
[Panels, draggable](https://github.com/born2net/Angular-kitchen-sink/blob/65b01608a769578a94850bc39254d7e81f82d239/src/comps/dragndrop/make-draggable.directive.ts "")|X|[X](https://github.com/born2net/Angular-kitchen-sink/blob/65b01608a769578a94850bc39254d7e81f82d239/src/comps/dragndrop/make-draggable.directive.ts "")| | | |
[Responsive styles](https://youtu.be/d1MEM8PdAzQ?t=588 "")|[X](https://github.com/dancancro/great-big-angular2-example/blob/166ae9353bd6ff34badbc045b2044cf417c6d8c5/src/assets/styles/flexbox.css#L4 "")| | |[X](https://github.com/rangle/angular2-redux-example/blob/2c541e5ce057111c32464ccee3624ab50d84f084/src/components/modal/modal.css#L7 "")| |
[Search, actually works with backend API](https://github.com/jhipster/generator-jhipster/search?utf8=%E2%9C%93&q=elasticsearch "")|[X](https://github.com/dancancro/great-big-angular2-example/blob/master/src/app/books/book-search/book-search.component.ts "")| |[X](https://github.com/ngrx/example-app/blob/master/src/app/components/book-search.ts "")| | |
[Tables (?)](http://railscasts.com/episodes/340-datatables?autoplay=true "Create jQuery dataTables")|UNIQUE| | | | |
To do list|UNIQUE| | | | |
|  | | | | |
| **Dependencies** |[great big angular2 example](https://github.com/dancancro/great-big-angular2-example)|[Angular-kitchen-sink](https://github.com/born2net/Angular-kitchen-sink)|[ngrx example app](https://github.com/ngrx/example-app/issues/100#issuecomment-275451726)|[angular-redux-starter](https://github.com/rangle/angular-redux-starter)|[mgechev's angular-seed](https://github.com/mgechev/angular-seed)|
Backend Frameworks |Express, Feathers.js | | |Express |Express
Client-side API interfaces |@angular/http |@angular/http |@angular/http |@angular/http |
Continuous integration testers |Travis | | | |
Convenience method libraries |lodash |lodash |lodash | |
Databases |MongoDB |Redis | | |
Documentation generators | |typedoc | | |
Frontend Frameworks |Angular 2.0, React, React Native (opt) |Angular 2.0 |Angular 2.0 |Angular 2.0 |Angular 2.0
Languages |JS ES5, JS ES6 (ES2015), JSX (opt), Typescript |JS ES5, JS ES6 (ES2015), Typescript |JS ES5, JS ES6 (ES2015), Typescript |JS ES5, JS ES6 (ES2015), JSX (opt), Python, Typescript |JS ES2016, JS ES5, JS ES6 (ES2015), Typescript
Linters |codelyzer, ESLint, stylelint, tslint | |codelyzer, tslint |ESLint, stylelint |codelyzer, tslint
Loaders/Bundlers |Webpack |Webpack |Webpack |Webpack |Rollup, SystemJS
Misc |Angular Style Guide, Helmet, nodemon, Redux, redux-devtools, RxJS (opt) |Immutable, Redux, redux-devtools, RxJS |Redux, redux-devtools, RxJS (opt) |autoprefixer, cssnano, Helmet, Immutable, nodemon, Redux, redux-devtools, redux-logging, RxJS |Angular Style Guide, cssnano, RxJS
Object Database Mappers |Mongoose | | | |
Package Managers |npm, Yarn |npm |npm |npm |npm
Routers |Angular Component Router |Angular Component Router |Angular Component Router |Angular Component Router |Angular Component Router
Runtime Environments |Node |Node |Node |Node |Node
Stacks | |angular-cli |angular-cli | |
State Managers |ngrx |ng-redux |ngrx |ng-redux |
Task Runners | |Gulp | | |Gulp
Test assertion libraries |Jasmine |Chai, Jasmine, Mocha |Chai, Jasmine, Mocha |Jasmine |Jasmine
Test coverage reporters |Istanbul | | |Istanbul |
Test runners |Karma | |Karma, Protractor |Karma, Robot |BrowserSync (opt), Karma
Transpilers |libsass |libsass |libsass |libsass |
Widget collections |Angular Material |Angular Material | | |

See any mistakes? [Help improve this data](https://docs.google.com/forms/d/e/1FAIpQLSeo2fG1YwFbGF_p9zor7Tu_KHPGF6tIt5EWoZGcosGLytC_EQ/viewform)

## File Structure
```
.
├── CHANGELOG.md
├── README.md
├── app
│   ├── app.ts
│   ├── hooks
│   │   └── index.ts
│   ├── middleware
│   │   ├── index.ts
│   │   ├── logger.ts
│   │   ├── not-found-handler.ts
│   │   └── webpack-hot.ts
│   ├── seed.json
│   ├── seeds
│   │   ├── README.md
│   │   ├── claim.json
│   │   ├── claimRebuttal.json
│   │   ├── contact.json
│   │   ├── crisis.json
│   │   ├── hero.json
│   │   ├── note.json
│   │   ├── rebuttal.json
│   │   └── user.json
│   ├── service
│   │   ├── authentication
│   │   │   ├── hooks
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   ├── claim
│   │   │   ├── claim-model.ts
│   │   │   ├── hooks
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   ├── claimRebuttal
│   │   │   ├── claim-rebuttal-model.ts
│   │   │   ├── hooks
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   ├── contact
│   │   │   ├── contact-model.ts
│   │   │   ├── hooks
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   ├── crisis
│   │   │   ├── crisis-model.ts
│   │   │   ├── hooks
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   ├── hero
│   │   │   ├── hero-model.ts
│   │   │   ├── hooks
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   ├── hooks
│   │   ├── index.ts
│   │   ├── message
│   │   │   ├── hooks
│   │   │   │   └── index.ts
│   │   │   ├── index.ts
│   │   │   └── message-model.ts
│   │   ├── note
│   │   │   ├── hooks
│   │   │   │   └── index.ts
│   │   │   ├── index.ts
│   │   │   └── note-model.ts
│   │   ├── rebuttal
│   │   │   ├── hooks
│   │   │   │   └── index.ts
│   │   │   ├── index.ts
│   │   │   └── rebuttal-model.ts
│   │   ├── user
│   │   │   ├── hooks
│   │   │   │   └── index.ts
│   │   │   ├── index.ts
│   │   │   └── user-model.ts
│   │   └── verifyReset
│   │       └── index.js
│   └── webpack
│       └── webpack.server.common.ts
├── client
│   ├── app
│   │   ├── 404
│   │   │   ├── 404.component.html
│   │   │   ├── 404.component.scss
│   │   │   └── 404.component.ts
│   │   ├── app.component.html
│   │   ├── app.component.scss
│   │   ├── app.component.ts
│   │   ├── app.global.scss
│   │   ├── app.module.ts
│   │   ├── app.routes.ts
│   │   ├── core
│   │   │   ├── 404
│   │   │   │   ├── 404.component.html
│   │   │   │   ├── 404.component.scss
│   │   │   │   └── 404.component.ts
│   │   │   ├── about
│   │   │   │   └── about.page.ts
│   │   │   ├── core.module.ts
│   │   │   ├── core.routing.ts
│   │   │   ├── index.ts
│   │   │   ├── services
│   │   │   │   ├── auth.guard.ts
│   │   │   │   ├── rest.service.spec.ts
│   │   │   │   ├── rest.service.ts
│   │   │   │   ├── default-request-options.service.ts
│   │   │   │   ├── exception.service.ts
│   │   │   │   ├── in-memory-rest.service.ts
│   │   │   │   ├── index.ts
│   │   │   │   ├── log.service.spec.ts
│   │   │   │   ├── router-extensions.service.ts
│   │   │   │   ├── socket.service.ts
│   │   │   │   └── user.service.ts
│   │   │   └── store
│   │   │       ├── book
│   │   │       │   ├── book.effects.spec.ts
│   │   │       │   ├── book.effects.ts
│   │   │       │   ├── book.model.ts
│   │   │       │   ├── book.reducer.ts
│   │   │       │   └── google-books.service.ts
│   │   │       ├── claim
│   │   │       │   ├── README.md
│   │   │       │   ├── claim.effects.ts
│   │   │       │   ├── claim.model.ts
│   │   │       │   └── claim.reducer.ts
│   │   │       ├── claim-rebuttal
│   │   │       │   ├── claim-rebuttal.effects.ts
│   │   │       │   ├── claim-rebuttal.model.ts
│   │   │       │   └── claim-rebuttal.reducer.ts
│   │   │       ├── collection
│   │   │       │   ├── collection.effects.spec.ts
│   │   │       │   ├── collection.effects.ts
│   │   │       │   └── collection.reducer.ts
│   │   │       ├── contact
│   │   │       │   ├── contact.effects.ts
│   │   │       │   ├── contact.model.ts
│   │   │       │   └── contact.reducer.ts
│   │   │       ├── counter
│   │   │       │   ├── counter.actions.test.ts
│   │   │       │   ├── counter.effects.ts
│   │   │       │   ├── counter.model.ts
│   │   │       │   └── counter.reducer.ts
│   │   │       ├── crisis
│   │   │       │   ├── crisis.effects.ts
│   │   │       │   ├── crisis.model.ts
│   │   │       │   └── crisis.reducer.ts
│   │   │       ├── db.ts
│   │   │       ├── entity
│   │   │       │   ├── entity.actions.ts
│   │   │       │   ├── entity.functions.ts
│   │   │       │   └── entity.model.ts
│   │   │       ├── hero
│   │   │       │   ├── hero.effects.ts
│   │   │       │   ├── hero.model.ts
│   │   │       │   └── hero.reducer.ts
│   │   │       ├── id
│   │   │       │   ├── id.actions.ts
│   │   │       │   ├── id.functions.ts
│   │   │       │   └── id.model.ts
│   │   │       ├── index.ts
│   │   │       ├── layout
│   │   │       │   ├── layout.model.ts
│   │   │       │   └── layout.reducer.ts
│   │   │       ├── message
│   │   │       │   └── message.reducer.ts
│   │   │       ├── note
│   │   │       │   ├── note.effects.ts
│   │   │       │   ├── note.model.ts
│   │   │       │   └── note.reducer.ts
│   │   │       ├── rebuttal
│   │   │       │   ├── rebuttal.effects.ts
│   │   │       │   ├── rebuttal.model.ts
│   │   │       │   └── rebuttal.reducer.ts
│   │   │       ├── search
│   │   │       │   └── search.reducer.ts
│   │   │       ├── session
│   │   │       │   ├── session.effects.ts
│   │   │       │   ├── session.model.ts
│   │   │       │   └── session.reducer.ts
│   │   │       ├── slice
│   │   │       │   ├── slice.actions.ts
│   │   │       │   └── slice.functions.ts
│   │   │       └── util.ts
│   │   ├── env.ts
│   │   ├── index.ts
│   │   ├── login
│   │   │   ├── login.component.html
│   │   │   ├── login.component.scss
│   │   │   ├── login.component.ts
│   │   │   └── login.service.ts
│   │   ├── meta.json
│   │   ├── module
│   │   │   ├── bernie
│   │   │   │   ├── README.md
│   │   │   │   ├── bernie.module.ts
│   │   │   │   ├── bernie.page.html
│   │   │   │   ├── bernie.page.scss
│   │   │   │   ├── bernie.page.ts
│   │   │   │   ├── bernie.routing.ts
│   │   │   │   ├── claim
│   │   │   │   │   ├── claim.component.html
│   │   │   │   │   ├── claim.component.scss
│   │   │   │   │   ├── claim.component.spec.ts
│   │   │   │   │   └── claim.component.ts
│   │   │   │   └── rebuttal
│   │   │   │       ├── rebuttal.component.html
│   │   │   │       ├── rebuttal.component.scss
│   │   │   │       ├── rebuttal.component.spec.ts
│   │   │   │       └── rebuttal.component.ts
│   │   │   ├── books
│   │   │   │   ├── README.md
│   │   │   │   ├── add-commas
│   │   │   │   │   └── add-commas.pipe.ts
│   │   │   │   ├── book-authors
│   │   │   │   │   └── book-authors.component.ts
│   │   │   │   ├── book-detail
│   │   │   │   │   └── book-detail.component.ts
│   │   │   │   ├── book-exists
│   │   │   │   │   └── book-exists.guard.ts
│   │   │   │   ├── book-preview
│   │   │   │   │   ├── book-preview-list.component.ts
│   │   │   │   │   └── book-preview.component.ts
│   │   │   │   ├── book-search
│   │   │   │   │   └── book-search.component.ts
│   │   │   │   ├── books.module.ts
│   │   │   │   ├── books.routing.ts
│   │   │   │   ├── collection.page.spec.ts
│   │   │   │   ├── collection.page.ts
│   │   │   │   ├── ellipsis
│   │   │   │   │   ├── ellipsis.pipe.ts
│   │   │   │   │   └── ellipsis.spec.ts
│   │   │   │   ├── find-book.page.ts
│   │   │   │   ├── selected-book.page.ts
│   │   │   │   └── view-book.page.ts
│   │   │   ├── contact
│   │   │   │   ├── contact.module.ts
│   │   │   │   ├── contact.page.html
│   │   │   │   ├── contact.page.scss
│   │   │   │   ├── contact.page.ts
│   │   │   │   └── contact.routing.ts
│   │   │   ├── counter
│   │   │   │   ├── README.md
│   │   │   │   ├── counter.component.scss
│   │   │   │   ├── counter.component.ts
│   │   │   │   ├── counter.module.ts
│   │   │   │   ├── counter.page.ts
│   │   │   │   └── counter.routing.ts
│   │   │   ├── dashboard
│   │   │   │   ├── dashboard.component.html
│   │   │   │   ├── dashboard.component.ts
│   │   │   │   ├── dashboard.module.ts
│   │   │   │   ├── dashboard.routes.ts
│   │   │   │   └── index.ts
│   │   │   ├── heroes
│   │   │   │   ├── admin
│   │   │   │   │   ├── admin-dashboard
│   │   │   │   │   │   └── admin-dashboard.component.ts
│   │   │   │   │   ├── admin.module.ts
│   │   │   │   │   ├── admin.page.scss
│   │   │   │   │   ├── admin.page.ts
│   │   │   │   │   └── admin.routing.ts
│   │   │   │   ├── crisis-center
│   │   │   │   │   ├── compose-message
│   │   │   │   │   │   ├── compose-message.component.html
│   │   │   │   │   │   └── compose-message.component.ts
│   │   │   │   │   ├── crisis-center-home
│   │   │   │   │   │   └── crisis-center-home.component.ts
│   │   │   │   │   ├── crisis-center.module.ts
│   │   │   │   │   ├── crisis-center.page.html
│   │   │   │   │   ├── crisis-center.page.scss
│   │   │   │   │   ├── crisis-center.page.ts
│   │   │   │   │   ├── crisis-center.routing.ts
│   │   │   │   │   ├── crisis-detail
│   │   │   │   │   │   ├── crisis-detail-resolver.service.ts
│   │   │   │   │   │   └── crisis-detail.component.ts
│   │   │   │   │   └── crisis-list
│   │   │   │   │       ├── crisis-list.component.scss
│   │   │   │   │       └── crisis-list.component.ts
│   │   │   │   ├── dashboard
│   │   │   │   │   ├── dashboard-crisis
│   │   │   │   │   │   ├── dashboard-crisis.component.html
│   │   │   │   │   │   ├── dashboard-crisis.component.scss
│   │   │   │   │   │   └── dashboard-crisis.component.ts
│   │   │   │   │   ├── dashboard-hero
│   │   │   │   │   │   ├── dashboard-hero.component.html
│   │   │   │   │   │   ├── dashboard-hero.component.scss
│   │   │   │   │   │   ├── dashboard-hero.component.spec.ts
│   │   │   │   │   │   └── dashboard-hero.component.ts
│   │   │   │   │   ├── dashboard.component.html
│   │   │   │   │   ├── dashboard.component.scss
│   │   │   │   │   ├── dashboard.component.ts
│   │   │   │   │   ├── dashboard.module.ts
│   │   │   │   │   ├── dashboard.routing.ts
│   │   │   │   │   └── hero-search
│   │   │   │   │       ├── hero-search.component.html
│   │   │   │   │       ├── hero-search.component.scss
│   │   │   │   │       └── hero-search.component.ts
│   │   │   │   ├── hero
│   │   │   │   │   ├── hero-detail
│   │   │   │   │   │   ├── hero-detail.component.html
│   │   │   │   │   │   ├── hero-detail.component.no-testbed.spec.ts
│   │   │   │   │   │   ├── hero-detail.component.scss
│   │   │   │   │   │   ├── hero-detail.component.spec.ts
│   │   │   │   │   │   └── hero-detail.component.ts
│   │   │   │   │   ├── hero-list
│   │   │   │   │   │   ├── hero-list.component.html
│   │   │   │   │   │   ├── hero-list.component.scss
│   │   │   │   │   │   ├── hero-list.component.spec.ts
│   │   │   │   │   │   └── hero-list.component.ts
│   │   │   │   │   ├── hero.module.ts
│   │   │   │   │   └── hero.routing.ts
│   │   │   │   ├── heroes.module.ts
│   │   │   │   ├── heroes.page.html
│   │   │   │   ├── heroes.page.scss
│   │   │   │   ├── heroes.page.ts
│   │   │   │   └── heroes.routing.ts
│   │   │   ├── home
│   │   │   │   ├── home.component.html
│   │   │   │   └── home.component.ts
│   │   │   ├── index.ts
│   │   │   ├── message
│   │   │   │   ├── index.ts
│   │   │   │   ├── message.component.html
│   │   │   │   ├── message.component.ts
│   │   │   │   ├── message.module.ts
│   │   │   │   ├── message.routes.ts
│   │   │   │   └── message.service.ts
│   │   │   ├── mod.module.ts
│   │   │   ├── module.component.html
│   │   │   ├── module.component.scss
│   │   │   ├── module.component.ts
│   │   │   ├── module.routes.ts
│   │   │   ├── notes
│   │   │   │   ├── README.md
│   │   │   │   ├── add-button
│   │   │   │   │   ├── add-button.component.html
│   │   │   │   │   ├── add-button.component.scss
│   │   │   │   │   └── add-button.component.ts
│   │   │   │   ├── note
│   │   │   │   │   ├── note.component.html
│   │   │   │   │   ├── note.component.scss
│   │   │   │   │   └── note.component.ts
│   │   │   │   ├── notes.module.ts
│   │   │   │   ├── notes.page.html
│   │   │   │   ├── notes.page.scss
│   │   │   │   ├── notes.page.spec.ts
│   │   │   │   ├── notes.page.ts
│   │   │   │   └── notes.routing.ts
│   │   │   ├── setting
│   │   │   │   ├── password.component.html
│   │   │   │   ├── password.component.scss
│   │   │   │   ├── password.component.ts
│   │   │   │   ├── profile.component.html
│   │   │   │   ├── profile.component.ts
│   │   │   │   ├── setting.module.ts
│   │   │   │   └── setting.routes.ts
│   │   │   ├── user
│   │   │   │   ├── dialog
│   │   │   │   │   ├── addUser.html
│   │   │   │   │   └── addUser.scss
│   │   │   │   ├── index.ts
│   │   │   │   ├── user.component.html
│   │   │   │   ├── user.component.scss
│   │   │   │   ├── user.component.ts
│   │   │   │   ├── user.module.ts
│   │   │   │   ├── user.routes.ts
│   │   │   │   └── user.service.ts
│   │   │   └── wiki
│   │   │       ├── wiki-smart.component.ts
│   │   │       ├── wiki.component.ts
│   │   │       ├── wiki.module.ts
│   │   │       ├── wiki.page.ts
│   │   │       ├── wiki.routing.ts
│   │   │       ├── wiki.scss
│   │   │       └── wikipedia.service.ts
│   │   ├── shared
│   │   │   ├── alert
│   │   │   │   ├── alert.component.spec.ts
│   │   │   │   ├── alert.component.ts
│   │   │   │   └── index.ts
│   │   │   ├── animations.ts
│   │   │   ├── awesome
│   │   │   │   └── awesome.pipe.ts
│   │   │   ├── banner
│   │   │   │   ├── banner.component.detect-changes.spec.ts
│   │   │   │   ├── banner.component.html
│   │   │   │   ├── banner.component.scss
│   │   │   │   ├── banner.component.spec.ts
│   │   │   │   └── banner.component.ts
│   │   │   ├── button
│   │   │   │   ├── button.component.spec.ts
│   │   │   │   ├── button.component.ts
│   │   │   │   └── index.ts
│   │   │   ├── can-deactivate
│   │   │   │   └── can-deactivate.guard.ts
│   │   │   ├── container
│   │   │   │   ├── container.component.spec.ts
│   │   │   │   └── container.component.ts
│   │   │   ├── dialog
│   │   │   │   └── dialog.service.ts
│   │   │   ├── draggable
│   │   │   │   └── draggable.directive.ts
│   │   │   ├── footer
│   │   │   │   ├── footer.component.html
│   │   │   │   ├── footer.component.scss
│   │   │   │   └── footer.component.ts
│   │   │   ├── form
│   │   │   │   ├── form.component.spec.ts
│   │   │   │   ├── form.component.ts
│   │   │   │   └── index.ts
│   │   │   ├── form-error
│   │   │   │   ├── form-error.component.spec.ts
│   │   │   │   └── form-error.component.ts
│   │   │   ├── form-group
│   │   │   │   ├── form-group.component.spec.ts
│   │   │   │   └── form-group.component.ts
│   │   │   ├── highlight
│   │   │   │   ├── highlight.directive.spec.ts
│   │   │   │   └── highlight.directive.ts
│   │   │   ├── index.ts
│   │   │   ├── input
│   │   │   │   ├── input.component.spec.ts
│   │   │   │   └── input.component.ts
│   │   │   ├── label
│   │   │   │   ├── label.component.spec.ts
│   │   │   │   └── label.component.ts
│   │   │   ├── material.scss
│   │   │   ├── module.service.ts
│   │   │   ├── navigation.service.ts
│   │   │   ├── selective-preloading-strategy.ts
│   │   │   ├── shared.module.ts
│   │   │   ├── title-case
│   │   │   │   ├── title-case.pipe.spec.ts
│   │   │   │   └── title-case.pipe.ts
│   │   │   ├── twain
│   │   │   │   ├── twain.component.spec.ts
│   │   │   │   ├── twain.component.ts
│   │   │   │   └── twain.service.ts
│   │   │   ├── version.service.ts
│   │   │   ├── welcome
│   │   │   │   ├── welcome.component.spec.ts
│   │   │   │   └── welcome.component.ts
│   │   │   └── widgets
│   │   │       ├── index.ts
│   │   │       └── todo
│   │   │           ├── index.ts
│   │   │           ├── todo.html
│   │   │           └── todo.ts
│   │   ├── signup
│   │   │   ├── signup.component.html
│   │   │   ├── signup.component.scss
│   │   │   ├── signup.component.ts
│   │   │   └── signup.service.ts
│   │   └── widgets
│   │       ├── index.ts
│   │       └── todo
│   │           ├── index.ts
│   │           ├── todo.html
│   │           └── todo.ts
│   ├── assets
│   │   ├── favicon.ico
│   │   └── icon
│   │       ├── android-icon-144x144.png
│   │       ├── android-icon-192x192.png
│   │       ├── android-icon-36x36.png
│   │       ├── android-icon-48x48.png
│   │       ├── android-icon-72x72.png
│   │       ├── android-icon-96x96.png
│   │       ├── apple-icon-114x114.png
│   │       ├── apple-icon-120x120.png
│   │       ├── apple-icon-144x144.png
│   │       ├── apple-icon-152x152.png
│   │       ├── apple-icon-180x180.png
│   │       ├── apple-icon-57x57.png
│   │       ├── apple-icon-60x60.png
│   │       ├── apple-icon-72x72.png
│   │       ├── apple-icon-76x76.png
│   │       ├── apple-icon-precomposed.png
│   │       ├── apple-icon.png
│   │       ├── browserconfig.xml
│   │       ├── favicon-16x16.png
│   │       ├── favicon-32x32.png
│   │       ├── favicon-96x96.png
│   │       ├── favicon.ico
│   │       ├── ms-icon-144x144.png
│   │       ├── ms-icon-150x150.png
│   │       ├── ms-icon-310x310.png
│   │       └── ms-icon-70x70.png
│   ├── config
│   │   ├── config.common.ts
│   │   ├── config.dev.ts
│   │   ├── config.prod.ts
│   │   ├── config.ts
│   │   ├── empty.ts
│   │   ├── helpers.ts
│   │   ├── html-elements-plugin
│   │   │   └── index.ts
│   │   ├── html-head-config.ts
│   │   ├── resource-override.ts
│   │   ├── webpack.common.ts
│   │   ├── webpack.dev.ts
│   │   └── webpack.prod.ts
│   ├── custom-typings.d.ts
│   ├── index.html
│   ├── main.aot.ts
│   ├── main.ts
│   └── polyfills.ts
├── config
│   ├── default.json
│   └── production.json
├── docker
│   ├── dev.dockerfile
│   ├── docker-compose.dev.yml
│   ├── docker-compose.prod.yml
│   └── prod.dockerfile
├── npm-debug.log
├── package.json
├── process.yml
├── server.ts
├── tsconfig.client.json
├── tsconfig.server.json
├── tslint.json
├── webpack.config.js
└── yarn.lock
```
