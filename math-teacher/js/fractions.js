/* Football Fractions - Fraction Math Utilities */

const Fractions = {
  /**
   * Greatest Common Divisor using Euclidean algorithm
   * @param {number} a
   * @param {number} b
   * @returns {number}
   */
  gcd(a, b) {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b) {
      const t = b;
      b = a % b;
      a = t;
    }
    return a;
  },

  /**
   * Least Common Multiple
   * @param {number} a
   * @param {number} b
   * @returns {number}
   */
  lcm(a, b) {
    return Math.abs(a * b) / this.gcd(a, b);
  },

  /**
   * Simplify a fraction to lowest terms
   * @param {number} numerator
   * @param {number} denominator
   * @returns {{numerator: number, denominator: number}}
   */
  simplify(numerator, denominator) {
    if (denominator === 0) {
      throw new Error('Denominator cannot be zero');
    }
    const divisor = this.gcd(numerator, denominator);
    return {
      numerator: numerator / divisor,
      denominator: denominator / divisor
    };
  },

  /**
   * Check if two fractions are equivalent
   * @param {number} n1 - First numerator
   * @param {number} d1 - First denominator
   * @param {number} n2 - Second numerator
   * @param {number} d2 - Second denominator
   * @returns {boolean}
   */
  areEquivalent(n1, d1, n2, d2) {
    // Cross multiply to compare
    return n1 * d2 === n2 * d1;
  },

  /**
   * Convert improper fraction to mixed number
   * @param {number} numerator
   * @param {number} denominator
   * @returns {{whole: number, numerator: number, denominator: number}}
   */
  toMixedNumber(numerator, denominator) {
    if (denominator === 0) {
      throw new Error('Denominator cannot be zero');
    }
    const whole = Math.floor(numerator / denominator);
    const remainder = numerator % denominator;
    return {
      whole,
      numerator: remainder,
      denominator
    };
  },

  /**
   * Convert mixed number to improper fraction
   * @param {number} whole
   * @param {number} numerator
   * @param {number} denominator
   * @returns {{numerator: number, denominator: number}}
   */
  toImproper(whole, numerator, denominator) {
    return {
      numerator: (whole * denominator) + numerator,
      denominator
    };
  },

  /**
   * Add two fractions
   * @param {number} n1 - First numerator
   * @param {number} d1 - First denominator
   * @param {number} n2 - Second numerator
   * @param {number} d2 - Second denominator
   * @returns {{numerator: number, denominator: number}}
   */
  add(n1, d1, n2, d2) {
    const commonDenom = this.lcm(d1, d2);
    const newN1 = n1 * (commonDenom / d1);
    const newN2 = n2 * (commonDenom / d2);
    return this.simplify(newN1 + newN2, commonDenom);
  },

  /**
   * Subtract two fractions
   * @param {number} n1 - First numerator
   * @param {number} d1 - First denominator
   * @param {number} n2 - Second numerator
   * @param {number} d2 - Second denominator
   * @returns {{numerator: number, denominator: number}}
   */
  subtract(n1, d1, n2, d2) {
    const commonDenom = this.lcm(d1, d2);
    const newN1 = n1 * (commonDenom / d1);
    const newN2 = n2 * (commonDenom / d2);
    return this.simplify(newN1 - newN2, commonDenom);
  },

  /**
   * Compare two fractions
   * @param {number} n1 - First numerator
   * @param {number} d1 - First denominator
   * @param {number} n2 - Second numerator
   * @param {number} d2 - Second denominator
   * @returns {number} -1 if first is smaller, 0 if equal, 1 if first is larger
   */
  compare(n1, d1, n2, d2) {
    const diff = (n1 * d2) - (n2 * d1);
    if (diff < 0) return -1;
    if (diff > 0) return 1;
    return 0;
  },

  /**
   * Convert fraction to decimal
   * @param {number} numerator
   * @param {number} denominator
   * @returns {number}
   */
  toDecimal(numerator, denominator) {
    return numerator / denominator;
  },

  /**
   * Convert fraction to percentage
   * @param {number} numerator
   * @param {number} denominator
   * @returns {number}
   */
  toPercent(numerator, denominator) {
    return (numerator / denominator) * 100;
  },

  /**
   * Check if a fraction is proper (less than 1)
   * @param {number} numerator
   * @param {number} denominator
   * @returns {boolean}
   */
  isProper(numerator, denominator) {
    return Math.abs(numerator) < Math.abs(denominator);
  },

  /**
   * Get the position on a number line (0-1 scale)
   * @param {number} numerator
   * @param {number} denominator
   * @returns {number}
   */
  getPosition(numerator, denominator) {
    return numerator / denominator;
  },

  /**
   * Generate equivalent fractions
   * @param {number} numerator
   * @param {number} denominator
   * @param {number} count - How many to generate
   * @returns {Array<{numerator: number, denominator: number}>}
   */
  getEquivalents(numerator, denominator, count = 5) {
    const equivalents = [];
    for (let i = 1; i <= count; i++) {
      equivalents.push({
        numerator: numerator * i,
        denominator: denominator * i
      });
    }
    return equivalents;
  },

  /**
   * Create HTML for displaying a fraction
   * @param {number} numerator
   * @param {number} denominator
   * @param {string} size - 'normal' or 'large'
   * @returns {string} HTML string
   */
  toHTML(numerator, denominator, size = 'normal') {
    const sizeClass = size === 'large' ? 'fraction-large' : '';
    return `<span class="fraction ${sizeClass}">
      <span class="fraction-numerator">${numerator}</span>
      <span class="fraction-denominator">${denominator}</span>
    </span>`;
  },

  /**
   * Create HTML for displaying a mixed number
   * @param {number} whole
   * @param {number} numerator
   * @param {number} denominator
   * @returns {string} HTML string
   */
  mixedToHTML(whole, numerator, denominator) {
    if (numerator === 0) {
      return `<span class="whole-number">${whole}</span>`;
    }
    return `<span class="mixed-number">
      <span class="whole-number">${whole}</span>
      ${this.toHTML(numerator, denominator)}
    </span>`;
  },

  /**
   * Parse a fraction string like "3/4" or "1 3/4"
   * @param {string} str
   * @returns {{whole: number, numerator: number, denominator: number}|null}
   */
  parse(str) {
    str = str.trim();

    // Try mixed number format: "1 3/4"
    const mixedMatch = str.match(/^(\d+)\s+(\d+)\/(\d+)$/);
    if (mixedMatch) {
      return {
        whole: parseInt(mixedMatch[1], 10),
        numerator: parseInt(mixedMatch[2], 10),
        denominator: parseInt(mixedMatch[3], 10)
      };
    }

    // Try simple fraction format: "3/4"
    const fractionMatch = str.match(/^(\d+)\/(\d+)$/);
    if (fractionMatch) {
      return {
        whole: 0,
        numerator: parseInt(fractionMatch[1], 10),
        denominator: parseInt(fractionMatch[2], 10)
      };
    }

    // Try whole number
    const wholeMatch = str.match(/^(\d+)$/);
    if (wholeMatch) {
      return {
        whole: parseInt(wholeMatch[1], 10),
        numerator: 0,
        denominator: 1
      };
    }

    return null;
  },

  /**
   * Generate a random fraction with specified constraints
   * @param {Object} options
   * @param {number} options.maxDenominator - Maximum denominator
   * @param {boolean} options.allowImproper - Allow improper fractions
   * @param {boolean} options.simplified - Return simplified fraction
   * @returns {{numerator: number, denominator: number}}
   */
  random(options = {}) {
    const {
      maxDenominator = 8,
      allowImproper = false,
      simplified = true
    } = options;

    const denominator = Math.floor(Math.random() * (maxDenominator - 1)) + 2;
    let maxNumerator = allowImproper ? denominator * 2 : denominator - 1;
    const numerator = Math.floor(Math.random() * maxNumerator) + 1;

    if (simplified) {
      return this.simplify(numerator, denominator);
    }
    return { numerator, denominator };
  },

  /**
   * Format fraction as a string
   * @param {number} numerator
   * @param {number} denominator
   * @returns {string}
   */
  toString(numerator, denominator) {
    return `${numerator}/${denominator}`;
  },

  /**
   * Format mixed number as a string
   * @param {number} whole
   * @param {number} numerator
   * @param {number} denominator
   * @returns {string}
   */
  mixedToString(whole, numerator, denominator) {
    if (numerator === 0) return `${whole}`;
    if (whole === 0) return `${numerator}/${denominator}`;
    return `${whole} ${numerator}/${denominator}`;
  }
};

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Fractions;
}
