import { Money, multiply, max } from '../money';

const SUM_FEE_LIMIT = 10000;
const SUM_FEE_PERCENTAGE = 0.05;
const NON_WORKING_HOURS_DAYS = [6, 7];
const NON_WORKING_HOURS_PERCENTAGE = 0.01;

export interface FeeContext {
  dayOfWeek: number;
}

export function applyFees(money: Money, context: FeeContext): Money {
  return [applyTransactionSumFee, applyNonWorkingHoursFee]
    .map(fn => fn(money, context))
    .reduce((acc, curr) => {
      if (!acc) return curr;
      return max(acc, curr);
    }, null!);
}

function applyTransactionSumFee(money: Money, context: FeeContext): Money {
  if (money.amount >= SUM_FEE_LIMIT) {
    return multiply(money, SUM_FEE_PERCENTAGE);
  }
  return {
    currencyCode: money.currencyCode,
    amount: 0
  };
}

function applyNonWorkingHoursFee(money: Money, context: FeeContext): Money {
  if (NON_WORKING_HOURS_DAYS.includes(context.dayOfWeek)) {
    return multiply(money, NON_WORKING_HOURS_PERCENTAGE);
  }
  return {
    currencyCode: money.currencyCode,
    amount: 0
  };
}
