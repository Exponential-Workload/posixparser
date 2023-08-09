import ArgumentParser, { OptionsObject } from './main';

describe('ArgumentParser', () => {
  describe('parse', () => {
    it('parses a simple string without options', () => {
      const parser = new ArgumentParser();
      const result = parser.parse('arg1 arg2 arg3');
      expect(result).toEqual(['arg1', 'arg2', 'arg3']);
    });

    it('parses a string with quotes', () => {
      const parser = new ArgumentParser();
      const result = parser.parse('arg1 "arg with spaces" arg3');
      expect(result).toEqual(['arg1', 'arg with spaces', 'arg3']);
    });

    it('parses a string with escapes', () => {
      const parser = new ArgumentParser();
      const result = parser.parse('arg1 "arg \\"with\\" escapes" arg3');
      expect(result).toEqual(['arg1', 'arg "with" escapes', 'arg3']);
    });

    it('throws an error for unterminated quote', () => {
      const parser = new ArgumentParser();
      expect(() => parser.parse('arg1 "unterminated')).toThrowError(
        'Parsing Error: Unterminated Quote "unterminated"'
      );
    });

    it('includes quotes if pushQuotes option is enabled', () => {
      const options: Partial<OptionsObject> = {
        pushQuotes: true,
      };
      const parser = new ArgumentParser();
      const result = parser.parse('arg1 "arg with spaces"', options);
      expect(result).toEqual(['arg1', '"arg with spaces"']);
    });

    it('includes escapes if pushEscapes option is enabled', () => {
      const options: Partial<OptionsObject> = {
        pushEscapes: true,
      };
      const parser = new ArgumentParser();
      const result = parser.parse('arg1 "arg \\"with\\" escapes"', options);
      expect(result).toEqual(['arg1', 'arg \\"with\\" escapes']);
    });

    it('includes blank whitespace as separate arguments if pushBlankWhitespace option is enabled', () => {
      const options: Partial<OptionsObject> = {
        pushBlankWhitespace: true,
      };
      const parser = new ArgumentParser();
      const result = parser.parse('arg1 \n arg3', options);
      expect(result).toEqual(['arg1', ' ', '\n', ' ', 'arg3']);
    });

    it('combines options correctly', () => {
      const options: Partial<OptionsObject> = {
        pushQuotes: true,
        pushEscapes: true,
        pushBlankWhitespace: true,
      };
      const parser = new ArgumentParser();
      const result = parser.parse('arg1 "arg \\"with\\" escapes" arg3 \n', options);
      expect(result).toEqual(['arg1', ' ', '"arg \\"with\\" escapes"', ' ', 'arg3', ' ', '\n']);
    });
  });
});
