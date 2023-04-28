import { IconDefinition } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface SocialInput {
  icon: IconDefinition
  link: string
  fontSize?: string
  color?: string
}

export function SocialIcon ({ icon, link, fontSize, color }: SocialInput): JSX.Element {
  return (
    <div style={{ marginInline: '0.5rem'}}>
      <a href={link} style={{ fontSize: fontSize || '4rem', color: color || '#fff', cursor: 'pointer' }}>
        <FontAwesomeIcon icon={icon} />
      </a>
    </div>
  )
}