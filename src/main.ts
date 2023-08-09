export type OptionsObject = {
  /**
   * Whether to include quotes in parsed arguments.
   */
  pushQuotes: boolean;
  /**
    * Whether to include escape characters (backslashes) in parsed arguments.
    */
  pushEscapes: boolean;
  /**
    * Whether to include blank whitespace (including spaces) as separate arguments.
    */
  pushBlankWhitespace: boolean;
}

export class Options implements OptionsObject {
  public pushQuotes = false;
  public pushEscapes = false;
  public pushBlankWhitespace = false;
  constructor(options?: Partial<OptionsObject>) {
    for (const key of Object.keys(options ?? {})) {
      // @ts-ignore
      this[key] = options[key];
    }
  }
}

/**
 * Parses arguments in a POSIX-alike format.
 */
export class ArgumentParser {
  private escape: string = '\\';
  private quotes: string[] = ['\'', '"'];
  private whitespace: string[] = ['\n', ' '];

  /** @constructor */
  constructor(private options?: Partial<OptionsObject>) {
  }

  /**
   * Parses the input string into an array of arguments.
   *
   * @param str - The input string to parse.
   * @param pushQuotes - Whether to include quotes in parsed arguments.
   * @param pushEscapes - Whether to include escape characters in parsed arguments.
   * @param pushBlankWhitespace - Whether to include blank whitespace as separate arguments.
   * @returns An array of parsed arguments.
   * @throws {Error} If there is an unterminated quote in the input string.
   */
  public parse(
    str: string,
    options?: Partial<OptionsObject>
  ): string[] {
    const { pushQuotes, pushEscapes, pushBlankWhitespace } = new Options({
      ...this.options,
      ...(options ?? {})
    });
    const args: string[] = [];

    const includes = (t: string[], v2: string): boolean => {
      return t.includes(v2);
    };

    let escaped = false;
    let progress = '';
    let quoteType: string | undefined;

    const pushProgress = () => {
      if (progress !== '') {
        args.push(progress);
        progress = '';
      }
    };

    for (let i = 0; i < str.length; i++) {
      const token = str.charAt(i);

      if (escaped) {
        escaped = false;
        progress += token;
      } else if (token === this.escape) {
        if (pushEscapes) {
          progress += token;
        }
        escaped = true;
      } else {
        if (token === quoteType) {
          quoteType = undefined;
          if (pushQuotes) {
            progress += token;
          }
          pushProgress();
        } else if (!quoteType && includes(this.quotes, token)) {
          quoteType = token;
          if (pushQuotes) {
            progress += token;
          }
        } else if (!quoteType && includes(this.whitespace, token)) {
          pushProgress();
          if (pushBlankWhitespace) {
            progress = token;
            pushProgress();
          }
        } else {
          progress += token;
        }
      }
    }

    if (quoteType) {
      throw new Error(
        `Parsing Error: Unterminated Quote ${quoteType}${progress.replace(
          quoteType,
          !pushEscapes ? '\\' : ''
        )}${quoteType}`
      );
    }

    pushProgress();
    return args;
  }
}

export default ArgumentParser;
