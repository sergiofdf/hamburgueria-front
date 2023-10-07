interface LogoProps {
  className?: string;
}

export function Logo({className}: LogoProps) {
  return(
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <g clipPath="url(#clip0_209_179)">
        <path d="M3.33337 73.2667C3.33337 75.1333 4.83337 76.6333 6.70004 76.6333H50C51.8667 76.6333 53.3667 75.1333 53.3667 73.2667V70H3.33337V73.2667ZM28.3334 29.9667C15.8334 29.9667 3.33337 36.6667 3.33337 50H53.3334C53.3334 36.6667 40.8334 29.9667 28.3334 29.9667ZM12.0667 43.3333C15.7667 38.1667 23.6334 36.6333 28.3334 36.6333C33.0334 36.6333 40.9 38.1667 44.6 43.3333H12.0667ZM3.33337 56.6667H53.3334V63.3333H3.33337V56.6667ZM60 16.6667V3.33333H53.3334V16.6667H36.6667L37.4334 23.3333H69.3L64.6334 70H60V76.6667H65.7334C68.5334 76.6667 70.8334 74.5 71.1667 71.7667L76.6667 16.6667H60Z" fill="currentColor"/>
      </g>
      <defs>
        <clipPath id="clip0_209_179">
          <rect width="80" height="80" fill="white"/>
        </clipPath>
      </defs>
    </svg>

  );
}
