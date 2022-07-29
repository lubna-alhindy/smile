'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('subjects', [{
        name: 'تحليل1',
        class: 'الأولى',
        semester: 'الأول',
        section:'مشترك',
        type: 'نظري'
      },{
        name: 'فيزياء',
        class: 'الأولى',
        semester: 'الأول',
        section:'مشترك',
        type: 'نظري'
      },{
        name: 'مبادئ عمل الحاسوب',
        class: 'الأولى',
        semester: 'الأول',
        section:'مشترك',
        type: 'نظري'
      },{
        name: 'جبر عام',
        class: 'الأولى',
        semester: 'الأول',
        section:'مشترك',
        type: 'نظري'
      },{
        name: 'برمجة 1',
        class: 'الأولى',
        semester: 'الأول',
        section:'مشترك',
        type: 'نظري'
      },{
        name: 'اللغة الإنكليزية 1',
        class: 'الأولى',
        semester: 'الأول',
        section:'مشترك',
        type: 'نظري'
      },{
        name: 'برمجة 2',
        class: 'الأولى',
        semester: 'الثاني',
        section:'مشترك',
        type: 'نظري'
      },{
        name: 'تحليل 2',
        class: 'الأولى',
        semester: 'الثاني',
        section:'مشترك',
        type: 'نظري'
      },{
        name: 'الثقافة القومية',
        class: 'الأولى',
        semester: 'الثاني',
        section:'مشترك',
        type: 'نظري'
      },{
        name: 'جبر خطي',
        class: 'الأولى',
        semester: 'الثاني',
        section:'مشترك',
        type: 'نظري'
      },{
        name: 'دارات كهربائية و إلكترونية',
        class: 'الأولى',
        semester: 'الثاني',
        section:'مشترك',
        type: 'نظري'
      },{
        name: 'اللغة العربية',
        class: 'الأولى',
        semester: 'الثاني',
        section:'مشترك',
        type: 'نظري'
      },{
        name: 'اللغة الانكليزية 2',
        class: 'الأولى',
        semester: 'الثاني',
        section:'مشترك',
        type: 'نظري'
      },{
        name: 'تحليل1',
        class: 'الأولى',
        semester: 'الأول',
        section:'مشترك',
        type: 'عملي'
      },{
        name: 'فيزياء',
        class: 'الأولى',
        semester: 'الأول',
        section:'مشترك',
        type: 'عملي'
      },{
        name: 'مبادئ عمل الحاسوب',
        class: 'الأولى',
        semester: 'الأول',
        section:'مشترك',
        type: 'عملي'
      },{
        name: 'جبر عام',
        class: 'الأولى',
        semester: 'الأول',
        section:'مشترك',
        type: 'عملي'
      },{
        name: 'برمجة 1',
        class: 'الأولى',
        semester: 'الأول',
        section:'مشترك',
        type: 'عملي'
      },{
        name: 'برمجة 2',
        class: 'الأولى',
        semester: 'الثاني',
        section:'مشترك',
        type: 'عملي'
      },{
        name: 'تحليل 2',
        class: 'الأولى',
        semester: 'الثاني',
        section:'مشترك',
        type: 'عملي'
      },{
        name: 'جبر خطي',
        class: 'الأولى',
        semester: 'الثاني',
        section:'مشترك',
        type: 'عملي'
      },{
        name: 'دارات كهربائية و إلكترونية',
        class: 'الأولى',
        semester: 'الثاني',
        section:'مشترك',
        type: 'عملي'
      },{
          name: 'الاحتمالات والاحصاء',
          class: 'الثانية',
          semester: 'الأول',
          section:'مشترك',
          type: 'نظري'
        },{
          name: 'برمجة 3',
          class: 'الثانية',
          semester: 'الأول',
          section:'مشترك',
          type: 'نظري'
        },{
          name: 'تحليل 3',
          class: 'الثانية',
          semester: 'الأول',
          section:'مشترك',
          type: 'نظري'
        },{
          name: 'الخوارزميات وبنى المعطيات 1',
          class: 'الثانية',
          semester: 'الأول',
          section:'مشترك',
          type: 'نظري'
        },{
          name: 'الدارات المنطقية',
          class: 'الثانية',
          semester: 'الأول',
          section:'مشترك',
          type: 'نظري'
        },{
          name: 'اللغة الإنكليزية 3',
          class: 'الثانية',
          semester: 'الأول',
          section:'مشترك',
          type: 'نظري'
        },{
        name: 'الاتصالات الرقمية',
        class: 'الثانية',
        semester: 'الثاني',
        section:'مشترك',
        type: 'نظري'
      },{
        name: 'تحليل عددي',
        class: 'الثانية',
        semester: 'الثاني',
        section:'مشترك',
        type: 'نظري'
      },{
        name: 'الخوارزميات وبنى المعطيات 2',
        class: 'الثانية',
        semester: 'الثاني',
        section:'مشترك',
        type: 'نظري'
      },{
        name: 'بنيان الحواسيب 1',
        class: 'الثانية',
        semester: 'الثاني',
        section:'مشترك',
        type: 'نظري'
      },{
        name: 'اللغة الإنكليزية 4',
        class: 'الثانية',
        semester: 'الثاني',
        section:'مشترك',
        type: 'نظري'
      },{
        name: 'مهارات التواصل',
        class: 'الثانية',
        semester: 'الثاني',
        section:'مشترك',
        type: 'نظري'
      },{
          name: 'الاحتمالات والاحصاء',
          class: 'الثانية',
          semester: 'الأول',
          section:'مشترك',
          type: 'عملي'
        },{
          name: 'برمجة 3',
          class: 'الثانية',
          semester: 'الأول',
          section:'مشترك',
          type: 'عملي'
        },{
          name: 'تحليل 3',
          class: 'الثانية',
          semester: 'الأول',
          section:'مشترك',
          type: 'عملي'
        },{
          name: 'الخوارزميات وبنى المعطيات 1',
          class: 'الثانية',
          semester: 'الأول',
          section:'مشترك',
          type: 'عملي'
        },{
          name: 'الدارات المنطقية',
          class: 'الثانية',
          semester: 'الأول',
          section:'مشترك',
          type: 'عملي'
        },{
        name: 'الاتصالات الرقمية',
        class: 'الثانية',
        semester: 'الثاني',
        section:'مشترك',
        type: 'عملي'
      },{
        name: 'تحليل عددي',
        class: 'الثانية',
        semester: 'الثاني',
        section:'مشترك',
        type: 'عملي'
      },{
        name: 'الخوارزميات وبنى المعطيات 2',
        class: 'الثانية',
        semester: 'الثاني',
        section:'مشترك',
        type: 'عملي'
      },{
        name: 'بنيان الحواسيب 1',
        class: 'الثانية',
        semester: 'الثاني',
        section:'مشترك',
        type: 'عملي'
      },{
        name: 'مهارات التواصل',
        class: 'الثانية',
        semester: 'الثاني',
        section:'مشترك',
        type: 'عملي'
      },{
          name: 'لغات البرمجة',
          class: 'الثالثة',
          semester: 'الأول',
          section:'مشترك',
          type: 'نظري'
        },{
          name: 'بحوث العمليات',
          class: 'الثالثة',
          semester: 'الأول',
          section:'مشترك',
          type: 'نظري'
        },{
          name: 'أساسيات الشبكات الحاسوبية',
          class: 'الثالثة',
          semester: 'الأول',
          section:'مشترك',
          type: 'نظري'
        },{
          name: 'بيانيات حاسوبية',
          class: 'الثالثة',
          semester: 'الأول',
          section:'مشترك',
          type: 'نظري'
        },{
          name: 'بنيان الحواسيب 2',
          class: 'الثالثة',
          semester: 'الأول',
          section:'مشترك',
          type: 'نظري'
        },{
        name: 'مبادئ الذكاء الصنعي',
        class: 'الثالثة',
        semester: 'الثاني',
        section:'مشترك',
        type: 'نظري'
      },{
        name: 'اللغات الصورية',
        class: 'الثالثة',
        semester: 'الثاني',
        section:'مشترك',
        type: 'نظري'
      },{
        name: 'قواعد المعطيات 1',
        class: 'الثالثة',
        semester: 'الثاني',
        section:'مشترك',
        type: 'نظري'
      },{
        name: 'مشروع 1',
        class: 'الثالثة',
        semester: 'الثاني',
        section:'مشترك',
        type: 'نظري'
      },{
        name: 'الحسابات العلمية',
        class: 'الثالثة',
        semester: 'الثاني',
        section:'مشترك',
        type: 'نظري'
      },{
          name: 'لغات البرمجة',
          class: 'الثالثة',
          semester: 'الأول',
          section:'مشترك',
          type: 'عملي'
        },{
          name: 'بحوث العمليات',
          class: 'الثالثة',
          semester: 'الأول',
          section:'مشترك',
          type: 'عملي'
        },{
          name: 'أساسيات الشبكات الحاسوبية',
          class: 'الثالثة',
          semester: 'الأول',
          section:'مشترك',
          type: 'عملي'
        },{
          name: 'بيانيات حاسوبية',
          class: 'الثالثة',
          semester: 'الأول',
          section:'مشترك',
          type: 'عملي'
        },{
          name: 'بنيان الحواسيب 2',
          class: 'الثالثة',
          semester: 'الأول',
          section:'مشترك',
          type: 'عملي'
        },{
          name: 'مبادئ الذكاء الصنعي',
          class: 'الثالثة',
          semester: 'الثاني',
          section:'مشترك',
          type: 'عملي'
        },{
          name: 'اللغات الصورية',
          class: 'الثالثة',
          semester: 'الثاني',
          section:'مشترك',
          type: 'عملي'
        },{
          name: 'قواعد المعطيات 1',
          class: 'الثالثة',
          semester: 'الثاني',
          section:'مشترك',
          type: 'عملي'
        },{
        name: 'قواعد المعطيات 2',
        class: 'الرابعة',
        semester: 'الاول',
        section:'برمجيات',
        type: 'نظري'
      },{
        name: 'الاقتصاد',
        class: 'الرابعة',
        semester: 'الاول',
        section:'برمجيات',
        type: 'نظري'
      },{
        name: 'خوارزميات البحث الذكية',
        class: 'الرابعة',
        semester: 'الاول',
        section:'برمجيات',
        type: 'نظري'
      },{
        name: 'نظم التشغيل',
        class: 'الرابعة',
        semester: 'الاول',
        section:'برمجيات',
        type: 'نظري'
      },{
        name: 'هندسة برمجيات 1',
        class: 'الرابعة',
        semester: 'الاول',
        section:'برمجيات',
        type: 'نظري'
      },{
        name: 'المترجمات',
        class: 'الرابعة',
        semester: 'الاول',
        section:'برمجيات',
        type: 'نظري'
      }
        ,{
          name: 'قواعد المعطيات 2',
          class: 'الرابعة',
          semester: 'الاول',
          section:'برمجيات',
          type: 'عملي'
        },{
          name: 'الاقتصاد',
          class: 'الرابعة',
          semester: 'الاول',
          section:'برمجيات',
          type: 'عملي'
        },{
          name: 'خوارزميات البحث الذكية',
          class: 'الرابعة',
          semester: 'الاول',
          section:'برمجيات',
          type: 'عملي'
        },{
          name: 'نظم التشغيل',
          class: 'الرابعة',
          semester: 'الاول',
          section:'برمجيات',
          type: 'عملي'
        },{
          name: 'هندسة برمجيات 1',
          class: 'الرابعة',
          semester: 'الاول',
          section:'برمجيات',
          type: 'عملي'
        },{
          name: 'المترجمات',
          class: 'الرابعة',
          semester: 'الاول',
          section:'برمجيات',
          type: 'عملي'
        },{
          name: 'البرمجة التفرعية',
          class: 'الرابعة',
          semester: 'الثاني',
          section:'برمجيات',
          type: 'نظري'
        },{
          name: 'التسويق',
          class: 'الرابعة',
          semester: 'الثاني',
          section:'برمجيات',
          type: 'نظري'
        },{
          name: 'مشروع 2',
          class: 'الرابعة',
          semester: 'الثاني',
          section:'برمجيات',
          type: 'نظري'
        },{
          name: 'المترجمات',
          class: 'الرابعة',
          semester: 'الثاني',
          section:'برمجيات',
          type: 'نظري'
        },{
          name: 'هندسة برمجيات 2',
          class: 'الرابعة',
          semester: 'الثاني',
          section:'برمجيات',
          type: 'نظري'
        },{
          name: 'نظم وسائط متعددة',
          class: 'الرابعة',
          semester: 'الثاني',
          section:'برمجيات',
          type: 'نظري'
        },
        ,{
          name: 'البرمجة التفرعية',
          class: 'الرابعة',
          semester: 'الثاني',
          section:'برمجيات',
          type: 'عملي'
        },{
          name: 'التسويق',
          class: 'الرابعة',
          semester: 'الثاني',
          section:'برمجيات',
          type: 'عملي'
        },{
          name: 'هندسة برمجيات 2',
          class: 'الرابعة',
          semester: 'الثاني',
          section:'برمجيات',
          type: 'عملي'
        },{
          name: 'نظم وسائط متعددة',
          class: 'الرابعة',
          semester: 'الثاني',
          section:'برمجيات',
          type: 'عملي'
        },


      ],{});
  },

  async down (queryInterface, Sequelize) {

  }
};

