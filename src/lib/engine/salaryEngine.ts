export function applyTaxBands(amount: number, bands: any[]) {
  let tax = 0;
  let remaining = amount;
  let lastLimit = 0;

  for (const band of bands) {
    if (band.upTo) {
      const taxable = Math.min(band.upTo - lastLimit, remaining);
      tax += taxable * band.rate;
      remaining -= taxable;
      lastLimit = band.upTo;
    } else if (band.above && remaining > 0) {
      tax += remaining * band.rate;
    }
  }
  return tax;
}

export function calculateIrelandSalary(
  gross: number,
  rules: any,
  options: any
) {
  const incomeTax = applyTaxBands(gross, rules.incomeTax.bands);

  const usc = options.applyUSC
    ? applyTaxBands(gross, rules.usc.bands)
    : 0;

  const prsi = options.applyPRSI
    ? gross * rules.prsi.rate
    : 0;

  const pension = options.pensionPercent
    ? gross * (options.pensionPercent / 100)
    : 0;

  const bonusTax = options.bonus
    ? applyTaxBands(options.bonus, rules.incomeTax.bands) +
      (options.applyUSC ? applyTaxBands(options.bonus, rules.usc.bands) : 0) +
      (options.applyPRSI ? options.bonus * rules.prsi.rate : 0)
    : 0;

  const deductions =
    (options.otherDeductions || 0) + pension + bonusTax;

  const net =
    gross - incomeTax - usc - prsi - deductions + (options.bonus || 0);

  return {
    gross,
    incomeTax,
    usc,
    prsi,
    pension,
    bonus: options.bonus || 0,
    bonusTax,
    otherDeductions: options.otherDeductions || 0,
    totalDeductions: incomeTax + usc + prsi + pension + bonusTax + (options.otherDeductions || 0),
    net,
    monthlyNet: net / 12,
    yearlyNet: net,
    effectiveTaxRate: net > 0 ? ((incomeTax + usc + prsi + bonusTax) / (gross + (options.bonus || 0))) * 100 : 0
  };
}
