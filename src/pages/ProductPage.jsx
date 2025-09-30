import Button from '../components/ui/Button.jsx'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useApp } from '../context/AppContext'

// Mock product database
const mockProducts = [
  // Clothing Products
  {
    id: '1',
    slug: 'finch-logo-tank-top-black',
    name: 'Finch Logo Tank Top - Black',
    brand: 'FINCH',
    price: 156000,
    image: '/assets/crop.jpg',
    description: 'Premium cotton tank top featuring the iconic FINCH logo. Perfect for casual wear and street style.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    inStock: true
  },
  {
    id: '2',
    slug: '234labs-globe-logo-tshirt-black',
    name: '234Labs Globe Logo T-shirt Black',
    brand: '234LABS',
    price: 85800,
    image: '/assets/cas.jpg',
    description: 'Comfortable cotton t-shirt with 234Labs globe logo design. Made from 100% organic cotton.',
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true
  },
  {
    id: '3',
    slug: 'finch-3-set-female-bodycon-top',
    name: 'Finch 3 Set Female Bodycon Top White Black Brown',
    brand: 'FINCH',
    price: 93600,
    image: '/assets/sing.jpg',
    description: 'Versatile 3-piece bodycon set in white, black, and brown. Perfect for layering and creating multiple looks.',
    sizes: ['XS', 'S', 'M', 'L'],
    inStock: true
  },
  {
    id: '4',
    slug: 'marcelo-burlon-feathers-necklace-tee',
    name: 'Marcelo Burlon Feathers Necklace Over Tee - Black Red',
    brand: 'MARCELO BURLON',
    price: 358800,
    image: '/assets/MCM jacket1.jpg',
    description: 'Statement t-shirt featuring Marcelo Burlon\'s signature feathers design. Bold and eye-catching.',
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true
  },
  {
    id: '5',
    slug: '234labs-dreamers-tshirt-green',
    name: '234Labs Dreamers T-shirt Green',
    brand: '234LABS',
    price: 70200,
    image: '/assets/jersey.jpg',
    description: 'Inspiring dreamers t-shirt in vibrant green. Soft cotton blend for all-day comfort.',
    sizes: ['M', 'L', 'XL'],
    inStock: true
  },
  
  // Sneaker Products
  {
    id: '6',
    slug: 'ace-gg-canvas-low-top-sneakers',
    name: 'Ace GG Canvas Low-Top Sneakers',
    brand: 'Gucci',
    price: 363480,
    image: '/assets/GG.jpg',
    description: 'Classic Gucci Ace sneakers with iconic GG canvas. Timeless design meets modern comfort.',
    sizes: ['36', '37', '38', '39', '40', '41', '42', '43'],
    inStock: true
  },
  {
    id: '7',
    slug: 'chloe-kick-low-top-sneakers',
    name: 'Chloé Kick Low-Top Sneakers',
    brand: 'Chloe',
    price: 1045200,
    image: '/assets/Chloe.jpg',
    description: 'Elegant Chloé sneakers with sophisticated design. Perfect for the modern woman.',
    sizes: ['36', '37', '38', '39', '40', '41'],
    inStock: true
  },
  {
    id: '8',
    slug: 'vieira-2-sneakers',
    name: 'Vieira 2 Sneakers',
    brand: 'Christian Louboutin',
    price: 514800,
    image: '/assets/cl.jpg',
    description: 'Luxury sneakers from Christian Louboutin featuring signature red sole. Statement piece for any outfit.',
    sizes: ['36', '37', '38', '39', '40', '41', '42'],
    inStock: true
  },
  {
    id: '9',
    slug: 'ff-logo-low-top-sneakers',
    name: 'FF Logo Low-Top Sneakers',
    brand: 'Fendi',
    price: 873600,
    image: '/assets/FD.jpg',
    description: 'Iconic Fendi FF logo sneakers. Luxury meets street style with Italian craftsmanship.',
    sizes: ['36', '37', '38', '39', '40', '41', '42', '43'],
    inStock: true
  },
  {
    id: '10',
    slug: 'urban-street-sneakers-leather-elastic',
    name: 'Urban Street Sneakers in Leather with Elastic Band',
    brand: 'Givenchy',
    price: 811200,
    image: '/assets/GV.jpg',
    description: 'Contemporary Givenchy sneakers with elastic band design. Urban luxury at its finest.',
    sizes: ['36', '37', '38', '39', '40', '41', '42'],
    inStock: true
  },
  {
    id: '11',
    slug: 'veles-knit-sneakers',
    name: 'Veles Knit Sneakers',
    brand: 'Jimmy Choo',
    price: 483600,
    image: '/assets/JM.jpg',
    description: 'Sophisticated Jimmy Choo knit sneakers. Comfort and style combined in perfect harmony.',
    sizes: ['36', '37', '38', '39', '40', '41'],
    inStock: true
  },
  {
    id: '12',
    slug: 'womens-americas-cup-biker-fabric-sneakers',
    name: 'Women\'s America\'s Cup Biker Fabric Sneakers',
    brand: 'Prada',
    price: 2346000,
    image: '/assets/prada.jpg',
    description: 'Exclusive Prada America\'s Cup sneakers. Limited edition with premium materials.',
    sizes: ['36', '37', '38', '39', '40', '41'],
    inStock: true
  },
  {
    id: '13',
    slug: 'skel-top-low-leather-sneakers',
    name: 'Skel Top Low Leather Sneakers',
    brand: 'Amiri',
    price: 996400,
    image: '/assets/amiri1.jpg',
    description: 'Bold Amiri sneakers with distinctive skeleton design. Streetwear meets high fashion.',
    sizes: ['36', '37', '38', '39', '40', '41', '42', '43'],
    inStock: true
  },
  {
    id: '14',
    slug: 'leather-curb-sneakers',
    name: 'Leather Curb Sneakers',
    brand: 'Lanvin',
    price: 920400,
    image: '/assets/lanvin.jpg',
    description: 'Elegant Lanvin leather sneakers with curb chain detail. French luxury craftsmanship.',
    sizes: ['36', '37', '38', '39', '40', '41', '42'],
    inStock: true
  },
  {
    id: '15',
    slug: 'stella-mccartney-adidas-rasant-logo-sneakers',
    name: 'Stella McCartney x adidas Rasant Logo Sneakers',
    brand: 'Stella McCartney',
    price: 358800,
    image: '/assets/stella.jpg',
    description: 'Sustainable collaboration between Stella McCartney and adidas. Eco-friendly luxury sneakers.',
    sizes: ['36', '37', '38', '39', '40', '41', '42'],
    inStock: true
  },
  {
    id: '16',
    slug: 'new-regis-check-sneakers',
    name: 'New Regis Check Sneakers',
    brand: 'Burberry',
    price: 842400,
    image: '/assets/burberry.jpg',
    description: 'Classic Burberry check pattern sneakers. British heritage meets contemporary design.',
    sizes: ['36', '37', '38', '39', '40', '41', '42', '43'],
    inStock: true
  },
  {
    id: '17',
    slug: 'stella-mccartney-adidas-rasant-logo-sneakers-2',
    name: 'Stella McCartney x adidas Rasant Logo Sneakers',
    brand: 'Stella McCartney',
    price: 1842400,
    image: '/assets/mcarty.jpg',
    description: 'Premium Stella McCartney x adidas collaboration sneakers. Sustainable luxury meets performance.',
    sizes: ['36', '37', '38', '39', '40', '41', '42'],
    inStock: true
  },
  {
    id: '18',
    slug: 'gymnasium-technical-fabric-suede-sneakers',
    name: 'Gymnasium Technical Fabric and Suede Sneakers',
    brand: 'Miu Miu',
    price: 363480,
    image: '/assets/miu.jpg',
    description: 'Technical Miu Miu sneakers with premium fabric and suede construction. Perfect for active lifestyle.',
    sizes: ['36', '37', '38', '39', '40', '41'],
    inStock: true
  },
  {
    id: '19',
    slug: 'aeliot-logo-detailed-leather-canvas-sneakers',
    name: 'AEliot Logo-Detailed Leather & Canvas Sneakers',
    brand: 'Bottega Veneta',
    price: 983600,
    image: '/assets/bv.jpg',
    description: 'Sophisticated Bottega Veneta sneakers with signature logo detailing. Italian craftsmanship at its finest.',
    sizes: ['36', '37', '38', '39', '40', '41', '42'],
    inStock: true
  },
  {
    id: '20',
    slug: 'comme-des-garcons-asics-gel-lyte-iii-sneakers',
    name: 'Comme des Garçons Shirt X Asics Gel-Lyte III Low-Top Sneakers',
    brand: 'Comme des Garçons',
    price: 811200,
    image: '/assets/mul.jpg',
    description: 'Collaborative sneakers from Comme des Garçons and Asics. Street art meets athletic performance.',
    sizes: ['36', '37', '38', '39', '40', '41', '42', '43'],
    inStock: true
  },
  {
    id: '21',
    slug: 'the-72-spring-sneakers',
    name: 'The 72 Spring Sneakers',
    brand: 'Marc Jacobs',
    price: 676400,
    image: '/assets/marc.jpg',
    description: 'Fresh Marc Jacobs spring sneakers. Lightweight and comfortable for everyday wear.',
    sizes: ['36', '37', '38', '39', '40', '41', '42'],
    inStock: true
  },
  {
    id: '22',
    slug: 'leather-shearling-low-top-sneakers',
    name: 'Leather & Shearling Low-Top Sneakers',
    brand: 'McQueen',
    price: 883600,
    image: '/assets/mq.jpg',
    description: 'Luxurious McQueen sneakers with leather and shearling accents. Winter-ready comfort and style.',
    sizes: ['36', '37', '38', '39', '40', '41', '42'],
    inStock: true
  },
  {
    id: '23',
    slug: 'vlogo-easyjog-calfskin-fabric-sneakers',
    name: 'VLogo Easyjog Calfskin and Fabric Sneakers',
    brand: 'Valentino Garavani',
    price: 1194640,
    image: '/assets/vl.jpg',
    description: 'Elegant Valentino Garavani sneakers with premium calfskin and fabric construction. Italian luxury redefined.',
    sizes: ['36', '37', '38', '39', '40', '41', '42'],
    inStock: true
  },
  
  // Home Page Products
  {
    id: 'home-1',
    slug: 'finch-meshed-knit-shirt',
    name: 'Finch Meshed Knit Shirt',
    brand: 'Finch',
    price: 296400,
    image: '/assets/finch meshed.jpg',
    description: 'Comfortable meshed knit shirt from Finch. Perfect for casual wear with a modern street style aesthetic.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    inStock: true
  },
  {
    id: 'home-2',
    slug: 'finch-ski-quilted-puffer-jacket',
    name: 'Finch Ski Quilted Puffer Jacket In Metallic Polyester',
    brand: 'Finch',
    price: 296400,
    image: '/assets/finch metallic.jpg',
    description: 'Stylish puffer jacket with metallic finish. Perfect for winter sports and urban fashion.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    inStock: true
  },
  {
    id: 'home-3',
    slug: 'finch-varsity-jacket',
    name: 'Finch Varsity Jacket',
    brand: 'Finch',
    price: 280800,
    image: '/assets/finch varsity jacket.jpg',
    description: 'Classic varsity jacket with modern twist. Timeless design meets contemporary style.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    inStock: true
  },
  {
    id: 'home-4',
    slug: 'finch-monogram-denim-jacket',
    name: 'Finch Monogram Denim Jacket',
    brand: 'Finch',
    price: 343200,
    image: '/assets/finch denim jacket.jpeg',
    description: 'Premium denim jacket with signature monogram detailing. Streetwear essential.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    inStock: true
  },
  {
    id: 'home-5',
    slug: 'finch-monogram-denim-jeans',
    name: 'Finch Monogram Denim Jeans',
    brand: 'Finch',
    price: 312000,
    image: '/assets/finch denim jeans.jpg',
    description: 'High-quality denim jeans with monogram accents. Perfect fit and premium construction.',
    sizes: ['28', '30', '32', '34', '36', '38'],
    inStock: true
  },
  {
    id: 'home-6',
    slug: 'cartier-elysian-sunglass',
    name: 'Cartier Elysian Sunglass',
    brand: 'Cartier',
    price: 210600,
    image: '/assets/Cartier eyewear .jpg',
    description: 'Luxury sunglasses from Cartier. Sophisticated design with premium materials and UV protection.',
    sizes: ['One Size'],
    inStock: true
  },
  {
    id: 'home-7',
    slug: 'gucci-gg1855o-002',
    name: 'GUCCI GG1855O 002',
    brand: 'Gucci',
    price: 259200,
    image: '/assets/Gucci eyewear.jpg',
    description: 'Iconic Gucci sunglasses with signature GG logo. Italian luxury eyewear at its finest.',
    sizes: ['One Size'],
    inStock: true
  },
  {
    id: 'home-8',
    slug: 'dior-signatureo-b2i',
    name: 'DiorSignatureO B2I',
    brand: 'Dior',
    price: 267300,
    image: '/assets/Dior eyewear.jpg',
    description: 'Elegant Dior sunglasses with signature design. French luxury meets modern style.',
    sizes: ['One Size'],
    inStock: true
  },
  {
    id: 'home-9',
    slug: 'channel-ch5546q-17338h',
    name: 'CH5546Q 17338H',
    brand: 'Channel',
    price: 243000,
    image: '/assets/Channel eyewear.jpg',
    description: 'Classic Channel sunglasses with timeless appeal. Sophisticated French design.',
    sizes: ['One Size'],
    inStock: true
  },
  {
    id: 'home-10',
    slug: 'celine-3-dots',
    name: 'CELINE 3 Dots',
    brand: 'Celine',
    price: 259200,
    image: '/assets/Celine eyewear.jpg',
    description: 'Minimalist Celine sunglasses with signature 3-dot detail. Modern luxury eyewear.',
    sizes: ['One Size'],
    inStock: true
  },
  {
    id: 'home-11',
    slug: 'louis-vuitton-embroidered-polo',
    name: 'Embroidered Short-Sleeved Cotton Blend Polo Shirt',
    brand: 'Louis Vuitton',
    price: 390000,
    image: '/assets/LV-polo.jpg',
    description: 'Premium polo shirt with intricate embroidery. Louis Vuitton craftsmanship at its finest.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    inStock: true
  },
  {
    id: 'home-12',
    slug: 'burberry-slim-fit-monogram-shirt',
    name: 'Burberry Slim-Fit Monogram Motif Stretch Cotton Poplin Shirt Deep Maroon',
    brand: 'Burberry',
    price: 343200,
    image: '/assets/Burberry Shirt.jpg',
    description: 'Classic Burberry shirt with monogram motif. British heritage meets contemporary style.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    inStock: true
  },
  {
    id: 'home-13',
    slug: 'amiri-hollywood-bowling-shirt',
    name: 'Amiri Hollywood Bowling Shirt',
    brand: 'Amiri',
    price: 530400,
    image: '/assets/Amiri shirt.png',
    description: 'Vintage-inspired bowling shirt from Amiri. Streetwear meets classic American style.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    inStock: true
  },
  {
    id: 'home-14',
    slug: 'mcm-kasina-bandana-hoodie',
    name: 'MCM X KASINA Bandana Monogram Zip Hoodie In Oxford Cotton',
    brand: 'MCM',
    price: 499200,
    image: '/assets/MCM shirt.jpg',
    description: 'Collaborative hoodie featuring bandana monogram design. Streetwear meets luxury.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    inStock: true
  },
  {
    id: 'home-15',
    slug: 'mcm-monogram-shorts-denim',
    name: 'Monogram Shorts In Denim Jacquard',
    brand: 'MCM',
    price: 124800,
    image: '/assets/MCM shorts.jpg',
    description: 'Stylish denim shorts with monogram jacquard. Perfect for summer street style.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    inStock: true
  },
  {
    id: 'home-16',
    slug: 'mcm-essential-logo-shorts',
    name: 'Essential Logo Ponte Shorts',
    brand: 'MCM',
    price: 46800,
    image: '/assets/MCM shorts1.jpg',
    description: 'Essential shorts with logo detailing. Comfortable and stylish for everyday wear.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    inStock: true
  },
  {
    id: 'home-17',
    slug: 'mcm-skirt-layered-shorts',
    name: 'Skirt-Layered Shorts In ECONYL® And Monogram Print Leather',
    brand: 'MCM',
    price: 117000,
    image: '/assets/MCM skirt.jpg',
    description: 'Innovative layered shorts with sustainable materials. Fashion meets environmental consciousness.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    inStock: true
  },
  {
    id: 'home-18',
    slug: 'mcm-reversible-vest',
    name: 'Reversible Vest In Lamb Leather And Monogram Nylon',
    brand: 'MCM',
    price: 124800,
    image: '/assets/MCM jacket1.jpg',
    description: 'Versatile reversible vest with premium materials. Two looks in one piece.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    inStock: true
  },
  {
    id: 'home-19',
    slug: 'mcm-cropped-rider-jacket',
    name: 'Cropped Rider Jacket In Lamb Leather',
    brand: 'MCM',
    price: 124800,
    image: '/assets/MCM rider.jpg',
    description: 'Modern cropped rider jacket in premium lamb leather. Contemporary take on classic design.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    inStock: true
  }
]

export default function ProductPage() {
  const { slug } = useParams()
  const [product, setProduct] = useState(null)
  const [selectedSize, setSelectedSize] = useState('')
  const [loading, setLoading] = useState(true)
  const [addedToCart, setAddedToCart] = useState(false)
  const { api } = useApp()

  useEffect(() => {
    // Simulate API call
    const findProduct = () => {
      const foundProduct = mockProducts.find(p => p.slug === slug || p.id === slug)
      setProduct(foundProduct)
      setLoading(false)
    }

    setTimeout(findProduct, 500) // Simulate loading delay
  }, [slug])

  const handleAddToCart = () => {
    if (!product || !selectedSize) return
    
    const cartItem = {
      id: `${product.id}-${selectedSize}`,
      name: product.name,
      brand: product.brand,
      price: product.price,
      image: product.image,
      size: selectedSize,
      qty: 1
    }
    
    console.log('Adding to cart:', cartItem)
    api.addToCart(cartItem)
    setAddedToCart(true)
    
    // Reset the success message after 3 seconds
    setTimeout(() => setAddedToCart(false), 3000)
  }

  if (loading) {
    return (
      <div className="container-px mx-auto py-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl bg-gray-100 aspect-[4/5] animate-pulse" />
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 rounded animate-pulse" />
            <div className="h-6 bg-gray-200 rounded w-24 animate-pulse" />
            <div className="h-32 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container-px mx-auto py-8">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-900">Product Not Found</h1>
          <p className="mt-2 text-gray-600">The product you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container-px mx-auto grid gap-8 py-8 lg:grid-cols-2">
      {/* Product Image */}
      <div className="rounded-2xl bg-gray-100 aspect-[4/5] overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = ''
            e.currentTarget.style.background = '#eee'
          }}
        />
      </div>

      {/* Product Details */}
      <div>
        <div className="mb-2">
          <p className="text-sm text-gray-500 uppercase tracking-wide">{product.brand}</p>
        </div>
        <h1 className="text-2xl font-semibold">{product.name}</h1>
        <p className="mt-2 text-2xl font-bold text-gray-900">₦{product.price.toLocaleString()}</p>

        <div className="mt-6">
          <h4 className="mb-2 font-medium">Size</h4>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map(size => (
              <button 
                key={size} 
                className={`rounded border px-3 py-1 transition-colors ${
                  selectedSize === size 
                    ? 'bg-black text-white border-black' 
                    : 'hover:bg-gray-100'
                }`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <Button 
          className="mt-6 w-full"
          disabled={!selectedSize || !product.inStock}
          onClick={handleAddToCart}
        >
          {!product.inStock ? 'Out of Stock' : addedToCart ? 'Added to Bag!' : selectedSize ? 'Add to Bag' : 'Select Size'}
        </Button>
        
        {addedToCart && (
          <div className="mt-3 text-center text-sm text-green-600 font-medium">
            ✓ Added to your bag successfully!
          </div>
        )}

        <div className="mt-8 space-y-3">
          <details className="rounded border p-3">
            <summary className="cursor-pointer font-medium">Description</summary>
            <p className="mt-2 text-sm text-gray-600">{product.description}</p>
          </details>
          <details className="rounded border p-3">
            <summary className="cursor-pointer font-medium">Shipping & Returns</summary>
            <p className="mt-2 text-sm text-gray-600">Free shipping on orders over ₦50,000. Delivery within 3–14 days. 30-day return policy.</p>
          </details>
        </div>
      </div>
    </div>
  )
}
