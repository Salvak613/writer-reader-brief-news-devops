import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CommentCount from './CommentCount';

describe('CommentCount', () => {
  it('devrait afficher le nombre de commentaires', () => {
    render(<CommentCount count={5} />);

    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('devrait afficher "commentaire" au singulier pour 1 commentaire', () => {
    render(<CommentCount count={1} />);

    expect(screen.getByText('commentaire')).toBeInTheDocument();
  });

  it('devrait afficher "commentaires" au pluriel pour plusieurs commentaires', () => {
    render(<CommentCount count={3} />);

    expect(screen.getByText('commentaires')).toBeInTheDocument();
  });

  it('ne devrait pas afficher le texte quand hideText est true', () => {
    render(<CommentCount count={5} hideText={true} />);

    expect(screen.queryByText('commentaires')).not.toBeInTheDocument();
  });
});
