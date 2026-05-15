const fs = require('fs');

const baseUrl = '{{base_url}}';

const categories = [
    {
        name: "Authentication & JWT Practice",
        routes: [
            "/auth/register", "/auth/login", "/auth/logout", "/auth/profile", "/auth/forgot-password",
            "/auth/reset-password", "/auth/change-password", "/auth/verify-email", "/auth/send-otp",
            "/auth/verify-otp", "/auth/resend-verification", "/auth/update-profile", "/auth/get-profile",
            "/auth/delete-account", "/auth/deactivate", "/auth/reactivate", "/auth/session", "/auth/history", "/auth/logs",
            "/jwt/token", "/jwt/verify", "/jwt/refresh", "/jwt/decode", "/jwt/check-expiry", "/jwt/blacklist",
            "/jwt/revoke", "/jwt/roles", "/jwt/permissions", "/jwt/validate", "/jwt/header", "/jwt/payload", "/jwt/signature", "/jwt/secret"
        ],
        method: "POST"
    },
    {
        name: "Employee Sorting (Literal)",
        routes: [
            "/employees/sort/experience-asc", "/employees/sort/experience-desc",
            "/employees/sort/salary-asc", "/employees/sort/salary-desc",
            "/employees/sort/name-asc", "/employees/sort/name-desc",
            "/employees/sort/age-asc", "/employees/sort/age-desc",
            "/employees/sort/joining-date-asc", "/employees/sort/joining-date-desc",
            "/employees/sort/performance-asc", "/employees/sort/performance-desc",
            "/employees/sort/department-asc", "/employees/sort/department-desc"
        ]
    },
    {
        name: "Employee Filtering (Literal)",
        routes: [
            "/employees/filter/high-experience", "/employees/filter/low-experience",
            "/employees/filter/verified-certification", "/employees/filter/domain-keyword",
            "/employees/filter/skill-set", "/employees/filter/state-wise",
            "/employees/filter/country-wise", "/employees/filter/city-wise",
            "/employees/filter/timezone-wise", "/employees/filter/salary-range",
            "/employees/filter/active", "/employees/filter/inactive", "/employees/filter/on-leave"
        ]
    },
    {
        name: "Advanced Analytics (Literal)",
        routes: [
            "/employees/analytics/skill-distribution", "/employees/analytics/country-distribution",
            "/employees/analytics/state-distribution", "/employees/analytics/domain-distribution",
            "/employees/analytics/certification-analytics", "/employees/analytics/project-analytics",
            "/employees/analytics/technology-analytics", "/employees/analytics/timezone-analytics",
            "/employees/analytics/location-analytics", "/employees/analytics/experience-analytics",
            "/employees/analytics/verification-analytics", "/employees/analytics/task-analytics",
            "/employees/analytics/salary-distribution", "/employees/analytics/age-group-distribution"
        ]
    },
    {
        name: "Statistics & Counts (Literal)",
        routes: [
            "/stats/employees/count", "/stats/employees/experience-average", "/stats/employees/top-experience",
            "/stats/employees/project-count", "/stats/employees/task-count", "/stats/employees/country-count",
            "/stats/employees/state-count", "/stats/employees/domain-count", "/stats/employees/skill-count",
            "/stats/employees/certification-count", "/stats/employees/timezone-count", "/stats/employees/verified-count",
            "/stats/employees/project-distribution", "/stats/employees/task-distribution", "/stats/employees/technology-count"
        ]
    },
    {
        name: "Middleware & System Practice",
        routes: [
            "/middleware/logger", "/middleware/auth", "/middleware/rate-limit", "/middleware/error-handler",
            "/middleware/request-time", "/middleware/role-check", "/middleware/validation", "/middleware/audit-log",
            "/middleware/cache", "/middleware/compression", "/middleware/helmet", "/middleware/cors",
            "/middleware/body-parser", "/middleware/cookie-parser", "/middleware/session", "/middleware/passport",
            "/middleware/morgan", "/middleware/debug", "/middleware/trace", "/middleware/monitor", "/middleware/health", "/middleware/metrics"
        ]
    },
    {
        name: "Advanced & Custom Queries",
        routes: [
            "/employees/advanced/random", "/employees/advanced/trending-skills", "/employees/advanced/recent",
            "/employees/advanced/top-skills", "/employees/advanced/cloud-engineers", "/employees/advanced/devops-engineers",
            "/employees/advanced/ai-engineers", "/employees/advanced/fullstack", "/employees/advanced/recent-certifications",
            "/employees/advanced/top-performers", "/employees/advanced/salary-stats", "/employees/advanced/department-stats",
            "/employees/advanced/domain-stats"
        ]
    },
    {
        name: "Error Handling & Validation Practice",
        routes: [
            "/error/400", "/error/401", "/error/403", "/error/404", "/error/405", "/error/408", "/error/429",
            "/error/500", "/error/502", "/error/503", "/error/504", "/error/timeout", "/error/network",
            "/error/db-connection", "/error/validation-error",
            "/employees/validate/body", "/employees/validate/params/123", "/employees/validate/query",
            "/employees/validate/headers", "/employees/validate/cookies", "/employees/validate/all"
        ]
    }
];

const postmanJson = {
    info: {
        name: "Employee Management Analytics System - 100% Dataset Parity",
        schema: "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
    },
    item: categories.map(cat => ({
        name: cat.name,
        item: cat.routes.map(route => {
            const name = route.split('/').pop().replace(/-/g, ' ').toUpperCase();
            return {
                name: name,
                request: {
                    method: cat.method || "GET",
                    header: [
                        { key: "Authorization", value: "Bearer {{token}}", type: "text" }
                    ],
                    url: {
                        raw: `${baseUrl}${route}`,
                        host: ["{{base_url}}"],
                        path: route.split('/').filter(p => p)
                    }
                },
                event: [
                    {
                        listen: "test",
                        script: {
                            exec: [
                                "pm.test('Status code is 200', function () { pm.response.to.have.status(200); });",
                                "if(pm.request.url.toString().includes('login')) {",
                                "    var jsonData = pm.response.json();",
                                "    pm.collectionVariables.set('token', jsonData.token || jsonData.data.token);",
                                "}"
                            ],
                            type: "text/javascript"
                        }
                    }
                ]
            };
        })
    })),
    variable: [
        { key: "base_url", value: "http://localhost:5000/api" },
        { key: "token", value: "" }
    ]
};

fs.writeFileSync('Employee_Management_API.postman_collection.json', JSON.stringify(postmanJson, null, 2));
console.log('Postman collection generated successfully with organized folders and test scripts.');
