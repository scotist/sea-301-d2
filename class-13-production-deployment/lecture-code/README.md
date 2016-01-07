# Deployment with Heroku

Heroku is a full-featured production infrastructure. It works with a variety of frameworks and languages.

Our app has some special requirements related to how it is served. We need to understand these, to determine how our app will work with Heroku. Specifically:

 1. We are using push-state, so the server should reply with the `index.html` for any requests for non-existent files.
 - We need to keep our GitHub tokens secret, and inaccessible to the client-side portion of the app.

We need to accomplish these goals in both our local development environment, and in our production environment. The more parity we have between the two, the fewer bugs we'll have slowing us down.

A simple Node server (built with the Express framework) will help us meet these requirements in both dev and production. You can find this server file at `lecture-code/blog/server.js` folder. To meet our requirements:

 1. It's already configured to reply with `index.html` to any request that doesn't match an existing file.
 - It's ready to make requests to the GitHub API on behalf of the client app.

To accomplish this second item, our web server is acting as an "http proxy", that will make requests for the client code, and return the result. The advantage is that if these requests are done server-side, then our secret tokens can safely be included with the request, with no concern of them getting exposed to end users. The details of how this all works is unimportant at this time. What you do need to know, is how to install the server dependencies and set an environment variable.

## Server Dependencies

Our custom server is built with the Express Framework and requires the installation of some software (dependencies) to run. Helpfully, the provided [package.json](https://github.com/codefellows/sea-301d1/blob/master/class-13-production-deployment/lecture-code/blog/package.json) contains all the configuration we need. Complete the following to install the server dependencies and enable the server to run.

1. Make sure the [server.js](https://github.com/codefellows/sea-301d1/blob/master/class-13-production-deployment/lecture-code/blog/server.js) file and [package.json](https://github.com/codefellows/sea-301d1/blob/master/class-13-production-deployment/lecture-code/blog/package.json) are located in your project root folder.
2. Run the command `npm install`, which will read the package.json file and install the necessary dependencies.
3. Your server can now be run with the command `node server.js`, but first we should set up the environment variable to hold the GitHub token.

## Environment Variables

Environment variables provide configuration for our app, at the system level. That means our development machine (aka: your laptop, aka: your dev env) can hold a different configuration from the production server. This low-level config is also stored separately from our code-base, which makes it ideal for keeping secrets.

Environment variables are often set in a user's `.bashrc` or `.bash_profile` files. That determines the environment for the entire terminal session, and any programs that run therein. It's also possible to set env vars for a single command, at the time you run it. This is how we will start our server now:

`  $ GITHUB_TOKEN=asdfasdfasdf node server.js`

This will make the environment variable of "GITHUB_TOKEN" available to our server when it starts up. The server will then attach the token to each request it makes to GitHub, on our behalf. That should aleviate some rate-limit concerns!

Try it out, and ensure it is all working for you!

## Heroku

With our app now running locally, we are now ready to ship it!

Just as you saw in the getting started guide, you'll need to follow a few steps to get your app deployed on Heroku.

 1. Install the Heroku Toolbelt
 - Create a new Heroku app, with the name of your choosing
 - Send your code from your current git branch to your new server's master branch:
 `git push heroku HEAD:master`
 - Set the env vars on your server:
 `heroku config:set GITHUB_TOKEN=asfdasdfasdf`
 - Open your page in the browser, and troubleshoot any issues that arise.
