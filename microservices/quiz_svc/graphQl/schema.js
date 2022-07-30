const { gql } = require('apollo-server');

const typeDefs = gql`
  scalar Date
  scalar Void
  
  enum Section {
    مشترك
    هندسة_البرمجيات
    الذكاء_الصنعي
    النظم_و_الشبكات_الحاسوبية
  }
  
  enum Semester {
    الاول
    الثاني
  }
  
  enum Class {
    الأولى
    الثانية
    الثالثة
    الرابعة
    الخامسة
  }
  
  type subjects {
    id: Int!
    name: String!
    class: Class!
    semester: Semester!
    section: Section!
    type: String!
    createdAt: Date
    updatedAt: Date
  }
  
  type quizs {
    id: Int!
    subjectId: Int!
    question: String!
    answer: String!
    createdAt: Date
    updatedAt: Date
    subject: subjects
  }
  
  type quizRequests {
    id: Int!
    subjectId: Int!
    question: String!
    answer: String!
    createdAt: Date
    updatedAt: Date
    subject: subjects
  }
  
  type Query {
    getQuizRequests
      : [quizRequests]!
        
    getQuizs(subjectId: Int)
      : [quizs]!
  }

  type Mutation {
    addQuiz(subjectId: Int! ,question: String! ,answer: String!)
      : quizs
    
    deleteQuiz(id: Int!)
      : Void
    
    approvalQuizRequest(id: Int! ,choice: Boolean!)
      : Void
  }
`;


module.exports = typeDefs;