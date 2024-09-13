  # Travel Booking Website

This is a Travel Booking web application built using **React**, **Vite**, and **Tailwind CSS**. Follow the steps below to set up and run the project locally.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Authors](#authors)
- [License](#license)

## Features

- User-friendly interface for easy navigation
- Responsive design using Tailwind CSS


## Technologies Used

- [React](https://reactjs.org/) - A JavaScript library for building user interfaces
- [TypeScript](https://www.typescriptlang.org/) - A typed superset of JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework for rapidly building custom designs
- [React Icons](https://react-icons.github.io/react-icons/) - Include popular icons in your React projects easily

## Installation

To set up the project locally, follow these steps:

### Prerequisites

- Node.js (v14.x or above)
- npm (v6.x or above) or yarn (v1.x or above)

### Clone the repository

```bash
git clone https://github.com/piyushzingade/Travel-Booking-Website-Frontend.git
cd Travel-Booking-Website-Frontend
cd client
```
## Install Dependencies for client 
### Using npm:
```bash
npm install axios react-router-dom react-hot-toast reduxjs/toolkit  react-redux react-dom
```

## Install Dependencies for server 
### Using npm:
```bash
npm install body-parser cors express dotenv mongoose paasport passport-local password-mongoose 
```

## Tailwind CSS Setup
### Initialize it using the following command:
```bash

npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

// main.css 
@tailwind base;
@tailwind components;
@tailwind utilities;


// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust paths as needed
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {},
  },
  plugins: [],
};

```

## Running project 
### To run the development client and server:
```bash
cd client or cd server
npm run dev!

```
[[Screenshot 2024-09-13 163331](https://github.com/user-attachments/assets/4a7cbf21-9112-41ac-be4f-a5bfda58a66b)
![Uploading image.png…]()
![Uploading image.png…]()
![Uploading image.png…]()
![Uploading image.png…]()
]



## Author

-Piyush Zingade
