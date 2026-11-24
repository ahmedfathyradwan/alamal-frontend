import styles from "./Icons.module.css";

function LineIcon({ children, size = 20, className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`${styles.icon} ${className}`}
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

function SolidIcon({ children, size = 20, className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      className={`${styles.icon} ${className}`}
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

export function PhoneIcon(props) {
  return (
    <LineIcon {...props}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
    </LineIcon>
  );
}

export function MailIcon(props) {
  return (
    <LineIcon {...props}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </LineIcon>
  );
}

export function MapPinIcon(props) {
  return (
    <LineIcon {...props}>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z" />
      <circle cx="12" cy="10" r="3" />
    </LineIcon>
  );
}

export function ClockIcon(props) {
  return (
    <LineIcon {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </LineIcon>
  );
}

export function SearchIcon(props) {
  return (
    <LineIcon {...props}>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </LineIcon>
  );
}

export function MenuIcon(props) {
  return (
    <LineIcon {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </LineIcon>
  );
}

export function CloseIcon(props) {
  return (
    <LineIcon {...props}>
      <path d="M18 6 6 18M6 6l12 12" />
    </LineIcon>
  );
}

export function ChevronDownIcon(props) {
  return (
    <LineIcon {...props}>
      <path d="m6 9 6 6 6-6" />
    </LineIcon>
  );
}

export function ChevronLeftIcon(props) {
  return (
    <LineIcon {...props}>
      <path d="m15 18-6-6 6-6" />
    </LineIcon>
  );
}

export function ChevronRightIcon(props) {
  return (
    <LineIcon {...props}>
      <path d="m9 18 6-6-6-6" />
    </LineIcon>
  );
}

export function ArrowLeftIcon(props) {
  return (
    <LineIcon {...props}>
      <path d="M19 12H5" />
      <path d="m12 19-7-7 7-7" />
    </LineIcon>
  );
}

export function CheckIcon(props) {
  return (
    <LineIcon {...props}>
      <path d="M20 6 9 17l-5-5" />
    </LineIcon>
  );
}

export function StarIcon(props) {
  return (
    <SolidIcon {...props}>
      <path d="M12 2.5l2.92 6.06 6.58.9-4.8 4.72 1.2 6.62L12 17.65l-5.9 3.15 1.2-6.62-4.8-4.72 6.58-.9L12 2.5z" />
    </SolidIcon>
  );
}

export function BedIcon(props) {
  return (
    <LineIcon {...props}>
      <path d="M2 4v16" />
      <path d="M2 8h18a2 2 0 0 1 2 2v10" />
      <path d="M2 17h20" />
      <path d="M6 8v9" />
    </LineIcon>
  );
}

export function BathIcon(props) {
  return (
    <LineIcon {...props}>
      <path d="M4 12h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-3Z" />
      <path d="M6 12V5a2 2 0 0 1 4 0" />
      <path d="M6 21l1-2M19 21l-1-2" />
    </LineIcon>
  );
}

export function AreaIcon(props) {
  return (
    <LineIcon {...props}>
      <path d="M15 3h6v6" />
      <path d="M9 21H3v-6" />
      <path d="m21 3-7 7" />
      <path d="m3 21 7-7" />
    </LineIcon>
  );
}

export function FilterIcon(props) {
  return (
    <LineIcon {...props}>
      <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3Z" />
    </LineIcon>
  );
}

export function ResetIcon(props) {
  return (
    <LineIcon {...props}>
      <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
      <path d="M3 3v5h5" />
    </LineIcon>
  );
}

export function TagIcon(props) {
  return (
    <LineIcon {...props}>
      <path d="M12.59 2.59A2 2 0 0 0 11.17 2H4a2 2 0 0 0-2 2v7.17a2 2 0 0 0 .59 1.42l8.7 8.7a2.43 2.43 0 0 0 3.42 0l6.58-6.58a2.43 2.43 0 0 0 0-3.42l-8.7-8.7Z" />
      <circle cx="7.5" cy="7.5" r="1" />
    </LineIcon>
  );
}

export function MapIcon(props) {
  return (
    <LineIcon {...props}>
      <path d="M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3V6Z" />
      <path d="M9 3v15M15 6v15" />
    </LineIcon>
  );
}

export function SendIcon(props) {
  return (
    <LineIcon {...props}>
      <path d="m22 2-7 20-4-9-9-4 20-7Z" />
      <path d="M22 2 11 13" />
    </LineIcon>
  );
}

export function QuoteIcon(props) {
  return (
    <SolidIcon {...props}>
      <path d="M9.5 4.5C5.9 4.5 3 7.4 3 11v8.5h7.5V13H7c0-1.7 1.1-2.8 2.5-2.8V4.5Zm11 0C16.9 4.5 14 7.4 14 11v8.5h7.5V13H18c0-1.7 1.1-2.8 2.5-2.8V4.5Z" />
    </SolidIcon>
  );
}

export function BuildingIcon(props) {
  return (
    <LineIcon {...props}>
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h2M14 6h2M8 10h2M14 10h2M8 14h2M14 14h2" />
    </LineIcon>
  );
}

export function HomeIcon(props) {
  return (
    <LineIcon {...props}>
      <path d="m3 10 9-7 9 7v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V10Z" />
      <path d="M9 22V12h6v10" />
    </LineIcon>
  );
}

export function KeyIcon(props) {
  return (
    <LineIcon {...props}>
      <circle cx="7.5" cy="15.5" r="5.5" />
      <path d="m21 2-9.6 9.6" />
      <path d="m15.5 7.5 3 3L22 7l-3-3" />
    </LineIcon>
  );
}

export function CompassIcon(props) {
  return (
    <LineIcon {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12Z" />
    </LineIcon>
  );
}

export function ChartIcon(props) {
  return (
    <LineIcon {...props}>
      <path d="M3 3v18h18" />
      <path d="m19 9-5 5-4-4-3 3" />
    </LineIcon>
  );
}

export function ScaleIcon(props) {
  return (
    <LineIcon {...props}>
      <path d="M12 3v18M5 21h14" />
      <path d="M5 8 2 14a4 4 0 0 0 6 0L5 8Z" />
      <path d="M19 8l-3 6a4 4 0 0 0 6 0l-3-6Z" />
      <path d="M5 8h14" />
    </LineIcon>
  );
}

export function ShieldIcon(props) {
  return (
    <LineIcon {...props}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
      <path d="m9 11.5 2 2 4-4" />
    </LineIcon>
  );
}

export function EyeIcon(props) {
  return (
    <LineIcon {...props}>
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
    </LineIcon>
  );
}

export function HandshakeIcon(props) {
  return (
    <LineIcon {...props}>
      <path d="m11 17 2 2a1 1 0 1 0 3-3" />
      <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4" />
      <path d="m21 3 1 11h-2" />
      <path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3" />
      <path d="M3 4h8" />
    </LineIcon>
  );
}

export function UsersIcon(props) {
  return (
    <LineIcon {...props}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </LineIcon>
  );
}

export function AwardIcon(props) {
  return (
    <LineIcon {...props}>
      <circle cx="12" cy="8" r="6" />
      <path d="m15.5 13.5 1.5 8-5-3-5 3 1.5-8" />
    </LineIcon>
  );
}

export function WhatsAppIcon(props) {
  return (
    <SolidIcon {...props}>
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.06 2.87 1.21 3.07.15.2 2.1 3.2 5.08 4.49.7.3 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2-1.42.25-.69.25-1.29.18-1.41-.08-.12-.28-.2-.57-.35M12.05 24h-.01a11.87 11.87 0 0 1-6.04-1.65l-.36-.21-4.49 1.18 1.2-4.38-.24-.37A11.82 11.82 0 0 1 .06 11.9C.06 5.34 5.4 0 11.96 0c3.17 0 6.14 1.24 8.38 3.48a11.78 11.78 0 0 1 3.47 8.39c0 6.56-5.34 11.9-11.9 11.9M20.46 3.55A11.64 11.64 0 0 0 11.96.57C5.56.57.57 5.56.57 11.9c0 2.07.54 4.1 1.57 5.88l-1.68 6.12 6.3-1.65a12.1 12.1 0 0 0 5.79 1.47h.01c6.4 0 11.6-5.2 11.6-11.6 0-3.1-1.21-6.02-3.4-8.21Z" />
    </SolidIcon>
  );
}

export function FacebookIcon(props) {
  return (
    <SolidIcon {...props}>
      <path d="M24 12.07C24 5.44 18.63.07 12 .07S0 5.44 0 12.07c0 5.99 4.39 10.95 10.13 11.85v-8.38H7.08v-3.47h3.05V9.43c0-3.01 1.79-4.67 4.53-4.67 1.31 0 2.69.24 2.69.24v2.95h-1.51c-1.49 0-1.96.93-1.96 1.87v2.25h3.33l-.53 3.47h-2.8v8.38C19.61 23.02 24 18.06 24 12.07Z" />
    </SolidIcon>
  );
}

export function YouTubeIcon(props) {
  return (
    <SolidIcon {...props}>
      <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.19C0 8.08 0 12 0 12s0 3.92.5 5.81a3.02 3.02 0 0 0 2.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14C24 15.92 24 12 24 12s0-3.92-.5-5.81ZM9.55 15.57V8.43L15.82 12l-6.27 3.57Z" />
    </SolidIcon>
  );
}

const iconMap = {
  phone: PhoneIcon,
  mail: MailIcon,
  mapPin: MapPinIcon,
  clock: ClockIcon,
  search: SearchIcon,
  menu: MenuIcon,
  close: CloseIcon,
  chevronDown: ChevronDownIcon,
  chevronLeft: ChevronLeftIcon,
  chevronRight: ChevronRightIcon,
  arrowLeft: ArrowLeftIcon,
  check: CheckIcon,
  star: StarIcon,
  bed: BedIcon,
  bath: BathIcon,
  area: AreaIcon,
  filter: FilterIcon,
  reset: ResetIcon,
  tag: TagIcon,
  map: MapIcon,
  send: SendIcon,
  quote: QuoteIcon,
  building: BuildingIcon,
  home: HomeIcon,
  key: KeyIcon,
  compass: CompassIcon,
  chart: ChartIcon,
  scale: ScaleIcon,
  shield: ShieldIcon,
  eye: EyeIcon,
  handshake: HandshakeIcon,
  users: UsersIcon,
  award: AwardIcon,
  whatsapp: WhatsAppIcon,
  facebook: FacebookIcon,
  youtube: YouTubeIcon,
  deal: HandshakeIcon,
  rent: KeyIcon,
  advisory: CompassIcon,
  marketing: ChartIcon,
  management: BuildingIcon,
  valuation: ScaleIcon,
};

export function Icon({ name, size = 20, className = "" }) {
  const Component = iconMap[name];
  if (!Component) return null;
  return <Component size={size} className={className} />;
}
