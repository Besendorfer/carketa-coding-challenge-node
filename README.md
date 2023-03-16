# Carketa Coding Challenge - Node Server

Thank you for this opportunity to try out this coding challenge! I had a lot of fun working on it.

Here are some details to help you get started.

## Installation

Installation _should_ be simple. I am currently using Node.js version 18.13.0. You can probably use a lower version, but YMMV.

Simply run the following commands and you should have a development environment running:

```
npm install

npm run dev
```

## Running tests

So, I was able to write up some test cases for both the `/people` and `/planets` routes. Strangely, the axios mocking tool I used, `nock`, was giving me some trouble when trying to mock out the "next" parameter for pagination. It wasn't cleaning out the interceptor correctly, even with using their `cleanAll` method. So, I broke out the "pagination" tests into it's own test run.

Simple running these two commands should run through the tests:

```
npm run test

npm run test-pagination
```

## Bonus work

I tried to add in a few bonus items, which you might have noticed.

1. Tests
2. TypeScript
3. Hosted server - try out these endpoints!
    * http://ec2-34-208-5-173.us-west-2.compute.amazonaws.com:3000/api/people (also try out the sortBy query params: name, height, and mass)
    * http://ec2-34-208-5-173.us-west-2.compute.amazonaws.com:3000/api/planets
    * This server is not secure by any means. There are a number of things I would do to keep it safe, but I wanted to get this available so you could take a look at it.