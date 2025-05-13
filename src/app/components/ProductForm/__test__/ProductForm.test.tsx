import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { faker } from '@faker-js/faker'
import ProductForm from '../ProductForm'

vi.mock('react-hot-toast', async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual as object,
    default: {
      success: vi.fn(),
      error: vi.fn(),
    },
    Toaster: () => <div data-testid="toaster"></div>,
  }
})

describe('ProductForm Component', () => {
  const mockSubmit = vi.fn()
  const user = userEvent.setup()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('does not reset form after submission when updating', async () => {
    const initialData = {
      name: faker.commerce.productName(),
      category: faker.commerce.department(),
      price: parseFloat(faker.commerce.price()),
      description: faker.commerce.productDescription(),
      image: faker.image.url()
    }

    render(
      <ProductForm 
        onSubmit={mockSubmit} 
        initialData={initialData} 
        isUpdating={true} 
      />
    )

    const nameInput = screen.getByLabelText('Nome')
    const updatedName = faker.commerce.productName()
    
    await user.clear(nameInput)
    await user.type(nameInput, updatedName)

    await user.click(screen.getByRole('button', { name: 'Atualizar' }))
    expect(nameInput).toHaveValue(updatedName)
  
    const { default: toast } = await import('react-hot-toast')
    expect(toast.success).toHaveBeenCalledWith('Produto atualizado com sucesso!')
  })

})