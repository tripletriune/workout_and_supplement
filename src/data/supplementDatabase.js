export const supplementDatabase = {
  proteins: [
    {
      id: 'whey-protein',
      name: 'Whey Protein Isolate',
      category: 'Protein',
      ingredients: ['Whey Protein Isolate', 'Natural Flavoring', 'Sunflower Lecithin'],
      benefits: ['Muscle growth', 'Recovery', 'Protein synthesis'],
      dosage: '25-30g per serving',
      timing: 'Post-workout or between meals',
      fdaStatus: 'GRAS (Generally Recognized As Safe)',
      compliance: {
        status: 'FDA Compliant',
        source: 'FDA GRAS Notice No. GRN 000037',
        url: 'https://www.fda.gov/food/gras-notice-inventory',
        lastVerified: '2024-01'
      },
      workoutTypes: ['strength', 'hypertrophy', 'endurance']
    },
    {
      id: 'casein-protein',
      name: 'Micellar Casein',
      category: 'Protein',
      ingredients: ['Micellar Casein', 'Natural Vanilla Flavor', 'Xanthan Gum'],
      benefits: ['Slow-release protein', 'Overnight recovery', 'Muscle preservation'],
      dosage: '25-30g before bed',
      timing: 'Before sleep',
      fdaStatus: 'GRAS',
      compliance: {
        status: 'FDA Compliant',
        source: 'FDA GRAS Notice No. GRN 000397',
        url: 'https://www.fda.gov/food/gras-notice-inventory',
        lastVerified: '2024-01'
      },
      workoutTypes: ['strength', 'hypertrophy']
    }
  ],
  
  preWorkout: [
    {
      id: 'creatine-mono',
      name: 'Creatine Monohydrate',
      category: 'Performance',
      ingredients: ['Creatine Monohydrate (Creapure®)'],
      benefits: ['Increased strength', 'Power output', 'Muscle volume'],
      dosage: '5g daily',
      timing: 'Any time (consistency matters more than timing)',
      fdaStatus: 'Dietary Supplement',
      compliance: {
        status: 'FDA Compliant - Dietary Supplement',
        source: 'DSHEA compliant, New Dietary Ingredient (NDI) acknowledged',
        url: 'https://www.fda.gov/food/dietary-supplements',
        lastVerified: '2024-01'
      },
      workoutTypes: ['strength', 'power', 'hypertrophy']
    },
    {
      id: 'beta-alanine',
      name: 'Beta-Alanine',
      category: 'Endurance',
      ingredients: ['Beta-Alanine'],
      benefits: ['Reduced fatigue', 'Improved endurance', 'Delayed muscle fatigue'],
      dosage: '2-5g daily (divided doses)',
      timing: 'Split throughout the day',
      fdaStatus: 'Dietary Supplement',
      compliance: {
        status: 'FDA Compliant - Dietary Supplement',
        source: 'DSHEA compliant, NDI No. 576',
        url: 'https://www.fda.gov/food/new-dietary-ingredients-ndi-notification-process',
        lastVerified: '2024-01'
      },
      workoutTypes: ['endurance', 'hiit', 'crossfit']
    },
    {
      id: 'caffeine',
      name: 'Caffeine Anhydrous',
      category: 'Energy/Focus',
      ingredients: ['Caffeine Anhydrous'],
      benefits: ['Increased energy', 'Enhanced focus', 'Fat oxidation'],
      dosage: '100-400mg (based on tolerance)',
      timing: '30-45 minutes pre-workout',
      fdaStatus: 'GRAS',
      compliance: {
        status: 'FDA Compliant - GRAS',
        source: 'FDA 21 CFR 182.1180',
        url: 'https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfcfr/cfrsearch.cfm',
        lastVerified: '2024-01'
      },
      workoutTypes: ['all']
    },
    {
      id: 'citrulline',
      name: 'L-Citrulline',
      category: 'Pump/Blood Flow',
      ingredients: ['L-Citrulline'],
      benefits: ['Improved blood flow', 'Reduced soreness', 'Enhanced pump'],
      dosage: '6-8g pre-workout',
      timing: '60 minutes pre-workout',
      fdaStatus: 'Dietary Supplement',
      compliance: {
        status: 'FDA Compliant - Dietary Supplement',
        source: 'DSHEA compliant, NDI acknowledged',
        url: 'https://www.fda.gov/food/dietary-supplements',
        lastVerified: '2024-01'
      },
      workoutTypes: ['strength', 'hypertrophy', 'endurance']
    }
  ],
  
  recovery: [
    {
      id: 'glutamine',
      name: 'L-Glutamine',
      category: 'Recovery',
      ingredients: ['L-Glutamine'],
      benefits: ['Muscle recovery', 'Immune support', 'Gut health'],
      dosage: '5-10g post-workout',
      timing: 'Post-workout or before bed',
      fdaStatus: 'GRAS',
      compliance: {
        status: 'FDA Compliant - GRAS',
        source: 'FDA GRAS Notice No. GRN 000030',
        url: 'https://www.fda.gov/food/gras-notice-inventory',
        lastVerified: '2024-01'
      },
      workoutTypes: ['all']
    },
    {
      id: 'bcaa',
      name: 'BCAAs (Branched-Chain Amino Acids)',
      category: 'Recovery',
      ingredients: ['L-Leucine', 'L-Isoleucine', 'L-Valine'],
      benefits: ['Muscle protein synthesis', 'Reduced soreness', 'Energy during workout'],
      dosage: '5-10g during or post-workout',
      timing: 'During or immediately post-workout',
      fdaStatus: 'GRAS',
      compliance: {
        status: 'FDA Compliant - GRAS',
        source: 'FDA GRAS Notices (Multiple: GRN 000458, 000459, 000460)',
        url: 'https://www.fda.gov/food/gras-notice-inventory',
        lastVerified: '2024-01'
      },
      workoutTypes: ['endurance', 'strength', 'fasted-training']
    }
  ],
  
  vitamins: [
    {
      id: 'vitamin-d3',
      name: 'Vitamin D3 (Cholecalciferol)',
      category: 'Vitamin',
      ingredients: ['Vitamin D3 (Cholecalciferol)'],
      benefits: ['Bone health', 'Immune function', 'Testosterone support'],
      dosage: '1000-4000 IU daily',
      timing: 'With meals (fat-soluble)',
      fdaStatus: 'GRAS',
      compliance: {
        status: 'FDA Compliant - GRAS',
        source: 'FDA 21 CFR 184.1950',
        url: 'https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfcfr/cfrsearch.cfm',
        lastVerified: '2024-01'
      },
      workoutTypes: ['all']
    },
    {
      id: 'omega-3',
      name: 'Omega-3 Fatty Acids (Fish Oil)',
      category: 'Essential Fatty Acid',
      ingredients: ['EPA (Eicosapentaenoic Acid)', 'DHA (Docosahexaenoic Acid)'],
      benefits: ['Anti-inflammatory', 'Joint health', 'Heart health'],
      dosage: '1-3g EPA+DHA daily',
      timing: 'With meals',
      fdaStatus: 'GRAS',
      compliance: {
        status: 'FDA Compliant - GRAS',
        source: 'FDA GRAS Notice No. GRN 000105',
        url: 'https://www.fda.gov/food/gras-notice-inventory',
        lastVerified: '2024-01'
      },
      workoutTypes: ['all']
    },
    {
      id: 'magnesium',
      name: 'Magnesium Glycinate',
      category: 'Mineral',
      ingredients: ['Magnesium Glycinate'],
      benefits: ['Muscle function', 'Sleep quality', 'Recovery'],
      dosage: '200-400mg daily',
      timing: 'Before bed',
      fdaStatus: 'GRAS',
      compliance: {
        status: 'FDA Compliant - GRAS',
        source: 'FDA 21 CFR 184.1443',
        url: 'https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfcfr/cfrsearch.cfm',
        lastVerified: '2024-01'
      },
      workoutTypes: ['all']
    }
  ]
};

export const getSupplementsByWorkoutType = (workoutType) => {
  const allSupplements = [
    ...supplementDatabase.proteins,
    ...supplementDatabase.preWorkout,
    ...supplementDatabase.recovery,
    ...supplementDatabase.vitamins
  ];
  
  return allSupplements.filter(supp => 
    supp.workoutTypes.includes('all') || supp.workoutTypes.includes(workoutType)
  );
};

export const getSupplementById = (id) => {
  const allSupplements = [
    ...supplementDatabase.proteins,
    ...supplementDatabase.preWorkout,
    ...supplementDatabase.recovery,
    ...supplementDatabase.vitamins
  ];
  
  return allSupplements.find(supp => supp.id === id);
};