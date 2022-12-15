export const mockedComment = [
    {
        comment_author_id: "id1234",
        content: "Hello this is comments",
        created: "2020-10-12"
    },
    {
        comment_author_id: "id1238",
        content: "ว้าวสุดยอดเลยงับ",
        created: "2020-10-12"
    },
]

export const mockedData = {
  mockedAllClass: [
    {
      class_code: "CODE808",
      class_name: "Cyber Coding 2565",
      class_section: "B01",
      teacher: {
        profile_pic:
          "https://img.freepik.com/free-vector/christmas-holiday-golden-pattern-background-template-greeting-card-design_206636-74.jpg?size=626&ext=jpg",
        name: {
          firstname: "Ajarn",
          lastname: "Martin",
        },
      },
    },
    {
      class_code: "CODE809",
      class_name:
        "Lorem Ipsum is simply dummy text of the printing",
      class_section: "B02",
      teacher: {
        profile_pic:
          "https://img.freepik.com/free-vector/christmas-holiday-golden-pattern-background-template-greeting-card-design_206636-74.jpg?size=626&ext=jpg",
        name: {
          firstname: "Ajarn",
          lastname: "Martin",
        },
      },
    },
    {
      class_code: "CODE810",
      class_name:
        "Contrary to popular belief",
      class_section: "B02",
      teacher: {
        profile_pic:
          "https://img.freepik.com/free-vector/christmas-holiday-golden-pattern-background-template-greeting-card-design_206636-74.jpg?size=626&ext=jpg",
        name: {
          firstname: "Ajarn",
          lastname: "Martin",
        },
      },
    },
  ],
  mockedAllAssignments: [
    {
        class_code: "CODE808",
        class_name: "Cyber Security",
        assignment_name: "รายงานความคืบหน้า",
        assignment_description: "assignment_description",
        turnin_late: true,
        score: 20,
        assignment_optional_file: ["path1", "path2"],
        comment: mockedComment,
        assignment_start_date: "2020-10-12",
        assignment_end_date: "2020-10-12",
        created: "2020-10-12",
        status: "ส่งแล้ว",   
    }
  ]
};

