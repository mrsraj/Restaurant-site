# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

🍽️ Restaurant Admin Dashboard
    A restaurant management dashboard built with React + Tailwind CSS for handling menu items, orders, and analytics.
    This project helps restaurant admins efficiently manage daily operations such as:
             Menu updates
             Order handling
             Revenue tracking

🚀 Features
📊 Dashboard Overview

    Today’s Orders
    
    Revenue Tracking
    
    Most Ordered Items
    
    Previous Orders & Revenue
    
    Simple charts using React Chart.js

📜 Menu Management

    Add new menu items (image, price, discount, etc.)
    
    Update or delete existing menu items
    
    View menu items in a table with action buttons
    

🛒 Orders Management

    View all customer orders
    Accept ✅ or Decline ❌ orders
    Track order status dynamically

🔔 Notifications (Toast)

    Integrated react-hot-toast (or react-toastify)
    Displays feedback for:
    Order accepted / declined
    Menu item added / updated / deleted
    Payment success / failure

💳 Payments (Razorpay)

   Integrated Razorpay Checkout
   
   Supports:
         Online payments for orders
         Payment success & failure handling
         Ready for Test Mode & Production Mode

🔒 Authentication (Planned)

     Admin login → Admin dashboard pages
     Normal users → Frontend pages

🛠️ Tech Stack

    Frontend: React (Vite), Tailwind CSS, React Router
    State Management: Context API (Redux optional upgrade)
    Charts: React Chart.js
    Icons: Lucide React / Heroicons
    Notifications: React Hot Toast
    Payments: Razorpay

📂 Folder Structure

restaurant-admin-dashboard/

│── src/

│   ├── AdminPages/     # Dashboard, Menu, Orders, etc.

│   ├── components/     # Reusable UI components

│   ├── context/        # Context API (global state)

│   ├── Router/         # App routing

│   ├── App.jsx         # Root component

│   └── main.jsx        # Entry point
│
│── public/             # Static assets

│── package.json        # Dependencies

│── README.md           # Documentation

# Install Dependencies

npm install

▶️ Start Development Server

npm run dev
