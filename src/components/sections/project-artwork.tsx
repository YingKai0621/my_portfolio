import type { ProjectSlug } from "@/content/projects";

export function ProjectArtwork({ slug }: { slug: ProjectSlug }) {
  if (slug === "book-street-event-management-system") {
    return (
      <svg className="project-artwork project-artwork-book" viewBox="0 0 1200 720" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <rect width="1200" height="720" fill="#18342B" />
        <path d="M0 96H1200M0 624H1200" stroke="#C8A878" strokeWidth="2" opacity=".46" />
        <path d="M96 0V720M1104 0V720" stroke="#E8DFC4" strokeWidth="1" opacity=".22" />
        <g transform="translate(235 136)">
          <path d="M0 386V42L104 0v392L0 434Z" fill="#A66E45" />
          <path d="M104 0h75v392h-75z" fill="#E8DFC4" />
          <path d="M179 22h70v392h-70z" fill="#315B46" stroke="#E8DFC4" strokeWidth="2" />
          <path d="M249 0h82v392h-82z" fill="#C8A878" />
          <path d="M331 38h98v392h-98z" fill="#E8DFC4" />
          <path d="M429 8h87v392h-87z" fill="#244D3D" stroke="#C8A878" strokeWidth="2" />
          <path d="M516 44h73v392h-73z" fill="#A66E45" />
          <path d="M589 0h82v392h-82z" fill="#E8DFC4" />
          <path d="M0 434 104 392h75l70 22 82-22 98 38 87-30 73 36 82-44" fill="none" stroke="#E8DFC4" strokeWidth="3" />
          <path d="M31 75V365M132 52v292M214 54v299M289 60v284M385 74v286M473 59v291M550 73v285M630 58v286" stroke="#18342B" strokeWidth="2" opacity=".65" />
          <path d="M115 210h53M261 147h58M345 270h70M529 182h48M600 280h59" stroke="#18342B" strokeWidth="10" />
        </g>
        <text x="180" y="680" fill="#E8DFC4" fontSize="24" fontWeight="700" letterSpacing="8">BOOK STREET</text>
        <text x="1020" y="680" textAnchor="end" fill="#C8A878" fontSize="18" letterSpacing="5">EVENT SYSTEM</text>
      </svg>
    );
  }

  return (
    <svg className="project-artwork project-artwork-moon" viewBox="0 0 1200 720" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="1200" height="720" fill="#4A232D" />
      <path d="M0 104H1200M0 616H1200" stroke="#D9C9A8" strokeWidth="1" opacity=".3" />
      <circle cx="610" cy="360" r="256" fill="#D9C9A8" />
      <circle cx="610" cy="360" r="195" fill="none" stroke="#6F3D3D" strokeWidth="2" />
      <circle cx="610" cy="360" r="143" fill="none" stroke="#6F3D3D" strokeWidth="2" />
      <circle cx="610" cy="360" r="90" fill="none" stroke="#6F3D3D" strokeWidth="2" />
      <path d="M610 105v510M355 360h510" stroke="#6F3D3D" strokeWidth="2" />
      <path d="M0 485 338 330l544 97 318-145v312L878 720H278L0 610Z" fill="#A47B48" opacity=".96" />
      <path d="m0 485 338-155 544 97 318-145M278 720V502l604-75v293" fill="none" stroke="#4A232D" strokeWidth="3" />
      <path d="M84 493v95m0-95 195 9m603-75v179m0-179 225-103" stroke="#F0E4C8" strokeWidth="3" />
      <path d="M284 549 796 484M284 588l512-65M284 627l512-65" stroke="#4A232D" strokeWidth="2" opacity=".42" />
      <text x="180" y="78" fill="#F0E4C8" fontSize="24" fontWeight="700" letterSpacing="8">MOONCAKE</text>
      <text x="1020" y="78" textAnchor="end" fill="#D7B578" fontSize="18" letterSpacing="5">E-COMMERCE</text>
    </svg>
  );
}
