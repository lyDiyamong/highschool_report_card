import { createRouter, createWebHistory } from "vue-router";
import DashboardLayout from "../layouts/dashboard.vue";
import BranchReport from "../views/branchReport.vue";

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
      {
        path: "reports/:month",
        name: "reports by month",
        component: () => import("../views/reportByMonth.vue"),
      },
      {
        path: "transcript",
        name: "transcript",
        component: () => import("../views/transcript.vue"),
      },
      {
        path: "branch-report",
        name: "branchReport",
        component: () => import("../views/branchReport.vue"),
      },
      {
        path: "branch-report",
        name: "branch-report",
        component: BranchReport,
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
