import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function CategoryCard({ title, subtitle, href = '/movies' }) {
  return (
    <Link className="category-card" to={href}>
      <div>
        <span>{subtitle}</span>
        <h3>{title}</h3>
      </div>
      <ArrowRight size={18} />
    </Link>
  )
}
