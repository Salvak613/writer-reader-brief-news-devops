import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ArticleCard from './ArticleCard';

const mockArticle = {
  id: 1,
  title: 'Mon article de test',
  subtitle: 'Un sous-titre intéressant',
  subhead: 'Le chapeau',
  publish_date: '2025-12-18T10:00:00',
  update_date: null,
  deletedAt: null,
  category: { id: 1, title: 'Technologie' },
};

describe('ArticleCard', () => {
  it('devrait afficher le titre de l\'article', () => {
    render(<ArticleCard article={mockArticle} />);

    expect(screen.getByText('Mon article de test')).toBeInTheDocument();
  });

  it('devrait afficher la catégorie', () => {
    render(<ArticleCard article={mockArticle} />);

    expect(screen.getByText('Technologie')).toBeInTheDocument();
  });

  it('devrait afficher le sous-titre', () => {
    render(<ArticleCard article={mockArticle} />);

    expect(screen.getByText('Un sous-titre intéressant')).toBeInTheDocument();
  });

  it('ne devrait pas afficher "Modifié le" si pas de date de modification', () => {
    render(<ArticleCard article={mockArticle} />);

    expect(screen.queryByText(/Modifié le/)).not.toBeInTheDocument();
  });

  it('devrait afficher "Modifié le" si une date de modification existe', () => {
    const articleModifie = { ...mockArticle, update_date: '2025-12-20T14:00:00' };
    render(<ArticleCard article={articleModifie} />);

    expect(screen.getByText(/Modifié le/)).toBeInTheDocument();
  });
});
