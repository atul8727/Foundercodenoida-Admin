/**
 * Every API path in ONE place (joined to VITE_API_URL, exactly like {{baseUrl}}/api/... in Postman).
 * Add the endpoints of a new module here, then use them only inside that module's service.
 */
export const ENDPOINTS = {
  auth: {
    login: "/api/login",
    logout: "/api/admin/logout",
  },
  categories: {
    list: "/api/admin/categories", // GET
    create: "/api/admin/categories", // POST { category_name }
    detail: (id) => `/api/admin/categories/${id}`, // GET
    remove: (id) => `/api/admin/categories/${id}`, // DELETE
  },
  // Blog API follows the supplied Postman collection. Create/update use multipart form-data.
  blogs: {
    list: "/api/admin/blogs",
    create: "/api/admin/blogs",
    detail: (id) => `/api/admin/blogs/${id}`,
    update: (id) => `/api/admin/blogs/${id}`,
    remove: (id) => `/api/admin/blogs/${id}`,
  },
  careerJobs: {
    list: "/api/admin/career",
    create: "/api/admin/career",
    detail: (id) => `/api/admin/career/${id}`,
    update: (id) => `/api/admin/career/${id}`,
    remove: (id) => `/api/admin/career/${id}`,
  },
  employees: {
    list: "/api/admin/employees",
    create: "/api/admin/employees",
    remove: (id) => `/api/admin/employees/${id}`,
  },
  enquiries: {
    list: "/api/admin/enquiries",
    remove: (id) => `/api/admin/enquiries/${id}`,
  },
  pgDemoRequests: {
    list: "/api/admin/pg-demo-requests",
    remove: (id) => `/api/admin/pg-demo-requests/${id}`,
  },
  dashboard: {
    stats: "/api/admin/dashboard",
  },
  schoolInquiries: {
    list: "/api/admin/school-inquiries",
    remove: (id) => `/api/admin/school-inquiries/${id}`,
  },
  jobRequests: {
    list: "/api/admin/job-requests",
    resume: (id) => `/api/admin/job-requests/${id}/resume`,
    remove: (id) => `/api/admin/job-requests/${id}`,
  },
};
