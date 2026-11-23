import { lazy } from "react";
import {
  Briefcase,
  FileText,
  GraduationCap,
  Inbox,
  LayoutDashboard,
  MonitorPlay,
  Newspaper,
  Palette,
  Tags,
  Users,
} from "lucide-react";

/**
 * ONE list drives the sidebar, the routes, the page titles and the breadcrumbs.
 *
 * Add a module:
 *   1. create src/pages/modules/XPage.jsx (and src/features/x/ for its service + components)
 *   2. add ONE entry below with  page: lazy(() => import("@/pages/modules/XPage"))
 * Entries without `page` show the "Coming soon" placeholder.
 *
 * Fields: key, label, path, icon, group (sidebar heading), description,
 *         page (optional), hideInSidebar (optional), devOnly (optional - only in `npm run dev`)
 */
export const MODULES = [
  {
    key: "dashboard",
    label: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
    group: "Main",
    description: "Overview of all enquiries.",
    page: lazy(() => import("@/pages/modules/DashboardPage")),
  },

  // ---- placeholders: one per Postman folder, replaced one by one when its API is shared ----
  {
    key: "enquiries", label: "Enquiries", path: "/enquiries", icon: Inbox, group: "Enquiries", description: "Enquiries from the website form.",
    page: lazy(() => import("@/pages/modules/EnquiriesPage")),
  },
  {
    key: "jobRequests", label: "Job Requests", path: "/job-requests", icon: FileText, group: "Enquiries", description: "Job applications from the website.",
    page: lazy(() => import("@/pages/modules/JobRequestsPage")),
  },
  {
    key: "schoolInquiries", label: "School Inquiries", path: "/school-inquiries", icon: GraduationCap, group: "Enquiries", description: "Inquiries from schools.",
    page: lazy(() => import("@/pages/modules/SchoolInquiriesPage")),
  },
  {
    key: "pgDemoRequests", label: "PG Demo Requests", path: "/pg-demo-requests", icon: MonitorPlay, group: "Enquiries", description: "PG demo requests.",
    page: lazy(() => import("@/pages/modules/PgDemoRequestsPage")),
  },
  {
    key: "blogs", label: "Blogs", path: "/blogs", icon: Newspaper, group: "Website Content", description: "Manage blog posts.",
    page: lazy(() => import("@/pages/modules/BlogsPage")),
  },
  {
    key: "categories",
    label: "Categories",
    path: "/categories",
    icon: Tags,
    group: "Website Content",
    description: "Manage blog categories.",
    page: lazy(() => import("@/pages/modules/CategoriesPage")),
  },
  {
    key: "careerJobs", label: "Career Jobs", path: "/career-jobs", icon: Briefcase, group: "Website Content", description: "Manage job openings.",
    page: lazy(() => import("@/pages/modules/CareerJobsPage")),
  },
  {
    key: "employees", label: "Employees", path: "/employees", icon: Users, group: "Website Content", description: "Manage employees.",
    page: lazy(() => import("@/pages/modules/EmployeesPage")),
  },

  // {
  //   key: "uiKit",
  //   label: "UI Kit",
  //   path: "/ui-kit",
  //   icon: Palette,
  //   group: "Developer",
  //   description: "Every reusable component in one place (development only).",
  //   devOnly: true,
  //   page: lazy(() => import("@/pages/modules/UiKitPage")),
  // },
];

export const isModuleVisible = (m) => !m.devOnly || import.meta.env.DEV;
export const getModule = (key) => MODULES.find((m) => m.key === key);
export const getModuleByPath = (pathname) => MODULES.find((m) => pathname === m.path || pathname.startsWith(`${m.path}/`));
