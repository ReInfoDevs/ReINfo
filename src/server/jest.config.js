export default {
    testEnvironment: 'node',
    transform: {},
    extensionsToTreatAsEsm: ['.jsx', '.js'],
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },
  };