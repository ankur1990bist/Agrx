import React, {Component} from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  BackHandler,
  FlatList,
  ScrollView,
} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import AgrxColors from '../../config/AgrxColors';
import * as Animatable from 'react-native-animatable';
import {connect} from 'react-redux';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-picker';
import _ from 'lodash';

function getId() {
  var S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return (
    S4() +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    S4() +
    S4()
  );
}

const payScheme = {
  questionTitle: 'You are paid on:',
  id: getId(),
  child: [
    {id: getId(), title: 'Hourly Basis'},
    {id: getId(), title: 'Fixed Pay'},
  ],
};

const afterBuy = {
  questionTitle: 'What do you do after buying the produce from farmer?',
  id: getId(),
  child: [
    {id: getId(), title: 'Immediately sell to market'},
    {id: getId(), title: 'Store for future'},
  ],
};

const typeOfSeed = {
  questionTitle: 'Are you a',
  id: getId(),
  child: [
    {id: getId(), title: 'Government Seed Provider'},
    {id: getId(), title: 'Private Seed Provider'},
  ],
};

const buyFrom = {
  id: getId(),
  questionTitle: 'You buy the crop from',
  child: [
    {id: getId(), title: 'Direct from farmer'},
    {
      id: getId(),
      title: 'Village trader or Agent',
    },
  ],
};

const sellTo = {
  id: getId(),
  questionTitle: 'You sell the crop to',
  child: [
    {
      id: getId(),
      title: 'Nearbuy Market(Mandis)',
      child: [buyFrom],
    },
    {
      id: getId(),
      title: 'Food Product Industry',
      child: [buyFrom],
    },
    {
      id: getId(),
      title: 'Government',
      child: [buyFrom],
    },
    {
      id: getId(),
      title: 'Local Shops',
      child: [buyFrom],
    },
  ],
};

const typeOfService = {
  questionTitle: 'What all services you give to farmer',
  id: getId(),
  child: [
    {id: getId(), title: 'Loan to farmer'},
    {id: getId(), title: 'Storage facility to farmer'},
    {id: getId(), title: 'Transportation to farmer'},
    {id: getId(), isOther: true, title: 'Others'},
  ],
};

const buyProductFrom = {
  questionTitle: 'You buy product from',
  id: getId(),
  child: [
    {id: getId(), title: 'Local Shops'},
    {id: getId(), title: 'Wholesaler Shop'},
    {id: getId(), title: 'Direct from Farmer'},
    {id: getId(), title: 'Government Shop'},
  ],
};

const buyProductFromLocal = {
  questionTitle: 'You buy product from',
  id: getId(),
  child: [
    {id: getId(), title: 'Farmer'},
    {id: getId(), title: 'Village Trader or Agent'},
    {id: getId(), isOther: true, title: 'Others'},
  ],
};

const typeOfServiceTransport = {
  questionTitle: 'You provide services to',
  id: getId(),
  child: [
    {id: getId(), title: 'Farmers'},
    {id: getId(), title: 'Seller'},
    {id: getId(), title: 'Wholesaler/Retailer'},
    {id: getId(), title: 'Storage Operator'},
  ],
};

const provideStorageTo = {
  questionTitle: 'You provide storage to',
  id: getId(),
  child: [
    {id: getId(), title: 'Farmers'},
    {id: getId(), title: 'Village Merchants'},
    {id: getId(), title: 'Commission Agent'},
    {id: getId(), title: 'Wholesaler'},
    {id: getId(), title: 'Food Product Industry'},
    {id: getId(), isOther: true, title: 'Others'},
  ],
};

const hiredAs = {
  questionTitle: 'You are hired as',
  id: getId(),
  child: [
    {id: getId(), title: 'Seasonal Worker', child: [payScheme]},
    {id: getId(), title: 'Fixed Worker', child: [payScheme]},
  ],
};

const hireLabour = {
  questionTitle: 'You hire labour',
  id: getId(),
  child: [
    {id: getId(), title: 'Directly'},
    {id: getId(), title: 'Agent'},
  ],
};

const labourHireAs = {
  questionTitle: 'Labour you hire are',
  id: getId(),
  child: [
    {id: getId(), title: 'Local Labour', child: [hireLabour]},
    {id: getId(), title: 'Migrant Labour', child: [hireLabour]},
  ],
};

const paySchemeEmployer = {
  questionTitle: 'You pays labour on:',
  id: getId(),
  child: [
    {id: getId(), title: 'Hourly Basis', child: [labourHireAs]},
    {id: getId(), title: 'Fixed Pay', child: [labourHireAs]},
  ],
};

const labourPaidBy = {
  questionTitle: 'Labour are paid by',
  id: getId(),
  child: [
    {id: getId(), title: 'You'},
    {id: getId(), title: 'Farm owners'},
  ],
};

const labourHireAsOtherFarm = {
  questionTitle: 'Labour you hire are',
  id: getId(),
  child: [
    {id: getId(), title: 'Local Labour', child: [labourPaidBy]},
    {id: getId(), title: 'Migrant Labour', child: [labourPaidBy]},
  ],
};

const paySchemeOtherFarm = {
  questionTitle: 'Farm pays labour on:',
  id: getId(),
  child: [
    {id: getId(), title: 'Hourly Basis', child: [labourHireAsOtherFarm]},
    {id: getId(), title: 'Fixed Pay', child: [labourHireAsOtherFarm]},
  ],
};

const turnover = {
  questionTitle: 'What is your turnover?',
  id: getId(),
  child: [
    {id: getId(), title: 'Annual Turnover', isTurnover: true},
    {id: getId(), title: 'Seasonal Turnover', isTurnover: true},
  ],
};

const typeOfCrop = {
  questionTitle: 'Crop that your grow',
  id: getId(),
  child: [
    {id: getId(), title: 'Cassava', child: [turnover]},
    {id: getId(), title: 'Yam', child: [turnover]},
    {id: getId(), title: 'Plantain', child: [turnover]},
    {id: getId(), title: 'Palm Oil', child: [turnover]},
    {id: getId(), title: 'Maize', child: [turnover]},
    {id: getId(), title: 'Taro', child: [turnover]},
    {id: getId(), title: 'Cocoa', child: [turnover]},
    {id: getId(), title: 'Rice', child: [turnover]},
    {id: getId(), title: 'Peanut', child: [turnover]},
    {id: getId(), title: 'Natural Rubber', child: [turnover]},
    {
      id: getId(),
      title: 'Others',
      isOther: true,
      isOtherCrop: true,
      child: [turnover],
    },
  ],
};

const waterAvailibility = {
  questionTitle: 'Availability of water for farming',
  id: getId(),
  child: [
    {id: getId(), title: 'Rainfed water', child: [typeOfCrop]},
    {id: getId(), title: 'Irrigated Farming', child: [typeOfCrop]},
  ],
};

const farmingPattern = {
  questionTitle: 'Your farming pattern',
  id: getId(),
  child: [
    {
      id: getId(),
      title: 'Mono Cropping',
      child: [waterAvailibility],
      description: 'Only one crop is grown on farm land year after year',
    },
    {
      id: getId(),
      title: 'Multiple Cropping',
      child: [waterAvailibility],
      description:
        'Farmers grow tow or more crops on farm land in one calendar year',
    },
    {
      id: getId(),
      title: 'Inter Cropping',
      child: [waterAvailibility],
      description:
        'Farmers grow two or more crops simultaneously on the same field in one calendar year',
    },
  ],
};

const landOnLease = {
  questionTitle: 'If land on lease',
  id: getId(),
  child: [
    {id: getId(), title: 'Written Contract', child: [farmingPattern]},
    {id: getId(), title: 'Enforceable Lease', child: [farmingPattern]},
    {id: getId(), title: 'Cash Lease', child: [farmingPattern]},
    {id: getId(), title: 'Crop share lease', child: [farmingPattern]},
  ],
};

const jsonData = {
  questionTitle: 'Choose your category',
  id: getId(),
  child: [
    {
      id: 0,
      title: 'Producer / Grower',
      child: [
        {
          questionTitle: 'Type of Farmers',
          id: getId(),
          child: [
            {
              id: getId(),
              title: 'Marginal Farmers',
              description: 'Farmers who have less than 1 hectare of land',
              child: [landOnLease],
            },
            {
              id: getId(),
              title: 'Small Farmers',
              description: 'Farmers who have less than 1 to 2 hectare of land',
              child: [landOnLease],
            },
            {
              id: getId(),
              title: 'Semi Medium Farmers',
              description: 'Farmers who have less than 2 to 4 hectare of land',
              child: [landOnLease],
            },
            {
              id: getId(),
              title: 'Medium Farmers',
              description: 'Farmers who have less than 4 to 10 hectare of land',
              child: [landOnLease],
            },
            {
              id: getId(),
              title: 'Large Farmers',
              description:
                'Farmers who have less than 10 hectare or above of land',
              child: [landOnLease],
            },
            {
              id: getId(),
              title: `Doesn't own Land`,
              description: 'Farmers who does farming on others land',
              child: [landOnLease],
            },
          ],
        },
      ],
    },
    {
      id: 1,
      title: 'Non Farmer',
      child: [
        {
          questionTitle: 'You are a:',
          id: 9,
          child: [
            {
              id: 10,
              title: 'Dairy Man',
              child: [
                {
                  questionTitle: 'You work in your',
                  id: 13,
                  child: [
                    {
                      id: 14,
                      title: 'Own Farm',
                      child: [
                        {
                          questionTitle: 'What is your herd size?',
                          id: 16,
                          child: [
                            {id: 17, title: '5-20', child: []},
                            {id: 18, title: '20-30', child: []},
                            {id: 19, title: '30-40', child: []},
                            {id: 20, title: '50 or more', child: []},
                          ],
                        },
                      ],
                    },
                    {
                      id: 15,
                      title: 'Hired by other farm',
                      child: [payScheme],
                    },
                  ],
                },
              ],
            },
            {
              id: 11,
              title: 'Horticulturist',
              child: [
                {
                  questionTitle: 'You work in a: ',
                  id: 24,
                  child: [
                    {
                      title: 'Small Family Owned Farm',
                      id: 25,
                      child: [
                        {
                          questionTitle: 'You are hired as: ',
                          id: 28,
                          child: [
                            {
                              title: 'Seasonal Horticulturist',
                              id: 29,
                              child: [payScheme],
                            },
                            {title: 'Fixed Horticulturist', id: 30},
                          ],
                        },
                      ],
                    },
                    {
                      id: 26,
                      title: 'Corporate Farm',
                      child: [
                        {
                          questionTitle: 'You are hired as:',
                          id: getId(),
                          child: [
                            {
                              id: getId(),
                              title: 'Seasonal Horticulturist',
                              child: [payScheme],
                            },
                            {
                              id: getId(),
                              title: 'Fixed Horticulturist',
                              child: [payScheme],
                            },
                          ],
                        },
                      ],
                    },
                    {
                      id: getId(),
                      title: 'Own Farm',
                      child: [
                        {
                          questionTitle: 'What kind of orchard you grow?',
                          id: getId(),
                          child: [
                            {id: getId(), title: 'Fruit Orchard'},
                            {id: getId(), title: 'Nut Orchard'},
                            {id: getId(), title: 'Seed Orchard'},
                            {
                              id: getId(),
                              title: 'Other types of orchard',
                              isOther: true,
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              id: 12,
              title: 'Honey Farmer',
              child: [
                {
                  id: getId(),
                  questionTitle: 'You work for',
                  child: [
                    {
                      id: getId(),
                      title: 'Large Companies',
                      child: [
                        {
                          questionTitle: 'You are hired as',
                          id: getId(),
                          child: [
                            {
                              id: getId(),
                              title: 'Seasonal Honey Farmer',
                              child: [payScheme],
                            },
                            {
                              id: getId(),
                              title: 'Fixed Honey Farmer',
                              child: [payScheme],
                            },
                          ],
                        },
                      ],
                    },
                    {
                      id: getId(),
                      title: 'Self Employed',
                      child: [
                        {
                          id: getId(),
                          questionTitle: 'How many hives you have?',
                          child: [
                            {id: getId(), title: '2-10'},
                            {id: getId(), title: '10-20'},
                            {id: getId(), title: '20-30'},
                            {id: getId(), title: 'More than 30'},
                          ],
                        },
                      ],
                    },
                    {
                      id: getId(),
                      title: 'Privately Owned Firm',
                      child: [
                        {
                          questionTitle: 'You are hired as: ',
                          id: getId(),
                          child: [
                            {
                              id: getId(),
                              title: 'Seasonal Honey Farmer',
                              child: [payScheme],
                            },
                            {
                              id: getId(),
                              title: 'Fixed honey Farmer',
                              child: [payScheme],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {id: getId(), isOther: true, title: 'Others'},
          ],
        },
      ],
    },
    {
      id: 2,
      title: 'Corporate Seller',
      child: [
        {
          questionTitle: 'You are a:',
          id: getId(),
          child: [
            {
              id: getId(),
              title: 'Seed Provider',
              child: [
                {
                  questionTitle: 'What kind of seed do you provide to farmers?',
                  id: getId(),
                  child: [
                    {
                      id: getId(),
                      title: 'Breeder seed',
                      child: [typeOfSeed],
                    },
                    {
                      id: getId(),
                      title: 'Foundation seed',
                      child: [typeOfSeed],
                    },
                    {
                      id: getId(),
                      title: 'Registered seed',
                      child: [typeOfSeed],
                    },
                    {
                      id: getId(),
                      title: 'Certified seed',
                      child: [typeOfSeed],
                    },
                  ],
                },
              ],
            },
            {
              id: getId(),
              title: 'Wholesaler',
              child: [
                {
                  questionTitle:
                    'You are wholesaler of which agriculture product?',
                  id: getId(),
                  child: [
                    {
                      id: getId(),
                      title: 'Food Products',
                      child: [sellTo],
                    },
                    {
                      id: getId(),
                      title: 'Fuel Products',
                      child: [sellTo],
                    },
                    {
                      id: getId(),
                      title: 'Fibre Products',
                      child: [sellTo],
                    },
                    {
                      id: getId(),
                      title: 'Raw Material Products',
                      child: [sellTo],
                    },
                  ],
                },
              ],
            },
            {
              id: getId(),
              title: 'Village Trader',
              child: [
                {
                  questionTitle: 'You sell the crop to',
                  id: getId(),
                  child: [
                    {
                      id: getId(),
                      title: 'Nearby Market(Mandis)',
                      child: [afterBuy],
                    },
                    {
                      id: getId(),
                      title: 'Food Product Industry',
                      child: [afterBuy],
                    },
                    {id: getId(), title: 'Government', child: [afterBuy]},
                    {id: getId(), title: 'Wholesaler', child: [afterBuy]},
                  ],
                },
              ],
            },
            {
              id: getId(),
              title: 'Commission Agent',
              child: [
                {
                  questionTitle: 'Are you a representative of',
                  id: getId(),
                  child: [
                    {id: getId(), title: 'Seller', child: [typeOfService]},
                    {id: getId(), title: 'Buyer', child: [typeOfService]},
                    {id: getId(), title: 'Both', child: [typeOfService]},
                  ],
                },
              ],
            },
            {id: getId(), isOther: true, title: 'Others'},
          ],
        },
      ],
    },
    {
      id: 3,
      title: 'Customer / Buyer',
      child: [
        {
          questionTitle: 'You are a:',
          id: getId(),
          child: [
            {
              id: getId(),
              title: 'Individual Buyer',
              child: [
                {
                  questionTitle: 'You are buyer of which agriculture product?',
                  id: getId(),
                  child: [
                    {
                      id: getId(),
                      title: 'Food Products',
                      child: [buyProductFrom],
                    },
                    {
                      id: getId(),
                      title: 'Fuel Products',
                      child: [buyProductFrom],
                    },
                    {
                      id: getId(),
                      title: 'Fibre Products',
                      child: [buyProductFrom],
                    },
                    {
                      id: getId(),
                      title: 'Raw Material Products',
                      child: [buyProductFrom],
                    },
                  ],
                },
              ],
            },
            {
              id: getId(),
              title: 'Local Buyer',
              child: [
                {
                  questionTitle: 'You are buyer of which agriculture product?',
                  id: getId(),
                  child: [
                    {
                      id: getId(),
                      title: 'Food Products',
                      child: [buyProductFromLocal],
                    },
                    {
                      id: getId(),
                      title: 'Fuel Products',
                      child: [buyProductFromLocal],
                    },
                    {
                      id: getId(),
                      title: 'Fibre Products',
                      child: [buyProductFromLocal],
                    },
                    {
                      id: getId(),
                      title: 'Raw Material Products',
                      child: [buyProductFromLocal],
                    },
                  ],
                },
              ],
            },
            {
              id: getId(),
              title: 'National Buyer',
              child: [
                {
                  questionTitle: 'You are buyer of which agriculture product?',
                  id: getId(),
                  child: [
                    {
                      id: getId(),
                      title: 'Food Products',
                      child: [buyProductFromLocal],
                    },
                    {
                      id: getId(),
                      title: 'Fuel Products',
                      child: [buyProductFromLocal],
                    },
                    {
                      id: getId(),
                      title: 'Fibre Products',
                      child: [buyProductFromLocal],
                    },
                    {
                      id: getId(),
                      title: 'Raw Material Products',
                      child: [buyProductFromLocal],
                    },
                  ],
                },
              ],
            },
            {
              id: getId(),
              title: 'International Buyer',
              child: [
                {
                  questionTitle: 'You are buyer of which agriculture product?',
                  id: getId(),
                  child: [
                    {
                      id: getId(),
                      title: 'Food Products',
                      child: [buyProductFromLocal],
                    },
                    {
                      id: getId(),
                      title: 'Fuel Products',
                      child: [buyProductFromLocal],
                    },
                    {
                      id: getId(),
                      title: 'Fibre Products',
                      child: [buyProductFromLocal],
                    },
                    {
                      id: getId(),
                      title: 'Raw Material Products',
                      child: [buyProductFromLocal],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 4,
      title: 'Support Community',
      child: [
        {
          questionTitle: 'You are a:',
          id: getId(),
          child: [
            {
              id: getId(),
              title: 'Transport Operator',
              child: [
                {
                  questionTitle: 'What all transport means do you have?',
                  id: getId(),
                  child: [
                    {
                      id: getId(),
                      title: 'Railway',
                      child: [typeOfServiceTransport],
                    },
                    {
                      id: getId(),
                      title: 'Roadways',
                      child: [typeOfServiceTransport],
                    },
                    {
                      id: getId(),
                      title: 'Airway',
                      child: [typeOfServiceTransport],
                    },
                    {
                      id: getId(),
                      title: 'Logistic Shipping',
                      child: [typeOfServiceTransport],
                    },
                  ],
                },
              ],
            },
            {
              id: getId(),
              title: 'Storage Operator',
              child: [
                {
                  id: getId(),
                  questionTitle: 'What forms of storage do you have?',
                  child: [
                    {
                      id: getId(),
                      title: 'Open storage systems',
                      child: [provideStorageTo],
                    },
                    {
                      id: getId(),
                      title: 'Semi-open storage systems',
                      child: [provideStorageTo],
                    },
                    {
                      id: getId(),
                      title: 'Closed storage systems',
                      child: [provideStorageTo],
                    },
                    {
                      id: getId(),
                      title: 'Cold storage systems',
                      child: [provideStorageTo],
                    },
                  ],
                },
              ],
            },
            {
              id: getId(),
              title: 'Weighman',
              child: [
                {
                  questionTitle: 'You provide services to',
                  id: getId(),
                  child: [
                    {id: getId(), title: 'Farmers', child: [payScheme]},
                    {
                      id: getId(),
                      title: 'Village Merchants',
                      child: [payScheme],
                    },
                    {
                      id: getId(),
                      title: 'Commission Agent',
                      child: [payScheme],
                    },
                    {
                      id: getId(),
                      title: 'Storage Operators',
                      child: [payScheme],
                    },
                    {
                      id: getId(),
                      title: 'Wholesaler Retailer',
                      child: [payScheme],
                    },
                    {id: getId(), isOther: true, title: 'Others'},
                  ],
                },
              ],
            },
            {id: getId(), isOther: true, title: 'Others'},
          ],
        },
      ],
    },
    {id: 5, title: 'Monitoring Community'},
    {
      id: 6,
      title: 'Labour & Employment',
      child: [
        {
          id: getId(),
          questionTitle: 'You are a',
          child: [
            {
              id: getId(),
              title: 'Labourer',
              child: [
                {
                  questionTitle: 'You are hired by',
                  id: getId(),
                  child: [
                    {
                      id: getId(),
                      title: 'Grower or Producer',
                      child: [hiredAs],
                    },
                    {id: getId(), title: 'Labour Contractor', child: [hiredAs]},
                  ],
                },
              ],
            },
            {
              id: getId(),
              title: 'Employer',
              child: [
                {
                  questionTitle: 'You hire labour for',
                  id: getId(),
                  child: [
                    {
                      id: getId(),
                      title: 'Own Farm',
                      child: [
                        {
                          questionTitle: 'You hire labour on',
                          child: [
                            {
                              id: getId(),
                              title: 'Seasonal',
                              child: [paySchemeEmployer],
                            },
                            {
                              id: getId(),
                              title: 'Permanent',
                              child: [paySchemeEmployer],
                            },
                          ],
                        },
                      ],
                    },
                    {
                      id: getId(),
                      title: 'Other Farm',
                      child: [
                        {
                          questionTitle: 'Farms hire labour on',
                          id: getId(),
                          child: [
                            {
                              id: getId(),
                              title: 'Seasonal',
                              child: [paySchemeOtherFarm],
                            },
                            {
                              id: getId(),
                              title: 'Permanent',
                              child: [paySchemeOtherFarm],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {id: 7, title: 'Finance'},
    {id: getId(), isOther: true, title: 'Others'},
  ],
};

let initialState = {
  name: '',
  workData: [],
  selectedData: [],
  showSubmit: false,
  categoryDescription: '',
  categoryText: '',
  showOther: false,
  selectedOption: null,
  selectedImage: [],
  pressed: false,
  showTurnover: false,
  showOtherCrop: false,
  turnover: '',
  otherCrop: '',
  otherCropData: {},
};

export class ProfessionalDetails extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;
  }

  async componentDidMount() {
    this.setState({
      workData: jsonData,
    });
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    this.props.navigation.setOptions({
      headerRight: () => {
        return (
          <TouchableOpacity
            onPress={() => {
              this.setState(initialState);
              this.resetData();
            }}
            style={{margin: 8}}>
            <Text
              style={{
                color: AgrxColors.primary,
                fontWeight: 'bold',
                fontSize: 18,
              }}>
              Reset
            </Text>
          </TouchableOpacity>
        );
      },
      headerLeft: () => null,
    });
  }

  resetData = () => {
    this.setState({
      workData: jsonData,
      showTurnover: false,
      showOtherCrop: false,
    });
  };

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton = () => {
    this.setState({
      occupationCategory: 0,
    });
    return true;
  };

  onChangeTurnover = (text) => {
    this.setState({
      turnover: text,
    });
  };

  onChangeOtherCrop = (text) => {
    this.setState({
      otherCrop: text,
    });
  };

  onChangeText = (text) => {
    this.setState({
      categoryText: text,
    });
  };

  setOtherCrop = () => {};

  getData = (id, isOther, isTurnover, isOtherCrop) => {
    // jsonData[id]
    if (isTurnover) {
      this.setState({
        showOtherCrop: false,
        showTurnover: true,
      });
      return;
    }
    if (isOther) {
      if (isOtherCrop) {
        this.setState({showOtherCrop: true});
        return;
      }
      this.setState({showOther: true, showSubmit: true});
      return;
    }
    if (this.state.workData?.child?.length > 0) {
      let temp = _.find(this.state.workData.child, {id});

      console.log(temp, 'temp');

      if (temp?.child?.length > 0) {
        this.setState({
          workData: temp.child[0],
          showSubmit: false,
          showTurnover: false,
          showOtherCrop: false,
        });
      } else {
        this.setState({
          showSubmit: true,
          showTurnover: false,
          showOtherCrop: false,
        });
      }
    } else {
      this.setState({
        showSubmit: true,
        showTurnover: false,
        showOtherCrop: false,
      });
    }
  };

  renderOptions = ({item, index}) => {
    return (
      <TouchableOpacity
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor:
            this.state.selectedOption == item.id ? AgrxColors.primary : '#fff',
          borderRadius: 8,

          // borderWidth: 0.5,
          // borderColor: AgrxColors.igesiaGray,
          width: '45%',
          marginHorizontal: 5,
          alignSelf: 'center',
          marginVertical: 5,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 3,
        }}
        activeOpacity={0.4}
        onPress={() => {
          this.setState({
            selectedData: [...this.state.selectedData, item],
            selectedOption: item.id,
            otherCropData: item.isOtherCrop
              ? {
                  id: item.id,
                  isOther: item.isOther,
                  isTurnover: item.isTurnover,
                  isOtherCrop: item.isOtherCrop,
                }
              : {},
          });
          this.getData(
            item.id,
            item.isOther,
            item.isTurnover,
            item.isOtherCrop,
          );
        }}>
        <Text
          style={{
            fontSize: 16,
            padding: 12,
            color: this.state.selectedOption == item.id ? '#fff' : '#000',
            textAlign: 'center',
            fontWeight:
              this.state.selectedOption == item.id ? 'bold' : 'normal',
          }}>
          {item.title}
        </Text>

        {item.description && (
          <Text
            style={{
              fontSize: 14,
              paddingHorizontal: 12,
              paddingBottom: 8,
              fontStyle: 'italic',
              color:
                this.state.selectedOption == item.id
                  ? '#fff'
                  : AgrxColors.igesiaGray,
              textAlign: 'center',
            }}>
            {item.description}
          </Text>
        )}
      </TouchableOpacity>
    );
  };

  onChangeCategory = (text) => {
    this.setState({
      categoryText: text,
    });
  };

  onChangeCategoryDescription = (text) => {
    this.setState({
      categoryDescription: text,
    });
  };

  imageTapped = () => {
    if (this.state.selectedImage.length == 5) {
      Toast.show('You can upload max 5 documents');
      return;
    }
    this.setState({
      pressed: true,
    });
    const options = {
      storageOptions: {
        skipBackup: true,
        cameraRoll: true,
      },
      allowsEditing: true,
      mediaType: 'photo',
      saveToPhotos: false,
    };

    ImagePicker.showImagePicker(options, async (response) => {
      if (response.didCancel) {
        console.log(response.didCancel, 'response.didCancel');
        this.setState({
          pressed: false,
        });
      } else if (response.error) {
        console.log(response.error, 'response.error');
        this.setState({
          pressed: false,
        });
      } else if (response.customButton) {
        console.log(response.customButton, 'response.customButton');
        this.setState({
          pressed: false,
        });
      } else {
        this.setState({
          pressed: false,
          selectedImage: [...this.state.selectedImage, response],
        });
        console.log(response, 'response image');
      }
    });
  };

  renderSelectedDoc = ({item, index}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text
          numberOfLines={1}
          ellipsizeMode={'tail'}
          style={{
            fontSize: 16,
            color: AgrxColors.igesiaGray,
            flex: 0.8,
            // maxWidth: '50%',
          }}>
          {index + 1}) {item.fileName}
        </Text>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            height: 35,
            width: 35,
            flex: 0.2,
          }}
          onPress={() => {
            let tempImages = this.state.selectedImage;

            let newImg = tempImages.filter((img) => {
              return img.fileName !== item.fileName;
            });
            this.setState({
              selectedImage: newImg,
            });
          }}>
          <MaterialCommunityIcon
            name={'close'}
            color={AgrxColors.error2}
            size={25}
          />
        </TouchableOpacity>
      </View>
    );
  };
  render() {
    const {isDark} = this.props.agrxTheme;

    return (
      <SafeAreaView style={{flex: 1}}>
        <ScrollView
          keyboardShouldPersistTaps="always"
          contentContainerStyle={{flexGrow: 1}}>
          <View style={{marginTop: 20, paddingHorizontal: 12, marginBottom: 5}}>
            <Text style={{fontSize: 32, color: '#009688', fontWeight: 'bold'}}>
              Almost there!
            </Text>
            <Text style={{fontSize: 16, color: '#6c757d', marginTop: 5}}>
              We need little more information to serve you better
            </Text>
          </View>

          {this.state.showOther ? (
            <View style={{flex: 1}}>
              <TextInput
                mode="flat"
                placeholder="Kindly mention the category of your work"
                onChangeText={this.onChangeCategory}
                style={{
                  width: '90%',
                  backgroundColor: '#fff',
                  alignSelf: 'center',
                  marginTop: 8,
                }}
                underlineColor="transparent"
                underlineColorAndroid="transparent"
              />

              <TextInput
                mode="flat"
                placeholder="Describe your work in 40-250 words"
                onChangeText={this.onChangeCategoryDescription}
                style={{
                  width: '90%',
                  backgroundColor: '#fff',
                  alignSelf: 'center',
                  marginTop: 8,
                }}
                numberOfLines={5}
                multiline={true}
                underlineColor="transparent"
                underlineColorAndroid="transparent"
              />
              <View style={{flex: 1, paddingHorizontal: 12}}>
                {this.state.showSubmit && (
                  <FlatList
                    ListHeaderComponent={() => {
                      return (
                        <View>
                          <Text
                            style={{
                              color: AgrxColors.igesiaGray,
                              fontSize: 14,
                              padding: 5,
                            }}>
                            Please upload your business documents/GST/Aadhar
                            Udyog/Shop License/Memorandum/Contract/Lease
                            Agreement/any government issued document for
                            business.
                          </Text>
                        </View>
                      );
                    }}
                    style={{marginVertical: 8, flex: 1}}
                    data={this.state.selectedImage}
                    renderItem={this.renderSelectedDoc}
                    keyExtractor={(item) => item.path}
                    ListFooterComponent={() => {
                      return (
                        <View>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              marginTop: 8,
                            }}>
                            <Button
                              icon="note-plus"
                              mode="contained"
                              style={{
                                borderRadius: 5,

                                alignSelf: 'center',
                              }}
                              labelStyle={{color: '#fff'}}
                              onPress={this.imageTapped}>
                              Upload Documents
                            </Button>
                            <Button
                              mode="contained"
                              style={{
                                borderRadius: 5,
                                width: 120,
                                alignSelf: 'center',
                              }}
                              labelStyle={{color: '#fff'}}
                              onPress={() => {
                                this.props.navigation.navigate(
                                  'SelectFieldScreen',
                                );
                              }}>
                              Next
                            </Button>
                          </View>

                          <Text
                            style={{
                              color: AgrxColors.igesiaGray,
                              fontSize: 14,
                              padding: 5,
                              marginTop: 5,
                            }}>
                            (Maximum 5 documents can be added)
                          </Text>
                        </View>
                      );
                    }}
                  />
                )}
              </View>
            </View>
          ) : (
            <View style={{paddingHorizontal: 8}}>
              <Text
                style={{
                  fontSize: 26,
                  color: '#000',
                  marginTop: 12,
                  fontWeight: 'bold',
                }}>
                {this.state.workData.questionTitle}
              </Text>
              <FlatList
                style={{marginTop: 8}}
                numColumns={2}
                data={this.state.workData.child}
                renderItem={this.renderOptions}
                keyExtractor={(item) => item.id}
                ListFooterComponent={() => {
                  return (
                    <View>
                      {this.state.showSubmit && (
                        <FlatList
                          ListHeaderComponent={() => {
                            return (
                              <Text
                                style={{
                                  color: AgrxColors.igesiaGray,
                                  fontSize: 14,
                                  padding: 5,
                                }}>
                                Please upload your business documents/GST/Aadhar
                                Udyog/Shop License/Memorandum/Contract/Lease
                                Agreement/any government issued document for
                                business.
                              </Text>
                            );
                          }}
                          style={{marginVertical: 8, flex: 1}}
                          data={this.state.selectedImage}
                          renderItem={this.renderSelectedDoc}
                          keyExtractor={(item) => item.path}
                          ListFooterComponent={() => {
                            return (
                              <View>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    marginTop: 8,
                                  }}>
                                  <Button
                                    icon="note-plus"
                                    mode="contained"
                                    style={{
                                      borderRadius: 5,

                                      alignSelf: 'center',
                                    }}
                                    labelStyle={{color: '#fff'}}
                                    onPress={this.imageTapped}>
                                    Upload Documents
                                  </Button>
                                  <Button
                                    mode="contained"
                                    style={{
                                      borderRadius: 5,
                                      width: 120,
                                      alignSelf: 'center',
                                    }}
                                    labelStyle={{color: '#fff'}}
                                    onPress={() => {
                                      this.props.navigation.navigate(
                                        'SelectFieldScreen',
                                      );
                                    }}>
                                    Next
                                  </Button>
                                </View>
                                <Text
                                  style={{
                                    color: AgrxColors.igesiaGray,
                                    fontSize: 14,
                                    padding: 5,
                                    marginTop: 5,
                                  }}>
                                  (Maximum 5 documents can be added)
                                </Text>
                              </View>
                            );
                          }}
                        />
                      )}
                    </View>
                  );
                }}
              />
              <View style={{flex: 1}}>
                {this.state.showOtherCrop && (
                  <View
                    style={{alignItems: 'center', justifyContent: 'center'}}>
                    <TextInput
                      mode="flat"
                      placeholder="Kindly mention the crop name"
                      onChangeText={this.onChangeOtherCrop}
                      style={{
                        width: '90%',
                        backgroundColor: '#fff',
                        alignSelf: 'center',
                        marginTop: 8,
                      }}
                      underlineColor="transparent"
                      underlineColorAndroid="transparent"
                    />

                    <Button
                      mode="contained"
                      style={{
                        borderRadius: 5,
                        marginTop: 5,
                        alignSelf: 'center',
                        width: '90%',
                        alignSelf: 'center',
                      }}
                      labelStyle={{color: '#fff'}}
                      onPress={() => {
                        this.getData(this.state.otherCropData.id);
                      }}>
                      Next
                    </Button>
                  </View>
                )}

                {this.state.showTurnover && (
                  <View
                    style={{alignItems: 'center', justifyContent: 'center'}}>
                    <TextInput
                      mode="flat"
                      placeholder="Please mention your turnover amount."
                      onChangeText={this.onChangeTurnover}
                      keyboardType={'number-pad'}
                      style={{
                        width: '90%',
                        backgroundColor: '#fff',
                        alignSelf: 'center',
                        marginTop: 8,
                      }}
                      underlineColor="transparent"
                      underlineColorAndroid="transparent"
                    />

                    <Button
                      mode="contained"
                      style={{
                        borderRadius: 5,
                        marginTop: 5,
                        alignSelf: 'center',
                        width: '90%',
                        alignSelf: 'center',
                      }}
                      labelStyle={{color: '#fff'}}
                      onPress={() => {
                        this.getData(this.state.otherCropData.id);
                      }}>
                      Next
                    </Button>
                  </View>
                )}
              </View>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    agrxTheme: state.agrxTheme,
  };
};

export default connect(mapStateToProps, {})(ProfessionalDetails);
