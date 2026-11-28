// Owner-provided CV/project facts and the P5 technology confirmations.
// Associations describe experience, not proficiency or employment seniority.
export const expertiseGroups = [
  { key: "languages", marks: ["java", "python", "javascript", "typescript"] },
  { key: "web", marks: ["spring", "react", "thymeleaf", "html5", "css3"] },
  { key: "data", marks: ["postgresql", "sqlserver", "redis", "flyway"] },
  { key: "tools", marks: ["git", "docker", "postman", "playwright", "swagger"] },
] as const;

export const researchMarks = ["pytorch", "huggingface", "kaggle"] as const;

export const expertiseMarks = [
  "java", "python", "javascript", "typescript", "spring", "react", "thymeleaf", "html5", "css3",
  "postgresql", "sqlserver", "redis", "flyway", "git", "docker", "postman", "playwright", "swagger",
  ...researchMarks,
] as const;

export const primaryMarks = ["java", "spring", "postgresql", "redis", "flyway"] as const;
