export const projects = [
  {
    key: "bookStreet",
    slug: "book-street-event-management-system",
    technologies: ["Java", "Spring Boot", "PostgreSQL", "Redis", "Flyway", "React", "Docker", "VNPay"],
    technologyMarks: ["java", "spring", "postgresql", "redis", "flyway", "react", "docker"],
    technologyGroups: [
      { key: "backend", marks: ["java", "spring"] },
      { key: "frontend", marks: ["react"] },
      { key: "database", marks: ["postgresql"] },
      { key: "caching", marks: ["redis"] },
      { key: "infrastructure", marks: ["flyway", "docker"] },
    ],
    teamSize: 5,
    metrics: [
      { value: "127 / 188", key: "metric1", scope: "personal" },
      { value: "16 / 18", key: "metric2", scope: "personal" },
      { value: "32", key: "metric3", scope: "projectScope" },
    ],
  },
  {
    key: "moonCake",
    slug: "mooncake-e-commerce-system",
    technologies: ["Java 21", "Spring Boot", "Thymeleaf", "SQL Server", "Flyway", "HTML/CSS/JS", "VNPay"],
    technologyMarks: ["java", "spring", "thymeleaf", "sqlserver", "flyway", "html5", "css3", "javascript"],
    technologyGroups: [
      { key: "backend", marks: ["java", "spring"] },
      { key: "frontend", marks: ["thymeleaf", "html5", "css3", "javascript"] },
      { key: "database", marks: ["sqlserver"] },
      { key: "infrastructure", marks: ["flyway"] },
    ],
    teamSize: 3,
    metrics: [
      { value: "64 / 93", key: "metric1", scope: "personal" },
      { value: "14 / 20", key: "metric2", scope: "personal" },
      { value: "19", key: "metric3", scope: "personal" },
    ],
  },
] as const;

export type ProjectSlug = (typeof projects)[number]["slug"];
export type Project = (typeof projects)[number];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
