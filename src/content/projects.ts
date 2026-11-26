export const projects = [
  {
    key: "bookStreet",
    slug: "book-street-event-management-system",
    technologies: ["Java", "Spring Boot", "PostgreSQL", "Redis", "Flyway", "React", "Docker", "VNPay"],
  },
  {
    key: "moonCake",
    slug: "mooncake-e-commerce-system",
    technologies: ["Java 21", "Spring Boot", "Thymeleaf", "SQL Server", "Flyway", "HTML/CSS/JS", "VNPay"],
  },
] as const;

export type ProjectSlug = (typeof projects)[number]["slug"];
export type Project = (typeof projects)[number];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
