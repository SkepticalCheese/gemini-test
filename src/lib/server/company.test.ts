import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { getCompanies } from './company';
import { UserType } from './user';
import prisma from './prisma';

vi.mock('./prisma', () => ({
  __esModule: true,
  default: {
    company: {
      findMany: vi.fn(),
    },
  },
}));

describe('Company Functions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getCompanies', () => {
    it('should return a list of companies with contact counts', async () => {
      // Arrange
      const user: UserType = {
        name: 'Test User',
        tenant_id: 1,
      };

      const mockCompanies = [
        {
          id: 1,
          name: 'Company A',
          created_at: new Date(),
          tenant_id: 1,
          Contact: [{}, {}], // 2 contacts
        },
        {
          id: 2,
          name: 'Company B',
          created_at: new Date(),
          tenant_id: 1,
          Contact: [{}], // 1 contact
        },
      ];

      const expectedCompanies = mockCompanies.map (c => ({
        id: c.id,
        name: c.name,
        createdAt: c.created_at,
        contactCount: c.Contact.length,
      }));

      (prisma.company.findMany as Mock).mockResolvedValue(mockCompanies);

      // Act
      const result = await getCompanies(user);

      // Assert
      expect(result).toEqual(expectedCompanies);
      expect(prisma.company.findMany).toHaveBeenCalledWith({
        where: {
          tenant_id: user.tenant_id,
        },
        include: {
          Contact: true,
        },
      });
    });

    it('should return an empty array if no companies are found', async () => {
      // Arrange
      const user: UserType = {
        name: 'Test User',
        tenant_id: 1,
      };

      (prisma.company.findMany as Mock).mockResolvedValue([]);

      // Act
      const result = await getCompanies(user);

      // Assert
      expect(result).toEqual([]);
      expect(prisma.company.findMany).toHaveBeenCalledWith({
        where: {
          tenant_id: user.tenant_id,
        },
        include: {
          Contact: true,
        },
      });
    });
  });
});