import { createRouter, createWebHistory } from "vue-router";
import DashboardLayout from "../layouts/dashboard.vue";

// Import your components/views

// Define your routes
const routes = [
    {
        path: "/",
        component: DashboardLayout,
        children: [
            {
                path: "",
                name: "dashboard",
                component: () => import("../views/dashboard.vue"),
            },
            {
                path: "reports",
                name: "reports",
                component: () => import("../views/reports.vue"),
            },
        ],
    },
];

// Create the router instance
const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
