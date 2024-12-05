export const FEE_SCHEME_TYPE = {
  BTC: 'BTC',
};
export const FEE_SCHEME_ACTIVITY  = {
  SEND: 'SEND',
  RECEIVE: 'RECEIVE',
  BUY: 'BUY',
  SELL: 'SELL',
  EXCHANGE: 'EXCHANGE',
}

export const FEE_SCHEME_FEE_TYPE = {
  PERCENT: 'PERCENT',
  AMOUNT: 'AMOUNT',
}

export const FEE_SCHEME_GAS_PRICE_TYPE = {
  PERCENT: 'PERCENT',
  AMOUNT: 'AMOUNT',
}

export const FEE_SCHEME_CRITERIA_TYPE = {
  AMOUNT: 'AMOUNT',
  DATE: 'DATE',
  DAY: 'DAY',
  COUNTRY: 'COUNTRY',
}

export const FEE_SCHEME_CRITERIA_COMPARASION = {
  LESS_THAN: 'LESS_THAN',
  GREATER_THAN: 'GREATER_THAN',
  EQUALS: 'EQUALS',
}

export const SORT_BY_SAMPLE_DATA = [
  {
    label: "Created Data",
    value: "created_at",
    type: "date",
  },
  {
    label: "Name",
    value: "name",
    type: "text",
  },
  {
    label: "Amount",
    value: "usd_value",
    type: "value",
  },
]

export const FILTER_SAMPLE_DATA = [
  {
    label: "Amount",
    icon: "Icon",
    value: "amount",
    type: "string",
    options: [
      {
        label: "10 K",
        icon: "Icon",
        value: "10",
      },
    ],
  },
  {
    label: "Amount",
    icon: "Icon",
    value: "amountc",
    type: "string",
    options: [
      {
        label: "10 K",
        icon: "Icon",
        value: "10",
      },
    ],
  },
  {
    label: "Amount",
    icon: "Icon",
    value: "amountd",
    type: "date",
  },
  {
    label: "Amount",
    icon: "Icon",
    value: "amountr",
    type: "category",
    category: [
      {
        value: "Fiatd",
        label: "Fiat",
        options: [
          {
            label: "10 K",
            value: "10",
          },
        ],
      },
      {
        value: "Fiatre",
        label: "Fiat",
        icon: "Icon",
        options: [
          {
            label: "10 K",
            icon: "Icon",
            value: "10",
          },
        ],
      },
    ],
  },
]
