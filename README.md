# Imageboard

A modern React-based imageboard where users can post images and text in a single feed. The design features a dark purple theme with a clean and intuitive interface.

## Features
- Post images and text to a feed
- Modern dark purple UI
- Responsive design
- Animations using Framer Motion

## Installation and Setup

### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (version 16+ recommended)
- npm (comes with Node.js)

### Clone the Repository
```sh
git clone <your-repo-url>
cd imageboard
```

### Install Dependencies
```sh
npm install
```

### Start the Development Server
```sh
npm run dev
```

The app should now be running at [http://localhost:5173](http://localhost:5173).

## Project Structure
```
imageboard/
│── public/               # Static assets
│── src/
│   ├── components/       # UI components
│   │   ├── ui/           # Reusable UI elements
│   │   ├── Imageboard.jsx # Main imageboard component
│   ├── assets/           # Images and icons
│   ├── App.jsx           # Root component
│   ├── main.jsx          # React entry point
│   ├── index.css         # Global styles
├── package.json          # Project dependencies
├── tailwind.config.js    # Tailwind CSS configuration
├── vite.config.js        # Vite configuration
```

## Technologies Used
- **React** - UI framework
- **Vite** - Fast development environment
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Lucide React** - Icons

## Future Improvements
- User authentication
- Commenting system
- Multiple feeds/categories
- Backend integration for data persistence

## Contributing
Pull requests are welcome! If you have suggestions, feel free to open an issue.

## License
This project is licensed under the MIT License.

