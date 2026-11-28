import Image from "next/image";

const technologyMarks = {
  java: { name: "Java", file: "java" },
  spring: { name: "Spring Boot", file: "spring" },
  postgresql: { name: "PostgreSQL", file: "postgresql" },
  redis: { name: "Redis", file: "redis" },
  flyway: { name: "Flyway", file: "flyway" },
  react: { name: "React", file: "react" },
  docker: { name: "Docker", file: "docker" },
  thymeleaf: { name: "Thymeleaf", file: "thymeleaf" },
  sqlserver: { name: "SQL Server", file: "sqlserver" },
  html5: { name: "HTML", file: "html5" },
  css3: { name: "CSS", file: "css3" },
  javascript: { name: "JavaScript", file: "javascript" },
  typescript: { name: "TypeScript", file: "typescript" },
  python: { name: "Python", file: "python" },
  git: { name: "Git", file: "git" },
  postman: { name: "Postman", file: "postman" },
  playwright: { name: "Playwright", file: "playwright" },
  swagger: { name: "Swagger / OpenAPI", file: "swagger" },
  pytorch: { name: "PyTorch", file: "pytorch" },
  huggingface: { name: "Hugging Face Transformers", file: "huggingface" },
  kaggle: { name: "Kaggle", file: "kaggle" },
} as const;

export type TechnologyMark = keyof typeof technologyMarks;

export function technologyMarkName(mark: TechnologyMark) {
  return technologyMarks[mark].name;
}

export function TechnologyLogo({ mark }: { mark: TechnologyMark }) {
  const { name, file } = technologyMarks[mark];

  return (
    <>
      <span className="technology-logo-icon">
        <Image src={`/images/technologies/${file}.svg`} alt="" width={48} height={48} unoptimized />
      </span>
      <span>{name}</span>
    </>
  );
}

export function TechnologyLogos({ marks }: { marks: readonly TechnologyMark[] }) {
  return (
    <ul className="technology-logos">
      {marks.map((mark) => <li key={mark}><TechnologyLogo mark={mark} /></li>)}
    </ul>
  );
}
