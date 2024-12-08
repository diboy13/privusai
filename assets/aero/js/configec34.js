const CONFIG_GLOBAL = {
  'marketplace_pricing_limit': {
    'bitcoin': {
      'min': 0.000001,
      'max': 0.005,
    },
    'CLORE-Blockchain': {
      'min': 0.1,
      'max': 5000,
    },
    'usd': {
      'min': 0.2,
      'max': 200,
    },
  },
  'decimals_in_pricing': {
    'bitcoin': 8,
    'CLORE-Blockchain': 2,
  },
  'onboard_disable_pricing_configuration_ids': [2, 3],
  'onboard_disable_default_oc_ids': [3],
  featureFlags: {
    shouldShowVpnBlock: true,
    server_usd_pricing: true,
    rent_by_template: true,
    shouldShowServerRating: true,
    mass_price_change_enabled: true,
  },
};
