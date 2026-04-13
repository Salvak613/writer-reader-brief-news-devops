import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchBar from './SearchBar';

describe('SearchBar', () => {
  it('devrait afficher le placeholder "Rechercher un article..."', () => {
    render(
      <SearchBar
        searchBar={{ query: '' }}
        onQueryChange={vi.fn()}
        onSearch={vi.fn()}
      />
    );

    expect(screen.getByPlaceholderText('Rechercher un article...')).toBeInTheDocument();
  });

  it('devrait afficher le bouton "Rechercher"', () => {
    render(
      <SearchBar
        searchBar={{ query: '' }}
        onQueryChange={vi.fn()}
        onSearch={vi.fn()}
      />
    );

    expect(screen.getByText('Rechercher')).toBeInTheDocument();
  });

  it('devrait afficher le bouton effacer quand il y a du texte', () => {
    render(
      <SearchBar
        searchBar={{ query: 'test' }}
        onQueryChange={vi.fn()}
        onSearch={vi.fn()}
      />
    );

    expect(screen.getByLabelText('Effacer la recherche')).toBeInTheDocument();
  });

  it('ne devrait pas afficher le bouton effacer quand la recherche est vide', () => {
    render(
      <SearchBar
        searchBar={{ query: '' }}
        onQueryChange={vi.fn()}
        onSearch={vi.fn()}
      />
    );

    expect(screen.queryByLabelText('Effacer la recherche')).not.toBeInTheDocument();
  });

  it('devrait appeler onQueryChange avec la valeur saisie quand on tape', () => {
    const onQueryChange = vi.fn();

    render(
      <SearchBar
        searchBar={{ query: '' }}
        onQueryChange={onQueryChange}
        onSearch={vi.fn()}
      />
    );

    fireEvent.change(screen.getByPlaceholderText('Rechercher un article...'), {
      target: { value: 'React' },
    });

    expect(onQueryChange).toHaveBeenCalledWith('React');
  });

  it('devrait appeler onSearch quand on clique sur "Rechercher"', () => {
    const onSearch = vi.fn();

    render(
      <SearchBar
        searchBar={{ query: 'test' }}
        onQueryChange={vi.fn()}
        onSearch={onSearch}
      />
    );

    fireEvent.click(screen.getByText('Rechercher'));

    expect(onSearch).toHaveBeenCalledTimes(1);
  });

  it('devrait appeler onQueryChange("") et onSearch quand on clique sur Effacer', () => {
    const onQueryChange = vi.fn();
    const onSearch = vi.fn();

    render(
      <SearchBar
        searchBar={{ query: 'test' }}
        onQueryChange={onQueryChange}
        onSearch={onSearch}
      />
    );

    fireEvent.click(screen.getByLabelText('Effacer la recherche'));

    expect(onQueryChange).toHaveBeenCalledWith('');
    expect(onSearch).toHaveBeenCalledTimes(1);
  });
});
