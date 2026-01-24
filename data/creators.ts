export interface Creator {
  id: number
  slug: string
  name: string
  avatar: string
  bio: string
  niche: string
  followers: number
  totalStudents: number
  rating: number
}

export const creators: Creator[] = [
  {
    id: 1,
    slug: 'samuel',
    name: 'ክሪየተር ሳማኤል',
    avatar: '/assets/images/creator-samuel.jpg',
    bio: 'ሙዚቃ እና ዲጂታል ትምህርት ክሪየተር። ለክሪየተሮች እውቀታቸውን ንግድ እንዲያደርጉ የሚረዳ ስልጠና እሰጣለሁ።',
    niche: 'Music • Education • Content Creation',
    followers: 52000,
    totalStudents: 2100,
    rating: 4.8,
  },
]
