const students = [
{
     matricNo: "CSC/2024/001",
    password: "12345",

    firstName: "Stephen",
    lastName: "Ilesanmi",
    email: "stephen@gmail.com",
    phone: "08012345678",

    faculty: "Science",
    department: "Computer Science",
    level: "300",
    semester: "First Semester",
    cgpa: 4.62,
   fees: {
       totalAmount: 150000,
       paidAmount: 100000,
       outstandingAmount: 50000,
       status: "Partially Paid"
   },

      attendance: {
                totalClasses: 50,
                attended: 45,
                missed: 5,
                records: [
                    {
                        date: "2026-06-10",
                        course: "CSC301",
                        status: "Present"
                    },
                    {
                        date: "2026-06-12",
                        course: "MTH305",
                        status: "Absent"
                    },
                    {
                        date: "2026-06-15",
                        course: "GST302",
                        status: "Present"
                    }
                ]
},
courses: [
    {
        code: "CSC301",
        title: "Database Systems",
        unit: 3,
        lecturer: "Dr. Adeyemi"
    },
    {
        code: "CSC305",
        title: "Web Development",
        unit: 2,
        lecturer: "Dr. Adeyeye"
    },
    {
        code: "CSC307",
        title: "Software Engineering",
        unit: 3,
        lecturer: "Dr. Adewale"
    },
    {
        code: "MTH305",
        title: "Numerical Analysis",
        unit: 2,
        lecturer: "Dr. Akinyemi"
    },
    {
        code: "GST302",
        title: "Entrepreneurship",
        unit: 2,
        lecturer: "Dr. Ayuba"
    }
],
results: [
    {
        course: "CSC301",
        score: 82,
        grade: "A"
    },
    {
        course: "CSC305",
        score: 75,
        grade: "B"
    },
    {
        course: "CSC307",
        score: 88,
        grade: "A"
    },
    {
        course: "MTH305",
        score: 69,
        grade: "B"
    },
    {
        course: "GST302",
        score: 91,
        grade: "A"
    },
    {
    course: "Ges104",
    score: 30,
    grade: "F"
    }
],
announcements: [
    {
        title: "Course Registration Deadline",
        date: "2026-06-20",
        message: "All students must complete course registration before June 30."
    },
    {
        title: "Examination Timetable Released",
        date: "2026-06-22",
        message: "The first semester examination timetable has been published."
    },
    {
        title: "School Fees Reminder",
        date: "2026-06-24",
        message: "Students with outstanding fees should complete payment immediately."
    }
],
timetable: [
    {
        day: "Monday",
        course: "CSC301",
        time: "8:00 AM - 10:00 AM",
        venue: "LT1"
    },
    {
        day: "Tuesday",
        course: "MTH305",
        time: "10:00 AM - 12:00 PM",
        venue: "LT2"
    },
    {
        day: "Wednesday",
        course: "GST302",
        time: "1:00 PM - 3:00 PM",
        venue: "Hall A"
    },
    {
        day: "Thursday",
        course: "CSC307",
        time: "9:00 AM - 11:00 AM",
        venue: "Lab 3"
    }
],
},

{
    matricNo: "SEN/2024/002",
    password: "password",

    firstName: "Jane",
    lastName: "Smith",

    email: "jane@gmail.com",
    phone: "08087654321",

    faculty: "Engineering",
    department: "Software Engineering",
    level: "200",
    semester: "First Semester",
    cgpa: 4.52,

     fees: {
           totalAmount: 150000,
           paidAmount: 150000,
           outstandingAmount: 0,
           status: "Paid"
       },

    attendance: {
        totalClasses: 40,
        attended: 36,
        missed: 4,
        records: [
            {
                date: "2026-06-10",
                course: "SEN201",
                status: "Present"
            },
            {
                date: "2026-06-12",
                course: "SEN203",
                status: "Present"
            },
            {
                date: "2026-06-15",
                course: "GST202",
                status: "Absent"
            }
        ]
    },
    courses: [
        {
            code: "CSC301",
            title: "Database Systems",
            unit: 3,
             lecturer: "Dr. Adeyemi"
        },
        {
            code: "CSC305",
            title: "Web Development",
            unit: 2,
             lecturer: "Dr. Adeyemi"
        },
        {
            code: "CSC307",
            title: "Software Engineering",
            unit: 3,
             lecturer: "Dr. Adeyemi"
        },
        {
            code: "MTH305",
            title: "Numerical Analysis",
            unit: 2,
             lecturer: "Dr. Adeyemi"
        },
        {
            code: "GST302",
            title: "Entrepreneurship",
            unit: 2,
             lecturer: "Dr. Adeyemi"
        }
    ],
    results: [
        {
            course: "CSC301",
            score: 82,
            grade: "A"
        },
        {
            course: "CSC305",
            score: 75,
            grade: "B"
        },
        {
            course: "CSC307",
            score: 88,
            grade: "A"
        },
        {
            course: "MTH305",
            score: 69,
            grade: "B"
        },
        {
            course: "GST302",
            score: 91,
            grade: "A"
        }
    ],
    announcements: [
        {
            title: "Course Registration Deadline",
            date: "2026-06-20",
            message: "All students must complete course registration before June 30."
        },
        {
            title: "Examination Timetable Released",
            date: "2026-06-22",
            message: "The first semester examination timetable has been published."
        },
        {
            title: "School Fees Reminder",
            date: "2026-06-24",
            message: "Students with outstanding fees should complete payment immediately."
        }
    ],
    timetable: [
        {
            day: "Monday",
            course: "CSC301",
            time: "8:00 AM - 10:00 AM",
            venue: "LT1"
        },
        {
            day: "Tuesday",
            course: "MTH305",
            time: "10:00 AM - 12:00 PM",
            venue: "LT2"
        },
        {
            day: "Wednesday",
            course: "GST302",
            time: "1:00 PM - 3:00 PM",
            venue: "Hall A"
        },
        {
            day: "Thursday",
            course: "CSC307",
            time: "9:00 AM - 11:00 AM",
            venue: "Lab 3"
        }
    ],
}
];