import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Search, ShoppingCart, Filter, Star } from 'lucide-react'

// Mock product data
const products = [
  {
    id: 1,
    name: 'Career Guide Book Bundle',
    description: 'Essential reading for career advancement in Ethiopia. Includes 3 books on job search, interview skills, and networking.',
    price: 850,
    category: 'Books',
    image: 'https://images.pexels.com/photos/1329571/pexels-photo-1329571.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 4.5,
    reviews: 24,
    bestseller: true,
  },
  {
    id: 2,
    name: 'Professional Resume Template',
    description: 'Stand out with this modern, ATS-friendly resume template designed for Ethiopian job market.',
    price: 350,
    category: 'Templates',
    image: 'https://images.pexels.com/photos/4195342/pexels-photo-4195342.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 4.8,
    reviews: 56,
  },
  {
    id: 3,
    name: 'Career Development Online Course',
    description: 'Self-paced video course with practical exercises to accelerate your career growth.',
    price: 1200,
    category: 'Courses',
    image: 'https://images.pexels.com/photos/3059748/pexels-photo-3059748.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 4.7,
    reviews: 38,
    featured: true,
  },
  {
    id: 4,
    name: 'Interview Preparation Kit',
    description: 'Complete kit with question bank, answer templates, and guidebook for job interviews.',
    price: 650,
    category: 'Resources',
    image: 'https://images.pexels.com/photos/5673488/pexels-photo-5673488.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 4.6,
    reviews: 19,
  },
  {
    id: 5,
    name: 'Professional Portfolio Website Template',
    description: 'Showcase your skills and projects with this customizable website template.',
    price: 800,
    category: 'Templates',
    image: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 4.9,
    reviews: 42,
    bestseller: true,
  },
  {
    id: 6,
    name: 'Job Search Strategy Guide',
    description: 'Comprehensive guide to finding and securing job opportunities in Ethiopia.',
    price: 450,
    category: 'Books',
    image: 'https://images.pexels.com/photos/4439901/pexels-photo-4439901.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    rating: 4.4,
    reviews: 31,
  },
]

const categories = [
  { name: 'All', count: products.length },
  { name: 'Books', count: products.filter(p => p.category === 'Books').length },
  { name: 'Templates', count: products.filter(p => p.category === 'Templates').length },
  { name: 'Courses', count: products.filter(p => p.category === 'Courses').length },
  { name: 'Resources', count: products.filter(p => p.category === 'Resources').length },
]

export default function ShopPage() {
  return (
    <div className="container p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-montserrat mb-2">Career Resources Shop</h1>
        <p className="text-muted-foreground">Tools and resources to help you succeed in your career journey</p>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full lg:w-1/4">
          <div className="sticky top-24 space-y-6">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              <Input placeholder="Search products" className="pl-10" />
            </div>
            
            <div>
              <h3 className="font-semibold mb-3 flex items-center">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Categories</h4>
                  <ul className="space-y-1">
                    {categories.map((category) => (
                      <li key={category.name}>
                        <Button 
                          variant="ghost" 
                          className="w-full justify-between font-normal" 
                          size="sm"
                        >
                          {category.name}
                          <Badge variant="secondary" className="ml-auto">
                            {category.count}
                          </Badge>
                        </Button>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Price Range</h4>
                  <div className="space-y-1">
                    <Button variant="ghost" className="w-full justify-start font-normal" size="sm">
                      Under 500 ETB
                    </Button>
                    <Button variant="ghost" className="w-full justify-start font-normal" size="sm">
                      500 - 1000 ETB
                    </Button>
                    <Button variant="ghost" className="w-full justify-start font-normal" size="sm">
                      Over 1000 ETB
                    </Button>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Rating</h4>
                  <div className="space-y-1">
                    <Button variant="ghost" className="w-full justify-start font-normal" size="sm">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="ml-2">& Up</span>
                      </div>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start font-normal" size="sm">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="ml-2">& Up</span>
                      </div>
                    </Button>
                  </div>
                </div>
                
                <div>
                  <Button variant="outline" className="w-full">Reset Filters</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main content */}
        <div className="w-full lg:w-3/4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Products (6)</h2>
            <select className="bg-background border rounded-md px-3 py-2 text-sm">
              <option>Sort by: Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Rating: High to Low</option>
              <option>Newest</option>
            </select>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

interface ProductCardProps {
  product: {
    id: number
    name: string
    description: string
    price: number
    category: string
    image: string
    rating: number
    reviews: number
    bestseller?: boolean
    featured?: boolean
  }
}

function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md flex flex-col h-full">
      <div className="aspect-square w-full relative overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        
        {product.bestseller && (
          <Badge className="absolute top-3 left-3 bg-yellow-500">
            Bestseller
          </Badge>
        )}
        
        {product.featured && (
          <Badge className="absolute top-3 left-3" variant="secondary">
            Featured
          </Badge>
        )}
      </div>
      
      <CardHeader className="pb-2">
        <CardTitle className="text-xl truncate">{product.name}</CardTitle>
        <div className="flex items-center gap-1">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : i < product.rating
                    ? 'fill-yellow-400/50 text-yellow-400'
                    : 'fill-muted text-muted'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">({product.reviews})</span>
        </div>
      </CardHeader>
      
      <CardContent className="pb-2 flex-grow">
        <p className="text-muted-foreground text-sm line-clamp-3 mb-2">
          {product.description}
        </p>
        <Badge variant="outline">{product.category}</Badge>
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <div className="text-lg font-bold">{product.price.toLocaleString()} ETB</div>
        <Button size="sm" className="flex items-center gap-1">
          <ShoppingCart className="h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}