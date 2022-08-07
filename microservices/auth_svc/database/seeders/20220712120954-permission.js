'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('permissions', [{
      name: 'getQuizRequests',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      name: 'getQuizs',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      name: 'addQuiz',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      name: 'deleteQuiz',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      name: 'approvalQuizRequest',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      name: 'getUser',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      name: 'getAllUser',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      name: 'getAllAds',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      name: 'getBansUser',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      name: 'getAllPostRequests',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      name: 'getPost',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      name: 'getAllComplaints',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      name: 'getPosts',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      name: 'getBanState',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      name: 'checkToken',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      name: 'signup',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      name: 'login',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      name: 'editProfile',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      name: 'userChangePassword',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      name: 'changeUserRole',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      name: 'userDeleteAccount',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      name: 'subervisorAddPost',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      name: 'addPost',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      name: 'deletePost',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      name: 'approvalPostRequest',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      name: 'changeLike',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      name: 'addComment',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      name: 'deleteComment',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      name: 'changeFavorite',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      name: 'changeBanUser',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      name: 'addComplaint',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      name: 'changeDoneComplaint',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      name: 'deleteComplaint',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      name: 'addUsersUniversityNumber',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      name: 'deleteUsersUniversityNumber',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      name: 'addAd',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      name: 'updateAd',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      name: 'deleteAd',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      name: 'getSubjects',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      name: 'getSummary',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      name: 'getAllSummary',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      name: 'addSummary',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      name: 'getLecture',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      name: 'getAllLecture',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      name: 'getWeeklySchedule',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      name: 'addLecture',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      name: 'deleteLecture',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      name: 'deleteWeeklySchedule',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      name: 'addWeeklySchedule',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      name: 'getMarksFiles',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      name: 'getAllMarksFiles',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      name: 'addMarksFile',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      name: 'deleteMarksFile',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  async down (queryInterface, Sequelize) {
  }
};
