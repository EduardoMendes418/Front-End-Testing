import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Pagination from '../Pagination'

describe('Pagination Component', () => {
  const mockPageChange = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders basic pagination controls', () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={mockPageChange}
      />
    )

    expect(screen.getByLabelText('Previous')).toBeInTheDocument()
    expect(screen.getByLabelText('Next')).toBeInTheDocument()
    expect(screen.getAllByRole('button')).toHaveLength(7) 
  })

  it('disables previous button on first page', () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={mockPageChange}
      />
    )

    const prevButton = screen.getByLabelText('Previous')
    expect(prevButton).toBeDisabled()
    expect(prevButton).toHaveClass('bg-gray-200 cursor-not-allowed')
  })

  it('disables next button on last page', () => {
    render(
      <Pagination
        currentPage={5}
        totalPages={5}
        onPageChange={mockPageChange}
      />
    )

    const nextButton = screen.getByLabelText('Next')
    expect(nextButton).toBeDisabled()
    expect(nextButton).toHaveClass('bg-gray-200 cursor-not-allowed')
  })

  it('calls onPageChange with correct page number', () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={5}
        onPageChange={mockPageChange}
      />
    )

    fireEvent.click(screen.getByText('4'))
    expect(mockPageChange).toHaveBeenCalledWith(4)
  })

  it('shows ellipsis for large number of pages', () => {
    render(
      <Pagination
        currentPage={5}
        totalPages={10}
        onPageChange={mockPageChange}
      />
    )

    expect(screen.getAllByText('...')).toHaveLength(2)
    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('10')).toBeInTheDocument()
  })

  it('renders correctly when current page is near start', () => {
    render(
      <Pagination
        currentPage={2}
        totalPages={10}
        onPageChange={mockPageChange}
      />
    )

    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
    expect(screen.getByText('4')).toBeInTheDocument()
    expect(screen.getByText('5')).toBeInTheDocument()
    expect(screen.getByText('...')).toBeInTheDocument()
    expect(screen.getByText('10')).toBeInTheDocument()
  })

  it('renders correctly when current page is near end', () => {
    render(
      <Pagination
        currentPage={9}
        totalPages={10}
        onPageChange={mockPageChange}
      />
    )

    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('...')).toBeInTheDocument()
    expect(screen.getByText('7')).toBeInTheDocument()
    expect(screen.getByText('8')).toBeInTheDocument()
    expect(screen.getByText('9')).toBeInTheDocument()
    expect(screen.getByText('10')).toBeInTheDocument()
  })

  it('handles click on previous and next buttons', () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={5}
        onPageChange={mockPageChange}
      />
    )

    fireEvent.click(screen.getByLabelText('Previous'))
    expect(mockPageChange).toHaveBeenCalledWith(2)

    fireEvent.click(screen.getByLabelText('Next'))
    expect(mockPageChange).toHaveBeenCalledWith(4)
  })

  it('highlights current page', () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={5}
        onPageChange={mockPageChange}
      />
    )

    const currentPageButton = screen.getByText('3')
    expect(currentPageButton).toHaveClass('bg-blue-600 text-white')
  })
})