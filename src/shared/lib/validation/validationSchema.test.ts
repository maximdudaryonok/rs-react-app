import { describe, it, expect, vi, beforeEach } from 'vitest';
import { schema } from './validationSchema.ts';

vi.mock('shared/types/countries', () => ({
  countryList: ['Belarus', 'Poland', 'USA'],
}));

vi.mock('shared/types/validation', () => ({
  FILE_EXTENSIONS: ['image/png', 'image/jpeg'],
  FILE_SIZE: 1024 * 100,
  REG_EXP: {
    start_lowercase: /^[A-Z].*$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    special_character: /[!@#$%^&*]/,
    uppercase: /[A-Z]/,
    lowercase: /[a-z]/,
    numbers: /[0-9]/,
  },
}));



describe('schema validation', () => {
  let validData: any;

  beforeEach(() => {
    validData = {
      name: 'John',
      age: 25,
      email: 'test@example.com',
      password: 'Aa1!',
      confirm: 'Aa1!',
      gender: 'male',
      terms: true,
      file: [
        new File(['dummy'], 'test.png', { type: 'image/png', size: 1024 * 50 }),
      ] as unknown as FileList,
      country: 'Belarus',
    };
  });

  it('should validate correct data', async () => {
    await expect(schema.validate(validData)).resolves.toBeTruthy();
  });

  it('should fail if name is missing', async () => {
    delete validData.name;
    await expect(schema.validate(validData)).rejects.toThrow('Name is a required field');
  });

  it('should fail if name does not start with uppercase', async () => {
    validData.name = 'john';
    await expect(schema.validate(validData)).rejects.toThrow('Name shoud start from uppercase letter');
  });

  it('should fail if age is negative', async () => {
    validData.age = -5;
    await expect(schema.validate(validData)).rejects.toThrow('Age should greater than zero');
  });

  it('should fail if email is invalid', async () => {
    validData.email = 'invalid-email';
    await expect(schema.validate(validData)).rejects.toThrow('Invalid email format');
  });

  it('should fail if password missing special character', async () => {
    validData.password = 'Aa11';
    validData.confirm = 'Aa11';
    await expect(schema.validate(validData)).rejects.toThrow(
      'Password must contain at least one special character from !@#$%^&*'
    );
  });

  it('should fail if confirm password does not match', async () => {
    validData.confirm = 'Different1!';
    await expect(schema.validate(validData)).rejects.toThrow('Passwords must match');
  });

  it('should fail if gender is not male or female', async () => {
    validData.gender = 'other';
    await expect(schema.validate(validData)).rejects.toThrow();
  });

  it('should fail if terms not accepted', async () => {
    validData.terms = false;
    await expect(schema.validate(validData)).rejects.toThrow('You must accept the terms and conditions');
  });

  it('should fail if file type is not allowed', async () => {
    validData.file = [
      new File(['dummy'], 'file.gif', { type: 'image/gif', size: 1024 * 50 }),
    ] as unknown as FileList;
    await expect(schema.validate(validData)).rejects.toThrow(/Only/);
  });

  it('should fail if country is not in list', async () => {
    validData.country = 'Atlantis';
    await expect(schema.validate(validData)).rejects.toThrow('You must select one country');
  });
});
