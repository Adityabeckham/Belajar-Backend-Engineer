const subscriptionService = require('../../src/services/subscription.service');
const subscriptionRepository = require('../../src/repositories/subscription.repository');
const planRepository = require('../../src/repositories/plan.repository');
const userRepository = require('../../src/repositories/user.repository');
const pool = require('../../src/config/database');

jest.mock('../../src/repositories/subscription.repository');
jest.mock('../../src/repositories/plan.repository');
jest.mock('../../src/repositories/user.repository');
jest.mock('../../src/config/database');

describe('Subscription Service - Unit Tests', () => {
    let mockClient;

    beforeEach(() => {
        mockClient = {
            query: jest.fn(),
            release: jest.fn(),
        };
        pool.connect.mockResolvedValue(mockClient);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('Harus gagal jika plan tidak aktif', async () => {
        userRepository.findUserById.mockResolvedValue({ id: 'user-1', email: 'test@example.com' });
        planRepository.findPlanById.mockResolvedValue({ id: 'plan-1', is_active: false });

        await expect(
            subscriptionService.createSubscription({ userId: 'user-1', planId: 'plan-1' })
        ).rejects.toThrow('Plan is not available');

        expect(mockClient.query).toHaveBeenCalledWith('BEGIN');
        expect(mockClient.query).toHaveBeenCalledWith('ROLLBACK');
        expect(mockClient.release).toHaveBeenCalled();
    });

    test('Harus sukses membuat subscription jika data valid', async () => {
        const mockUser = { id: 'user-1', email: 'test@example.com' };
        const mockPlan = { id: 'plan-1', name: 'Pro Plan', duration_days: 30, is_active: true };
        const mockCreatedSub = {
            id: 'sub-1',
            user_id: 'user-1',
            plan_id: 'plan-1',
            status: 'ACTIVE',
        };

        userRepository.findUserById.mockResolvedValue(mockUser);
        planRepository.findPlanById.mockResolvedValue(mockPlan);
        subscriptionRepository.findActiveSubscriptionByUserId.mockResolvedValue(null);
        subscriptionRepository.createSubscriptionWithClient.mockResolvedValue(mockCreatedSub);

        const result = await subscriptionService.createSubscription({ userId: 'user-1', planId: 'plan-1' });

        expect(result).toEqual(mockCreatedSub);
        expect(mockClient.query).toHaveBeenCalledWith('BEGIN');
        expect(mockClient.query).toHaveBeenCalledWith('COMMIT');
        expect(mockClient.release).toHaveBeenCalled();
    });
});