# vue-todo-list

This is the front-end repository for the Vue.js Todo List application. Note that this application requires the corresponding backend API to be running. The backend API can be found at this [link](https://github.com/michaelbarley/todo-list-api).

## Project setup
```
npm install
```

### Backend API setup
You need to have the backend API running on your machine. Follow the instructions in the [API repository](https://github.com/michaelbarley/todo-list-api) to set it up.

Once you have the backend running, you'll need to set the base URL for the axios requests to match the URL of your local API instance. This can be done in the todos.js file.

For example, if your local API is running on `http://localhost:8000`, you should set:


### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
