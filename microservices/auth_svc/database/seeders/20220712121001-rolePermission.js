'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('rolePermissions', [{
      permissionName: 'signup',
      roleName: 'Student_',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'login',
      roleName: 'Student_',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'login',
      roleName: 'Admin_',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'login',
      roleName: 'Public_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'login',
      roleName: 'First_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'login',
      roleName: 'Second_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'login',
      roleName: 'Third_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'login',
      roleName: 'Fourth_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'login',
      roleName: 'Fifth_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'editProfile',
      roleName: 'Student_',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'editProfile',
      roleName: 'Admin_',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'editProfile',
      roleName: 'Public_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'editProfile',
      roleName: 'First_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'editProfile',
      roleName: 'Second_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'editProfile',
      roleName: 'Third_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'editProfile',
      roleName: 'Fourth_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'editProfile',
      roleName: 'Fifth_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getUserMarks',
      roleName: 'Student_',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getUserMarks',
      roleName: 'Admin_',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getUserMarks',
      roleName: 'Public_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getUserMarks',
      roleName: 'First_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getUserMarks',
      roleName: 'Second_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getUserMarks',
      roleName: 'Third_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getUserMarks',
      roleName: 'Fourth_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getUserMarks',
      roleName: 'Fifth_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'addUsersUniversityNumber',
      roleName: 'Student_',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'addUsersUniversityNumber',
      roleName: 'Admin_',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'addUsersUniversityNumber',
      roleName: 'Public_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'addUsersUniversityNumber',
      roleName: 'First_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'addUsersUniversityNumber',
      roleName: 'Second_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'addUsersUniversityNumber',
      roleName: 'Third_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'addUsersUniversityNumber',
      roleName: 'Fourth_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'addUsersUniversityNumber',
      roleName: 'Fifth_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'deleteUsersUniversityNumber',
      roleName: 'Student_',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'deleteUsersUniversityNumber',
      roleName: 'Admin_',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'deleteUsersUniversityNumber',
      roleName: 'Public_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'deleteUsersUniversityNumber',
      roleName: 'First_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'deleteUsersUniversityNumber',
      roleName: 'Second_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'deleteUsersUniversityNumber',
      roleName: 'Third_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'deleteUsersUniversityNumber',
      roleName: 'Fourth_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'deleteUsersUniversityNumber',
      roleName: 'Fifth_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getAllMarksFiles',
      roleName: 'Student_',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getAllMarksFiles',
      roleName: 'Admin_',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getAllMarksFiles',
      roleName: 'Public_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getAllMarksFiles',
      roleName: 'First_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getAllMarksFiles',
      roleName: 'Second_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getAllMarksFiles',
      roleName: 'Third_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getAllMarksFiles',
      roleName: 'Fourth_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getAllMarksFiles',
      roleName: 'Fifth_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getMarksFiles',
      roleName: 'Student_',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getMarksFiles',
      roleName: 'Admin_',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getMarksFiles',
      roleName: 'Public_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getMarksFiles',
      roleName: 'First_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getMarksFiles',
      roleName: 'Second_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getMarksFiles',
      roleName: 'Third_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getMarksFiles',
      roleName: 'Fourth_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getMarksFiles',
      roleName: 'Fifth_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getLecture',
      roleName: 'Student_',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getLecture',
      roleName: 'Admin_',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getLecture',
      roleName: 'Public_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getLecture',
      roleName: 'First_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getLecture',
      roleName: 'Second_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getLecture',
      roleName: 'Third_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getLecture',
      roleName: 'Fourth_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getLecture',
      roleName: 'Fifth_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getAllLecture',
      roleName: 'Student_',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getAllLecture',
      roleName: 'Admin_',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getAllLecture',
      roleName: 'Public_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getAllLecture',
      roleName: 'First_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getAllLecture',
      roleName: 'Second_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getAllLecture',
      roleName: 'Third_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getAllLecture',
      roleName: 'Fourth_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getAllLecture',
      roleName: 'Fifth_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getSummary',
      roleName: 'Student_',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getSummary',
      roleName: 'Admin_',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getSummary',
      roleName: 'Public_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getSummary',
      roleName: 'First_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getSummary',
      roleName: 'Second_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getSummary',
      roleName: 'Third_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getSummary',
      roleName: 'Fourth_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getSummary',
      roleName: 'Fifth_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getAllSummary',
      roleName: 'Student_',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getAllSummary',
      roleName: 'Admin_',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getAllSummary',
      roleName: 'Public_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getAllSummary',
      roleName: 'First_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getAllSummary',
      roleName: 'Second_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getAllSummary',
      roleName: 'Third_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getAllSummary',
      roleName: 'Fourth_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getAllSummary',
      roleName: 'Fifth_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getQuizs',
      roleName: 'Student_',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getQuizs',
      roleName: 'Admin_',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getQuizs',
      roleName: 'Public_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getQuizs',
      roleName: 'First_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getQuizs',
      roleName: 'Second_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getQuizs',
      roleName: 'Third_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getQuizs',
      roleName: 'Fourth_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getQuizs',
      roleName: 'Fifth_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getQuiz',
      roleName: 'Student_',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getQuiz',
      roleName: 'Admin_',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getQuiz',
      roleName: 'Public_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getQuiz',
      roleName: 'First_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getQuiz',
      roleName: 'Second_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getQuiz',
      roleName: 'Third_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getQuiz',
      roleName: 'Fourth_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getQuiz',
      roleName: 'Fifth_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'addQuiz',
      roleName: 'Student_',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'addQuiz',
      roleName: 'Admin_',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'addQuiz',
      roleName: 'Public_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'addQuiz',
      roleName: 'First_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'addQuiz',
      roleName: 'Second_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'addQuiz',
      roleName: 'Third_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'addQuiz',
      roleName: 'Fourth_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'addQuiz',
      roleName: 'Fifth_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getGroupsOfUser',
      roleName: 'Student_',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getGroupsOfUser',
      roleName: 'Admin_',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getGroupsOfUser',
      roleName: 'Public_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getGroupsOfUser',
      roleName: 'First_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getGroupsOfUser',
      roleName: 'Second_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getGroupsOfUser',
      roleName: 'Third_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getGroupsOfUser',
      roleName: 'Fourth_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getGroupsOfUser',
      roleName: 'Fifth_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getSpecialPosts',
      roleName: 'Student_',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getSpecialPosts',
      roleName: 'Admin_',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'login',
      roleName: 'Public_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getSpecialPosts',
      roleName: 'First_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getSpecialPosts',
      roleName: 'Second_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getSpecialPosts',
      roleName: 'Third_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getSpecialPosts',
      roleName: 'Fourth_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getSpecialPosts',
      roleName: 'Fifth_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getWeeklySchedule',
      roleName: 'Student_',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getWeeklySchedule',
      roleName: 'Admin_',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getWeeklySchedule',
      roleName: 'Public_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getWeeklySchedule',
      roleName: 'First_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getWeeklySchedule',
      roleName: 'Second_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getWeeklySchedule',
      roleName: 'Third_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getWeeklySchedule',
      roleName: 'Fourth_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getWeeklySchedule',
      roleName: 'Fifth_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'changeFavorite',
      roleName: 'Student_',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'changeFavorite',
      roleName: 'Admin_',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'changeFavorite',
      roleName: 'Public_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'changeFavorite',
      roleName: 'First_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'changeFavorite',
      roleName: 'Second_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'changeFavorite',
      roleName: 'Third_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'changeFavorite',
      roleName: 'Fourth_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'changeFavorite',
      roleName: 'Fifth_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'addPost',
      roleName: 'Student_',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'addPost',
      roleName: 'Admin_',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'addPost',
      roleName: 'Public_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'addPost',
      roleName: 'First_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'addPost',
      roleName: 'Second_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'addPost',
      roleName: 'Third_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'addPost',
      roleName: 'Fourth_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'addPost',
      roleName: 'Fifth_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getPost',
      roleName: 'Student_',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getPost',
      roleName: 'Admin_',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getPost',
      roleName: 'Public_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getPost',
      roleName: 'First_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getPost',
      roleName: 'Second_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getPost',
      roleName: 'Third_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getPost',
      roleName: 'Fourth_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getPost',
      roleName: 'Fifth_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getPosts',
      roleName: 'Student_',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getPosts',
      roleName: 'Admin_',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getPosts',
      roleName: 'Public_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getPosts',
      roleName: 'First_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getPosts',
      roleName: 'Second_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getPosts',
      roleName: 'Third_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getPosts',
      roleName: 'Fourth_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getPosts',
      roleName: 'Fifth_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getAllAds',
      roleName: 'Student_',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getAllAds',
      roleName: 'Admin_',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getAllAds',
      roleName: 'Public_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getAllAds',
      roleName: 'First_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getAllAds',
      roleName: 'Second_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getAllAds',
      roleName: 'Third_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getAllAds',
      roleName: 'Fourth_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getAllAds',
      roleName: 'Fifth_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'userChangePassword',
      roleName: 'Student_',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'userChangePassword',
      roleName: 'Admin_',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'userChangePassword',
      roleName: 'Public_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'userChangePassword',
      roleName: 'First_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'userChangePassword',
      roleName: 'Second_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'userChangePassword',
      roleName: 'Third_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'userChangePassword',
      roleName: 'Fourth_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'userChangePassword',
      roleName: 'Fifth_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'userDeleteAccount',
      roleName: 'Student_',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'userDeleteAccount',
      roleName: 'Admin_',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'userDeleteAccount',
      roleName: 'Public_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'userDeleteAccount',
      roleName: 'First_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'userDeleteAccount',
      roleName: 'Second_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'userDeleteAccount',
      roleName: 'Third_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'userDeleteAccount',
      roleName: 'Fourth_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'userDeleteAccount',
      roleName: 'Fifth_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'changeLike',
      roleName: 'Student_',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'changeLike',
      roleName: 'Admin_',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'changeLike',
      roleName: 'Public_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'changeLike',
      roleName: 'First_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'changeLike',
      roleName: 'Second_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'changeLike',
      roleName: 'Third_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'changeLike',
      roleName: 'Fourth_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'changeLike',
      roleName: 'Fifth_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'addComment',
      roleName: 'Student_',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'addComment',
      roleName: 'Admin_',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'addComment',
      roleName: 'Public_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'addComment',
      roleName: 'First_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'addComment',
      roleName: 'Second_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'addComment',
      roleName: 'Third_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'addComment',
      roleName: 'Fourth_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'addComment',
      roleName: 'Fifth_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'addComplaint',
      roleName: 'Student_',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'addComplaint',
      roleName: 'Admin_',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'addComplaint',
      roleName: 'Public_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'addComplaint',
      roleName: 'First_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'addComplaint',
      roleName: 'Second_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'addComplaint',
      roleName: 'Third_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'addComplaint',
      roleName: 'Fourth_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'addComplaint',
      roleName: 'Fifth_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'addAd',
      roleName: 'Admin_',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'updateAd',
      roleName: 'Admin_',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'deleteAd',
      roleName: 'Admin_',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getBansUser',
      roleName: 'Admin_',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getAllComplaints',
      roleName: 'Admin_',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'changeUserRole',
      roleName: 'Admin_',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getAllUser',
      roleName: 'Admin_',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'changeBanUser',
      roleName: 'Admin_',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'changeDoneComplaint',
      roleName: 'Admin_',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'deleteComplaint',
      roleName: 'Admin_',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'addSummary',
      roleName: 'Public_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'deleteSummary',
      roleName: 'Public_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'addWeeklySchedule',
      roleName: 'Public_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'deleteWeeklySchedule',
      roleName: 'Public_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'addLecture',
      roleName: 'First_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'addLecture',
      roleName: 'Second_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'addLecture',
      roleName: 'Third_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'addLecture',
      roleName: 'Fourth_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'addLecture',
      roleName: 'Fifth_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'deleteLecture',
      roleName: 'First_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'deleteLecture',
      roleName: 'Second_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'deleteLecture',
      roleName: 'Third_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'deleteLecture',
      roleName: 'Fourth_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'deleteLecture',
      roleName: 'Fifth_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'changeBanUserInGroup',
      roleName: 'First_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'changeBanUserInGroup',
      roleName: 'Second_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'changeBanUserInGroup',
      roleName: 'Third_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'changeBanUserInGroup',
      roleName: 'Fourth_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'changeBanUserInGroup',
      roleName: 'Fifth_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'addMarksFile',
      roleName: 'First_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'addMarksFile',
      roleName: 'Second_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'addMarksFile',
      roleName: 'Third_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'addMarksFile',
      roleName: 'Fourth_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'addMarksFile',
      roleName: 'Fifth_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'deleteMarksFile',
      roleName: 'First_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'deleteMarksFile',
      roleName: 'Second_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'deleteMarksFile',
      roleName: 'Third_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'deleteMarksFile',
      roleName: 'Fourth_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'deleteMarksFile',
      roleName: 'Fifth_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getBannedUsersInGroup',
      roleName: 'First_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getBannedUsersInGroup',
      roleName: 'Second_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getBannedUsersInGroup',
      roleName: 'Third_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getBannedUsersInGroup',
      roleName: 'Fourth_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getBannedUsersInGroup',
      roleName: 'Fifth_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'deleteComment',
      roleName: 'Student_',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'deleteComment',
      roleName: 'Public_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getSubjects',
      roleName: 'Student_',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getSubjects',
      roleName: 'Admin_',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getSubjects',
      roleName: 'Public_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getSubjects',
      roleName: 'First_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getSubjects',
      roleName: 'Second_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getSubjects',
      roleName: 'Third_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getSubjects',
      roleName: 'Fourth_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getSubjects',
      roleName: 'Fifth_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getUserUniversityNumbers',
      roleName: 'Student_',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getUserUniversityNumbers',
      roleName: 'Admin_',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getUserUniversityNumbers',
      roleName: 'Public_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'deleteQuiz',
      roleName: 'Public_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getUserUniversityNumbers',
      roleName: 'First_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getUserUniversityNumbers',
      roleName: 'Second_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getUserUniversityNumbers',
      roleName: 'Third_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getUserUniversityNumbers',
      roleName: 'Fourth_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getUserUniversityNumbers',
      roleName: 'Fifth_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getUser',
      roleName: 'Student_',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getUser',
      roleName: 'Admin_',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getUser',
      roleName: 'Public_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getUser',
      roleName: 'First_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getUser',
      roleName: 'Second_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getUser',
      roleName: 'Third_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getUser',
      roleName: 'Fourth_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      permissionName: 'getUser',
      roleName: 'Fifth_Supervisor',
      createdAt: new Date(),
      updatedAt: new Date(),
    },], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
