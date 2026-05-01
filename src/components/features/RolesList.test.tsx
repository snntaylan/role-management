import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { RolesList } from './RolesList';
import type { IRole } from '../../features/roles/rolesTypes';

// Mock the UI components
vi.mock('../ui', () => ({
  Button: ({ children, onClick, isLoading, variant, size }: any) => (
    <button
      onClick={onClick}
      disabled={isLoading}
      className={`btn ${variant} ${size}`}
      data-testid="button"
    >
      {children}
    </button>
  ),
  Table: ({ data, isLoading, emptyMessage, columns }: any) => {
    if (isLoading) {
      return <div data-testid="loading-spinner">Loading...</div>;
    }

    if (data.length === 0) {
      return <div data-testid="empty-message">{emptyMessage}</div>;
    }

    return (
      <table data-testid="roles-table">
        <thead>
          <tr>
            {columns.map((col: any) => (
              <th key={col.key}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row: any) => (
            <tr key={row.id}>
              {columns.map((col: any) => (
                <td key={col.key}>
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  },
  Badge: ({ children, variant }: any) => (
    <span data-testid="badge" className={`badge ${variant}`}>
      {children}
    </span>
  ),
  Modal: ({ children, isOpen, title, onClose, footer }: any) => {
    if (!isOpen) return null;

    return (
      <div data-testid="modal" role="dialog">
        <h2>{title}</h2>
        <div>{children}</div>
        <div>{footer}</div>
        <button onClick={onClose} data-testid="modal-close">Close</button>
      </div>
    );
  },
  Input: ({ label, value, onChange, placeholder, error }: any) => (
    <div>
      <label>{label}</label>
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        data-testid="input"
      />
      {error && <span data-testid="input-error">{error}</span>}
    </div>
  ),
  Alert: ({ children, variant, title, onClose }: any) => (
    <div data-testid="alert" className={`alert ${variant}`}>
      {title && <strong>{title}</strong>}
      {children}
      {onClose && <button onClick={onClose} data-testid="alert-close">×</button>}
    </div>
  ),
}));

const mockRoles: IRole[] = [
  {
    id: '1',
    name: 'Admin',
    description: 'Administrator role',
    status: 'ACTIVE',
    permissions: [],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  },
  {
    id: '2',
    name: 'User',
    description: 'Regular user role',
    status: 'INACTIVE',
    permissions: [],
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  },
];

describe('RolesList', () => {
const mockOnAddRole = vi.fn();
const mockOnDeleteRole = vi.fn();
const mockOnSelectRole = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders roles table when data is available', () => {
    render(
      <RolesList
        roles={mockRoles}
        loading={false}
        error={null}
        onAddRole={mockOnAddRole}
      />
    );

    expect(screen.getByTestId('roles-table')).toBeInTheDocument();
    expect(screen.getByText('Admin')).toBeInTheDocument();
    expect(screen.getByText('User')).toBeInTheDocument();
  });

  it('shows loading spinner when loading', () => {
    render(
      <RolesList
        roles={[]}
        loading={true}
        error={null}
        onAddRole={mockOnAddRole}
      />
    );

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    expect(screen.queryByTestId('roles-table')).not.toBeInTheDocument();
  });

  it('shows empty message when no roles and not loading', () => {
    render(
      <RolesList
        roles={[]}
        loading={false}
        error={null}
        onAddRole={mockOnAddRole}
      />
    );

    expect(screen.getByTestId('empty-message')).toBeInTheDocument();
    expect(screen.getByText('No roles found. Create one to get started.')).toBeInTheDocument();
  });

  it('shows error alert when error is present', () => {
    const errorMessage = 'Failed to load roles';
    render(
      <RolesList
        roles={[]}
        loading={false}
        error={errorMessage}
        onAddRole={mockOnAddRole}
      />
    );

    expect(screen.getByTestId('alert')).toBeInTheDocument();
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('opens add role modal when Add Role button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <RolesList
        roles={mockRoles}
        loading={false}
        error={null}
        onAddRole={mockOnAddRole}
      />
    );

    const addButton = screen.getByText('Add Role');
    await user.click(addButton);

    expect(screen.getByTestId('modal')).toBeInTheDocument();
    expect(screen.getByText('Add New Role')).toBeInTheDocument();
  });

  it('calls onAddRole with correct data when form is submitted', async () => {
    const user = userEvent.setup();
    mockOnAddRole.mockResolvedValue(undefined);

    render(
      <RolesList
        roles={mockRoles}
        loading={false}
        error={null}
        onAddRole={mockOnAddRole}
      />
    );

    // Open modal
    const addButton = screen.getByText('Add Role');
    await user.click(addButton);

    // Fill form
    const nameInput = screen.getAllByTestId('input')[0];
    const descriptionInput = screen.getAllByTestId('input')[1];

    await user.type(nameInput, 'Manager');
    await user.type(descriptionInput, 'Management role');

    // Submit form
    const createButton = screen.getByText('Create Role');
    await user.click(createButton);

    await waitFor(() => {
      expect(mockOnAddRole).toHaveBeenCalledWith({
        name: 'Manager',
        description: 'Management role',
      });
    });
  });

  it('shows validation error when role name is empty', async () => {
    const user = userEvent.setup();
    render(
      <RolesList
        roles={mockRoles}
        loading={false}
        error={null}
        onAddRole={mockOnAddRole}
      />
    );

    // Open modal
    const addButton = screen.getByText('Add Role');
    await user.click(addButton);

    // Try to submit without name
    const createButton = screen.getByText('Create Role');
    await user.click(createButton);

    expect(screen.getByTestId('input-error')).toBeInTheDocument();
    expect(screen.getByText('Required')).toBeInTheDocument();
    expect(mockOnAddRole).not.toHaveBeenCalled();
  });

  it('calls onSelectRole when View button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <RolesList
        roles={mockRoles}
        loading={false}
        error={null}
        onAddRole={mockOnAddRole}
        onSelectRole={mockOnSelectRole}
      />
    );

    const viewButtons = screen.getAllByText('View');
    await user.click(viewButtons[0]);

    expect(mockOnSelectRole).toHaveBeenCalledWith('1');
  });

  it('calls onDeleteRole when Delete button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <RolesList
        roles={mockRoles}
        loading={false}
        error={null}
        onAddRole={mockOnAddRole}
        onDeleteRole={mockOnDeleteRole}
      />
    );

    const deleteButtons = screen.getAllByText('Delete');
    await user.click(deleteButtons[0]);

    expect(mockOnDeleteRole).toHaveBeenCalledWith('1');
  });
});