'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('options', [
        {
            image_url: 'http://www.jcpenneyoptical.com/wp-content/uploads/2015/05/RAYBANSUN_RB3016-S-W0365-49__2500x1400-Face-1200x672-1200x672.png',
            product_description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            product_retail_price: '80',
            product_code: 'XYZ-789',
            pollId: 1,
            votes: 20,
            userId: 2,
            title: 'THIS IS A TITLE',
            createdAt: new Date(),
            updatedAt: new Date()
        },

        {
            image_url: 'http://www.jcpenneyoptical.com/wp-content/uploads/2015/05/RAYBANSUN_RB3016-S-W0365-49__2500x1400-Face-1200x672-1200x672.png',
            product_description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            product_retail_price: '80',
            product_code: 'XYZ-789',
            pollId: 1,
            votes: 60,
            userId: 2,
            title: 'THIS IS A TITLE',
            createdAt: new Date(),
            updatedAt: new Date()
        },

        {
            image_url: 'http://www.jcpenneyoptical.com/wp-content/uploads/2015/05/RAYBANSUN_RB3016-S-W0365-49__2500x1400-Face-1200x672-1200x672.png',
            product_description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            product_retail_price: '80',
            product_code: 'XYZ-789',
            pollId: 1,
            votes: 100,
            userId: 2,
            title: 'THIS IS A TITLE',
            createdAt: new Date(),
            updatedAt: new Date()
        },

        {
            image_url: 'http://pngimg.com/upload/headphones_PNG7644.png',
            product_description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            product_retail_price: '80',
            product_code: 'XYZ-789',
            pollId: 2,
            votes: 20,
            userId: 2,
            title: 'THIS IS A TITLE',
            createdAt: new Date(),
            updatedAt: new Date()
        },

        {
            image_url: 'http://pngimg.com/upload/headphones_PNG7644.png',
            product_description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            product_retail_price: '80',
            product_code: 'XYZ-789',
            pollId: 2,
            votes: 60,
            userId: 2,
            title: 'THIS IS A TITLE',
            createdAt: new Date(),
            updatedAt: new Date()
        },

        {
            image_url: 'http://pngimg.com/upload/headphones_PNG7644.png',
            product_description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            product_retail_price: '80',
            product_code: 'XYZ-789',
            pollId: 2,
            votes: 100,
            userId: 2,
            title: 'THIS IS A TITLE',
            createdAt: new Date(),
            updatedAt: new Date()
        }

    ], {});
  },


  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('options', null, {});
  }
};
