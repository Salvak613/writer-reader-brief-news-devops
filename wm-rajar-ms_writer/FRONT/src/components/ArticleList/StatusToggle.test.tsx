import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import StatusToggle from './StatusToggle';
import { articleService } from '../../services/article.service';

// Mock du service car StatusToggle appelle deleteArticle/restoreArticle
vi.mock('../../services/article.service', () => ({
  articleService: {
    deleteArticle: vi.fn(),
    restoreArticle: vi.fn(),
  },
}));

describe('StatusToggle', () => {
  it('devrait afficher "Actif" quand l\'article est actif', () => {
    render(<StatusToggle articleId={1} isActive={true} onStatusChange={vi.fn()} />);

    expect(screen.getByText('Actif')).toBeInTheDocument();
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true');
  });

  it('devrait afficher "Inactif" quand l\'article est inactif', () => {
    render(<StatusToggle articleId={1} isActive={false} onStatusChange={vi.fn()} />);

    expect(screen.getByText('Inactif')).toBeInTheDocument();
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'false');
  });

  it('devrait appeler onStatusChange avec le nouvel état après le clic (actif → inactif)', async () => {
    vi.mocked(articleService.deleteArticle).mockResolvedValueOnce({} as never);
    const onStatusChange = vi.fn();

    render(<StatusToggle articleId={42} isActive={true} onStatusChange={onStatusChange} />);

    fireEvent.click(screen.getByRole('switch'));

    await waitFor(() => {
      expect(onStatusChange).toHaveBeenCalledWith(42, false);
    });
  });

  it('devrait appeler onStatusChange avec le nouvel état après le clic (inactif → actif)', async () => {
    vi.mocked(articleService.restoreArticle).mockResolvedValueOnce({} as never);
    const onStatusChange = vi.fn();

    render(<StatusToggle articleId={42} isActive={false} onStatusChange={onStatusChange} />);

    fireEvent.click(screen.getByRole('switch'));

    await waitFor(() => {
      expect(onStatusChange).toHaveBeenCalledWith(42, true);
    });
  });

  it('devrait être désactivé pendant le chargement', async () => {
    vi.mocked(articleService.deleteArticle).mockReturnValueOnce(new Promise(() => {}));

    render(<StatusToggle articleId={1} isActive={true} onStatusChange={vi.fn()} />);

    fireEvent.click(screen.getByRole('switch'));

    expect(screen.getByRole('switch')).toBeDisabled();
  });
});
