# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.
Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Challenge Wrap-Up

### How I approached the challenge
I started by planning the overall structure with the goal of building a clean, modular, maintainable, and scalable solution. I began with the Django backend, implementing the logic to calculate and return the projection data using the existing endpoint.

Once the API was functional, I moved on to the frontend using React and Chakra UI, focusing on a UX that felt simple, responsive, and user-friendly. I took inspiration from the Moneybox app and used a debounced input pattern to ensure the chart updated live without compromising performance.

While building the frontend, I had the idea to display some high-level summary metrics above the chart. This led me to refactor the backend response to include additional summary data.

### What I like about my solution

- The smooth experience provided by the sliders
- The clean UI that presents key information at a glance
- The reusability and expandability of the backend API structure

### What I’d improve or develop next
From a development perspective:
- Add proper unit tests for the backend calculation logic
- Refactor the frontend to extract the current layout from `App.tsx` into a dedicated page/component

From a feature perspective:
- Allow users to define a custom number of years for projection
- Add more interactivity to the chart such as more informative tooltips on hover
