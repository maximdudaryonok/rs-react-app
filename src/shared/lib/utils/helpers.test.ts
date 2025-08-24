import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getPasswordStrength, imageToBase64 } from './helpers.ts';

vi.mock('shared/types/validation', () => ({
  REG_EXP: {
    special_character: /[!@#$%^&*(),.?":{}|<>]/,
    uppercase: /[A-Z]/,
    lowercase: /[a-z]/,
    numbers: /[0-9]/,
  },
}));



describe('imageToBase64', () => {
  let mockFileReader: any;

  beforeEach(() => {
    mockFileReader = {
      readAsDataURL: vi.fn(function () {
        setTimeout(() => {
          this.result = 'data:image/png;base64,ZmFrZUJhc2U2NA==';
          this.onloadend();
        }, 0);
      }),
      onloadend: vi.fn(),
      onerror: vi.fn(),
      result: null,
    };

    vi.stubGlobal('FileReader', vi.fn(() => mockFileReader));
  });

  it('should resolve with base64 string when conversion succeeds', async () => {
    const blob = new Blob(['fake'], { type: 'image/png' });
    const result = await imageToBase64(blob);
    expect(result).toBe('data:image/png;base64,ZmFrZUJhc2U2NA==');
  });

  it('should reject when reader.result is null', async () => {
    mockFileReader.readAsDataURL = vi.fn(function () {
      setTimeout(() => {
        this.result = null;
        this.onloadend();
      }, 0);
    });

    const blob = new Blob(['fake'], { type: 'image/png' });
    await expect(imageToBase64(blob)).rejects.toThrow('Failed to convert image to base64');
  });

  it('should reject when FileReader errors', async () => {
    mockFileReader.readAsDataURL = vi.fn(function () {
      setTimeout(() => {
        this.onerror();
      }, 0);
    });

    const blob = new Blob(['fake'], { type: 'image/png' });
    await expect(imageToBase64(blob)).rejects.toThrow('Failed to read image file');
  });
});

describe('getPasswordStrength', () => {
  it('should return 0 for undefined or empty password', () => {
    expect(getPasswordStrength(undefined)).toBe(0);
    expect(getPasswordStrength('')).toBe(0);
  });

  it('should count special characters', () => {
    expect(getPasswordStrength('!')).toBe(1);
  });

  it('should count uppercase letters', () => {
    expect(getPasswordStrength('A')).toBe(1);
  });

  it('should count lowercase letters', () => {
    expect(getPasswordStrength('a')).toBe(1);
  });

  it('should count numbers', () => {
    expect(getPasswordStrength('1')).toBe(1);
  });

  it('should count multiple categories', () => {
    expect(getPasswordStrength('Aa1!')).toBe(4);
  });
});
