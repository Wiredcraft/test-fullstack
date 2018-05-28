# Wiredcraft Full-stack Developer Test

## Quick Start

- Try the app online 
 
You can watch videos on the app's page. Please note the app is optimized for Youtube videos only, please use VPN. The app works without VPN, but to watch Youtube videos you'll need a VPN.

**Hosted at:** (new link)

[http://lightningtalkingpoll-hosting-mobilehub-657233735.s3-website.us-east-1.amazonaws.com/](http://lightningtalkingpoll-hosting-mobilehub-657233735.s3-website.us-east-1.amazonaws.com/)

- Run the app locally on your machine 

```sh
$ cd lightning-talk-polling-app
```

```sh
$ cd npm install
```

```sh
$ cd npm start
```
 
Please note that all you need is to run the React app, the backend is already running online. This is a serverless app running on AWS, uses AWS Mobile Hub service. To run the backend part you’ll need AWS account and launch the app under your AWS account to create a serverless app on AWS servers. For more details please check this link about [AWS Mobile CLI](https://docs.aws.amazon.com/aws-mobile/latest/developerguide/aws-mobile-cli-reference.html). **I think it is not necessary to launch your own app on AWS, you can examine the state of the app via the link I provided and examine my code via Github. It is up to you :)**

- Check frontend source code folder here

```sh
$ cd lightning-talk-polling-app/src
```

- Check backend source code folder here
```sh
$ cd lightning-talk-polling-app/awsmobilejs/backend
```

## More Details

In the interview with Maraka and from Wiredcraft’s README test file I understood that you don’t just want me to finish the app but also show you how I think, why I did what I did and how I did it. This is why I’m writing this details section.

### How I approach a new project

- I do research to check the latest trends
- Pick frameworks, services to use
- Learn as much as I can about the frameworks and services I’ve picked, depending on the time I have
- Write down a plan (a basic road map), on a paper, whiteboard, Google doc. The plan usually contains a list of tasks, a list of app's features, a simple class diagram, a mockup for the UI (I’m not a designer so I user draw.io to draw one)
- Start building
- As I build, I learn, as I learn new techniques and best practices I refactor my code to apply new techniques. If I learn something new to improve my code I don’t mind to rewrite it - especially if it is going to save time in the future update or will be easier for the team to use
- I keep a list open, whenever I have and idea about the code to improve or to do I write it down so I don’t forgot it. I use the same list to track bugs I find during development. Later I come back to the list to check tasks or bugs
- I use Git branch to test new things before adding it to master
- I like to do major code refactoring whenever I finish a major step or task (sometimes it is hard to come up with a perfect plan when you don't have enough knowledge/experience about a framework you'are using) 

### The tech stack used to build the app

- **Backend: What I used**

Serverless applications app running on AWS, using AWS Mobile Hub service. the serverless app 
comes with the following services:

Amazon Cognito User Pools and Federated Identities  
Amazon API Gateway, AWS Lambda, and Amazon DynamoDB  
Cross-origin resource sharing (CORS) for the API  
IAM roles and policy for the Lambda execution role  
IAM roles and policy for the user roles that access API routes after authentication  

- **Backend: Why I used it**

**1- Wiredcraft reason**

In the Wiredcraft’s README test file you wrote “Feel free to use any libraries you would use if this were a real production App” and also in the interview, Makara told me I’m free to use any libraries as long as I **give a good explanation about my decision**.

**2- Personal reason**

I’m a lazy programmer type! I like to use tools to build apps fast AND work good. As long as I achieve what the client's wants. I care about joy and time more than how much money it will cost, If the client want to pay for it. If there is an easy, fast, and good way to do something I always go for it first before checking the long way.

**3- Business reason**
- Cheap! Using serverless app, you pay per request you make to the API not for a server running 24/7
- Very, very, very fast starting. Saves time. Using AWS Mobile CLI you could launch Cognito, DaynamoDB, S3, Cloudfront and API Gateway, all working together in harmony
- Very fast to publish new version of the app to your users. Simply run the command `awsmobile publish` from terminal
- Fast development. Amplify a very nice new API. AWS launched a new API called Amplify. What you needed to do in 10 lines of code before you can do it in one line of code using Amplify API
- Scalability made easy via console
- Backup made easy via aws console
- YOU CAN GO HOME AND SLEEP PEACEFULLY, DON’T HAVE TO WORRY ABOUT THE SERVERS, BECAUSE THERE ARE NONE!

**4- Why I didn’t use LoopBack**

I never used it (except I followed a demo before to test and play with it), but I read about it time to time, and I like it. I think it is one of the best frameworks out there today. Especially after IBM bought StrongLoop. Plus there is a dedicated team maintaining LoopBack. 
Since Wiredcraft give me the freedom to choose, I chose a serverless app, otherwise, I would 
have used LoopBack for sure.

- **Frontend: What I used**

React, Redux, Bootstrap, and MDBootstrap

- **Frontend: Why I used it**

This is the first time I use React (I worked with ReactNative for a short time a long time ago, almost forgot all of it) I chose it because  Wiredcraft uses it, and you advice me to use it, hopefully if I get the job I can use my new learning about React at Wiredcraft. (first MVVC framework I worked with was Angular 4)

## Lightning talk app 

- **Features**

    - All the requirement written in Wiredcraft's README User Story section
    - registration/authentication (a phone number is required to confirm registration)
    - User profile page
    - A simple custom made form validation, on the frontend. No third party library was used
    - Screen size responsive. Mobile, tablet, and large screen

- **Things I didn’t do but wish I had the time to do**

    - Unit testing
    - Validate user’s input in the backend too
    - Use modals to communicate with the user
    - Try AWS CodePipeline in the project (I’ve never used it before, I liked what I read about it)

- **Why I didn’t use third party form validation library**

    - Learning and having fun with RegExp 

## Last word

The interview was about a month ago. These are the last two months of my school, I’m very busy, I couldn’t find the time to work on the test. It took me about 8 days to finish the app you are using right now

I took so long to submit the test. I truly didn't have time to do it

I'm taking the job and the test you gave me very seriously

I did the best I could with the amount of time and knowledge I had

Thank you for the opportunity!

I hope you will like the app!

If you find any bugs, just say to them shooow, shoooow shoooow and they will go away! Trust me, it works!

A business feedback is never personal, your feedback and comments are very welcome

**Have a great day Wiredcraft team :)**
