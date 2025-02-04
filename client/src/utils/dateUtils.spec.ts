import { formatTime } from './dateUtils'

describe('formatTime', () => {
  it.each([
    [1707052800000, '02:20:00 PM'],
    [1707096000000, '02:20:00 AM'],
    [1707128399000, '11:19:59 AM'],
    [0, '01:00:00 AM'],
    [NaN, 'Invalid Time'],
    [Infinity, 'Invalid Time'],
    [-Infinity, 'Invalid Time']
  ])('should format timestamp %d as %s', (input, expected) => {
    expect(formatTime(input)).toBe(expected)
  })
})
