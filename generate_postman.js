const fs = require('fs');

const baseUrl = '{{base_url}}';

const categories = [
    {
        name: "Authentication & JWT Practice",
        routes: [
            { path: "/auth/register", method: "POST", body: { name: "Test User", email: "test@example.com", password: "password123", passwordConfirm: "password123" } },
            { path: "/auth/login", method: "POST", body: { email: "test@example.com", password: "password123" } },
            { path: "/auth/logout", method: "POST" },
            { path: "/auth/profile", method: "GET" },
            { path: "/auth/forgot-password", method: "POST", body: { email: "test@example.com" } },
            { path: "/auth/reset-password", method: "PATCH", body: { password: "newpassword123", passwordConfirm: "newpassword123" } },
            { path: "/auth/change-password", method: "PATCH", body: { passwordCurrent: "password123", password: "newpassword123", passwordConfirm: "newpassword123" } },
            { path: "/jwt/token", method: "POST" },
            { path: "/jwt/verify", method: "GET" }
        ]
    },
    {
        name: "Employee Sorting (Literal)",
        routes: [
            "/employees/sort/experience-asc", "/employees/sort/experience-desc",
            "/employees/sort/salary-asc", "/employees/sort/salary-desc",
            "/employees/sort/name-asc", "/employees/sort/name-desc"
        ]
    },
    {
        name: "Advanced Analytics (Literal)",
        routes: [
            "/employees/analytics/skill-distribution", "/employees/analytics/country-distribution",
            "/employees/analytics/project-analytics", "/employees/analytics/salary-distribution"
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
        item: cat.routes.map(r => {
            const path = typeof r === 'string' ? r : r.path;
            const method = typeof r === 'string' ? "GET" : r.method;
            const body = typeof r === 'object' && r.body ? JSON.stringify(r.body, null, 4) : null;
            const name = path.split('/').pop().toUpperCase().replace(/-/g, ' ');

            return {
                name: name,
                request: {
                    method: method,
                    header: [
                        { key: "Authorization", value: "Bearer {{token}}", type: "text" },
                        { key: "Content-Type", value: "application/json", type: "text" }
                    ],
                    body: body ? {
                        mode: "raw",
                        raw: body,
                        options: { raw: { language: "json" } }
                    } : undefined,
                    url: {
                        raw: `${baseUrl}${path}`,
                        host: ["{{base_url}}"],
                        path: path.split('/').filter(p => p)
                    }
                },
                event: [
                    {
                        listen: "test",
                        script: {
                            exec: [
                                "pm.test('Status code is 200 or 201', function () { pm.expect(pm.response.code).to.be.oneOf([200, 201]); });",
                                "if(pm.request.url.toString().includes('login') || pm.request.url.toString().includes('register')) {",
                                "    var jsonData = pm.response.json();",
                                "    if(jsonData.token) pm.collectionVariables.set('token', jsonData.token);",
                                "    else if(jsonData.data && jsonData.data.token) pm.collectionVariables.set('token', jsonData.data.token);",
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
console.log('Postman collection updated with sample bodies.');
