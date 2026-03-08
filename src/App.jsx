import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer, Cell } from 'recharts';

// ─── Retirement Spending Page ─────────────────────────────────────────────────
const RetirementSpendingPage = () => {
  const ages = ['45–54', '55–64', '65–74', '75+'];

  const totalSpending = [
    { age: '45–54', value: 97319 },
    { age: '55–64', value: 83379 },
    { age: '65–74', value: 65149 },
    { age: '75+',   value: 53031 },
  ];

  const housingSpending = [
    { age: '45–54', value: 29095 },
    { age: '55–64', value: 25595 },
    { age: '65–74', value: 22216 },
    { age: '75+',   value: 20370 },
  ];

  const healthcareSpending = [
    { age: '45–54', value: 6338 },
    { age: '55–64', value: 7164 },
    { age: '65–74', value: 7942 },
    { age: '75+',   value: 8145 },
  ];

  const replacementRates = [
    { income: 'Less than $50,000', rate: '80%' },
    { income: '$50,000–$80,000',   rate: '75%' },
    { income: '$80,000–$120,000',  rate: '70%' },
    { income: 'More than $120,000',rate: '55–65%' },
  ];

  const fmt = (v) => '$' + v.toLocaleString();

  const ChartCard = ({ title, subtitle, data, color, note }) => (
    <div className="rounded shadow-md mb-6 p-6" style={{backgroundColor: 'white', border: '1px solid #c4c9cf', borderRadius: 4, boxShadow: '0 2px 4px -1px rgba(0,0,0,0.2)'}}>
      <h3 className="text-lg font-semibold mb-1" style={{color: 'rgb(14,50,60)'}}>{title}</h3>
      {subtitle && <p className="text-sm text-[#4B4B4B] mb-4">{subtitle}</p>}
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} margin={{top: 16, right: 16, left: 8, bottom: 0}}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0efeb" vertical={false} />
          <XAxis dataKey="age" tick={{fontSize: 13, fill: '#4B4B4B'}} axisLine={false} tickLine={false} />
          <YAxis hide />
          <Bar dataKey="value" radius={[3,3,0,0]} fill={color}>
            {data.map((entry, i) => (
              <Cell key={i} fill={color} fillOpacity={0.75 + i * 0.08} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      {/* Value labels */}
      <div className="flex justify-around mt-1">
        {data.map((d, i) => (
          <div key={i} className="text-center">
            <div className="text-sm font-semibold" style={{color}}>{fmt(d.value)}</div>
            <div className="text-xs text-[#4B4B4B]">Age {d.age}</div>
          </div>
        ))}
      </div>
      {note && <p className="text-xs text-[#4B4B4B] mt-4 italic">{note}</p>}
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2" style={{color: 'rgb(14,50,60)'}}>What Will You Actually Spend in Retirement?</h1>
      <p className="text-base text-[#4B4B4B] mb-8 leading-relaxed">One of the biggest unknowns in retirement planning is how much you'll actually need to spend. The good news: the data tells a calming story. Overall spending tends to decline with age — with one notable exception.</p>

      {/* Replacement rate table */}
      <div className="rounded shadow-md mb-6 p-6" style={{backgroundColor: 'white', border: '1px solid #c4c9cf', borderRadius: 4, boxShadow: '0 2px 4px -1px rgba(0,0,0,0.2)'}}>
        <h3 className="text-lg font-semibold mb-1" style={{color: 'rgb(14,50,60)'}}>The Income Replacement Rule of Thumb</h3>
        <p className="text-sm text-[#4B4B4B] mb-4">Most people don't need 100% of their pre-retirement income in retirement. Commuting, work expenses, and saving itself all go away. Fidelity estimates these replacement ratios based on income level:</p>
        <div className="overflow-hidden rounded border" style={{borderColor: '#e5e7eb'}}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{backgroundColor: '#f4f3ef'}}>
                <th className="text-left px-4 py-3 font-semibold" style={{color: 'rgb(14,50,60)'}}>Annual income at retirement</th>
                <th className="text-center px-4 py-3 font-semibold" style={{color: 'rgb(14,50,60)'}}>Estimated replacement ratio</th>
              </tr>
            </thead>
            <tbody>
              {replacementRates.map((row, i) => (
                <tr key={i} style={{borderTop: '1px solid #e5e7eb', backgroundColor: i % 2 === 0 ? 'white' : '#fafafa'}}>
                  <td className="px-4 py-3 text-[#4B4B4B]">{row.income}</td>
                  <td className="px-4 py-3 text-center font-semibold" style={{color: 'rgb(14,50,60)'}}>{row.rate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 p-3 rounded border" style={{backgroundColor: '#f0f7f4', borderColor: '#a7c9b8'}}>
          <p className="text-sm text-[#4B4B4B]"><strong>SonderSave defaults to 70%</strong> — a reasonable middle-ground estimate. You can adjust this in the Income Goal section of the calculator to match your expected lifestyle.</p>
        </div>
      </div>

      {/* Charts */}
      <ChartCard
        title="Overall Spending Declines With Age"
        subtitle="Average annual household spending drops significantly as people move through retirement — from nearly $100k in their late working years to around $53k by age 75+."
        data={totalSpending}
        color="#6E8F7C"
        note="Many retirees find they naturally spend less as travel slows, children become independent, and lifestyle simplifies."
      />

      <ChartCard
        title="Housing Costs Trend Lower Over Time"
        subtitle="For most retirees, housing is the largest expense — but it decreases steadily with age, often as mortgages are paid off and people downsize."
        data={housingSpending}
        color="rgb(14,50,60)"
        note="If you plan to pay off your mortgage before retirement or downsize, your housing costs could drop even more significantly."
      />

      <ChartCard
        title="Healthcare Is the Exception: It Rises"
        subtitle="Unlike most other expenses, healthcare costs increase with age. This is the one category worth planning for explicitly — especially before Medicare eligibility at 65."
        data={healthcareSpending}
        color="#C58B6A"
        note="These figures are per person. Couples should plan for roughly double. Consider healthcare costs carefully if you plan to retire before age 65."
      />

      {/* Key takeaway */}
      <div className="rounded shadow-md mb-6 p-6" style={{backgroundColor: 'white', border: '1px solid #c4c9cf', borderRadius: 4, boxShadow: '0 2px 4px -1px rgba(0,0,0,0.2)'}}>
        <h3 className="text-lg font-semibold mb-3" style={{color: 'rgb(14,50,60)'}}>The Big Picture</h3>
        <p className="text-sm text-[#4B4B4B] mb-3 leading-relaxed">The story these charts tell together is reassuring: your overall spending will likely be meaningfully lower in retirement than during your peak earning years. Housing costs fall, discretionary spending simplifies, and many of the expenses tied to working life disappear.</p>
        <p className="text-sm text-[#4B4B4B] leading-relaxed">The one wildcard is healthcare. Planning for rising healthcare costs — especially in your 70s and beyond — is one of the most important things you can do to protect your retirement security.</p>
      </div>

      {/* Sources */}
      <div className="text-xs text-[#4B4B4B] mt-6 pt-4 border-t border-gray-200 space-y-1">
        <p><strong>Sources:</strong></p>
        <p>Income replacement ratios: Fidelity Financial Solutions, 2019.</p>
        <p>Household spending, housing, and healthcare data: U.S. Bureau of Labor Statistics, Consumer Expenditure Survey, 2023.</p>
        <p className="mt-2 italic">SonderSave is not affiliated with Fidelity. Data is presented for educational purposes only.</p>
      </div>
    </div>
  );
};

// ─── Nav Bar ────────────────────────────────────────────────────────────────
const NavBar = ({ currentPage, setCurrentPage }) => {
  const [learnOpen, setLearnOpen] = useState(false);
  const learnPages = ['faq', 'glossary', 'resources', 'spending'];
  const isLearnPage = learnPages.includes(currentPage);

  return (
    <nav className="w-full border-b relative" style={{backgroundColor: 'white', borderColor: '#e5e7eb'}}>
      <div className="max-w-4xl mx-auto px-2 flex items-center gap-0.5 h-12">

        <button
          onClick={() => { setCurrentPage('calculator'); setLearnOpen(false); }}
          className="px-2 sm:px-4 py-1.5 rounded text-xs sm:text-sm font-medium transition-colors whitespace-nowrap"
          style={currentPage === 'calculator'
            ? {backgroundColor: '#C58B6A', color: 'white'}
            : {backgroundColor: 'transparent', color: 'rgb(14, 50, 60)'}
          }
        >
          Calculator
        </button>
        <button
          onClick={() => { setCurrentPage('budget'); window.scrollTo(0, 0); setLearnOpen(false); }}
          className="px-2 sm:px-4 py-1.5 rounded text-xs sm:text-sm font-medium transition-colors whitespace-nowrap"
          style={currentPage === 'budget'
            ? {backgroundColor: '#C58B6A', color: 'white'}
            : {backgroundColor: 'transparent', color: 'rgb(14, 50, 60)'}
          }
        >
          Budget
        </button>

        {/* Learn dropdown */}
        <div className="relative">
          <button
            onClick={() => setLearnOpen(!learnOpen)}
            className="px-2 sm:px-4 py-1.5 rounded text-xs sm:text-sm font-medium transition-colors flex items-center gap-1 whitespace-nowrap"
            style={isLearnPage
              ? {backgroundColor: '#C58B6A', color: 'white'}
              : {backgroundColor: 'transparent', color: 'rgb(14, 50, 60)'}
            }
          >
            Learn <span style={{fontSize: 9}}>{learnOpen ? '▲' : '▼'}</span>
          </button>
          {learnOpen && (
            <div className="absolute left-0 top-full mt-1 rounded shadow-lg overflow-hidden z-50" style={{
              backgroundColor: 'white',
              border: '1px solid #c4c9cf',
              minWidth: 130,
            }}>
              {[
                { id: 'faq', label: 'FAQ' },
                { id: 'glossary', label: 'Glossary' },
                { id: 'resources', label: 'Resources' },
                { id: 'spending', label: 'Retirement Spending' },
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => { setCurrentPage(item.id); setLearnOpen(false); window.scrollTo(0, 0); }}
                  className="w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-gray-50"
                  style={{
                    color: currentPage === item.id ? '#C58B6A' : 'rgb(14, 50, 60)',
                    fontWeight: currentPage === item.id ? 600 : 400,
                    borderBottom: '1px solid #f0f0f0',
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={() => { setCurrentPage('about'); setLearnOpen(false); }}
          className="px-2 sm:px-4 py-1.5 rounded text-xs sm:text-sm font-medium transition-colors whitespace-nowrap"
          style={currentPage === 'about'
            ? {backgroundColor: '#C58B6A', color: 'white'}
            : {backgroundColor: 'transparent', color: 'rgb(14, 50, 60)'}
          }
        >
          About
        </button>

        {/* Logo — far right, only when not on home page */}
        {currentPage !== 'home' && (
          <button
            onClick={() => { setCurrentPage('home'); setLearnOpen(false); window.scrollTo(0, 0); }}
            className="flex items-center justify-center rounded transition-opacity hover:opacity-70 flex-shrink-0"
            style={{marginLeft: 'auto', padding: '4px'}}
            title="Home"
          >
            <img src="/SonderSave SVG logo.svg" alt="SonderSave" style={{height: 44, width: 'auto'}} />
          </button>
        )}
      </div>

      {/* Backdrop to close dropdown */}
      {learnOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setLearnOpen(false)} />
      )}
    </nav>
  );
};

// ─── Budget Page ─────────────────────────────────────────────────────────────
const BudgetPage = ({ annualIncome, monthlyPostTaxSavings, currentAge, retirementAge }) => {
  const [netIncome, setNetIncome] = useState(Math.round(annualIncome / 12 * 0.75));
  const [targetNeeds, setTargetNeeds] = useState(50);
  const [targetWants, setTargetWants] = useState(30);
  const [targetSavings, setTargetSavings] = useState(20);
  const [expandedCategories, setExpandedCategories] = useState({});
  const formatCurrency = (v) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(v || 0);
  const formatNum = (v) => v === 0 ? '' : String(v);
  const parseNum = (v) => parseFloat(v.replace(/[^0-9.]/g, '')) || 0;

  // Flat budget categories
  const buckets = [
    {
      id: 'needs', label: 'Needs', color: '#6E8F7C',
      description: 'Mandatory, non-negotiable expenses required for living.',
      categories: [
        { id: 'housing', label: 'Housing' },
        { id: 'utilities', label: 'Utilities' },
        { id: 'groceries', label: 'Groceries' },
        { id: 'transport', label: 'Transportation' },
        { id: 'healthcare', label: 'Healthcare' },
        { id: 'childcare', label: 'Childcare & Education' },
        { id: 'creditcard', label: 'Credit Card Minimums' },
        { id: 'studentloans', label: 'Student Loans' },
        { id: 'mindebt', label: 'Other Debt Minimums' },
      ]
    },
    {
      id: 'wants', label: 'Wants', color: '#C58B6A',
      description: 'Non-essential expenses that improve your quality of life.',
      categories: [
        { id: 'dining', label: 'Dining Out' },
        { id: 'entertainment', label: 'Entertainment' },
        { id: 'subscriptions', label: 'Subscriptions' },
        { id: 'shopping', label: 'Shopping & Clothing' },
        { id: 'hobbies', label: 'Hobbies' },
        { id: 'personal', label: 'Personal Care' },
        { id: 'travel', label: 'Travel & Vacation' },
        { id: 'gifts', label: 'Gifts & Donations' },
        { id: 'pets', label: 'Pets' },
      ]
    },
    {
      id: 'savings', label: 'Savings & Debt', color: '#3A4446',
      description: 'Building future wealth and paying down non-essential debt.',
      categories: [
        { id: 'emergency', label: 'Emergency Fund' },
        { id: 'retirement', label: 'Retirement (Post-Tax)', autoAmount: monthlyPostTaxSavings > 0 ? monthlyPostTaxSavings : 0 },
        { id: 'investments', label: 'Other Investments' },
        { id: 'extradebt', label: 'Extra Debt Repayment' },
      ]
    },
  ];

  // Simple amounts state: { [categoryId]: number }
  const initAmounts = () => {
    const a = {};
    buckets.forEach(b => b.categories.forEach(c => {
      a[c.id] = c.autoAmount || 0;
    }));
    return a;
  };
  const [amounts, setAmounts] = useState(initAmounts);

  // Custom lines per bucket: { [bucketId]: [{ id, label, amount }] }
  const [customLines, setCustomLines] = useState({ needs: [], wants: [], savings: [] });

  const setAmount = (catId, value) => setAmounts(prev => ({ ...prev, [catId]: parseNum(value) }));

  const addCustomLine = (bucketId) => {
    setCustomLines(prev => ({
      ...prev,
      [bucketId]: [...prev[bucketId], { id: Date.now() + Math.random(), label: '', amount: 0 }]
    }));
  };

  const updateCustomLine = (bucketId, lineId, field, value) => {
    setCustomLines(prev => ({
      ...prev,
      [bucketId]: prev[bucketId].map(l => l.id === lineId ? { ...l, [field]: field === 'amount' ? parseNum(value) : value } : l)
    }));
  };

  const removeCustomLine = (bucketId, lineId) => {
    setCustomLines(prev => ({
      ...prev,
      [bucketId]: prev[bucketId].filter(l => l.id !== lineId)
    }));
  };

  const catTotal = (catId) => amounts[catId] || 0;

  const bucketTotal = (bucket) => {
    const catSum = bucket.categories.reduce((s, c) => s + catTotal(c.id), 0);
    const customSum = (customLines[bucket.id] || []).reduce((s, l) => s + (l.amount || 0), 0);
    return catSum + customSum;
  };

  const grandTotal = () => buckets.reduce((s, b) => s + bucketTotal(b), 0);
  const bucketPercent = (bucket) => netIncome > 0 ? (bucketTotal(bucket) / netIncome) * 100 : 0;

  // Target slider: adjust others proportionally when one changes
  const handleTargetChange = (which, val) => {
    const v = Math.min(100, Math.max(0, Number(val)));
    if (which === 'needs') {
      const rem = 100 - v;
      const wRatio = targetWants / (targetWants + targetSavings) || 0.6;
      setTargetNeeds(v); setTargetWants(Math.round(rem * wRatio)); setTargetSavings(Math.round(rem * (1 - wRatio)));
    } else if (which === 'wants') {
      const rem = 100 - v;
      const nRatio = targetNeeds / (targetNeeds + targetSavings) || 0.7;
      setTargetWants(v); setTargetNeeds(Math.round(rem * nRatio)); setTargetSavings(Math.round(rem * (1 - nRatio)));
    } else {
      const rem = 100 - v;
      const nRatio = targetNeeds / (targetNeeds + targetWants) || 0.625;
      setTargetSavings(v); setTargetNeeds(Math.round(rem * nRatio)); setTargetWants(Math.round(rem * (1 - nRatio)));
    }
  };

  const remaining = netIncome - grandTotal();

  return (
    <div className="max-w-4xl mx-auto px-4 py-6" style={{fontFamily: 'Inter, sans-serif'}}>

      {/* Section header */}
      <div className="rounded shadow-md mb-3 page-break-avoid" style={{backgroundColor: '#C58B6A', padding: '16px', borderRadius: '4px', boxShadow: '0 2px 4px -1px rgba(0, 0, 0, 0.35)', border: '1px solid #c4c9cf'}}>
        <h2 className="text-2xl font-bold text-white" style={{fontWeight: 700, margin: 0}}>Your Budget</h2>
      </div>

      {/* Net Income Input */}
      <div className="rounded mb-4 p-5" style={{backgroundColor: 'white', border: '1px solid #c4c9cf', borderRadius: '4px', boxShadow: '0 2px 4px -1px rgba(0,0,0,0.35)'}}>
        <label className="block text-lg font-semibold mb-1" style={{color: 'rgb(14,50,60)'}}>Monthly Take-Home Pay</label>
        <p className="text-sm text-[#4B4B4B] mb-3">
          Enter your monthly income after taxes — the money that actually hits your bank account.
        </p>
        <div className="relative max-w-xs">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4B4B4B]">$</span>
          <input
            type="text"
            value={netIncome === 0 ? '' : netIncome.toLocaleString()}
            onChange={e => setNetIncome(parseNum(e.target.value))}
            inputMode="decimal"
            className="w-full pl-8 pr-4 py-2 text-lg border rounded-lg"
            style={{borderColor: '#e5e7eb', color: 'rgb(14,50,60)'}}
            placeholder="e.g. 4,500"
          />
        </div>
      </div>

      {/* Target Split — single segmented bar */}
      <div className="rounded mb-4 p-5" style={{backgroundColor: 'white', border: '1px solid #c4c9cf', borderRadius: '4px', boxShadow: '0 2px 4px -1px rgba(0,0,0,0.35)'}}>
        <label className="block text-lg font-semibold mb-1" style={{color: 'rgb(14,50,60)'}}>Your Target Split</label>
        <p className="text-sm text-[#4B4B4B] mb-3">The 50/30/20 rule is a common starting point. Drag the handles to adjust to your situation.</p>

        {/* Labels above bar */}
        <div className="flex mb-1" style={{fontSize: '0.75rem'}}>
          <div className="font-medium text-center transition-all" style={{width: `${targetNeeds}%`, color: '#6E8F7C'}}>Needs</div>
          <div className="font-medium text-center transition-all" style={{width: `${targetWants}%`, color: '#C58B6A'}}>Wants</div>
          <div className="font-medium text-center transition-all" style={{width: `${targetSavings}%`, color: '#3A4446'}}>Savings</div>
        </div>

        {/* Three-segment bar */}
        <div className="relative rounded-lg overflow-visible select-none" style={{height: 28, backgroundColor: '#e5e7eb'}}>
          {/* Needs segment */}
          <div className="absolute top-0 left-0 h-full rounded-l-lg flex items-center justify-center"
            style={{width: `${targetNeeds}%`, backgroundColor: '#6E8F7C'}}>
            <span className="text-white font-bold pointer-events-none" style={{fontSize: '0.7rem'}}>{targetNeeds}%</span>
          </div>
          {/* Wants segment */}
          <div className="absolute top-0 h-full flex items-center justify-center"
            style={{left: `${targetNeeds}%`, width: `${targetWants}%`, backgroundColor: '#C58B6A'}}>
            <span className="text-white font-bold pointer-events-none" style={{fontSize: '0.7rem'}}>{targetWants}%</span>
          </div>
          {/* Savings segment */}
          <div className="absolute top-0 h-full rounded-r-lg flex items-center justify-center"
            style={{left: `${targetNeeds + targetWants}%`, width: `${targetSavings}%`, backgroundColor: '#3A4446'}}>
            <span className="text-white font-bold pointer-events-none" style={{fontSize: '0.7rem'}}>{targetSavings}%</span>
          </div>

          {/* Handle 1 — between Needs and Wants */}
          <div
            className="absolute z-10 flex items-center justify-center cursor-ew-resize"
            style={{
              left: `${targetNeeds}%`,
              top: '50%',
              transform: 'translateX(-50%) translateY(-50%)',
              width: 12,
              height: 38,
              backgroundColor: 'white',
              borderRadius: 3,
              boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
              border: '1.5px solid #c4c9cf',
              userSelect: 'none',
            }}
            onMouseDown={(e) => {
              e.preventDefault();
              const bar = e.currentTarget.parentElement;
              const rect = bar.getBoundingClientRect();
              const onMove = (me) => {
                const pct = Math.round(Math.min(95, Math.max(5, ((me.clientX - rect.left) / rect.width) * 100)));
                const newWants = Math.max(5, targetNeeds + targetWants - pct);
                setTargetNeeds(pct);
                setTargetWants(newWants);
                setTargetSavings(100 - pct - newWants);
              };
              const onUp = () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp); };
              window.addEventListener('mousemove', onMove);
              window.addEventListener('mouseup', onUp);
            }}
            onTouchStart={(e) => {
              const bar = e.currentTarget.parentElement;
              const rect = bar.getBoundingClientRect();
              const onMove = (te) => {
                const touch = te.touches[0];
                const pct = Math.round(Math.min(95, Math.max(5, ((touch.clientX - rect.left) / rect.width) * 100)));
                const newWants = Math.max(5, targetNeeds + targetWants - pct);
                setTargetNeeds(pct);
                setTargetWants(newWants);
                setTargetSavings(100 - pct - newWants);
              };
              const onUp = () => { window.removeEventListener('touchmove', onMove); window.removeEventListener('touchend', onUp); };
              window.addEventListener('touchmove', onMove);
              window.addEventListener('touchend', onUp);
            }}
          >
          </div>

          {/* Handle 2 — between Wants and Savings */}
          <div
            className="absolute z-10 flex items-center justify-center cursor-ew-resize"
            style={{
              left: `${targetNeeds + targetWants}%`,
              top: '50%',
              transform: 'translateX(-50%) translateY(-50%)',
              width: 12,
              height: 38,
              backgroundColor: 'white',
              borderRadius: 3,
              boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
              border: '1.5px solid #c4c9cf',
              userSelect: 'none',
            }}
            onMouseDown={(e) => {
              e.preventDefault();
              const bar = e.currentTarget.parentElement;
              const rect = bar.getBoundingClientRect();
              const onMove = (me) => {
                const pct = Math.round(Math.min(95, Math.max(targetNeeds + 5, ((me.clientX - rect.left) / rect.width) * 100)));
                setTargetWants(pct - targetNeeds);
                setTargetSavings(100 - pct);
              };
              const onUp = () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp); };
              window.addEventListener('mousemove', onMove);
              window.addEventListener('mouseup', onUp);
            }}
            onTouchStart={(e) => {
              const bar = e.currentTarget.parentElement;
              const rect = bar.getBoundingClientRect();
              const onMove = (te) => {
                const touch = te.touches[0];
                const pct = Math.round(Math.min(95, Math.max(targetNeeds + 5, ((touch.clientX - rect.left) / rect.width) * 100)));
                setTargetWants(pct - targetNeeds);
                setTargetSavings(100 - pct);
              };
              const onUp = () => { window.removeEventListener('touchmove', onMove); window.removeEventListener('touchend', onUp); };
              window.addEventListener('touchmove', onMove);
              window.addEventListener('touchend', onUp);
            }}
          >
          </div>
        </div>

        {/* Dollar amounts below bar */}
        <div className="flex mt-1" style={{fontSize: '0.7rem'}}>
          <div className="text-center transition-all" style={{width: `${targetNeeds}%`, color: '#4B4B4B'}}>{formatCurrency(netIncome * targetNeeds / 100)}</div>
          <div className="text-center transition-all" style={{width: `${targetWants}%`, color: '#4B4B4B'}}>{formatCurrency(netIncome * targetWants / 100)}</div>
          <div className="text-center transition-all" style={{width: `${targetSavings}%`, color: '#4B4B4B'}}>{formatCurrency(netIncome * targetSavings / 100)}</div>
        </div>
      </div>

      {/* Buckets */}
      {buckets.map(bucket => {
        const target = bucket.id === 'needs' ? targetNeeds : bucket.id === 'wants' ? targetWants : targetSavings;
        const actual = bucketTotal(bucket);
        const targetAmount = netIncome * target / 100;
        const over = actual > targetAmount && actual > 0;
        return (
        <div key={bucket.id} className="rounded mb-4 overflow-hidden" style={{border: '1px solid #c4c9cf', borderRadius: '4px', boxShadow: '0 2px 4px -1px rgba(0,0,0,0.35)'}}>
          {/* Bucket Header — name + actual vs target */}
          <div className="px-5 py-3 flex items-center justify-between" style={{backgroundColor: bucket.color}}>
            <h3 className="text-base font-bold text-white" style={{margin: 0}}>{bucket.label}</h3>
            {netIncome > 0 && (
              <span className="text-sm font-medium text-white" style={{opacity: 0.92}}>
                {formatCurrency(actual)} <span style={{opacity: 0.75}}>of {formatCurrency(targetAmount)}</span>
                {over && <span className="ml-2" style={{fontSize: '0.7rem', backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 4, padding: '1px 5px'}}>▲ over</span>}
                {!over && actual > 0 && <span className="ml-2" style={{fontSize: '0.75rem'}}>✓</span>}
              </span>
            )}
          </div>

          {/* Flat category rows */}
          <div className="bg-white">
            {bucket.categories.map((cat, idx) => (
              <div key={cat.id} className={`flex items-center gap-3 px-5 py-3 ${idx > 0 ? 'border-t border-gray-100' : ''}`}>
                <label className="flex-1 text-sm text-[#3A4446]">
                  {cat.label}
                  {cat.autoAmount > 0 && <span className="ml-2 text-xs px-1.5 py-0.5 rounded" style={{backgroundColor: '#f4f3ef', color: '#6E8F7C', border: '1px solid #c4c9cf'}}>auto-filled</span>}
                </label>
                <div className="relative flex-shrink-0">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#4B4B4B]">$</span>
                  <input
                    type="text"
                    inputMode="decimal"
                    value={amounts[cat.id] === 0 ? '' : amounts[cat.id].toLocaleString()}
                    onChange={e => setAmount(cat.id, e.target.value)}
                    placeholder="0"
                    className="w-28 pl-7 pr-3 py-1.5 text-sm border rounded text-right"
                    style={{borderColor: '#e5e7eb', color: 'rgb(14,50,60)'}}
                  />
                </div>
              </div>
            ))}

            {/* Custom lines */}
            {(customLines[bucket.id] || []).map(line => (
              <div key={line.id} className="flex items-center gap-3 px-5 py-3 border-t border-gray-100">
                <input
                  type="text"
                  value={line.label}
                  onChange={e => updateCustomLine(bucket.id, line.id, 'label', e.target.value)}
                  placeholder="Custom category"
                  className="flex-1 min-w-0 text-sm px-3 py-1.5 border rounded"
                  style={{borderColor: '#e5e7eb', color: 'rgb(14,50,60)'}}
                />
                <div className="relative flex-shrink-0">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#4B4B4B]">$</span>
                  <input
                    type="text"
                    inputMode="decimal"
                    value={line.amount === 0 ? '' : line.amount.toLocaleString()}
                    onChange={e => updateCustomLine(bucket.id, line.id, 'amount', e.target.value)}
                    placeholder="0"
                    className="w-28 pl-7 pr-3 py-1.5 text-sm border rounded text-right"
                    style={{borderColor: '#e5e7eb', color: 'rgb(14,50,60)'}}
                  />
                </div>
                <button onClick={() => removeCustomLine(bucket.id, line.id)} className="text-gray-300 hover:text-red-400 text-lg leading-none flex-shrink-0">×</button>
              </div>
            ))}

            {/* Add line */}
            <div className="px-5 py-3 border-t border-gray-100">
              <button onClick={() => addCustomLine(bucket.id)} className="text-sm" style={{color: bucket.color}}>+ Add line</button>
            </div>
          </div>
        </div>
        );
      })}

      {/* Pre-tax note */}
      <div className="rounded mb-4 p-4" style={{backgroundColor: '#f4f3ef', border: '1px solid #c4c9cf', borderRadius: '4px'}}>
        <p className="text-sm text-[#4B4B4B]" style={{margin: 0}}>
          <strong>Note on pre-tax contributions:</strong> Your 401(k) contributions are deducted before your paycheck arrives and are not included here. The Savings bucket above only reflects post-tax contributions like Roth IRA or brokerage investments.
        </p>
      </div>

      {/* Budget Summary */}
      <div className="rounded mb-6 p-5" style={{backgroundColor: 'white', border: '1px solid #c4c9cf', borderRadius: '4px', boxShadow: '0 2px 4px -1px rgba(0,0,0,0.35)'}}>
        <h3 className="text-lg font-semibold mb-4" style={{color: 'rgb(14,50,60)'}}>Your Spending vs Target</h3>
        {buckets.map(bucket => {
          const actual = bucketPercent(bucket);
          const target = bucket.id === 'needs' ? targetNeeds : bucket.id === 'wants' ? targetWants : targetSavings;
          const over = actual > target;
          return (
            <div key={bucket.id} className="mb-4">
              <div className="flex justify-between items-baseline mb-1">
                <span className="text-sm font-medium" style={{color: bucket.color}}>{bucket.label}</span>
                <span className="text-xs text-[#4B4B4B]">
                  {formatCurrency(bucketTotal(bucket))} of {formatCurrency(netIncome * target / 100)} target
                  {over && <span className="ml-2 font-medium" style={{color: '#c0392b'}}>▲ {(actual - target).toFixed(1)}% over</span>}
                  {!over && actual > 0 && <span className="ml-2 font-medium" style={{color: '#6E8F7C'}}>✓</span>}
                </span>
              </div>
              <div className="relative rounded-full bg-gray-100 overflow-hidden" style={{height: 24}}>
                <div className="h-full rounded-full transition-all duration-300 flex items-center justify-end pr-2"
                  style={{width: `${Math.min(100, actual)}%`, backgroundColor: over ? '#c0392b' : bucket.color, minWidth: actual > 0 ? 36 : 0}}>
                  {actual > 0 && <span className="text-white font-bold pointer-events-none" style={{fontSize: '0.7rem'}}>{actual.toFixed(1)}%</span>}
                </div>
                <div className="absolute top-0 bottom-0 w-0.5 bg-gray-400" style={{left: `${target}%`}} />
              </div>
            </div>
          );
        })}
        <div className="border-t border-gray-200 pt-3 mt-2 flex justify-between">
          <span className="text-sm font-semibold text-[#3A4446]">Remaining unallocated</span>
          <span className="text-sm font-semibold" style={{color: remaining >= 0 ? '#6E8F7C' : '#c0392b'}}>{formatCurrency(remaining)}</span>
        </div>
      </div>

    </div>
  );
};

// ─── FAQ Page ────────────────────────────────────────────────────────────────
const FAQPage = () => {
  const [openItem, setOpenItem] = useState(null);
  const faqs = [
    {
      q: "How much do I need to retire?",
      a: "A common guideline is to save 25x your expected annual retirement expenses — this is based on the 4% withdrawal rule, which suggests you can withdraw 4% of your savings each year without running out of money over a 30-year retirement. For example, if you expect to spend $50,000/year in retirement, you'd want roughly $1.25 million saved."
    },
    {
      q: "What is the 4% rule?",
      a: "The 4% rule is a guideline suggesting that retirees can withdraw 4% of their savings in the first year of retirement, then adjust that amount for inflation each year, and have a high probability of not outliving their money over a 30-year period. It originated from the Trinity Study in 1998. Some financial planners now suggest 3–3.5% given longer life expectancies and current market conditions."
    },
    {
      q: "When should I start saving for retirement?",
      a: "As early as possible. Thanks to compound interest, money saved in your 20s is worth significantly more at retirement than money saved in your 40s. A dollar saved at 25 could be worth $10–15 by age 65. That said, it's never too late to start — even saving aggressively in your 50s can meaningfully improve your retirement outcome."
    },
    {
      q: "What's the difference between a Roth and Traditional IRA?",
      a: "With a Traditional IRA, contributions may be tax-deductible now, and you pay taxes when you withdraw the money in retirement. With a Roth IRA, you contribute after-tax dollars, but withdrawals in retirement are completely tax-free. A Roth is generally better if you expect to be in a higher tax bracket in retirement; a Traditional IRA is better if you want the tax break now. Both have annual contribution limits ($7,000 in 2024, or $8,000 if you're 50+)."
    },
    {
      q: "What's the difference between a 401(k) and an IRA?",
      a: "A 401(k) is an employer-sponsored retirement account with higher contribution limits ($23,000 in 2024, $30,500 if 50+). Many employers offer matching contributions — free money you shouldn't leave on the table. An IRA is an individual account you open yourself, with lower limits but more investment choices. Most financial advisors suggest contributing to your 401(k) at least up to the employer match, then maxing out a Roth IRA, then going back to the 401(k)."
    },
    {
      q: "How does Social Security factor into retirement?",
      a: "Social Security provides a monthly benefit based on your lifetime earnings history. You can claim as early as 62 (reduced benefit) or as late as 70 (maximum benefit). Full retirement age is 66–67 depending on your birth year. Delaying to 70 can increase your benefit by up to 32% compared to claiming at full retirement age. Social Security typically replaces 30–40% of pre-retirement income for average earners."
    },
    {
      q: "What is an employer match and why does it matter?",
      a: "An employer match is when your employer contributes to your 401(k) based on your own contributions — for example, 100% match up to 6% of your salary means if you contribute 6%, your employer also puts in 6%. This is effectively a 100% instant return on that portion of your savings. Always contribute at least enough to capture the full match — it's the best guaranteed return available."
    },
    {
      q: "What is inflation and how does it affect retirement?",
      a: "Inflation is the gradual increase in the cost of goods and services over time. Historically, inflation has averaged around 2–3% per year in the US. This means $1,000 today will only buy roughly $550 worth of goods in 30 years at 2% inflation. For retirement planning, this matters because your savings need to grow faster than inflation to maintain purchasing power. SonderSave accounts for inflation in all its projections."
    },
    {
      q: "What withdrawal rate should I use?",
      a: "The 4% rule is the most commonly cited starting point, but your ideal withdrawal rate depends on your retirement age, expected lifespan, investment allocation, and spending flexibility. Retiring early (before 60) may warrant a more conservative 3–3.5% rate since your money needs to last longer. Retiring later with guaranteed income sources like a pension may allow a slightly higher rate."
    },
    {
      q: "Should I pay off debt or save for retirement?",
      a: "It depends on the interest rate. High-interest debt (credit cards, typically 15–25%) should generally be paid off aggressively before investing beyond your employer match. Lower-interest debt (mortgages, student loans under ~6%) can often be carried while still contributing to retirement, especially if you have employer matching. The employer match threshold is key — always capture that before aggressive debt repayment."
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-6" style={{fontFamily: 'Inter, sans-serif'}}>
      <div className="rounded mb-3 p-5" style={{backgroundColor: '#C58B6A', borderRadius: '4px', boxShadow: '0 2px 4px -1px rgba(0,0,0,0.35)'}}>
        <h2 className="text-2xl font-bold text-white" style={{margin: 0}}>Frequently Asked Questions</h2>
      </div>
      <div className="rounded" style={{backgroundColor: 'white', border: '1px solid #c4c9cf', borderRadius: '4px', boxShadow: '0 2px 4px -1px rgba(0,0,0,0.35)', overflow: 'hidden'}}>
        {faqs.map((item, i) => (
          <div key={i} className={i > 0 ? 'border-t border-gray-100' : ''}>
            <button
              className="w-full text-left px-5 py-4 flex justify-between items-start gap-3"
              onClick={() => setOpenItem(openItem === i ? null : i)}
            >
              <span className="text-sm font-semibold" style={{color: 'rgb(14,50,60)'}}>{item.q}</span>
              <span className="text-lg leading-none flex-shrink-0" style={{color: '#C58B6A'}}>{openItem === i ? '−' : '+'}</span>
            </button>
            {openItem === i && (
              <div className="px-5 pb-4">
                <p className="text-sm text-[#4B4B4B] leading-relaxed" style={{margin: 0}}>{item.a}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Glossary Page ────────────────────────────────────────────────────────────
const GlossaryPage = () => {
  const terms = [
    { term: "Sonder", def: "n. The realization that each passerby has a life as vivid and complex as your own. SonderSave takes its name from this idea — that retirement planning is deeply personal, and no two paths look the same." },
    { term: "401(k)", def: "An employer-sponsored retirement savings account that allows employees to contribute pre-tax dollars. Contributions reduce your taxable income now; taxes are paid upon withdrawal in retirement. Many employers offer matching contributions." },
    { term: "403(b)", def: "Similar to a 401(k) but offered by public schools, nonprofits, and some government employers." },
    { term: "Catch-Up Contributions", def: "Additional retirement account contributions allowed for people aged 50 and older. In 2024, you can contribute an extra $7,500 to a 401(k) and an extra $1,000 to an IRA beyond the standard limits." },
    { term: "Compound Interest", def: "Interest calculated on both the initial principal and the accumulated interest from previous periods. Often called 'interest on interest' — it's the core mechanism that makes early saving so powerful." },
    { term: "Defined Benefit Plan", def: "A pension plan in which an employer guarantees a specific monthly benefit at retirement, usually based on salary history and years of service. The employer bears the investment risk." },
    { term: "Defined Contribution Plan", def: "A retirement plan (like a 401(k)) where the employee and/or employer contribute to an individual account. The final benefit depends on contributions made and investment performance. The employee bears the investment risk." },
    { term: "Employer Match", def: "A contribution your employer makes to your 401(k) based on your own contributions. A common match is 100% up to 6% of salary. Always contribute at least enough to capture the full match — it's free money." },
    { term: "Expected Return", def: "The anticipated annual percentage gain on your investments. Historically, a diversified stock portfolio has returned roughly 7–10% annually before inflation. SonderSave uses 5–7% as a conservative default." },
    { term: "Full Retirement Age (FRA)", def: "The age at which you qualify for full Social Security benefits. It's 66–67 depending on your birth year. Claiming before FRA reduces your benefit; delaying past FRA (up to age 70) increases it." },
    { term: "Inflation", def: "The rate at which prices rise over time, eroding purchasing power. The US Federal Reserve targets 2% annual inflation. Retirement projections must account for inflation to accurately reflect future costs." },
    { term: "IRA (Individual Retirement Account)", def: "A personal retirement savings account with tax advantages. Traditional IRAs offer tax-deductible contributions; Roth IRAs offer tax-free withdrawals. 2024 contribution limit: $7,000 ($8,000 if 50+)." },
    { term: "Nest Egg", def: "The total savings you've accumulated for retirement. SonderSave projects your nest egg at retirement based on your current savings, contributions, and expected investment returns." },
    { term: "Pension", def: "A defined benefit retirement plan, typically offered by government employers and some corporations, that provides guaranteed monthly income in retirement based on years of service and final salary." },
    { term: "Roth IRA", def: "An individual retirement account funded with after-tax dollars. Qualified withdrawals in retirement are completely tax-free — including all investment growth. Best suited for those who expect to be in a higher tax bracket in retirement, or who want tax-free income flexibility later. No required minimum distributions during the owner's lifetime." },
    { term: "Roth vs. Traditional", def: "The core difference is when you pay taxes. Traditional accounts (401k, Traditional IRA) let you contribute pre-tax dollars, reducing taxable income now — but you pay taxes on every withdrawal in retirement. Roth accounts use after-tax dollars with no immediate tax break, but all qualified withdrawals — including decades of growth — are completely tax-free. Many 401(k) plans now offer both options, and splitting contributions between them is a common strategy to hedge against future tax rate uncertainty. Check with your HR or plan administrator to see what's available to you." },
    { term: "SEP-IRA (Simplified Employee Pension)", def: "A retirement account designed for self-employed individuals and small business owners. Contributions are limited to 25% of net self-employment earnings, up to $70,000 in 2025. SEP-IRAs are straightforward to set up and have no annual filing requirements. Contributions are tax-deductible and grow tax-deferred until withdrawal." },
    { term: "Sequence of Returns Risk", def: "The risk that poor investment returns early in retirement can permanently damage your portfolio even if long-term average returns are acceptable. This is why many retirees shift to more conservative investments near retirement." },
    { term: "SIMPLE IRA", def: "A retirement plan for small businesses and self-employed individuals with lower administrative costs than a 401(k). Employee contribution limits are around $16,000–$17,000/year (2025), with catch-up contributions available for those 50+. Employers are required to make matching or non-elective contributions." },
    { term: "Solo 401(k)", def: "A 401(k) plan designed for self-employed individuals with no employees (other than a spouse). Allows contributions both as employee (up to $23,500 in 2025) and employer (up to 25% of net earnings), with a combined limit of $70,000. Those 50+ can add a $7,500 catch-up contribution. Offers Roth and traditional options." },
    { term: "Social Security", def: "A US government program providing monthly retirement income based on your lifetime earnings history. You can claim as early as 62 (reduced benefit) or as late as 70 (maximum benefit)." },
    { term: "Target-Date Fund", def: "A mutual fund that automatically adjusts its asset allocation to become more conservative as a target retirement year approaches. A simple, hands-off investment option available in most 401(k) plans." },
    { term: "Traditional IRA", def: "An individual retirement account where contributions may be tax-deductible, reducing your taxable income today. You pay ordinary income taxes on withdrawals in retirement. Best suited for those who expect to be in a lower tax bracket in retirement. Required minimum distributions begin at age 73." },
    { term: "Withdrawal Rate", def: "The percentage of your retirement savings you withdraw each year. The 4% rule is a common guideline suggesting this rate is sustainable over a 30-year retirement. SonderSave lets you adjust this based on your situation." },
    { term: "Vesting", def: "The process by which you earn the right to keep employer contributions to your retirement account. Some employers require you to stay for a set number of years before their matching contributions are fully yours." },
  ].sort((a, b) => a.term.localeCompare(b.term));

  const letters = [...new Set(terms.map(t => t.term[0]))];

  return (
    <div className="max-w-4xl mx-auto px-4 py-6" style={{fontFamily: 'Inter, sans-serif'}}>
      <div className="rounded mb-3 p-5" style={{backgroundColor: '#C58B6A', borderRadius: '4px', boxShadow: '0 2px 4px -1px rgba(0,0,0,0.35)'}}>
        <h2 className="text-2xl font-bold text-white" style={{margin: 0}}>Glossary</h2>
      </div>
      <div className="rounded" style={{backgroundColor: 'white', border: '1px solid #c4c9cf', borderRadius: '4px', boxShadow: '0 2px 4px -1px rgba(0,0,0,0.35)', overflow: 'hidden'}}>
        {letters.map((letter, li) => (
          <div key={letter}>
            <div className="px-5 py-2" style={{backgroundColor: '#f4f3ef', borderTop: li > 0 ? '1px solid #e5e7eb' : 'none'}}>
              <span className="text-sm font-bold" style={{color: '#C58B6A'}}>{letter}</span>
            </div>
            {terms.filter(t => t.term[0] === letter).map((item, i) => (
              <div key={i} className="px-5 py-4 border-t border-gray-100">
                <p className="text-sm font-semibold mb-1" style={{color: 'rgb(14,50,60)', margin: '0 0 4px 0'}}>{item.term}</p>
                <p className="text-sm text-[#4B4B4B] leading-relaxed" style={{margin: 0}}>{item.def}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Resources Page ───────────────────────────────────────────────────────────
const ResourcesPage = () => {
  const resources = [
    {
      category: 'Retirement Planning',
      links: [
        { label: 'IRS Retirement Topics — Contribution Limits', url: 'https://www.irs.gov/retirement-plans/plan-participant-employee/retirement-topics-contributions', desc: 'Official IRS page for current 401(k) and IRA contribution limits.' },
        { label: 'Social Security Retirement Estimator', url: 'https://www.ssa.gov/benefits/retirement/estimator.html', desc: 'Estimate your future Social Security benefit based on your actual earnings record.' },
        { label: 'Department of Labor — Savings Fitness Guide', url: 'https://www.dol.gov/sites/dolgov/files/EBSA/about-ebsa/our-activities/resource-center/publications/savings-fitness.pdf', desc: 'A practical guide to planning for your retirement.' },
      ]
    },
    {
      category: 'Investment Basics',
      links: [
        { label: 'Investor.gov Compound Interest Calculator', url: 'https://www.investor.gov/financial-tools-calculators/calculators/compound-interest-calculator', desc: 'See how compound interest grows your savings over time.' },
        { label: 'SEC — Introduction to Investing', url: 'https://www.investor.gov/introduction-investing', desc: 'The SEC\'s beginner-friendly guide to investing fundamentals.' },
        { label: 'Bogleheads Wiki', url: 'https://www.bogleheads.org/wiki/Main_Page', desc: 'A comprehensive community resource for evidence-based, low-cost investing.' },
      ]
    },
    {
      category: 'Budgeting & Debt',
      links: [
        { label: 'Consumer Financial Protection Bureau', url: 'https://www.consumerfinance.gov/consumer-tools/', desc: 'Tools and resources for managing debt, budgeting, and financial planning.' },
        { label: 'National Foundation for Credit Counseling', url: 'https://www.nfcc.org', desc: 'Nonprofit credit counseling and debt management resources.' },
      ]
    },
    {
      category: 'Tax Resources',
      links: [
        { label: 'IRS Free File', url: 'https://www.irs.gov/filing/free-file-do-your-federal-taxes-for-free', desc: 'Free federal tax preparation and filing for eligible taxpayers.' },
        { label: 'IRS Roth IRA Overview', url: 'https://www.irs.gov/retirement-plans/roth-iras', desc: 'Official IRS guidance on Roth IRA rules, limits, and eligibility.' },
      ]
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-6" style={{fontFamily: 'Inter, sans-serif'}}>
      <div className="rounded mb-3 p-5" style={{backgroundColor: '#C58B6A', borderRadius: '4px', boxShadow: '0 2px 4px -1px rgba(0,0,0,0.35)'}}>
        <h2 className="text-2xl font-bold text-white" style={{margin: 0}}>Resources</h2>
      </div>
      <p className="text-sm text-[#4B4B4B] mb-4">Curated links to authoritative sources for retirement planning, investing, budgeting, and taxes.</p>
      {resources.map((section, si) => (
        <div key={si} className="rounded mb-3 overflow-hidden" style={{backgroundColor: 'white', border: '1px solid #c4c9cf', borderRadius: '4px', boxShadow: '0 2px 4px -1px rgba(0,0,0,0.35)'}}>
          <div className="px-5 py-3" style={{backgroundColor: '#f4f3ef', borderBottom: '1px solid #e5e7eb'}}>
            <span className="text-sm font-semibold" style={{color: 'rgb(14,50,60)'}}>{section.category}</span>
          </div>
          {section.links.map((link, li) => (
            <div key={li} className={`px-5 py-4 ${li > 0 ? 'border-t border-gray-100' : ''}`}>
              <a href={link.url} target="_blank" rel="noopener noreferrer"
                className="text-sm font-semibold underline block mb-1"
                style={{color: '#C58B6A'}}>
                {link.label}
              </a>
              <p className="text-sm text-[#4B4B4B]" style={{margin: 0}}>{link.desc}</p>
            </div>
          ))}
        </div>
      ))}
      <p className="text-xs text-[#4B4B4B] mt-4">SonderSave is not affiliated with any of the above resources. Links are provided for informational purposes only.</p>
    </div>
  );
};

// ─── About Page (stub) ───────────────────────────────────────────────────────
// ─── Landing Page ─────────────────────────────────────────────────────────────
const LandingPage = ({ setCurrentPage }) => (
  <div style={{height: 'calc(100vh - 48px)', backgroundColor: '#ffffff', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>

    {/* Centered logo + tagline */}
    <div style={{flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 24px'}}>
      <img src="/SonderSave SVG logo.svg" alt="SonderSave" style={{width: 340, maxWidth: '80vw'}} />
      <p className="text-base leading-relaxed mt-6 text-center" style={{color: '#4B4B4B', maxWidth: 420, fontFamily: '"Inter Display", sans-serif'}}>
        Everyone's path to retirement is different. SonderSave brings clarity to your journey — so you can plan the retirement that fits you.
      </p>
    </div>
  </div>
);

const AboutPage = () => (
  <div className="max-w-4xl mx-auto px-4 py-6">
    <div className="rounded shadow-md mb-3 p-4" style={{backgroundColor: '#C58B6A', borderRadius: '4px', boxShadow: '0 2px 4px -1px rgba(0,0,0,0.35)', border: '1px solid #c4c9cf'}}>
      <h2 className="text-2xl font-bold text-white" style={{margin: 0}}>About SonderSave</h2>
    </div>

    {/* Why it exists */}
    <div className="rounded shadow-md mb-3 p-6" style={{backgroundColor: 'white', border: '1px solid #c4c9cf', borderRadius: '4px', boxShadow: '0 2px 4px -1px rgba(0,0,0,0.35)'}}>
      <h3 className="text-lg font-semibold mb-3" style={{color: 'rgb(14,50,60)'}}>Why SonderSave exists</h3>
      <p className="text-base text-[#4B4B4B] mb-3">Planning for retirement should bring clarity — not stress.</p>
      <p className="text-base text-[#4B4B4B] mb-3">Most people know they should be planning ahead, but the tools available often feel overwhelming, overly technical, or narrowly focused. The result is more uncertainty, not less.</p>
      <p className="text-base text-[#4B4B4B]">SonderSave was built to offer a calmer, more complete view of the road ahead — one that helps you understand where you stand today and what small changes could mean for your future.</p>
    </div>

    {/* Philosophy */}
    <div className="rounded shadow-md mb-3 p-6" style={{backgroundColor: 'white', border: '1px solid #c4c9cf', borderRadius: '4px', boxShadow: '0 2px 4px -1px rgba(0,0,0,0.35)'}}>
      <h3 className="text-lg font-semibold mb-3" style={{color: 'rgb(14,50,60)'}}>Our philosophy</h3>
      <p className="text-base text-[#4B4B4B] mb-3">We believe good retirement planning is:</p>
      <div className="space-y-2 mb-3">
        {[
          ['Holistic', 'your future depends on many moving parts, not one number'],
          ['Transparent', 'you should understand what drives your projections'],
          ['Flexible', 'planning improves when you can explore scenarios'],
          ['Calm', 'clarity works better than pressure'],
        ].map(([term, def]) => (
          <div key={term} className="flex gap-2 text-base text-[#4B4B4B]">
            <span className="font-semibold" style={{color: 'rgb(14,50,60)', minWidth: 100}}>{term}</span>
            <span>— {def}</span>
          </div>
        ))}
      </div>
      <p className="text-base text-[#4B4B4B]">SonderSave is designed to support long-term thinking, not short-term optimization.</p>
    </div>

    {/* What makes it different */}
    <div className="rounded shadow-md mb-3 p-6" style={{backgroundColor: 'white', border: '1px solid #c4c9cf', borderRadius: '4px', boxShadow: '0 2px 4px -1px rgba(0,0,0,0.35)'}}>
      <h3 className="text-lg font-semibold mb-3" style={{color: 'rgb(14,50,60)'}}>What makes SonderSave different</h3>
      <p className="text-base text-[#4B4B4B] mb-3">Many retirement tools focus on a single account or a single "answer." SonderSave takes a broader approach — multiple income sources, inflation-adjusted results, and scenario modeling, all in one place.</p>
      <p className="text-base text-[#4B4B4B]" style={{fontStyle: 'italic'}}>The intent isn't to predict the future perfectly. It's to help you understand it meaningfully.</p>
    </div>

    {/* How projections work */}
    <div className="rounded shadow-md mb-3 p-6" style={{backgroundColor: 'white', border: '1px solid #c4c9cf', borderRadius: '4px', boxShadow: '0 2px 4px -1px rgba(0,0,0,0.35)'}}>
      <h3 className="text-lg font-semibold mb-3" style={{color: 'rgb(14,50,60)'}}>How the projections work</h3>
      <p className="text-base text-[#4B4B4B] mb-3">SonderSave uses established financial planning principles to estimate long-term outcomes based on what you provide. Projections are influenced by your savings levels, contribution patterns, growth assumptions, retirement timing, and income goals.</p>
      <p className="text-base text-[#4B4B4B]">All results are estimates, not guarantees. The tool is designed to help you explore possibilities and understand tradeoffs — you stay in control of the assumptions throughout.</p>
    </div>

    {/* Who it's for */}
    <div className="rounded shadow-md mb-3 p-6" style={{backgroundColor: 'white', border: '1px solid #c4c9cf', borderRadius: '4px', boxShadow: '0 2px 4px -1px rgba(0,0,0,0.35)'}}>
      <h3 className="text-lg font-semibold mb-3" style={{color: 'rgb(14,50,60)'}}>Who SonderSave is for</h3>
      <p className="text-base text-[#4B4B4B] mb-3">SonderSave is for people who want a clearer view of their retirement path without a full financial planning engagement. It may be especially helpful if you want to know whether you're generally on track, prefer exploring scenarios yourself, or find existing calculators too narrow or confusing.</p>
      <p className="text-base text-[#4B4B4B]">It's not a trading tool, portfolio manager, or substitute for personalized financial advice.</p>
    </div>

    {/* Privacy */}
    <div className="rounded shadow-md mb-3 p-6" style={{backgroundColor: 'white', border: '1px solid #c4c9cf', borderRadius: '4px', boxShadow: '0 2px 4px -1px rgba(0,0,0,0.35)'}}>
      <h3 className="text-lg font-semibold mb-3" style={{color: 'rgb(14,50,60)'}}>Privacy</h3>
      <p className="text-base text-[#4B4B4B]">Your financial information stays on your device. SonderSave doesn't collect, store, or sell your data — everything runs locally in your browser.</p>
    </div>

    {/* About the creator */}
    <div className="rounded shadow-md mb-3 p-6" style={{backgroundColor: 'white', border: '1px solid #c4c9cf', borderRadius: '4px', boxShadow: '0 2px 4px -1px rgba(0,0,0,0.35)'}}>
      <h3 className="text-lg font-semibold mb-3" style={{color: 'rgb(14,50,60)'}}>About the creator</h3>
      <p className="text-base text-[#4B4B4B] mb-3">SonderSave was built out of a simple frustration: most retirement tools either oversimplify or overcomplicate. The goal was something more balanced — a tool that respects both the numbers and the human side of long-term planning. This is an ongoing project and will continue to improve.</p>
      <p className="text-base" style={{color: 'rgb(14,50,60)', fontStyle: 'italic'}}>If SonderSave helps you feel even a little more clear about your path forward, it's doing its job.</p>
    </div>
  </div>
);

// ─── Calculator ──────────────────────────────────────────────────────────────
const Calculator = ({ currentPage, setCurrentPage, onDataChange }) => {
  // Load Inter and Inter Display fonts
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Inter+Display:wght@400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  // Input states
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(65);
  const [annualIncome, setAnnualIncome] = useState(75000);
  const [retirementIncomeGoal, setRetirementIncomeGoal] = useState(70);
  const [hasPension, setHasPension] = useState(false);
  const [pensionAmount, setPensionAmount] = useState(0);
  const [pensionStartAge, setPensionStartAge] = useState(65);
  const [hasSocialSecurity, setHasSocialSecurity] = useState(true); // Default true - most people collect SS
  const [socialSecurityAmount, setSocialSecurityAmount] = useState(0);
  const [socialSecurityPercent, setSocialSecurityPercent] = useState(30); // Default 30% (conservative estimate)
  const [currentSavings, setCurrentSavings] = useState(25000);
  const [breakdownByAccount, setBreakdownByAccount] = useState(false);
  const [account401k, setAccount401k] = useState(0);
  const [accountIRA, setAccountIRA] = useState(0);
  const [accountRoth, setAccountRoth] = useState(0);
  const [accountBrokerage, setAccountBrokerage] = useState(0);
  const [accountPension, setAccountPension] = useState(0);
  const [hasIndividualContributions, setHasIndividualContributions] = useState(false);
  const [individualContribution, setIndividualContribution] = useState(0);
  const [individualContributionPercent, setIndividualContributionPercent] = useState(0);
  const [individualReturnRate, setIndividualReturnRate] = useState(5);
  const [monthlyContribution, setMonthlyContribution] = useState(500);
  const [contributionPercent, setContributionPercent] = useState(8);
  const [useCatchupContributions, setUseCatchupContributions] = useState(false);
  const [employerMatchRate, setEmployerMatchRate] = useState(100);
  const [employerMatchUpTo, setEmployerMatchUpTo] = useState(6);
  const [expectedReturn, setExpectedReturn] = useState(5);
  const [inflationRate, setInflationRate] = useState(3);
  const [annualRaise, setAnnualRaise] = useState(2);
  const [withdrawalRate, setWithdrawalRate] = useState(4);
  const [retirementReturnRate, setRetirementReturnRate] = useState(3.5);
  const [whatIfWithdrawal, setWhatIfWithdrawal] = useState(4);
  const [whatIfReturn, setWhatIfReturn] = useState(3.5);

  // Projection what-if state
  const [projWhatIfExtra, setProjWhatIfExtra] = useState(0);
  const [projWhatIfReturn, setProjWhatIfReturn] = useState(null); // null = use actual
  const [projWhatIfRetirementAge, setProjWhatIfRetirementAge] = useState(null); // null = use actual

  // Sync what-if sliders when real inputs change
  useEffect(() => {
    setWhatIfWithdrawal(withdrawalRate);
    setWhatIfReturn(retirementReturnRate);
  }, [withdrawalRate, retirementReturnRate]);
  
  // Results states
  const [totalAtRetirement, setTotalAtRetirement] = useState(0);
  const [yearlyIncome, setYearlyIncome] = useState(0);
  const [yearlyIncomeToday, setYearlyIncomeToday] = useState(0);
  const [statusText, setStatusText] = useState('');
  const [resultsBarCollapsed, setResultsBarCollapsed] = useState(true);
  const [quickMode, setQuickMode] = useState(false);
  const [suggestionsCollapsed, setSuggestionsCollapsed] = useState(true);
  const [stickyBarMinimal, setStickyBarMinimal] = useState(false);
  const [quickCatchupExpanded, setQuickCatchupExpanded] = useState(false);
  const [quickTargetDateExpanded, setQuickTargetDateExpanded] = useState(false);
  const [is401kOverLimit, setIs401kOverLimit] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [growthData, setGrowthData] = useState([]);
  const [tooltip, setTooltip] = useState(null);
  const [showTodaysDollars, setShowTodaysDollars] = useState(true);
  const [textSize, setTextSize] = useState('normal'); // 'small', 'normal', 'large'
  const [chartViewMode, setChartViewMode] = useState('age'); // 'age', 'dollar', 'percent'
  const [nestEggProgress, setNestEggProgress] = useState(0); // Progress based on nest egg vs goal
  const [showStickyBar, setShowStickyBar] = useState(false); // Show sticky bar after scrolling past logo
  
  // Home equity states
  const [considerHomeEquity, setConsiderHomeEquity] = useState(false);
  const [hasNetMonthly, setHasNetMonthly] = useState(false);
  const [netMonthlyTakeHome, setNetMonthlyTakeHome] = useState(0);
  const [considerAnticipatedAssets, setConsiderAnticipatedAssets] = useState(false);
  const [anticipatedAmount, setAnticipatedAmount] = useState(0);
  const [homePurchasePrice, setHomePurchasePrice] = useState(300000);
  const [homePurchaseYear, setHomePurchaseYear] = useState(2020);
  const [homeAppreciationRate, setHomeAppreciationRate] = useState(3);
  const [downsizeAmount, setDownsizeAmount] = useState(200000);

  // Calculate results whenever inputs change
  useEffect(() => {
    const yearsToRetirement = retirementAge - currentAge;
    
    // Calculate total savings (either single field or sum of accounts)
    const totalCurrentSavings = breakdownByAccount 
      ? account401k + accountIRA + accountRoth + accountBrokerage + accountPension
      : currentSavings;
    
    if (yearsToRetirement <= 0) {
      setTotalAtRetirement(totalCurrentSavings);
      const income = totalCurrentSavings * (withdrawalRate / 100);
      setYearlyIncome(income);
      setYearlyIncomeToday(income);
      setStatusText("You're at retirement age");
      return;
    }

    // Calculate monthly contribution from percentage with annual raises
    // Future value of current savings
    const futureCurrentSavings = totalCurrentSavings * Math.pow(1 + expectedReturn / 100, yearsToRetirement);
    
    let futureEmployerContributions = 0;
    let futureIndividualContributions = 0;
    
    for (let year = 0; year < yearsToRetirement; year++) {
      // Income grows with annual raises
      const yearIncome = annualIncome * Math.pow(1 + annualRaise / 100, year);
      const yearMonthlyIncome = yearIncome / 12;
      
      // Calculate this year's contributions with catch-up
      const currentAgeInYear = currentAge + year;
      const baseLimit = 24500;
      const catchupMax = 32500;
      
      let yearContributionAmount;
      
      // If catch-up is enabled and they're 50+, contribute the maximum
      if (currentAgeInYear >= 50 && useCatchupContributions) {
        yearContributionAmount = catchupMax / 12;
      } else {
        // Otherwise use their slider amount, capped at base limit
        const yearDesiredContribution = yearMonthlyIncome * (contributionPercent / 100);
        const yearMonthlyLimit = baseLimit / 12;
        yearContributionAmount = Math.min(yearDesiredContribution, yearMonthlyLimit);
      }
      
      // Employer match for this year
      const yearMatchablePercent = Math.min(contributionPercent, employerMatchUpTo);
      const yearEmployerMatch = (yearMonthlyIncome * (yearMatchablePercent / 100)) * (employerMatchRate / 100);
      
      const yearEmployerTotal = yearContributionAmount + yearEmployerMatch;
      
      // Individual contributions for this year
      const yearIndividualAmount = hasIndividualContributions 
        ? (yearMonthlyIncome * (individualContributionPercent / 100)) 
        : 0;
      
      // Calculate how many years this contribution will grow
      const yearsOfGrowth = yearsToRetirement - year;
      
      // Add to totals with appropriate growth
      const monthlyEmployerRate = expectedReturn / 100 / 12;
      const monthlyIndividualRate = individualReturnRate / 100 / 12;
      const monthsOfGrowth = yearsOfGrowth * 12;
      
      futureEmployerContributions += yearEmployerTotal * 12 * Math.pow(1 + expectedReturn / 100, yearsOfGrowth);
      futureIndividualContributions += yearIndividualAmount * 12 * Math.pow(1 + individualReturnRate / 100, yearsOfGrowth);
    }
    
    const total = futureCurrentSavings + futureEmployerContributions + futureIndividualContributions;
    const income = total * (withdrawalRate / 100);
    
    // Build year-by-year growth data for chart (stacked: startingGrowth, contributions, returns)
    const chartData = [];
    let runningBalance = totalCurrentSavings;
    let cumulativeContributions = 0;
    let cumulativeIndividualBalance = 0; // tracked separately to apply individualReturnRate
    for (let year = 0; year <= yearsToRetirement; year++) {
      if (year === 0) {
        chartData.push({ year: currentAge, balance: Math.round(runningBalance), startingGrowth: Math.round(totalCurrentSavings), contributions: 0, returns: 0 });
        continue;
      }
      const yearIncome = annualIncome * Math.pow(1 + annualRaise / 100, (year - 1));
      const yearMonthlyIncome = yearIncome / 12;
      const currentAgeInYear = currentAge + (year - 1);
      const baseLimit = 24500;
      const catchupMax = 32500;
      let yearContributionAmount;
      if (currentAgeInYear >= 50 && useCatchupContributions) {
        yearContributionAmount = catchupMax / 12;
      } else {
        const yearDesiredContribution = yearMonthlyIncome * (contributionPercent / 100);
        yearContributionAmount = Math.min(yearDesiredContribution, baseLimit / 12);
      }
      const yearMatchablePercent = Math.min(contributionPercent, employerMatchUpTo);
      const yearEmployerMatch = (yearMonthlyIncome * (yearMatchablePercent / 100)) * (employerMatchRate / 100);
      const yearIndividualAmount = hasIndividualContributions ? (yearMonthlyIncome * (individualContributionPercent / 100)) : 0;
      const year401kContributed = (yearContributionAmount + yearEmployerMatch) * 12;
      const yearIndividualContributed = yearIndividualAmount * 12;
      const yearTotalContributed = year401kContributed + yearIndividualContributed;
      // Track 401k and individual balances separately to apply different return rates
      const growth401k = (runningBalance - cumulativeIndividualBalance) * (expectedReturn / 100);
      const growthIndividual = cumulativeIndividualBalance * (individualReturnRate / 100);
      const growthThisYear = growth401k + growthIndividual;
      cumulativeIndividualBalance = cumulativeIndividualBalance * (1 + individualReturnRate / 100) + yearIndividualContributed;
      runningBalance = runningBalance + growthThisYear + yearTotalContributed;
      cumulativeContributions += yearTotalContributed;
      // startingGrowth = initial savings compounded to this year
      const startingGrowth = totalCurrentSavings * Math.pow(1 + expectedReturn / 100, year);
      chartData.push({
        year: currentAge + year,
        balance: Math.round(runningBalance),
        startingGrowth: Math.round(startingGrowth),
        contributions: Math.round(cumulativeContributions),
        returns: Math.round(runningBalance - startingGrowth - cumulativeContributions)
      });
    }
    setGrowthData(chartData);
    
    // Use the final balance from chart data (year-by-year simulation) for consistency
    const finalBalance = chartData.length > 0 ? chartData[chartData.length - 1].balance : total;
    
    // Adjust for inflation to get today's dollars
    const realIncome = income / Math.pow(1 + inflationRate / 100, yearsToRetirement);
    
    // Add pension income (yearly amount)
    const pensionActive = hasPension && pensionStartAge <= retirementAge;
    const socialSecurityFuture = socialSecurityAmount * Math.pow(1 + inflationRate / 100, yearsToRetirement);
    const totalYearlyIncome = income + (pensionActive ? pensionAmount * 12 : 0) + (hasSocialSecurity ? socialSecurityFuture * 12 : 0);
    const totalRealIncome = realIncome + (pensionActive ? pensionAmount * 12 : 0) + (hasSocialSecurity ? socialSecurityAmount * 12 : 0);
    
    setTotalAtRetirement(finalBalance);
    setYearlyIncome(totalYearlyIncome);
    setYearlyIncomeToday(totalRealIncome);
    
    // Calculate nest egg progress (for sticky bar and chart alignment)
    const retirementIncomeTargetFuture = (annualIncome * (retirementIncomeGoal / 100)) * Math.pow(1 + inflationRate / 100, yearsToRetirement);
    const grossGoalNestEgg = retirementIncomeTargetFuture / (withdrawalRate / 100);
    // Pension and SS reduce how much nest egg you need — convert their income to equivalent capital
    const pensionCapitalEquivalent = pensionActive ? (pensionAmount * 12) / (withdrawalRate / 100) : 0;
    const ssCapitalEquivalent = hasSocialSecurity ? (socialSecurityFuture * 12) / (withdrawalRate / 100) : 0;
    const goalNestEgg = Math.max(0, grossGoalNestEgg - pensionCapitalEquivalent - ssCapitalEquivalent);
    const nestEggProgressPercent = goalNestEgg > 0 ? (finalBalance / goalNestEgg) * 100 : 100;
    setNestEggProgress(nestEggProgressPercent);

    // Push shared data up to App for Budget page
    if (onDataChange) {
      const monthlyPostTax = hasIndividualContributions
        ? (annualIncome / 12) * (individualContributionPercent / 100)
        : 0;
      onDataChange({ annualIncome, monthlyPostTaxSavings: Math.round(monthlyPostTax), currentAge, retirementAge });
    }
    
    // Calculate suggestions if under goal
    const goalIncome = annualIncome * (retirementIncomeGoal / 100);
    const progressPercent = (totalRealIncome / goalIncome) * 100;
    
    if (progressPercent < 100) {
      const suggestionsList = [];
      
      // Suggestion 1: Increase contribution percentage
      const incomeGap = goalIncome - totalRealIncome;
      const neededExtraContribution = incomeGap / withdrawalRate * 100;
      const monthlyGap = neededExtraContribution / yearsToRetirement / 12;
      const extraPercent = (monthlyGap / (annualIncome / 12)) * 100;
      // Cap at IRS limit: $24,500/year unless catch-up enabled ($32,500)
      const irsLimit = useCatchupContributions && currentAge >= 50 ? 32500 : 24500;
      const irsLimitPercent = (irsLimit / annualIncome) * 100;
      const suggestedPercent = Math.min(30, irsLimitPercent, contributionPercent + extraPercent);
      
      if (suggestedPercent <= 30) {
        const atIrsLimit = suggestedPercent >= irsLimitPercent - 0.1;
        suggestionsList.push({
          type: 'contribution',
          description: `Increase your 401(k) contribution from ${contributionPercent.toFixed(1)}% to ${suggestedPercent.toFixed(1)}%${atIrsLimit ? ` (IRS maximum of ${formatCurrency(irsLimit)}/year)` : ''}`,
          impact: `Would reach ~${Math.min(100, progressPercent + ((100 - progressPercent) * 0.8)).toFixed(0)}% of your goal`
        });
      }
      
      // Suggestion 2: Work longer
      const yearsNeeded = Math.ceil((100 - progressPercent) / 10); // Rough estimate
      if (retirementAge + yearsNeeded <= 75) {
        suggestionsList.push({
          type: 'retirement_age',
          description: `Work until age ${retirementAge + yearsNeeded} (${yearsNeeded} more ${yearsNeeded === 1 ? 'year' : 'years'})`,
          impact: `Would reach ~${Math.min(100, progressPercent + (yearsNeeded * 8)).toFixed(0)}% of your goal`
        });
      }
      
      // Suggestion 3: Catch-up contributions (if applicable)
      if (currentAge >= 50 && !useCatchupContributions) {
        suggestionsList.push({
          type: 'catchup',
          description: 'Enable catch-up contributions (age 50+) for an extra $8,000/year contribution limit',
          impact: 'Could significantly boost your retirement savings over time'
        });
      } else if (currentAge < 50 && retirementAge > 50 && !useCatchupContributions) {
        const yearsWithCatchup = retirementAge - 50;
        suggestionsList.push({
          type: 'catchup',
          description: `Enable catch-up contributions after age 50 (+$8,000/year for ${yearsWithCatchup} years)`,
          impact: 'Could increase savings by 5-10% depending on years until retirement'
        });
      }
      
      // Suggestion 4: Budget check
      const recommendedSavings = (annualIncome / 12) * 0.20;
      const currentSaving = (annualIncome / 12) * (contributionPercent / 100);
      if (currentSaving < recommendedSavings) {
        suggestionsList.push({
          type: 'budget',
          description: `Budget check: The 50/30/20 guideline suggests saving about 20% toward savings and debt. You're saving ${contributionPercent.toFixed(1)}% for retirement — could you increase toward 20%?`,
          impact: `Saving ${formatCurrency(recommendedSavings)}/month would reach ~${Math.min(100, progressPercent + ((recommendedSavings - currentSaving) / currentSaving * progressPercent * 0.5)).toFixed(0)}% of your goal`
        });
      }
      
      // Suggestion 5: Adjust retirement income goal (last resort option)
      const achievablePercent = Math.floor((totalRealIncome / annualIncome) * 100 / 5) * 5; // Round down to nearest 5%
      if (achievablePercent >= 50 && achievablePercent < retirementIncomeGoal) {
        suggestionsList.push({
          type: 'goal_adjustment',
          description: `Adjust your retirement income goal from ${retirementIncomeGoal}% to ${achievablePercent}% of current income`,
          impact: `Note: This means planning for ${formatCurrency(annualIncome * (achievablePercent / 100))}/year (in today's dollars), which may require lifestyle adjustments like downsizing, relocating to a lower cost area, or reducing discretionary spending in retirement.`
        });
      }
      
      setSuggestions(suggestionsList.slice(0, 4)); // Show top 4
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
    
    // Determine status
    const incomeReplacement = (income / annualIncome) * 100;
    if (incomeReplacement >= 80) {
      setStatusText("You're on track");
    } else if (incomeReplacement >= 60) {
      setStatusText("Getting closer");
    } else if (incomeReplacement >= 40) {
      setStatusText("Building momentum");
    } else {
      setStatusText("You're getting started");
    }
  }, [currentAge, retirementAge, annualIncome, retirementIncomeGoal, hasPension, pensionAmount, pensionStartAge, hasSocialSecurity, socialSecurityAmount, currentSavings, breakdownByAccount, account401k, accountIRA, accountRoth, accountBrokerage, accountPension, hasIndividualContributions, individualContribution, individualContributionPercent, individualReturnRate, contributionPercent, useCatchupContributions, monthlyContribution, employerMatchRate, employerMatchUpTo, expectedReturn, annualRaise, inflationRate, withdrawalRate]);

  // Load saved inputs from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('sondersave_inputs');
      if (saved) {
        const d = JSON.parse(saved);
        if (d.currentAge !== undefined) setCurrentAge(d.currentAge);
        if (d.retirementAge !== undefined) setRetirementAge(d.retirementAge);
        if (d.annualIncome !== undefined) setAnnualIncome(d.annualIncome);
        if (d.retirementIncomeGoal !== undefined) setRetirementIncomeGoal(d.retirementIncomeGoal);
        if (d.hasPension !== undefined) setHasPension(d.hasPension);
        if (d.pensionAmount !== undefined) setPensionAmount(d.pensionAmount);
        if (d.pensionStartAge !== undefined) setPensionStartAge(d.pensionStartAge);
        if (d.hasSocialSecurity !== undefined) setHasSocialSecurity(d.hasSocialSecurity);
        if (d.socialSecurityPercent !== undefined) setSocialSecurityPercent(d.socialSecurityPercent);
        if (d.currentSavings !== undefined) setCurrentSavings(d.currentSavings);
        if (d.breakdownByAccount !== undefined) setBreakdownByAccount(d.breakdownByAccount);
        if (d.account401k !== undefined) setAccount401k(d.account401k);
        if (d.accountIRA !== undefined) setAccountIRA(d.accountIRA);
        if (d.accountRoth !== undefined) setAccountRoth(d.accountRoth);
        if (d.accountBrokerage !== undefined) setAccountBrokerage(d.accountBrokerage);
        if (d.accountPension !== undefined) setAccountPension(d.accountPension);
        if (d.hasIndividualContributions !== undefined) setHasIndividualContributions(d.hasIndividualContributions);
        if (d.individualContribution !== undefined) setIndividualContribution(d.individualContribution);
        if (d.individualContributionPercent !== undefined) setIndividualContributionPercent(d.individualContributionPercent);
        if (d.individualReturnRate !== undefined) setIndividualReturnRate(d.individualReturnRate);
        if (d.monthlyContribution !== undefined) setMonthlyContribution(d.monthlyContribution);
        if (d.contributionPercent !== undefined) setContributionPercent(d.contributionPercent);
        if (d.useCatchupContributions !== undefined) setUseCatchupContributions(d.useCatchupContributions);
        if (d.employerMatchRate !== undefined) setEmployerMatchRate(d.employerMatchRate);
        if (d.employerMatchUpTo !== undefined) setEmployerMatchUpTo(d.employerMatchUpTo);
        if (d.expectedReturn !== undefined) setExpectedReturn(d.expectedReturn);
        if (d.inflationRate !== undefined) setInflationRate(d.inflationRate);
        if (d.annualRaise !== undefined) setAnnualRaise(d.annualRaise);
        if (d.withdrawalRate !== undefined) setWithdrawalRate(d.withdrawalRate);
        if (d.retirementReturnRate !== undefined) setRetirementReturnRate(d.retirementReturnRate);
        if (d.considerHomeEquity !== undefined) setConsiderHomeEquity(d.considerHomeEquity);
        if (d.homePurchasePrice !== undefined) setHomePurchasePrice(d.homePurchasePrice);
        if (d.homePurchaseYear !== undefined) setHomePurchaseYear(d.homePurchaseYear);
        if (d.homeAppreciationRate !== undefined) setHomeAppreciationRate(d.homeAppreciationRate);
        if (d.downsizeAmount !== undefined) setDownsizeAmount(d.downsizeAmount);
        if (d.quickMode !== undefined) setQuickMode(d.quickMode);
      }
    } catch (e) {
      // Silently ignore if localStorage is unavailable
    }
  }, []);

  // Save inputs to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('sondersave_inputs', JSON.stringify({
        currentAge, retirementAge, annualIncome, retirementIncomeGoal,
        hasPension, pensionAmount, pensionStartAge, hasSocialSecurity, socialSecurityPercent,
        currentSavings, breakdownByAccount, account401k, accountIRA, accountRoth,
        accountBrokerage, accountPension, hasIndividualContributions,
        individualContribution, individualContributionPercent, individualReturnRate,
        monthlyContribution, contributionPercent, useCatchupContributions,
        employerMatchRate, employerMatchUpTo, expectedReturn, inflationRate,
        annualRaise, withdrawalRate, retirementReturnRate,
        considerHomeEquity, homePurchasePrice, homePurchaseYear,
        homeAppreciationRate, downsizeAmount, quickMode,
      }));
    } catch (e) {
      // Silently ignore if localStorage is unavailable
    }
  }, [
    currentAge, retirementAge, annualIncome, retirementIncomeGoal,
    hasPension, pensionAmount, hasSocialSecurity, socialSecurityPercent,
    currentSavings, breakdownByAccount, account401k, accountIRA, accountRoth,
    accountBrokerage, accountPension, hasIndividualContributions,
    individualContribution, individualContributionPercent, individualReturnRate,
    monthlyContribution, contributionPercent, useCatchupContributions,
    employerMatchRate, employerMatchUpTo, expectedReturn, inflationRate,
    annualRaise, withdrawalRate, retirementReturnRate,
    considerHomeEquity, homePurchasePrice, homePurchaseYear,
    homeAppreciationRate, downsizeAmount, quickMode,
  ]);
  useEffect(() => {
    const handleScroll = () => {
      const target = document.getElementById('income-planning-section');
      const threshold = target ? target.offsetTop : 600;
      setShowStickyBar(window.scrollY > threshold);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatCompact = (value) => {
    if (Math.abs(value) >= 10000000) {
      return '$' + (value / 1000000).toFixed(1) + 'M';
    }
    return formatCurrency(value);
  };

  const formatNumberWithCommas = (value) => {
    return new Intl.NumberFormat('en-US').format(value);
  };

  const parseFormattedNumber = (value) => {
    return Number(value.replace(/,/g, ''));
  };
  
  // Check if 401k is over limit (for warning display)
  const checkMonthlyIncome = annualIncome / 12;
  const checkDesiredAnnual = (checkMonthlyIncome * (contributionPercent / 100)) * 12;
  const showOverLimitWarning = checkDesiredAnnual > 24500;

  return (
    <div className={`${textSize === 'normal' ? 'text-sm' : textSize === 'medium' ? 'text-lg' : 'text-2xl'}`} style={{backgroundColor: '#FFFFFF', fontFamily: 'Inter, sans-serif'}}>
      <style>{`
        /* Apply Inter Display to headers, titles, and labels */
        h1, h2, h3, h4, h5, h6,
        label,
        .text-xl,
        .text-2xl,
        .font-bold,
        .font-semibold,
        .font-medium {
          font-family: 'Inter Display', sans-serif !important;
        }
        
        input[type="range"] {
          -webkit-appearance: none;
          appearance: none;
          background: transparent;
          cursor: pointer;
        }
        
        /* Track */
        input[type="range"]::-webkit-slider-runnable-track {
          background: #e5e7eb;
          height: 6px;
          border-radius: 3px;
        }
        
        input[type="range"]::-moz-range-track {
          background: #e5e7eb;
          height: 6px;
          border-radius: 3px;
        }
        
        /* Thumb */
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #6E8F7C;
          cursor: grab;
          margin-top: -9px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        
        input[type="range"]::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #6E8F7C;
          cursor: grab;
          border: none;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        
        input[type="range"]:active::-webkit-slider-thumb {
          cursor: grabbing;
        }
        
        input[type="range"]:active::-moz-range-thumb {
          cursor: grabbing;
        }

        /* About You section slider customization */
        input[type="range"].about-you-slider::-webkit-slider-thumb {
          background: #6E8F7C;
        }
        
        input[type="range"].about-you-slider::-moz-range-thumb {
          background: #6E8F7C;
        }


        /* Print styles */
        @media print {
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
          
          /* Hide interactive elements when printing */
          input[type="range"],
          input[type="checkbox"],
          input[type="text"],
          button {
            display: none !important;
          }
          
          /* Hide the "Show more/less" and collapse buttons */
          .print-hide {
            display: none !important;
          }
          
          /* Make sure results are always visible in print */
          .print-show {
            display: block !important;
          }
          
          /* Page breaks */
          .page-break-before {
            page-break-before: always;
          }
          
          .page-break-avoid {
            page-break-inside: avoid;
          }
          
          /* Ensure backgrounds print */
          * {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
        }
      
        
        /* Darker shadow for sections */
        .shadow-md {
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.15), 0 2px 4px -1px rgba(0, 0, 0, 0.1) !important;
        }
        
        /* Section borders */
        .border-[\#3A4446] {
          border-color: #3A4446 !important;
        }
        
        /* Scroll margin for sections to account for sticky bar */
        [id$='-section'] {
          scroll-margin-top: 180px;
        }

        /* Scroll margin for module deep links */
        [id^='module-'] {
          scroll-margin-top: 210px;
        }
        `}</style>
      {/* Sticky Results Bar */}
      <div 
        className="sticky z-10 border-b border-[#3A4446] shadow-md"
        style={{
          backgroundColor: 'white',
          top: '0px',
          opacity: showStickyBar ? 1 : 0,
          transform: showStickyBar ? 'translateY(0)' : 'translateY(-8px)',
          transition: 'opacity 0.3s ease, transform 0.3s ease',
          pointerEvents: showStickyBar ? 'auto' : 'none',
          maxHeight: showStickyBar ? '300px' : '0px',
          overflow: 'hidden',
        }}
      >
        <div className="max-w-4xl mx-auto px-4 py-3">
          {/* Always visible: progress bar + single toggle arrow */}
          <div className="flex items-center gap-3">
            <div className="text-base text-[#4B4B4B] flex-shrink-0">Progress:</div>
            <div className="text-base font-semibold text-[#3A4446] flex-shrink-0">{Math.round(nestEggProgress)}%</div>
            <div className="flex-1 bg-gray-200 rounded-full h-3">
              <div
                className="h-3 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, nestEggProgress)}%`, backgroundColor: '#6E8F7C' }}
              />
            </div>
            <button
              onClick={() => setResultsBarCollapsed(!resultsBarCollapsed)}
              className="text-lg hover:text-[#3A4446] transition-transform flex-shrink-0"
              style={{color: 'rgb(107, 114, 128)', transform: resultsBarCollapsed ? 'rotate(0deg)' : 'rotate(180deg)'}}
              title={resultsBarCollapsed ? 'Show navigation' : 'Hide navigation'}
            >
              ▼
            </button>
          </div>

          {/* Expanded: Guided/Quick + unified navigation */}
          {!resultsBarCollapsed && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              {/* Guided/Quick toggle */}
              <div className="flex mb-4 rounded-lg overflow-hidden border" style={{borderColor: '#d1d5db', width: 'fit-content'}}>
                <button
                  onClick={() => { setQuickMode(false); setResultsBarCollapsed(true); }}
                  className="px-4 py-1.5 text-sm font-medium transition-colors"
                  style={!quickMode
                    ? {backgroundColor: '#6E8F7C', color: 'white'}
                    : {backgroundColor: 'white', color: '#6b7280'}
                  }
                >
                  Guided
                </button>
                <button
                  onClick={() => { setQuickMode(true); setResultsBarCollapsed(true); }}
                  className="px-4 py-1.5 text-sm font-medium transition-colors"
                  style={quickMode
                    ? {backgroundColor: '#6E8F7C', color: 'white'}
                    : {backgroundColor: 'white', color: '#6b7280'}
                  }
                >
                  Quick
                </button>
              </div>

              {/* Section + module nav */}
              {[
                { label: 'About You', id: 'about-you-section', modules: [] },
                { label: 'Your Savings', id: 'your-savings-section', modules: [
                  { label: 'Savings Balance', id: 'module-savings-balance' },
                  { label: 'Employer Contributions', id: 'module-contributions' },
                  { label: 'Employer Match', id: 'module-employer-match' },
                  { label: 'Personal Accounts', id: 'module-personal-accounts' },
                  { label: 'Return Rate', id: 'module-return-rate' },
                ]},
                { label: 'Growth Planning', id: 'income-planning-section', modules: [
                  { label: 'Salary Growth', id: 'module-salary-growth' },
                  { label: 'Inflation', id: 'module-inflation' },
                  { label: 'Income Goal', id: 'module-income-goal' },
                ]},
                { label: 'Retirement Income', id: 'retirement-income-section', modules: [
                  { label: 'Pension', id: 'module-pension' },
                  { label: 'Social Security', id: 'module-social-security' },
                  { label: 'Withdrawal', id: 'module-withdrawal' },
                ]},
                { label: 'Home Equity', id: 'home-equity-section', modules: [] },
                { label: 'Anticipated Assets', id: 'anticipated-assets-section', modules: [] },
                { label: 'Results', id: 'results-section', modules: [] },
              ].map(({ label, id, modules }) => (
                <div key={id} className="mb-2">
                  <button
                    onClick={() => {
                      setResultsBarCollapsed(true);
                      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
                    }}
                    className="text-sm font-semibold px-3 py-1 rounded transition-colors"
                    style={{backgroundColor: '#C58B6A', color: 'white', border: '1px solid #b87a59'}}
                  >
                    {label}
                  </button>
                  {modules.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-1 ml-6">
                      {modules.map(({ label: mlabel, id: mid }) => (
                        <button
                          key={mid}
                          onClick={() => {
                            setResultsBarCollapsed(true);
                            setTimeout(() => document.getElementById(mid)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
                          }}
                          className="px-2 py-0.5 rounded font-medium transition-colors"
                          style={{backgroundColor: '#f4f3ef', color: '#3A4446', border: '1px solid #c4c9cf', fontSize: '0.75rem'}}
                        >
                          {mlabel}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Reset */}
              <div className="mt-3 pt-3 border-t border-gray-100">
                <button
                  onClick={() => {
                    if (window.confirm('Reset all inputs to defaults?')) {
                      setCurrentAge(30);
                      setRetirementAge(65);
                      setAnnualIncome(75000);
                      setRetirementIncomeGoal(70);
                      setHasPension(false);
                      setPensionAmount(0);
                      setPensionStartAge(65);
                      setHasSocialSecurity(true);
                      setSocialSecurityPercent(30);
                      setCurrentSavings(25000);
                      setBreakdownByAccount(false);
                      setAccount401k(0);
                      setAccountIRA(0);
                      setAccountRoth(0);
                      setAccountBrokerage(0);
                      setAccountPension(0);
                      setHasIndividualContributions(false);
                      setIndividualContribution(0);
                      setIndividualContributionPercent(0);
                      setIndividualReturnRate(5);
                      setMonthlyContribution(500);
                      setContributionPercent(8);
                      setUseCatchupContributions(false);
                      setEmployerMatchRate(100);
                      setEmployerMatchUpTo(6);
                      setExpectedReturn(5);
                      setInflationRate(3);
                      setAnnualRaise(2);
                      setWithdrawalRate(4);
                      setRetirementReturnRate(3.5);
                      setConsiderHomeEquity(false);
                      setHomePurchasePrice(300000);
                      setHomePurchaseYear(2020);
                      setHomeAppreciationRate(3);
                      setDownsizeAmount(200000);
                      setQuickMode(false);
                      setResultsBarCollapsed(true);
                      window.scrollTo(0, 0);
                    }
                  }}
                  className="text-xs"
                  style={{color: 'rgb(156, 163, 175)'}}
                >
                  Reset to defaults
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Print-only Summary */}
        <div className="hidden print:block page-break-avoid bg-[#F5F1EB] rounded-lg shadow-md border border-[#3A4446] p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4" style={{fontWeight: 700, color: 'rgb(14, 50, 60)'}}>Your Retirement Plan Summary</h2>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-base text-[#4B4B4B]">Current Age</p>
              <p className="text-lg font-semibold" style={{color: 'rgb(14, 50, 60)'}}>{currentAge}</p>
            </div>
            <div>
              <p className="text-base text-[#4B4B4B]">Retirement Age</p>
              <p className="text-lg font-semibold" style={{color: 'rgb(14, 50, 60)'}}>{retirementAge}</p>
            </div>
            <div>
              <p className="text-base text-[#4B4B4B]">Annual Income</p>
              <p className="text-lg font-semibold" style={{color: 'rgb(14, 50, 60)'}}>{formatCurrency(annualIncome)}</p>
            </div>
            <div>
              <p className="text-base text-[#4B4B4B]">Retirement Income Goal</p>
              <p className="text-lg font-semibold" style={{color: 'rgb(14, 50, 60)'}}>{retirementIncomeGoal}%</p>
            </div>
            <div>
              <p className="text-base text-[#4B4B4B]">Current Savings</p>
              <p className="text-lg font-semibold" style={{color: 'rgb(14, 50, 60)'}}>{formatCurrency(currentSavings)}</p>
            </div>
            <div>
              <p className="text-base text-[#4B4B4B]">Monthly Contribution</p>
              <p className="text-lg font-semibold" style={{color: 'rgb(14, 50, 60)'}}>{formatCurrency(monthlyContribution)} ({contributionPercent.toFixed(1)}%)</p>
            </div>
          </div>
          <div className="pt-4 border-t border-[#3A4446]">
            <p className="text-base text-[#4B4B4B] mb-2">Projected Results:</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-base text-[#4B4B4B]">Total at Retirement</p>
                <p className="text-2xl font-bold" style={{color: 'rgb(14, 50, 60)'}}>{formatCurrency(totalAtRetirement)}</p>
              </div>
              <div>
                <p className="text-base text-[#4B4B4B]">Yearly Income in Retirement</p>
                <p className="text-2xl font-bold" style={{color: 'rgb(14, 50, 60)'}}>{formatCurrency(yearlyIncome)}</p>
                <p className="text-sm text-[#4B4B4B]">({formatCurrency(yearlyIncomeToday)} in today's dollars)</p>
              </div>
            </div>
          </div>
        </div>

        {/* About You Section - Modular Design */}

        {/* Section Title Card */}
        <div id="about-you-section" className="rounded shadow-md mb-3 page-break-avoid" style={{
          backgroundColor: '#C58B6A',
          padding: '16px',
          borderRadius: '4px',
          boxShadow: '0 2px 4px -1px rgba(0, 0, 0, 0.35)',
          border: '1px solid #c4c9cf'
        }}>
          <h2 className="text-2xl font-bold text-white" style={{fontWeight: 700, margin: 0}}>About You</h2>
        </div>
        
        {/* Module: Current Age */}
        <div id="module-ages" className="rounded shadow-md mb-3 p-6 page-break-avoid" style={{
          backgroundColor: 'white',
          borderRadius: '4px',
          boxShadow: '0 2px 4px -1px rgba(0, 0, 0, 0.35)',
          border: '1px solid #c4c9cf'
        }}>
          <label className="block text-lg font-semibold mb-4" style={{color: 'rgb(14, 50, 60)'}}>
            Current Age: {currentAge}
          </label>
          <input
            type="range"
            min="18"
            max="80"
            value={currentAge}
            onChange={(e) => setCurrentAge(Number(e.target.value))}
            className="w-full about-you-slider"
            style={{accentColor: '#6E8F7C'}}
          />
        </div>
        
        {/* Module: Retirement Age */}
        <div className="rounded shadow-md mb-6 p-6 page-break-avoid" style={{
          backgroundColor: 'white',
          borderRadius: '4px',
          boxShadow: '0 2px 4px -1px rgba(0, 0, 0, 0.35)',
          border: '1px solid #c4c9cf'
        }}>
          <label className="block text-lg font-semibold mb-4" style={{color: 'rgb(14, 50, 60)'}}>
            Desired Retirement Age: {retirementAge}
          </label>
          <input
            type="range"
            min="50"
            max="80"
            value={retirementAge}
            onChange={(e) => setRetirementAge(Number(e.target.value))}
            className="w-full about-you-slider"
            style={{accentColor: '#6E8F7C'}}
          />
          <p className="text-sm text-[#4B4B4B] mt-3">
            {retirementAge - currentAge} years until retirement
          </p>
        </div>

        {/* Module: Current Annual Income */}
        <div id="module-income" className="rounded shadow-md mb-6 p-6 page-break-avoid" style={{
          backgroundColor: 'white',
          borderRadius: '4px',
          boxShadow: '0 2px 4px -1px rgba(0, 0, 0, 0.35)',
          border: '1px solid #c4c9cf'
        }}>
          <label className="block text-lg font-semibold mb-4" style={{color: 'rgb(14, 50, 60)'}}>
            Current Annual Income
          </label>
          <div className="relative mb-4">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#4B4B4B]">$</span>
            <input
              type="text"
              inputMode="decimal"
              value={formatNumberWithCommas(annualIncome)}
              onChange={(e) => setAnnualIncome(parseFormattedNumber(e.target.value) || 0)}
              className="w-full pl-8 pr-4 py-2 text-lg border rounded-lg focus:ring-2 focus:border-transparent"
              style={{borderColor: '#e5e7eb', color: 'rgb(14, 50, 60)'}}
            />
          </div>
          <input
            type="range"
            min="20000"
            max="150000"
            step="1000"
            value={Math.min(annualIncome, 150000)}
            onChange={(e) => setAnnualIncome(Number(e.target.value))}
            className="w-full"
          />
          {!quickMode && <p className="text-sm text-[#4B4B4B] mt-3">For income above $150k, enter the amount directly.</p>}
        </div>

        {/* Module: Net Monthly Take-Home (Optional) */}
        <div className="rounded shadow-md mb-6 p-6 page-break-avoid" style={{
          backgroundColor: 'white',
          borderRadius: '4px',
          boxShadow: '0 2px 4px -1px rgba(0, 0, 0, 0.35)',
          border: '1px solid #c4c9cf'
        }}>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-lg font-semibold" style={{color: 'rgb(14, 50, 60)'}}>
              Monthly Take-Home Pay <span className="text-sm font-normal text-[#4B4B4B]">(optional)</span>
            </label>
            <button
              onClick={() => { setHasNetMonthly(!hasNetMonthly); if (hasNetMonthly) setNetMonthlyTakeHome(0); }}
              className="text-sm px-3 py-1 rounded border transition-colors"
              style={{
                backgroundColor: hasNetMonthly ? 'rgb(14,50,60)' : 'white',
                color: hasNetMonthly ? 'white' : 'rgb(14,50,60)',
                borderColor: 'rgb(14,50,60)'
              }}
            >{hasNetMonthly ? 'Remove' : 'Add'}</button>
          </div>
          {!quickMode && <p className="text-sm text-[#4B4B4B] mb-4 leading-relaxed">What actually hits your bank account each month — after taxes and deductions. This helps us show your retirement income in a way that feels familiar, so you can compare future monthly income to what you live on today.</p>}
          {hasNetMonthly && (
            <div className="mt-3">
              <div className="relative mb-2">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#4B4B4B]">$</span>
                <input
                  type="text"
                  inputMode="decimal"
                  value={formatNumberWithCommas(netMonthlyTakeHome)}
                  onChange={(e) => setNetMonthlyTakeHome(parseFormattedNumber(e.target.value) || 0)}
                  className="w-full pl-8 pr-4 py-2 text-lg border rounded-lg focus:ring-2 focus:border-transparent"
                  style={{borderColor: '#e5e7eb', color: 'rgb(14, 50, 60)'}}
                  placeholder="e.g. 4200"
                />
              </div>
              <input
                type="range"
                min="0"
                max="15000"
                step="100"
                value={netMonthlyTakeHome}
                onChange={(e) => setNetMonthlyTakeHome(Number(e.target.value))}
                style={{accentColor: 'rgb(14, 50, 60)'}}
                className="w-full"
              />
            </div>
          )}
        </div>

        {/* Your Savings Section - Modular Design */}
        
        {/* Section Title Card */}
        <div id="your-savings-section" className="rounded shadow-md mb-3 page-break-avoid" style={{
          backgroundColor: '#C58B6A',
          padding: '16px',
          borderRadius: '4px',
          boxShadow: '0 2px 4px -1px rgba(0, 0, 0, 0.35)',
          border: '1px solid #c4c9cf'
        }}>
          <h2 className="text-2xl font-bold text-white" style={{fontWeight: 700, margin: 0}}>Your Savings</h2>
        </div>
        
        {/* Temporary: Keep old format for modules while testing */}
        
        {/* Module: Current Retirement Account Balances */}
        <div id="module-savings-balance" className="rounded shadow-md mb-3 p-6 page-break-avoid" style={{
          backgroundColor: 'white',
          borderRadius: '4px',
          boxShadow: '0 2px 4px -1px rgba(0, 0, 0, 0.35)',
          border: '1px solid #c4c9cf'
        }}>
          <label className="block text-lg font-semibold mb-4" style={{color: 'rgb(14, 50, 60)'}}>
            Current Retirement Account Balances
          </label>
          <div className="relative mb-4">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#4B4B4B]">$</span>
            <input
              type="text"
              inputMode="decimal"
              value={formatNumberWithCommas(currentSavings)}
              onChange={(e) => setCurrentSavings(parseFormattedNumber(e.target.value) || 0)}
              className="w-full pl-8 pr-4 py-2 text-lg border rounded-lg focus:ring-2 focus:border-transparent"
              style={{borderColor: '#e5e7eb', color: 'rgb(14, 50, 60)'}}
            />
          </div>
          <input
            type="range"
            min="0"
            max="1000000"
            step="1000"
            value={currentSavings}
            onChange={(e) => setCurrentSavings(Number(e.target.value))}
            className="w-full"
          />
          <p className="text-base text-[#4B4B4B] mt-3">Total across all 401(k), IRA, Roth, and other retirement accounts</p>
        </div>
                
        {/* Module: Employer-Supported Contributions */}
        <div id="module-contributions" className="rounded shadow-md mb-3 p-6 page-break-avoid" style={{
          backgroundColor: 'white',
          borderRadius: '4px',
          boxShadow: '0 2px 4px -1px rgba(0, 0, 0, 0.35)',
          border: '1px solid #c4c9cf'
        }}>
          <label className="block text-lg font-semibold mb-1" style={{color: 'rgb(14, 50, 60)'}}>
            Employer-Supported Contributions
          </label>
          <p className="text-base text-[#4B4B4B] mb-3">(401k, 403b, etc.)</p>
          {!quickMode && <p className="text-base text-[#4B4B4B] mb-4">
            Enter how much you contribute each month to your employer-sponsored retirement plan. If your employer offers matching, we'll factor that in below.
          </p>}
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#4B4B4B]">$</span>
            <input
              type="text"
              inputMode="decimal"
              value={formatNumberWithCommas(monthlyContribution)}
              onChange={(e) => {
                const value = parseFormattedNumber(e.target.value) || 0;
                setMonthlyContribution(value);
                setContributionPercent(((value / (annualIncome / 12)) * 100));
              }}
              className="w-full pl-8 pr-4 py-2 text-lg border rounded-lg focus:ring-2 focus:border-transparent"
              style={{borderColor: '#e5e7eb', color: 'rgb(14, 50, 60)'}}
            />
          </div>
          <p className="text-base text-[#4B4B4B] mt-1 mb-3">
            That's {contributionPercent.toFixed(1)}% of your monthly income
          </p>
          <input
            type="range"
            min="0"
            max="30"
            step="0.5"
            value={contributionPercent}
            onChange={(e) => {
              const percent = Number(e.target.value);
              setContributionPercent(percent);
              setMonthlyContribution(Math.round((annualIncome / 12) * (percent / 100)));
            }}
            style={{accentColor: 'rgb(14, 50, 60)'}}
            className="w-full"
          />
          
          {(() => {
            const desiredAnnual = monthlyContribution * 12;
            const baseLimit = 24500;
            const isOverBaseLimit = desiredAnnual > baseLimit;
            
            // Only show warning if they're over base limit without catch-up checked
            if (isOverBaseLimit && !useCatchupContributions) {
              return (
                <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-start gap-2">
                    <span className="text-blue-600 text-lg">💡</span>
                    <div className="flex-1">
                      <p className="text-base font-medium text-blue-900 mb-1">
                        401(k) Base Limit Reached
                      </p>
                      <p className="text-sm text-blue-800 mb-2">
                        <strong>Desired annual:</strong> {formatCurrency(desiredAnnual)}<br/>
                        <strong>Current limit:</strong> {formatCurrency(baseLimit)}/year
                      </p>
                      <p className="text-xs text-blue-700">
                        Your contributions are capped at $24,500/year. If you plan to contribute more at age 50+, 
                        check the "Plan to max out contributions at age 50+" box below.
                      </p>
                    </div>
                  </div>
                </div>
              );
            }
            
            return null;
          })()}

          <div className="p-3 rounded border mt-4" style={{backgroundColor: '#f4f3ef', borderColor: '#e5e7eb'}}>
            {quickMode ? (
              <>
                <div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => setQuickCatchupExpanded(!quickCatchupExpanded)}
                >
                  <label className="flex items-center gap-2 text-sm cursor-pointer" onClick={e => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={useCatchupContributions}
                      onChange={(e) => setUseCatchupContributions(e.target.checked)}
                      className="rounded mt-0.5"
                      style={{accentColor: 'rgb(14, 50, 60)'}}
                    />
                    <span className="font-medium" style={{color: 'rgb(14, 50, 60)'}}>Plan to max out contributions at age 50+ ($32,500/year)</span>
                  </label>
                  <span className="text-sm ml-2 flex-shrink-0" style={{color: 'rgb(107, 114, 128)'}}>{quickCatchupExpanded ? '−' : '+'}</span>
                </div>
                {quickCatchupExpanded && (
                  <p className="text-sm text-[#4B4B4B] mt-2 ml-5">
                    Check this if you plan to maximize your 401(k) contributions once you turn 50.
                    From age 50 until retirement, your projections will use the maximum contribution of $32,500/year.
                    This is a common strategy to accelerate savings as you approach retirement.
                  </p>
                )}
              </>
            ) : (
              <label className="flex items-start gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={useCatchupContributions}
                  onChange={(e) => setUseCatchupContributions(e.target.checked)}
                  className="rounded mt-0.5"
                  style={{accentColor: 'rgb(14, 50, 60)'}}
                />
                <div>
                  <span className="font-medium" style={{color: 'rgb(14, 50, 60)'}}>
                    Plan to max out contributions at age 50+ ($32,500/year)
                  </span>
                  <p className="text-sm text-[#4B4B4B] mt-1">
                    Check this if you plan to maximize your 401(k) contributions once you turn 50.
                    From age 50 until retirement, your projections will use the maximum contribution of $32,500/year.
                    This is a common strategy to accelerate savings as you approach retirement.
                  </p>
                </div>
              </label>
            )}
          </div>
        </div>
        
        {/* Employer Match Module */}
        <div id="module-employer-match" className="rounded shadow-md mb-3 p-6 page-break-avoid" style={{
          backgroundColor: 'white',
          borderRadius: '4px',
          boxShadow: '0 2px 4px -1px rgba(0, 0, 0, 0.35)',
          border: '1px solid #c4c9cf'
        }}>
          <label className="block text-lg font-semibold mb-4" style={{color: 'rgb(14, 50, 60)'}}>
            Employer Match: {employerMatchRate}% up to {employerMatchUpTo}%
          </label>

          {!quickMode && <p className="text-base text-[#4B4B4B] mb-3">
            Example: 100% match up to 6% means if you contribute 6%+, employer adds another 6%
          </p>}

          <div className="space-y-4">
            <div>
              <div className="mb-1">
                <span style={{color: 'rgb(14, 50, 60)', fontWeight: 600, fontSize: '0.875rem'}}>{employerMatchRate}%</span>
                <span className="text-sm text-[#4B4B4B] ml-2">Match rate</span>
              </div>
              <input
                type="range"
                min="0"
                max="200"
                step="25"
                value={employerMatchRate}
                onChange={(e) => setEmployerMatchRate(Number(e.target.value))}
                style={{accentColor: 'rgb(14, 50, 60)'}}
                className="w-full"
              />
            </div>

            <div>
              <div className="mb-1">
                <span style={{color: 'rgb(14, 50, 60)', fontWeight: 600, fontSize: '0.875rem'}}>{employerMatchUpTo}%</span>
                <span className="text-sm text-[#4B4B4B] ml-2">Up to % of salary</span>
              </div>
              <input
                type="range"
                min="0"
                max="15"
                step="0.5"
                value={employerMatchUpTo}
                onChange={(e) => setEmployerMatchUpTo(Number(e.target.value))}
                style={{accentColor: 'rgb(14, 50, 60)'}}
                className="w-full"
              />
            </div>
          </div>

          {!quickMode && <>
          <p className="text-sm text-[#4B4B4B] mt-4">
            No employer match? Slide both to 0%
          </p>
          <p className="text-sm text-[#4B4B4B] mt-4">
            <strong>Important:</strong> Employer match contributions don't count toward IRS contribution limits. Try to contribute at least enough to receive the full employer match — it's one of the most effective ways to boost your savings.
          </p>
          <div className="mt-4 p-3 rounded border" style={{backgroundColor: '#f4f3ef', borderColor: '#e5e7eb'}}>
            <p className="text-sm font-semibold mb-2" style={{color: 'rgb(14,50,60)'}}>Roth vs. Traditional — do you have a choice?</p>
            <p className="text-sm text-[#4B4B4B] mb-2">Many 401(k) plans now offer both options, and you can split contributions between them:</p>
            <p className="text-sm text-[#4B4B4B] mb-1"><strong>Traditional:</strong> Contributions reduce your taxable income today. You pay taxes on withdrawals in retirement. Better if you expect a lower tax rate later.</p>
            <p className="text-sm text-[#4B4B4B] mb-2"><strong>Roth:</strong> Contributions are after-tax — no immediate break — but all withdrawals in retirement (including decades of growth) are completely tax-free. Better if you expect a higher tax rate later.</p>
            <p className="text-sm text-[#4B4B4B]">SonderSave calculates your total savings regardless of tax treatment, but it's worth checking with your HR or plan administrator to see which options are available to you.</p>
          </div>
          </>}

        </div>

        {/* Expected Return Rate Module */}
        <div id="module-return-rate" className="rounded shadow-md mb-3 p-6 page-break-avoid" style={{
          backgroundColor: 'white',
          borderRadius: '4px',
          boxShadow: '0 2px 4px -1px rgba(0, 0, 0, 0.35)',
          border: '1px solid #c4c9cf'
        }}>
          <label className="block text-lg font-semibold mb-4" style={{color: 'rgb(14, 50, 60)'}}>
            Expected Return Rate: {expectedReturn}%
          </label>

          {!quickMode && <p className="text-base text-[#4B4B4B] mb-4">
            Your investment approach influences how your savings grow over time. If you're not sure, a moderate default of 6.5% is a reasonable starting point for most long-term investors.
          </p>}

          <input
            type="range"
            min="0"
            max="12"
            step="0.5"
            value={expectedReturn}
            onChange={(e) => setExpectedReturn(Number(e.target.value))}
            className="w-full"
          />
          {!quickMode && <>
          <p className="text-base text-[#4B4B4B] mt-3">
            <strong>Conservative</strong> (4-6%): Lower risk, steadier returns. Typically 60-80% bonds, 20-40% stocks.
          </p>
          <p className="text-base text-[#4B4B4B] mt-1">
            <strong>Moderate</strong> (6-8%): Balanced growth and safety. Typically 50-60% stocks, 40-50% bonds.
          </p>
          <p className="text-base text-[#4B4B4B] mt-1">
            <strong>Aggressive</strong> (8-10%+): Higher growth potential, higher risk. Typically 80-100% stocks, 0-20% bonds.
          </p>
          </>}

          <div className="p-3 rounded border mt-4" style={{backgroundColor: '#f4f3ef', borderColor: '#e5e7eb'}}>
            {quickMode ? (
              <>
                <div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => setQuickTargetDateExpanded(!quickTargetDateExpanded)}
                >
                  <label className="flex items-center gap-2 text-sm cursor-pointer" onClick={e => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      onChange={(e) => { if (e.target.checked) setExpectedReturn(6.5); }}
                      className="rounded mt-0.5"
                      style={{accentColor: 'rgb(14, 50, 60)'}}
                    />
                    <span className="font-medium" style={{color: 'rgb(14, 50, 60)'}}>Have a target-date fund?</span>
                  </label>
                  <span className="text-sm ml-2 flex-shrink-0" style={{color: 'rgb(107, 114, 128)'}}>{quickTargetDateExpanded ? '−' : '+'}</span>
                </div>
                {quickTargetDateExpanded && (
                  <p className="text-sm text-[#4B4B4B] mt-2 ml-5">
                    Target-date funds automatically shift from more aggressive investments early on to more conservative ones near retirement. We use 6.5% as a blended long-term estimate.
                  </p>
                )}
              </>
            ) : (
              <label className="flex items-start gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  onChange={(e) => { if (e.target.checked) setExpectedReturn(6.5); }}
                  className="rounded mt-0.5"
                  style={{accentColor: 'rgb(14, 50, 60)'}}
                />
                <div>
                  <span className="font-medium" style={{color: 'rgb(14, 50, 60)'}}>Have a target-date fund?</span>
                  <p className="text-sm text-[#4B4B4B] mt-1">
                    Target-date funds automatically shift from more aggressive investments early on to more conservative ones near retirement. We use 6.5% as a blended long-term estimate.
                  </p>
                </div>
              </label>
            )}
          </div>

          {!quickMode && <div className="p-3 rounded border mt-4" style={{backgroundColor: '#f4f3ef', borderColor: '#e5e7eb'}}>
            <p className="text-sm text-[#4B4B4B]" style={{margin: 0}}>
              <strong>Note:</strong> Investment strategies often shift when entering retirement. Many people move from aggressive to moderate or conservative accounts to protect their funds from market volatility.
            </p>
          </div>}
        </div>

        {/* Individual Accounts Module */}
        <div id="module-personal-accounts" className="rounded shadow-md mb-6 p-6 page-break-avoid" style={{
          backgroundColor: 'white',
          borderRadius: '4px',
          boxShadow: '0 2px 4px -1px rgba(0, 0, 0, 0.35)',
          border: '1px solid #c4c9cf'
        }}>
          <label className="block text-lg font-semibold mb-1" style={{color: 'rgb(14, 50, 60)'}}>
            Personal Retirement Accounts
          </label>
          {!quickMode && <p className="text-sm text-[#4B4B4B] mb-4">For contributions to IRAs, Roth IRAs, brokerage accounts, or any personal retirement savings — including SEP-IRAs and Solo 401(k)s for the self-employed. Leave at zero if this doesn't apply to you.</p>}

          <div className="mb-4">
            <label className="block text-base font-semibold mb-2" style={{color: 'rgb(14, 50, 60)'}}>
              Monthly Contribution
            </label>
            <div className="relative mb-2">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#4B4B4B]">$</span>
              <input
                type="text"
                inputMode="decimal"
                value={formatNumberWithCommas(individualContribution)}
                onChange={(e) => {
                  const value = parseFormattedNumber(e.target.value) || 0;
                  setIndividualContribution(value);
                  setIndividualContributionPercent(((value / (annualIncome / 12)) * 100));
                  setHasIndividualContributions(value > 0);
                }}
                className="w-full pl-8 pr-4 py-2 text-lg border rounded-lg focus:ring-2 focus:border-transparent"
                style={{borderColor: '#e5e7eb', color: 'rgb(14, 50, 60)'}}
              />
            </div>
            <p className="text-sm text-[#4B4B4B] mb-2">
              That's {individualContributionPercent.toFixed(1)}% of your monthly income
            </p>
            <input
              type="range"
              min="0"
              max="30"
              step="0.5"
              value={individualContributionPercent}
              onChange={(e) => {
                const percent = Number(e.target.value);
                setIndividualContributionPercent(percent);
                setIndividualContribution(Math.round((annualIncome / 12) * (percent / 100)));
                setHasIndividualContributions(percent > 0);
              }}
              style={{accentColor: 'rgb(14, 50, 60)'}}
              className="w-full"
            />
            {individualContribution > 583 && !quickMode && (
              <div className="mt-3 p-3 rounded border" style={{backgroundColor: '#fef9f0', borderColor: '#f4c06f'}}>
                <p className="text-sm text-[#4B4B4B]"><strong>IRA contribution limit:</strong> Standard IRAs (Traditional and Roth) are capped at $7,000/year ($583/month) in 2025, or $8,000 if you're 50+. If you're contributing more than this, you may be using a SEP-IRA, Solo 401(k), or brokerage account — which have different limits. See the <strong>Glossary</strong> or consult a tax professional for guidance.</p>
              </div>
            )}
          </div>

          <div>
            <label className="block text-base font-semibold mb-2" style={{color: 'rgb(14, 50, 60)'}}>
              Expected Return Rate: {individualReturnRate}%
            </label>
            <input
              type="range"
              min="0"
              max="12"
              step="0.5"
              value={individualReturnRate}
              onChange={(e) => setIndividualReturnRate(Number(e.target.value))}
              className="w-full mb-2"
            />
            <p className="text-sm text-[#4B4B4B]">
              Personal accounts can have different investment strategies than employer plans
            </p>
            {!quickMode && <div className="mt-3 p-3 rounded border" style={{backgroundColor: '#f4f3ef', borderColor: '#e5e7eb'}}>
              <p className="text-sm text-[#4B4B4B]"><strong>Self-employed?</strong> Solo 401(k)s and SEP-IRAs have significantly higher contribution limits than standard IRAs — up to $70,000/year in 2025. The right plan depends on your net earnings and business structure. See the <strong>Glossary</strong> for an overview, or speak with a tax professional to find the best fit.</p>
            </div>}
            {individualReturnRate > 10 && (
              <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded">
                <p className="text-xs text-blue-800">
                  💡 <strong>High expected returns (10%+)</strong> are possible with aggressive, diversified portfolios (growth stocks, small-cap funds), especially for younger investors. However, if these returns are based on Bitcoin, single stocks, or other speculative investments, consider using more conservative estimates (4-7%) for reliable long-term planning.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Retirement Income Sources Section */}

        {/* Section Title Card */}
        <div id="income-planning-section" className="rounded shadow-md mb-3 page-break-avoid" style={{
          backgroundColor: '#C58B6A',
          padding: '16px',
          borderRadius: '4px',
          boxShadow: '0 2px 4px -1px rgba(0, 0, 0, 0.35)',
          border: '1px solid #c4c9cf'
        }}>
          <h2 className="text-2xl font-bold text-white" style={{fontWeight: 700, margin: 0}}>Growth Planning</h2>
        </div>

        {/* Module: Expected Inflation Rate */}
        <div id="module-inflation" className="rounded shadow-md mb-3 p-6 page-break-avoid" style={{
          backgroundColor: 'white',
          borderRadius: '4px',
          boxShadow: '0 2px 4px -1px rgba(0, 0, 0, 0.35)',
          border: '1px solid #c4c9cf'
        }}>
          <label className="block text-lg font-semibold mb-4" style={{color: 'rgb(14, 50, 60)'}}>
            Expected Inflation Rate: {inflationRate}%
          </label>
          <input
            type="range"
            min="0"
            max="6"
            step="0.5"
            value={inflationRate}
            onChange={(e) => setInflationRate(Number(e.target.value))}
            className="w-full"
          />
          {!quickMode && <p className="text-base text-[#4B4B4B] mt-3">
            Historical inflation has averaged about 2.5–3%. We use 3% as the default.
          </p>}
        </div>

        {/* Module: Potential Career Salary Growth */}
        <div id="module-salary-growth" className="rounded shadow-md mb-3 p-6 page-break-avoid" style={{
          backgroundColor: 'white',
          borderRadius: '4px',
          boxShadow: '0 2px 4px -1px rgba(0, 0, 0, 0.35)',
          border: '1px solid #c4c9cf'
        }}>
          <label className="block text-lg font-semibold mb-4" style={{color: 'rgb(14, 50, 60)'}}>
            Potential Career Salary Growth
          </label>

          {!quickMode && <p className="text-base text-[#4B4B4B] mb-4">
            A 3% raise typically keeps pace with inflation. Sustained career growth is often higher. Adjust this to reflect your expected trajectory.
          </p>}

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="p-3 rounded border" style={{backgroundColor: '#f4f3ef', borderColor: '#e5e7eb'}}>
              <p className="text-sm text-[#4B4B4B] mb-1">Expected Annual Raise</p>
              <p className="text-2xl font-bold text-[#3A4446]">{annualRaise}%</p>
            </div>
            <div className="p-3 rounded border" style={{backgroundColor: '#f4f3ef', borderColor: '#e5e7eb'}}>
              <p className="text-sm text-[#4B4B4B] mb-1">Career-End Salary</p>
              <p className="text-2xl font-bold text-[#3A4446]">
                {formatCurrency((annualIncome * Math.pow(1 + annualRaise / 100, retirementAge - currentAge)) / Math.pow(1 + inflationRate / 100, retirementAge - currentAge))}
              </p>
              <p className="text-xs text-[#4B4B4B]">(in today's dollars)</p>
            </div>
          </div>

          <input
            type="range"
            min="0"
            max="10"
            step="0.1"
            value={annualRaise}
            onChange={(e) => setAnnualRaise(Number(e.target.value))}
            className="w-full"
          />

          {!quickMode && <div className="p-3 rounded border mt-4" style={{backgroundColor: '#f4f3ef', borderColor: '#e5e7eb'}}>
            <p className="text-sm text-[#4B4B4B]" style={{margin: 0}}>
              <strong>Note:</strong> Career growth often isn't linear — raises may be higher early on and slower later. This tool uses a consistent rate for simplicity. Adjust your percentage to reflect your overall expectations.
            </p>
          </div>}
        </div>

        {/* Module: Retirement Income Goal */}
        <div id="module-income-goal" className="rounded shadow-md mb-6 p-6 page-break-avoid" style={{
          backgroundColor: 'white',
          borderRadius: '4px',
          boxShadow: '0 2px 4px -1px rgba(0, 0, 0, 0.35)',
          border: '1px solid #c4c9cf'
        }}>
          <label className="block text-lg font-semibold mb-4" style={{color: 'rgb(14, 50, 60)'}}>
            Retirement Income Goal
          </label>
          {!quickMode && <p className="text-base text-[#4B4B4B] mb-4">
            Think of retirement as the income you'll need each year — not just a savings total. These scenarios show what percentage of your current income you might aim for.
          </p>}

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="p-3 rounded border" style={{backgroundColor: '#f4f3ef', borderColor: '#e5e7eb'}}>
              <p className="text-sm text-[#4B4B4B] mb-1">In today's dollars</p>
              <p className="text-2xl font-bold mb-1 text-[#3A4446]">
                {formatCurrency(annualIncome * (retirementIncomeGoal / 100))}
              </p>
            </div>
            <div className="p-3 rounded border" style={{backgroundColor: '#f4f3ef', borderColor: '#e5e7eb'}}>
              <p className="text-sm text-[#4B4B4B] mb-1">In future dollars</p>
              <p className="text-2xl font-bold mb-1 text-[#3A4446]">
                {formatCurrency((annualIncome * (retirementIncomeGoal / 100)) * Math.pow(1 + inflationRate / 100, retirementAge - currentAge))}
              </p>
            </div>
          </div>

          <div className="text-center mb-2">
            <span className="text-lg font-semibold" style={{color: 'rgb(14, 50, 60)'}}>
              {retirementIncomeGoal}% of current income
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="200"
            step="5"
            value={retirementIncomeGoal}
            onChange={(e) => setRetirementIncomeGoal(Number(e.target.value))}
            style={{accentColor: 'rgb(14, 50, 60)'}}
            className="w-full"
          />

          {!quickMode && <div className="p-3 rounded border mt-4" style={{backgroundColor: '#f4f3ef', borderColor: '#e5e7eb'}}>
            <p className="text-sm text-[#4B4B4B] mb-1"><strong>50–70%</strong><br/>Mortgage likely paid off, fewer ongoing expenses</p>
            <p className="text-sm text-[#4B4B4B] mb-1"><strong>70–80%</strong><br/>Most major debts cleared, reduced work-related costs</p>
            <p className="text-sm text-[#4B4B4B]" style={{margin: 0}}><strong>90–100%+</strong><br/>Ongoing housing costs and monthly obligations</p>
          </div>}
        </div>


        {/* Retirement Outlook Section */}
        {/* Section Title Card */}
        <div id="retirement-income-section" className="rounded shadow-md mb-3 page-break-avoid" style={{
          backgroundColor: '#C58B6A',
          padding: '16px',
          borderRadius: '4px',
          boxShadow: '0 2px 4px -1px rgba(0, 0, 0, 0.35)',
          border: '1px solid #c4c9cf'
        }}>
          <h2 className="text-2xl font-bold text-white" style={{fontWeight: 700, margin: 0}}>Retirement Income Sources</h2>
        </div>

        {/* Module: Pension */}
        <div id="module-pension" className="rounded shadow-md mb-3 p-6 page-break-avoid" style={{
          backgroundColor: 'white',
          borderRadius: '4px',
          boxShadow: '0 2px 4px -1px rgba(0, 0, 0, 0.35)',
          border: '1px solid #c4c9cf'
        }}>
          <label className="block text-lg font-semibold mb-4" style={{color: 'rgb(14, 50, 60)'}}>
            Pension
          </label>

          {!quickMode && <p className="text-base text-[#4B4B4B] mb-3">
            Beyond your savings and investments, you may have other income sources in retirement.
          </p>}

          <label className="flex items-center gap-2 text-base text-[#4B4B4B] cursor-pointer mb-3">
            <input
              type="checkbox"
              checked={hasPension}
              onChange={(e) => setHasPension(e.target.checked)}
              className="rounded"
              style={{accentColor: 'rgb(14, 50, 60)'}}
            />
            I'll have pension income at retirement
          </label>

          {hasPension && (
            <div className="p-4 rounded-lg" style={{backgroundColor: '#f4f3ef', border: '1px solid #e5e7eb'}}>

              {/* Amount slider */}
              <div className="flex justify-between items-baseline mb-2">
                <label className="text-base font-semibold" style={{color: 'rgb(14, 50, 60)'}}>
                  Monthly Pension: {formatCurrency(pensionAmount)}
                </label>
                <span className="text-sm text-[#4B4B4B]">{formatCurrency(pensionAmount * 12)}/yr · {((pensionAmount * 12 / annualIncome) * 100).toFixed(1)}% of income</span>
              </div>
              <input
                type="range"
                min="0"
                max="20000"
                step="100"
                value={pensionAmount}
                onChange={(e) => setPensionAmount(Number(e.target.value))}
                style={{accentColor: 'rgb(14, 50, 60)'}}
                className="w-full mb-5"
              />

              {/* Pension start age slider */}
              <label className="block text-base font-semibold mb-2" style={{color: 'rgb(14, 50, 60)'}}>
                Pension Starts at Age: {pensionStartAge}
              </label>
              <input
                type="range"
                min="55"
                max="75"
                step="1"
                value={pensionStartAge}
                onChange={(e) => setPensionStartAge(Number(e.target.value))}
                style={{accentColor: 'rgb(14, 50, 60)'}}
                className="w-full mb-4"
              />

              {/* Gap warning if pension starts after retirement */}
              {pensionStartAge > retirementAge && (
                <div className="rounded border p-3" style={{backgroundColor: '#fef9f0', borderColor: '#f4c06f'}}>
                  <p className="text-sm font-semibold mb-1" style={{color: '#b45309'}}>
                    ⚠️ Income gap: {pensionStartAge - retirementAge} year{pensionStartAge - retirementAge !== 1 ? 's' : ''}
                  </p>
                  <p className="text-sm" style={{color: '#92400e'}}>
                    You'll retire at {retirementAge} but your pension won't start until {pensionStartAge}. Your savings will need to cover {formatCurrency(pensionAmount * 12)}/year in pension income for {pensionStartAge - retirementAge} years before it kicks in.
                  </p>
                </div>
              )}

              {/* Pension starts before retirement — just note it */}
              {pensionStartAge < retirementAge && (
                <div className="rounded border p-3" style={{backgroundColor: '#f0f7f4', borderColor: '#a7c9b8'}}>
                  <p className="text-sm" style={{color: '#3A4446'}}>
                    ✓ Your pension starts {retirementAge - pensionStartAge} year{retirementAge - pensionStartAge !== 1 ? 's' : ''} before retirement — that income will be included in your retirement outlook.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Module: Social Security */}
        <div id="module-social-security" className="rounded shadow-md mb-3 p-6 page-break-avoid" style={{
          backgroundColor: 'white',
          borderRadius: '4px',
          boxShadow: '0 2px 4px -1px rgba(0, 0, 0, 0.35)',
          border: '1px solid #c4c9cf'
        }}>
          <label className="block text-lg font-semibold mb-4" style={{color: 'rgb(14, 50, 60)'}}>
            Monthly Social Security Benefit
          </label>
          {!quickMode && <p className="text-base text-[#4B4B4B] mb-3">
            Most people receive Social Security benefits in retirement. The current average monthly benefit is about $1,900. Use the slider to enter if you think you'll receive about average, more, or less. Maximum benefit is $5,100/month.
          </p>}

          {retirementAge < 62 && (
            <div className="bg-amber-50 border border-amber-200 rounded p-3 mb-3">
              <p className="text-xs text-amber-800">
                <strong>Important:</strong> Social Security benefits aren't available until age 62 (reduced) or 67 (full benefits).
                Your retirement plan from age {retirementAge} to 62 ({62 - retirementAge} years) will rely entirely on your savings and other income sources.
              </p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="p-3 rounded border" style={{backgroundColor: '#f4f3ef', borderColor: '#e5e7eb'}}>
              <p className="text-sm text-[#4B4B4B] mb-1">Monthly Benefit (Today's Dollars)</p>
              <p className="text-2xl font-bold text-[#3A4446]">{formatCurrency(socialSecurityAmount)}</p>
            </div>
            <div className="p-3 rounded border" style={{backgroundColor: '#f4f3ef', borderColor: '#e5e7eb'}}>
              <p className="text-sm text-[#4B4B4B] mb-1">Monthly Benefit (Future Dollars)</p>
              <p className="text-2xl font-bold text-[#3A4446]">
                {formatCurrency(socialSecurityAmount * Math.pow(1 + inflationRate / 100, retirementAge - currentAge))}
              </p>
              <p className="text-xs text-[#4B4B4B]">At retirement</p>
            </div>
          </div>

          <input
            type="range"
            min="0"
            max="5100"
            step="100"
            value={socialSecurityAmount}
            onChange={(e) => {
              const amount = Number(e.target.value);
              setSocialSecurityAmount(amount);
              setSocialSecurityPercent(((amount * 12 / annualIncome) * 100));
            }}
            className="w-full mb-3"
          />

          {!quickMode && <p className="text-sm text-[#4B4B4B] mb-2">
            <strong>Based on today's dollars.</strong> Average benefit is ~$1,900/month. Maximum is $5,100/month.
          </p>}
          <p className="text-base text-[#4B4B4B] mt-3">
            Annual benefit: {formatCurrency(socialSecurityAmount * 12)} per year
          </p>

          <p className="text-sm text-[#4B4B4B] mt-4">
            Get your personalized estimate at <a href="https://www.ssa.gov/myaccount/" target="_blank" rel="noopener noreferrer" className="underline" style={{color: 'rgb(14, 50, 60)'}}>ssa.gov/myaccount</a>
          </p>
          {!quickMode && <div className="p-3 rounded border mt-3" style={{backgroundColor: '#f4f3ef', borderColor: '#e5e7eb'}}>
            <p className="text-sm text-[#4B4B4B]" style={{margin: 0}}>
              <strong>Note:</strong> Your actual benefit depends on your earnings history and when you claim (ages 62-70). You may also want to review claiming strategies with a financial advisor.
            </p>
          </div>}
        </div>

        {/* Module: Withdrawal Rate */}
        <div id="module-withdrawal" className="rounded shadow-md mb-3 p-6 page-break-avoid" style={{
          backgroundColor: 'white',
          borderRadius: '4px',
          boxShadow: '0 2px 4px -1px rgba(0, 0, 0, 0.35)',
          border: '1px solid #c4c9cf'
        }}>
          <label className="block text-lg font-semibold mb-4" style={{color: 'rgb(14, 50, 60)'}}>
            Retirement Withdrawal
          </label>

          {!quickMode && <p className="text-base text-[#4B4B4B] mb-4">
            Your withdrawal rate determines how much income your savings can support in retirement. For example, if you've saved $500,000 and set a 4% withdrawal rate, you'd have $20,000 per year to draw from your savings. Combined with Social Security or other income, this becomes your retirement salary. A lower rate means less income but savings that last longer; a higher rate means more income but savings that may run out sooner.
          </p>}

          <label className="block text-base font-semibold mb-2" style={{color: 'rgb(14, 50, 60)'}}>
            Withdrawal Rate: {withdrawalRate}%
          </label>
          <input
            type="range"
            min="2"
            max="6"
            step="0.1"
            value={withdrawalRate}
            onChange={(e) => setWithdrawalRate(Number(e.target.value))}
            style={{accentColor: 'rgb(14, 50, 60)'}}
            className="w-full"
          />

          {/* Post-retirement return rate */}
          <div className="mt-6">
            <label className="block text-base font-semibold mb-2" style={{color: 'rgb(14, 50, 60)'}}>
              Expected Return Rate in Retirement: {retirementReturnRate}%
            </label>
            {!quickMode && <p className="text-sm text-[#4B4B4B] mb-3">
              Many people shift to more conservative investments in retirement to protect against market downturns. This is often lower than your pre-retirement rate. We default to 3.5% as a conservative estimate.
            </p>}
            <input
              type="range"
              min="0"
              max="10"
              step="0.5"
              value={retirementReturnRate}
              onChange={(e) => setRetirementReturnRate(Number(e.target.value))}
              style={{accentColor: 'rgb(14, 50, 60)'}}
              className="w-full"
            />
          </div>


          {/* Withdrawal rate guidance */}
          {!quickMode && <div className="p-3 rounded border mt-6" style={{backgroundColor: '#f4f3ef', borderColor: '#e5e7eb'}}>
            <p className="text-sm text-[#4B4B4B] mb-1"><strong>2-3%:</strong> Very conservative — your savings will likely outlast you, but you'll have less annual income.</p>
            <p className="text-sm text-[#4B4B4B] mb-1"><strong>4%:</strong> The Safe Withdrawal Rule default — historically sustainable for a 30-year retirement.</p>
            <p className="text-sm text-[#4B4B4B]" style={{margin: 0}}><strong>5-6%:</strong> More aggressive — higher annual income but savings may be depleted earlier.</p>
          </div>}

          {!quickMode && <div className="p-3 rounded border mt-3" style={{backgroundColor: '#f4f3ef', borderColor: '#e5e7eb'}}>
            <p className="text-sm text-[#4B4B4B]" style={{margin: 0}}>
              Withdrawal strategies can be complex. Consider consulting a Certified Financial Planner (CFP) for personalized guidance.
            </p>
          </div>}
        </div>


        {/* Suggestions Section */}
        {showSuggestions && suggestions.length > 0 && (
          <>
            {/* Title Card — collapsible in Quick mode */}
            <div
              className="rounded shadow-md mb-3 page-break-avoid"
              onClick={() => quickMode && setSuggestionsCollapsed(!suggestionsCollapsed)}
              style={{
                backgroundColor: '#C58B6A',
                padding: '16px',
                borderRadius: quickMode && !suggestionsCollapsed ? '4px 4px 0 0' : '4px',
                boxShadow: '0 2px 4px -1px rgba(0, 0, 0, 0.35)',
                border: '1px solid #c4c9cf',
                cursor: quickMode ? 'pointer' : 'default'
              }}
            >
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white" style={{fontWeight: 700, margin: 0}}>Ways to Reach Your Goal</h2>
                {quickMode && (
                  <span className="text-white text-xl">{suggestionsCollapsed ? '+' : '−'}</span>
                )}
              </div>
            </div>

            {/* Content Card — always shown in Guided, collapsible in Quick */}
            {(!quickMode || !suggestionsCollapsed) && (
              <div className="rounded shadow-md mb-3 p-6 page-break-avoid" style={{
                backgroundColor: 'white',
                borderRadius: '4px',
                boxShadow: '0 2px 4px -1px rgba(0, 0, 0, 0.35)',
                border: '1px solid #c4c9cf'
              }}>
                <p className="text-base text-[#4B4B4B] mb-4">
                  Based on your current plan, here are some options to help you reach {retirementIncomeGoal}% of your income in retirement:
                </p>
                <div className="space-y-3">
                  {suggestions.map((suggestion, index) => (
                    <div key={index} className="p-4 rounded-lg border" style={{backgroundColor: '#f4f3ef', borderColor: '#e5e7eb'}}>
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold"
                             style={{backgroundColor: 'rgb(14, 50, 60)', color: 'white'}}>
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium" style={{color: 'rgb(14, 50, 60)'}}>{suggestion.description}</p>
                          <p className="text-base text-[#4B4B4B] mt-1">{suggestion.impact}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-[#4B4B4B] mt-4 text-center">
                  These are estimates to help guide your planning. Consider consulting a financial advisor for personalized advice.
                </p>
                <button
                  onClick={() => { setCurrentPage('budget'); window.scrollTo(0, 0); }}
                  className="mt-3 text-sm font-medium underline"
                  style={{color: '#C58B6A'}}
                >
                  Get a detailed spending breakdown in the Budget tool →
                </button>
              </div>
            )}
          </>
        )}
        
        {/* Home Equity Section */}
        <div id="home-equity-section" className="rounded shadow-md mb-3 page-break-avoid" style={{
          backgroundColor: 'white',
          borderRadius: '4px',
          boxShadow: '0 2px 4px -1px rgba(0, 0, 0, 0.35)',
          border: '1px solid #c4c9cf'
        }}>
          <div
            className="cursor-pointer flex justify-between items-center"
            style={{
              backgroundColor: '#C58B6A',
              padding: '16px',
              borderRadius: considerHomeEquity ? '4px 4px 0 0' : '4px'
            }}
            onClick={() => setConsiderHomeEquity(!considerHomeEquity)}
          >
            <h2 className="text-2xl font-bold text-white" style={{fontWeight: 700, margin: 0}}>Home Equity (Optional)</h2>
            <span className="text-white text-2xl">{considerHomeEquity ? '−' : '+'}</span>
          </div>
          
          {considerHomeEquity && (
            <div className="p-6 space-y-6">
              {!quickMode && <p className="text-base text-[#4B4B4B]">
                If you plan to downsize in retirement, you could unlock home equity to supplement your income.
                This calculator estimates your home's value at retirement and potential equity if you sell and move to a smaller home.
              </p>}

              <div className="py-2">
                <label className="block text-lg font-semibold mb-4" style={{color: 'rgb(14, 50, 60)'}}>
                  Home Purchase Price: {formatCurrency(homePurchasePrice)}
                </label>
                <input
                  type="number"
                  value={homePurchasePrice}
                  onChange={(e) => setHomePurchasePrice(Number(e.target.value))}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  style={{borderColor: '#e5e7eb'}}
                />
              </div>

              <div className="py-2">
                <label className="block text-lg font-semibold mb-4" style={{color: 'rgb(14, 50, 60)'}}>
                  Year Purchased
                </label>
                <input
                  type="number"
                  value={homePurchaseYear}
                  onChange={(e) => setHomePurchaseYear(Number(e.target.value))}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  style={{borderColor: '#e5e7eb'}}
                  min="1950"
                  max={new Date().getFullYear()}
                />
                <p className="text-base text-[#4B4B4B] mt-1">
                  We'll assume a standard 30-year mortgage
                </p>
              </div>

              <div className="py-2">
                <label className="block text-lg font-semibold mb-4" style={{color: 'rgb(14, 50, 60)'}}>
                  Expected Home Appreciation Rate: {homeAppreciationRate}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="8"
                  step="0.5"
                  value={homeAppreciationRate}
                  onChange={(e) => setHomeAppreciationRate(Number(e.target.value))}
                  className="w-full"
              />
              <p className="text-base text-[#4B4B4B] mt-3">
                  Historical average is around 3-4% annually
                </p>
              </div>
              
              <div className="py-2">
                <label className="block text-lg font-semibold mb-4" style={{color: 'rgb(14, 50, 60)'}}>
                  Downsized Home Purchase Price: {formatCurrency(downsizeAmount)}
                </label>
                <input
                  type="number"
                  value={downsizeAmount}
                  onChange={(e) => setDownsizeAmount(Number(e.target.value))}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  style={{borderColor: '#e5e7eb'}}
                />
                <p className="text-base text-[#4B4B4B] mt-1">
                  Enter in today's dollars. At retirement ({retirementAge - currentAge} years), this would be approximately <strong>{formatCurrency(downsizeAmount * Math.pow(1 + homeAppreciationRate / 100, retirementAge - currentAge))}</strong> adjusted for {homeAppreciationRate}% home appreciation.
                </p>
              </div>
              
              {(() => {
                const currentYear = new Date().getFullYear();
                const yearsOwned = retirementAge - currentAge + (currentYear - homePurchaseYear);
                const mortgagePayoffYear = homePurchaseYear + 30;
                const yearsUntilPayoff = Math.max(0, mortgagePayoffYear - (currentYear + (retirementAge - currentAge)));
                const homeValueAtRetirement = homePurchasePrice * Math.pow(1 + homeAppreciationRate / 100, retirementAge - currentAge);
                
                // Simplified mortgage calculation - assume 20% down, rest financed
                const loanAmount = homePurchasePrice * 0.8;
                const remainingMortgage = yearsUntilPayoff > 0 ? loanAmount * (yearsUntilPayoff / 30) : 0;
                const netHomeEquity = homeValueAtRetirement - remainingMortgage;
                const downsizeAmountFuture = downsizeAmount * Math.pow(1 + homeAppreciationRate / 100, retirementAge - currentAge);
                const cashFromDownsize = netHomeEquity - downsizeAmountFuture;
                const additionalYearlyIncome = cashFromDownsize > 0 ? cashFromDownsize * (withdrawalRate / 100) : 0;
                
                return (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                    <h3 className="font-semibold mb-3" style={{color: 'rgb(14, 50, 60)'}}>
                      Home Equity Projection at Retirement
                    </h3>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-[#3A4446]">Estimated home value:</span>
                        <span className="font-semibold" style={{color: 'rgb(14, 50, 60)'}}>
                          {formatCurrency(homeValueAtRetirement)}
                        </span>
                      </div>
                      
                      {yearsUntilPayoff > 0 ? (
                        <>
                          <div className="flex justify-between">
                            <span className="text-[#3A4446]">Remaining mortgage:</span>
                            <span className="font-semibold text-red-600">
                              -{formatCurrency(remainingMortgage)}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm text-[#4B4B4B]">
                            <span>Mortgage paid off in {mortgagePayoffYear}</span>
                            <span>({yearsUntilPayoff} years after retirement)</span>
                          </div>
                        </>
                      ) : (
                        <div className="text-xs text-green-600">
                          ✓ Mortgage will be paid off before retirement ({mortgagePayoffYear})
                        </div>
                      )}
                      
                      <div className="border-t border-blue-300 my-2"></div>
                      
                      <div className="flex justify-between">
                        <span className="text-[#3A4446]">Net home equity:</span>
                        <span className="font-semibold" style={{color: 'rgb(14, 50, 60)'}}>
                          {formatCurrency(netHomeEquity)}
                        </span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-[#3A4446]">Downsized home cost:</span>
                        <span className="font-semibold text-[#3A4446]">
                          -{formatCurrency(downsizeAmountFuture)}
                        </span>
                      </div>
                      <div className="text-sm text-[#4B4B4B] text-right">
                        {formatCurrency(downsizeAmount)} in today's dollars, adjusted for home appreciation
                      </div>
                      
                      <div className="border-t border-blue-300 my-2"></div>
                      
                      <div className="flex justify-between text-base">
                        <span className="font-semibold text-[#3A4446]">Cash available to invest:</span>
                        <span className="font-bold" style={{color: cashFromDownsize > 0 ? 'rgb(14, 50, 60)' : '#dc2626'}}>
                          {formatCurrency(cashFromDownsize)}
                        </span>
                      </div>
                      
                      {cashFromDownsize > 0 && (
                        <div className="mt-3 pt-3 border-t border-blue-300">
                          <div className="flex justify-between text-base">
                            <span className="font-semibold text-[#3A4446]">Additional yearly income ({withdrawalRate}%):</span>
                            <span className="font-bold text-green-600">
                              +{formatCurrency(additionalYearlyIncome)}/year
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-4 pt-3 border-t border-blue-300">
                      <p className="text-sm text-[#4B4B4B]">
                        <strong>Note:</strong> This is a simplified estimate. Actual costs include selling fees, moving expenses, closing costs, 
                        and capital gains taxes. Downsizing involves significant life changes. Consider consulting a financial advisor and real estate 
                        professional for personalized guidance.
                      </p>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}
        </div>

        {/* Anticipated Assets Section */}
        <div id="anticipated-assets-section" className="rounded shadow-md mb-3 page-break-avoid" style={{
          backgroundColor: 'white',
          borderRadius: '4px',
          boxShadow: '0 2px 4px -1px rgba(0, 0, 0, 0.35)',
          border: '1px solid #c4c9cf'
        }}>
          <div
            className="cursor-pointer flex justify-between items-center"
            style={{
              backgroundColor: '#C58B6A',
              padding: '16px',
              borderRadius: considerAnticipatedAssets ? '4px 4px 0 0' : '4px'
            }}
            onClick={() => setConsiderAnticipatedAssets(!considerAnticipatedAssets)}
          >
            <h2 className="text-2xl font-bold text-white" style={{fontWeight: 700, margin: 0}}>Anticipated Assets (Optional)</h2>
            <span className="text-white text-2xl">{considerAnticipatedAssets ? '−' : '+'}</span>
          </div>

          {considerAnticipatedAssets && (
            <div className="p-6">
              {!quickMode && <p className="text-base text-[#4B4B4B] mb-4 leading-relaxed">If you expect to come into a meaningful sum before retirement — whether through inheritance, a trust, a business sale, or another windfall — you can note it here. We'll show it separately so it doesn't cloud your core plan.</p>}

              <div className="mb-4">
                <label className="block text-lg font-semibold mb-2" style={{color: 'rgb(14, 50, 60)'}}>
                  Anticipated amount
                </label>
                <div className="relative mb-2">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#4B4B4B]">$</span>
                  <input
                    type="text"
                    inputMode="decimal"
                    value={formatNumberWithCommas(anticipatedAmount)}
                    onChange={(e) => setAnticipatedAmount(parseFormattedNumber(e.target.value) || 0)}
                    className="w-full pl-8 pr-4 py-2 text-lg border rounded-lg focus:ring-2 focus:border-transparent"
                    style={{borderColor: '#e5e7eb', color: 'rgb(14, 50, 60)'}}
                  />
                </div>
                <input
                  type="range"
                  min="0"
                  max="2000000"
                  step="10000"
                  value={anticipatedAmount}
                  onChange={(e) => setAnticipatedAmount(Number(e.target.value))}
                  style={{accentColor: 'rgb(14, 50, 60)'}}
                  className="w-full"
                />
              </div>

              {!quickMode && <div className="p-3 rounded border" style={{backgroundColor: '#f4f3ef', borderColor: '#e5e7eb'}}>
                <p className="text-sm text-[#4B4B4B]">This amount will appear as a faded overlay on your retirement projection — a possible future, not a guarantee. Your core plan remains unchanged.</p>
              </div>}
            </div>
          )}
        </div>


        {/* Section Title Card */}
        <div id="results-section" className="rounded shadow-md mb-3 page-break-avoid" style={{
          backgroundColor: '#C58B6A',
          padding: '16px',
          borderRadius: '4px',
          boxShadow: '0 2px 4px -1px rgba(0, 0, 0, 0.35)',
          border: '1px solid #c4c9cf'
        }}>
          <h2 className="text-2xl font-bold text-white" style={{fontWeight: 700, margin: 0}}>Your Retirement Outlook</h2>
        </div>

        {/* Retirement Outlook Content */}
        <div className="rounded shadow-md mb-3 p-6 page-break-avoid" style={{
          backgroundColor: 'white',
          borderRadius: '4px',
          boxShadow: '0 2px 4px -1px rgba(0, 0, 0, 0.35)',
          border: '1px solid #c4c9cf'
        }}>
          <div>
            {!quickMode && <p className="text-base text-[#4B4B4B] mb-5">
              See how your savings are projected to grow from now until retirement.
            </p>}

          {/* Total at retirement callout */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="p-4 rounded border text-center" style={{backgroundColor: '#f4f3ef', borderColor: '#e5e7eb'}}>
              <div className="text-sm text-[#4B4B4B] mb-1">Estimated total at retirement</div>
              <div className="text-2xl font-bold" style={{color: 'rgb(14, 50, 60)'}}>{formatCompact(totalAtRetirement)}</div>
              {projWhatIfExtra > 0 || projWhatIfReturn !== null || (projWhatIfRetirementAge !== null && projWhatIfRetirementAge !== retirementAge) ? (() => {
                // Inline delta — needs whatIfFinalBalance but that's computed inside the graph IIFE
                // So we compute it here too with same logic
                const projWhatIfRetAge = projWhatIfRetirementAge ?? retirementAge;
                const projWhatIfRet = projWhatIfReturn ?? expectedReturn;
                const startingBalance = breakdownByAccount
                  ? (account401k + accountIRA + accountRoth + accountBrokerage + accountPension)
                  : currentSavings;
                let bal = startingBalance;
                const years = projWhatIfRetAge - currentAge;
                for (let yr = 1; yr <= years; yr++) {
                  const yearIncome = annualIncome * Math.pow(1 + annualRaise / 100, yr - 1);
                  const yearMonthly = yearIncome / 12;
                  const ageInYear = currentAge + yr - 1;
                  const baseLimit = 24500, catchupMax = 32500;
                  const contrib = ageInYear >= 50 && useCatchupContributions
                    ? catchupMax / 12
                    : Math.min(yearMonthly * (contributionPercent / 100), baseLimit / 12);
                  const matchPct = Math.min(contributionPercent, employerMatchUpTo);
                  const match = (yearMonthly * (matchPct / 100)) * (employerMatchRate / 100);
                  const indiv = hasIndividualContributions ? yearMonthly * (individualContributionPercent / 100) : 0;
                  bal = bal * (1 + projWhatIfRet / 100) + (contrib + match) * 12 + indiv * 12 + projWhatIfExtra * 12;
                }
                const delta = bal - totalAtRetirement;
                const isPos = delta >= 0;
                return (
                  <div className="mt-1 text-sm font-semibold" style={{color: isPos ? '#6E8F7C' : '#b45309'}}>
                    What if: {isPos ? '+' : ''}{formatCompact(delta)}
                  </div>
                );
              })() : null}
              {considerAnticipatedAssets && anticipatedAmount > 0 && (
                <div className="mt-2 pt-2 border-t border-dashed" style={{borderColor: '#c4c9cf'}}>
                  <div className="text-xs text-[#4B4B4B] mb-0.5" style={{opacity: 0.7}}>With anticipated assets</div>
                  <div className="text-lg font-semibold" style={{color: 'rgb(14, 50, 60)', opacity: 0.45}}>{formatCompact(totalAtRetirement + anticipatedAmount)}</div>
                </div>
              )}
            </div>
            <div className="p-4 rounded border text-center" style={{backgroundColor: '#f4f3ef', borderColor: '#e5e7eb'}}>
              <div className="flex items-center justify-center gap-2 mb-1">
                <div className="text-sm text-[#4B4B4B]">Yearly income</div>
                <button
                  onClick={() => setShowTodaysDollars(!showTodaysDollars)}
                  className="text-xs px-2 py-0.5 rounded hover:bg-gray-100 transition-colors"
                  style={{color: 'rgb(107, 114, 128)', border: '1px solid #e5e7eb', backgroundColor: 'white'}}
                  title={showTodaysDollars ? "Switch to future dollars" : "Switch to today's dollars"}
                >
                  ⇄
                </button>
              </div>
              <div className="text-2xl font-bold" style={{color: 'rgb(14, 50, 60)'}}>{formatCompact(showTodaysDollars ? yearlyIncomeToday : yearlyIncome)}</div>
              <div className="text-sm text-[#4B4B4B] mt-1">{showTodaysDollars ? "today's dollars" : "future dollars"}</div>
            </div>
          </div>

          {/* Monthly Income Comparison — only shown if net monthly was entered */}
          {hasNetMonthly && netMonthlyTakeHome > 0 && (() => {
            const retirementMonthlyGross = yearlyIncomeToday / 12;
            // Add back retirement contributions to get true spending baseline
            const monthlyContribAddBack = (annualIncome / 12) * (contributionPercent / 100);
            const currentMonthlyBaseline = netMonthlyTakeHome + monthlyContribAddBack;
            // Estimate taxes on retirement income (flat 18% estimate — simplified)
            const estimatedTaxRate = 0.18;
            const retirementMonthlyNet = retirementMonthlyGross * (1 - estimatedTaxRate);
            const isComfortable = retirementMonthlyNet >= currentMonthlyBaseline * 0.85;
            return (
              <div className="mb-6 p-4 rounded border" style={{backgroundColor: '#f4f3ef', borderColor: '#e5e7eb'}}>
                <h4 className="text-sm font-semibold mb-3" style={{color: 'rgb(14,50,60)'}}>Monthly Income Comparison</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded border text-center" style={{backgroundColor: 'white', borderColor: '#e5e7eb'}}>
                    <div className="text-xs text-[#4B4B4B] mb-1">You live on today</div>
                    <div className="text-xl font-bold" style={{color: 'rgb(14,50,60)'}}>{formatCurrency(currentMonthlyBaseline)}<span className="text-sm font-normal">/mo</span></div>
                    {contributionPercent > 0 && !quickMode && <div className="text-xs text-[#4B4B4B] mt-1">incl. {formatCurrency(monthlyContribAddBack)} contributions</div>}
                  </div>
                  <div className="p-3 rounded border text-center" style={{backgroundColor: 'white', borderColor: '#e5e7eb'}}>
                    <div className="text-xs text-[#4B4B4B] mb-1">Est. retirement monthly</div>
                    <div className="text-xl font-bold" style={{color: isComfortable ? '#6E8F7C' : '#C58B6A'}}>{formatCurrency(retirementMonthlyNet)}<span className="text-sm font-normal">/mo</span></div>
                    <div className="text-xs text-[#4B4B4B] mt-1">after ~18% est. taxes</div>
                  </div>
                </div>
                {!quickMode && <p className="text-xs text-[#4B4B4B] mt-3 italic">Tax estimate is approximate and based on today's rates. Tax laws are subject to change. Consult a tax professional for personalized guidance.</p>}
              </div>
            );
          })()}

          {/* Projection Graph */}
          {growthData.length > 1 && (() => {
            const yearsToRetirement = retirementAge - currentAge;
            const retirementIncomeTargetFuture = (annualIncome * (retirementIncomeGoal / 100)) * Math.pow(1 + inflationRate / 100, yearsToRetirement);
            const grossGoalNestEgg = retirementIncomeTargetFuture / (withdrawalRate / 100);
            const pensionActive = hasPension && pensionStartAge <= retirementAge;
            const socialSecurityFuture = socialSecurityAmount * Math.pow(1 + inflationRate / 100, yearsToRetirement);
            const pensionCapEq = pensionActive ? (pensionAmount * 12) / (withdrawalRate / 100) : 0;
            const ssCapEq = hasSocialSecurity ? (socialSecurityFuture * 12) / (withdrawalRate / 100) : 0;
            const goalNestEgg = Math.max(0, grossGoalNestEgg - pensionCapEq - ssCapEq);
            const finalBalance = growthData[growthData.length - 1].balance;
            const onTrack = finalBalance >= goalNestEgg;

            const formatK = (v) => {
              if (v >= 1000000) return `$${(v / 1000000).toFixed(1)}M`;
              if (v >= 1000) return `$${Math.round(v / 1000)}k`;
              return '$0';
            };

            const milestoneLines = [];
            if (currentAge < 50 && retirementAge > 50) milestoneLines.push({ age: 50, label: 'Age 50' });
            if (retirementAge > 62 && currentAge < 62) milestoneLines.push({ age: 62, label: 'Age 62' });
            if (retirementAge > 65 && currentAge < 65) milestoneLines.push({ age: 65, label: 'Age 65' });

            const CustomDot = (props) => {
              const { cx, cy, payload } = props;
              if (payload.year === retirementAge) {
                return <circle cx={cx} cy={cy} r={6} fill="#C58B6A" stroke="white" strokeWidth={2}/>;
              }
              const isMilestone = milestoneLines.some(m => m.age === payload.year);
              if (isMilestone) {
                return <circle cx={cx} cy={cy} r={4} fill="rgb(14,50,60)" stroke="white" strokeWidth={2}/>;
              }
              return null;
            };

            // Build what-if projection data
            const projWhatIfRetAge = projWhatIfRetirementAge ?? retirementAge;
            const projWhatIfRet = projWhatIfReturn ?? expectedReturn;
            const projIsDifferent = projWhatIfExtra > 0 ||
              projWhatIfReturn !== null || (projWhatIfRetirementAge !== null && projWhatIfRetirementAge !== retirementAge);

            const buildWhatIfProjection = () => {
              const startingBalance = breakdownByAccount
                ? (account401k + accountIRA + accountRoth + accountBrokerage + accountPension)
                : currentSavings;
              const data = [];
              let bal = startingBalance;
              const years = projWhatIfRetAge - currentAge;
              for (let yr = 0; yr <= years; yr++) {
                if (yr === 0) { data.push({ year: currentAge, whatif: Math.round(bal) }); continue; }
                const yearIncome = annualIncome * Math.pow(1 + annualRaise / 100, yr - 1);
                const yearMonthly = yearIncome / 12;
                const ageInYear = currentAge + yr - 1;
                const baseLimit = 24500, catchupMax = 32500;
                let contrib = ageInYear >= 50 && useCatchupContributions
                  ? catchupMax / 12
                  : Math.min(yearMonthly * (contributionPercent / 100), baseLimit / 12);
                const matchPct = Math.min(contributionPercent, employerMatchUpTo);
                const match = (yearMonthly * (matchPct / 100)) * (employerMatchRate / 100);
                const indiv = hasIndividualContributions ? yearMonthly * (individualContributionPercent / 100) : 0;
                const extra = projWhatIfExtra;
                const totalContrib = (contrib + match) * 12 + indiv * 12 + extra * 12;
                bal = bal * (1 + projWhatIfRet / 100) + totalContrib;
                data.push({ year: currentAge + yr, whatif: Math.round(bal) });
              }
              return data;
            };

            const whatIfProjData = projIsDifferent ? buildWhatIfProjection() : [];

            // Merge what-if into growthData by year for Recharts
            const mergedProjData = growthData.map(d => ({
              ...d,
              whatif: whatIfProjData.find(w => w.year === d.year)?.whatif ?? null
            }));
            // Extend if what-if retirement age is later
            if (projWhatIfRetAge > retirementAge) {
              for (let age = retirementAge + 1; age <= projWhatIfRetAge; age++) {
                const wi = whatIfProjData.find(w => w.year === age);
                if (wi) mergedProjData.push({ year: age, balance: null, whatif: wi.whatif });
              }
            }

            const whatIfFinalBalance = whatIfProjData.length > 0
              ? whatIfProjData[whatIfProjData.length - 1].whatif : null;

            const maxProjVal = Math.max(
              goalNestEgg,
              growthData[growthData.length - 1]?.balance ?? 0,
              whatIfFinalBalance ?? 0,
              considerAnticipatedAssets && anticipatedAmount > 0 ? finalBalance + anticipatedAmount : 0
            ) * 1.1;

            const CustomTooltipWithWhatIf = ({ active, payload }) => {
              if (active && payload && payload.length) {
                const d = payload[0]?.payload;
                return (
                  <div style={{backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: 6, padding: '8px 12px', boxShadow: '0 2px 8px rgba(0,0,0,0.12)'}}>
                    <p style={{margin: 0, fontSize: 13, fontWeight: 600, color: 'rgb(14,50,60)'}}>Age {d.year}</p>
                    {d.balance !== null && <p style={{margin: '2px 0 0', fontSize: 12, color: 'rgb(14,50,60)'}}>Your plan: {formatK(d.balance)}</p>}
                    {d.whatif !== null && <p style={{margin: '2px 0 0', fontSize: 12, color: '#C58B6A'}}>What if: {formatK(d.whatif)}</p>}
                  </div>
                );
              }
              return null;
            };

            return (
              <div className="mb-6">
                <ResponsiveContainer width="100%" height={260}>
                  <LineChart data={mergedProjData} margin={{top: 10, right: 24, left: 8, bottom: 8}}>
                    <CartesianGrid vertical={false} stroke="#f3f4f6"/>
                    <XAxis
                      dataKey="year"
                      tickLine={false}
                      axisLine={{stroke: '#d1d5db'}}
                      tick={{fontSize: 13, fill: '#6b7280'}}
                      ticks={[currentAge, ...milestoneLines.map(m => m.age), Math.max(retirementAge, projWhatIfRetAge)]}
                      tickFormatter={(v) => v === currentAge ? 'Today' : `${v}`}
                    />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      tick={{fontSize: 13, fill: '#6b7280'}}
                      tickFormatter={formatK}
                      width={52}
                      domain={[0, maxProjVal]}
                    />
                    <Tooltip content={<CustomTooltipWithWhatIf/>} wrapperStyle={{outline: 'none', border: 'none'}}/>
                    <ReferenceLine
                      y={goalNestEgg}
                      stroke={onTrack ? '#6E8F7C' : '#e57373'}
                      strokeDasharray="6 4"
                      strokeWidth={2}
                      label={{value: 'Goal', position: 'insideTopLeft', fontSize: 12, fontWeight: 600, fill: onTrack ? '#6E8F7C' : '#e57373'}}
                    />
                    {considerAnticipatedAssets && anticipatedAmount > 0 && (
                      <ReferenceLine
                        y={finalBalance + anticipatedAmount}
                        stroke="rgb(14,50,60)"
                        strokeDasharray="3 6"
                        strokeWidth={1.5}
                        strokeOpacity={0.35}
                        label={{value: 'With anticipated assets', position: 'insideTopLeft', fontSize: 11, fill: 'rgb(14,50,60)', fillOpacity: 0.4}}
                      />
                    )}
                    {milestoneLines.map(m => (
                      <ReferenceLine key={m.age} x={m.age} stroke="#e5e7eb" strokeDasharray="4 3"/>
                    ))}
                    {/* What-if line */}
                    {projIsDifferent && <Line
                      type="monotone"
                      dataKey="whatif"
                      stroke="#C58B6A"
                      strokeWidth={2}
                      strokeDasharray="2 5"
                      dot={false}
                      connectNulls={false}
                    />}
                    {/* Your plan */}
                    <Line
                      type="monotone"
                      dataKey="balance"
                      stroke="rgb(14,50,60)"
                      strokeWidth={3}
                      dot={<CustomDot/>}
                      activeDot={{r: 5, fill: 'rgb(14,50,60)', stroke: 'white', strokeWidth: 2}}
                    />
                  </LineChart>
                </ResponsiveContainer>

                {/* Legend */}
                <div className="flex gap-4 flex-wrap mt-2">
                  <div className="flex items-center gap-2">
                    <svg width="20" height="10"><line x1="0" y1="5" x2="20" y2="5" stroke="rgb(14,50,60)" strokeWidth="2.5"/></svg>
                    <span className="text-sm text-[#4B4B4B]">Your plan</span>
                  </div>
                  {projIsDifferent && <div className="flex items-center gap-2">
                    <svg width="20" height="10"><line x1="0" y1="5" x2="20" y2="5" stroke="#C58B6A" strokeWidth="2" strokeDasharray="2,5"/></svg>
                    <span className="text-sm text-[#4B4B4B]">What if: {formatK(whatIfFinalBalance)}</span>
                  </div>}
                  <div className="flex items-center gap-2">
                    <svg width="20" height="10"><line x1="0" y1="5" x2="20" y2="5" stroke={onTrack ? '#6E8F7C' : '#e57373'} strokeWidth="2" strokeDasharray="5,3"/></svg>
                    <span className="text-sm text-[#4B4B4B]">Target ({formatK(goalNestEgg)})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg width="12" height="12"><circle cx="6" cy="6" r="5" fill="#C58B6A"/></svg>
                    <span className="text-sm text-[#4B4B4B]">Retirement age ({retirementAge})</span>
                  </div>
                </div>

                {/* What-if explorer */}
                <div className="mt-4 p-4 rounded border" style={{backgroundColor: '#f4f3ef', borderColor: '#e5e7eb'}}>
                  <p className="text-sm font-semibold text-[#3A4446] mb-3">Explore a scenario</p>

                  <div className="mb-4">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-[#4B4B4B]">Extra monthly savings</span>
                      <span className="text-sm font-semibold" style={{color: '#C58B6A'}}>{projWhatIfExtra === 0 ? '—' : `+${formatCurrency(projWhatIfExtra)}/mo`}</span>
                    </div>
                    <input type="range" min="0" max="2000" step="50"
                      value={projWhatIfExtra}
                      onChange={e => setProjWhatIfExtra(Number(e.target.value))}
                      style={{accentColor: '#C58B6A'}} className="w-full"/>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-[#4B4B4B]">Return rate</span>
                      <span className="text-sm font-semibold" style={{color: '#C58B6A'}}>{projWhatIfReturn === null ? `${expectedReturn}% (current)` : `${projWhatIfReturn}%`}</span>
                    </div>
                    <input type="range" min="1" max="12" step="0.5"
                      value={projWhatIfReturn ?? expectedReturn}
                      onChange={e => setProjWhatIfReturn(Number(e.target.value))}
                      style={{accentColor: '#C58B6A'}} className="w-full"/>
                  </div>

                  <div className="mb-2">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-[#4B4B4B]">Retirement age</span>
                      <span className="text-sm font-semibold" style={{color: '#C58B6A'}}>{projWhatIfRetirementAge === null ? `${retirementAge} (current)` : projWhatIfRetirementAge}</span>
                    </div>
                    <input type="range" min="55" max="75" step="1"
                      value={projWhatIfRetirementAge ?? retirementAge}
                      onChange={e => setProjWhatIfRetirementAge(Number(e.target.value))}
                      style={{accentColor: '#C58B6A'}} className="w-full"/>
                  </div>

                  {projIsDifferent && (
                    <button
                      onClick={() => { setProjWhatIfExtra(0); setProjWhatIfReturn(null); setProjWhatIfRetirementAge(null); }}
                      className="text-xs mt-2"
                      style={{color: '#9ca3af', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer', padding: 0}}
                    >
                      Reset to your plan
                    </button>
                  )}
                </div>
              </div>
            );
          })()}

          <div className="mt-4 pt-4 border-t border-gray-100 text-center">
            <button
              onClick={() => { setCurrentPage('budget'); window.scrollTo(0, 0); }}
              className="text-sm font-medium underline"
              style={{color: '#C58B6A'}}
            >
              Not on track? Find savings in the Budget tool →
            </button>
          </div>

          {/* Savings Longevity Graph */}
          {totalAtRetirement > 0 && (() => {
            const buildLongevity = (rate, returnRate) => {
              const data = [];
              let balance = totalAtRetirement;
              const initialWithdrawal = totalAtRetirement * (rate / 100);
              let age = retirementAge;
              let year = 0;
              while (balance > 0 && age <= 100) {
                data.push({ age, balance: Math.round(balance) });
                const inflationAdjustedWithdrawal = initialWithdrawal * Math.pow(1 + inflationRate / 100, year);
                balance = balance * (1 + returnRate / 100) - inflationAdjustedWithdrawal;
                age++;
                year++;
              }
              if (age <= 100) data.push({ age, balance: 0 });
              return data;
            };

            const ages = Array.from({ length: 101 - retirementAge }, (_, i) => retirementAge + i);
            const yourData = buildLongevity(withdrawalRate, retirementReturnRate);
            const whatIfData = buildLongevity(whatIfWithdrawal, whatIfReturn);

            const isWhatIfDifferent = whatIfWithdrawal !== withdrawalRate || whatIfReturn !== retirementReturnRate;

            const merged = ages.map(age => ({
              age,
              yours: yourData.find(d => d.age === age)?.balance ?? null,
              whatif: whatIfData.find(d => d.age === age)?.balance ?? null,
            }));

            const formatK = (v) => {
              if (v >= 1000000) return `$${(v / 1000000).toFixed(1)}M`;
              if (v >= 1000) return `$${Math.round(v / 1000)}k`;
              return '$0';
            };

            // Calculate lasts-until ages
            const yourLastAge = yourData[yourData.length - 1]?.age ?? 100;
            const whatIfLastAge = whatIfData[whatIfData.length - 1]?.age ?? 100;

            const LongevityTooltip = ({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <div style={{backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: 6, padding: '8px 12px', boxShadow: '0 2px 8px rgba(0,0,0,0.12)'}}>
                    <p style={{margin: 0, fontSize: 13, fontWeight: 600, color: 'rgb(14,50,60)'}}>Age {label}</p>
                    {payload.map(p => p.value !== null && (
                      <p key={p.dataKey} style={{margin: '2px 0 0', fontSize: 12, color: p.color}}>{formatK(p.value)}</p>
                    ))}
                  </div>
                );
              }
              return null;
            };

            return (
              <div className="mt-6">
                <h4 className="text-base font-semibold mb-1" style={{color: 'rgb(14,50,60)'}}>Savings Longevity</h4>
                <p className="text-sm text-[#4B4B4B] mb-4">How long your savings last, with withdrawals increasing {inflationRate}% annually for inflation.</p>

                <ResponsiveContainer width="100%" height={240}>
                  <LineChart data={merged} margin={{top: 10, right: 16, left: 8, bottom: 8}}>
                    <CartesianGrid vertical={false} stroke="#f3f4f6"/>
                    <XAxis
                      dataKey="age"
                      tickLine={false}
                      axisLine={{stroke: '#d1d5db'}}
                      tick={{fontSize: 13, fill: '#6b7280'}}
                      ticks={[retirementAge, retirementAge + 10, retirementAge + 20, retirementAge + 30, 100].filter(a => a <= 100)}
                    />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      tick={{fontSize: 13, fill: '#6b7280'}}
                      tickFormatter={formatK}
                      width={52}
                    />
                    <Tooltip content={<LongevityTooltip/>} wrapperStyle={{outline: 'none', border: 'none'}}/>
                    <ReferenceLine x={90} stroke="#e5e7eb" strokeDasharray="4 3"
                      label={{value: 'Age 90', position: 'insideTopLeft', fontSize: 11, fill: '#9ca3af'}}/>

                    {/* What-if line — behind, dashed */}
                    {isWhatIfDifferent && <Line
                      type="monotone"
                      dataKey="whatif"
                      name={`${whatIfWithdrawal}% / ${whatIfReturn}% return`}
                      stroke="#C58B6A"
                      strokeWidth={2}
                      dot={false}
                      strokeDasharray="2 5"
                      connectNulls={false}
                    />}

                    {/* Your rate — bold, primary */}
                    <Line
                      type="monotone"
                      dataKey="yours"
                      name={`${withdrawalRate}% / ${retirementReturnRate}% return`}
                      stroke="rgb(14,50,60)"
                      strokeWidth={3}
                      dot={false}
                      connectNulls={false}
                    />
                  </LineChart>
                </ResponsiveContainer>

                {/* What-if sliders */}
                <div className="p-4 rounded border" style={{backgroundColor: '#f4f3ef', borderColor: '#e5e7eb'}}>
                  <p className="text-sm font-semibold text-[#3A4446] mb-3">Explore a scenario</p>
                  <div className="mb-4">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-[#4B4B4B]">Withdrawal rate</span>
                      <span className="text-sm font-semibold" style={{color: '#C58B6A'}}>{whatIfWithdrawal}%</span>
                    </div>
                    <input type="range" min="2" max="7" step="0.1"
                      value={whatIfWithdrawal}
                      onChange={e => setWhatIfWithdrawal(Number(e.target.value))}
                      style={{accentColor: '#C58B6A'}}
                      className="w-full"/>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-[#4B4B4B]">Retirement return</span>
                      <span className="text-sm font-semibold" style={{color: '#C58B6A'}}>{whatIfReturn}%</span>
                    </div>
                    <input type="range" min="0" max="8" step="0.5"
                      value={whatIfReturn}
                      onChange={e => setWhatIfReturn(Number(e.target.value))}
                      style={{accentColor: '#C58B6A'}}
                      className="w-full"/>
                  </div>
                  {isWhatIfDifferent && (
                    <button
                      onClick={() => { setWhatIfWithdrawal(withdrawalRate); setWhatIfReturn(retirementReturnRate); }}
                      className="text-xs mt-3"
                      style={{color: '#9ca3af', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer', padding: 0}}
                    >
                      Reset to your plan
                    </button>
                  )}
                </div>

              </div>
            );
          })()}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── App ─────────────────────────────────────────────────────────────────────
const SonderSave = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [sharedData, setSharedData] = useState({
    annualIncome: 75000,
    monthlyPostTaxSavings: 0,
    currentAge: 30,
    retirementAge: 65,
  });

  return (
    <div style={{minHeight: '100vh', backgroundColor: '#ffffff'}}>
      <NavBar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {currentPage === 'home' && <LandingPage setCurrentPage={setCurrentPage} />}
      {currentPage === 'calculator' && <Calculator currentPage={currentPage} setCurrentPage={setCurrentPage} onDataChange={setSharedData} />}
      {currentPage === 'budget' && <BudgetPage annualIncome={sharedData.annualIncome} monthlyPostTaxSavings={sharedData.monthlyPostTaxSavings} currentAge={sharedData.currentAge} retirementAge={sharedData.retirementAge} />}
      {currentPage === 'resources' && <ResourcesPage />}
      {currentPage === 'faq' && <FAQPage />}
      {currentPage === 'glossary' && <GlossaryPage />}
      {currentPage === 'spending' && <RetirementSpendingPage />}
      {currentPage === 'about' && <AboutPage />}
    </div>
  );
};

export default SonderSave;
