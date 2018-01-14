import { Test } from '@nestjs/testing'
import { AuthService } from './auth.service'

describe('createToken works', () => {
  let authService: AuthService
  beforeEach(async () => {
    const mockModule = await Test.createTestingModule({
      components: [AuthService]
    }).compile()
    authService = mockModule.get<AuthService>(AuthService)
  })
  describe('createToken', () => {
    it('should return generated token', async () => {
      const tokenObj = await authService.createToken({ id: 1 })
      console.log(tokenObj)
      expect(Boolean(tokenObj)).toBe(true)
    })
  })
})
