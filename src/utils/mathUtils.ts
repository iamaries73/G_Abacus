export const generateNumber = (type: 'single' | 'double' | 'triple' | 'quadruple', allowNegative = true): number => {
  let num;
  switch (type) {
    case 'quadruple':
      num = Math.floor(Math.random() * 9000) + 1000; // 1000-9999
      break;
    case 'triple':
      num = Math.floor(Math.random() * 900) + 100; // 100-999
      break;
    case 'double':
      num = Math.floor(Math.random() * 90) + 10; // 10-99
      break;
    default: // single
      num = Math.floor(Math.random() * 9) + 1; // 1-9
  }
  
  // Always include negative numbers with 50% probability for all types
  return Math.random() > 0.5 ? -num : num;
};

export const generateProblem = (type: 'single' | 'double' | 'triple' | 'quadruple', operation: '+' | '-'): {
  num1: number;
  num2: number;
  operation: '+' | '-';
  answer: number;
} => {
  const num1 = generateNumber(type);
  const num2 = generateNumber(type);
  
  return {
    num1,
    num2,
    operation,
    answer: operation === '+' ? num1 + num2 : num1 - num2
  };
};