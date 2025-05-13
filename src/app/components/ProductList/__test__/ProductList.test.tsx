import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import ProductList from '../ProductList'
import { Product } from '../../../models/Product'

describe('ProductList Component', () => {
  const mockProducts: Product[] = [
    {
      id: 1,
      name: 'Produto Teste 1',
      category: 'Categoria 1',
      price: 100.50,
      description: 'Descrição do produto 1',
      image: 'http://test.com/image1.jpg'
    },
    {
      id: 2,
      name: 'Produto Teste 2',
      category: 'Categoria 2',
      price: 200.75,
      description: 'Descrição do produto 2',
      image: 'http://test.com/image2.jpg'
    }
  ]

  it('renders loading state correctly', () => {
    render(<ProductList products={[]} loading={true} />)
    expect(screen.getByText('Carregando...')).toBeInTheDocument()
  })

  it('renders empty state correctly', () => {
    render(<ProductList products={[]} loading={false} />)
    expect(screen.getByText('Desculpe não temos nenhum produto.')).toBeInTheDocument()
  })

  it('renders product list correctly', () => {
    render(<ProductList products={mockProducts} loading={false} />)
    
    expect(screen.getAllByRole('img')).toHaveLength(mockProducts.length)
    expect(screen.getByText('Produto Teste 1')).toBeInTheDocument()
    expect(screen.getByText('Produto Teste 2')).toBeInTheDocument()
    expect(screen.getByText('$100.50')).toBeInTheDocument()
    expect(screen.getByText('$200.75')).toBeInTheDocument()
  })

  it('displays correct product information', () => {
    render(<ProductList products={[mockProducts[0]]} loading={false} />)
    
    const product = mockProducts[0]
    expect(screen.getByText(product.name)).toBeInTheDocument()
    expect(screen.getByText(product.category)).toBeInTheDocument()
    expect(screen.getByText(`$${product.price.toFixed(2)}`)).toBeInTheDocument()
    expect(screen.getByText(product.description)).toBeInTheDocument()
    
    const image = screen.getByRole('img')
    expect(image).toHaveAttribute('src', product.image)
    expect(image).toHaveAttribute('alt', product.name)
  })

  it('has correct grid layout classes', () => {
    render(<ProductList products={mockProducts} loading={false} />)
    
    const grid = screen.getByTestId('product-grid')
    expect(grid).toHaveClass('grid')
    expect(grid).toHaveClass('grid-cols-1')
    expect(grid).toHaveClass('md:grid-cols-2')
    expect(grid).toHaveClass('lg:grid-cols-3')
    expect(grid).toHaveClass('gap-6')
  })

  it('applies correct styling to product cards', () => {
    render(<ProductList products={[mockProducts[0]]} loading={false} />)
    
    const card = screen.getByTestId('product-card-1')
    expect(card).toHaveClass('border-2')
    expect(card).toHaveClass('border-gray-100')
    expect(card).toHaveClass('rounded-lg')
    expect(card).toHaveClass('shadow-md')
    expect(card).toHaveClass('hover:shadow-lg')
    expect(card).toHaveClass('transition-shadow')
  })
})