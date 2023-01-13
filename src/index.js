import { createApp } from 'vue'
import axios from 'axios'


createApp({
    data() {
        return {
            students: [
                {'fullName': 'Elsie Graves', 'groupTitle': 'RPZ 19 1.9', 'birthday': '01.01.2004', 'isPass': true},
                {'fullName': 'Harley Krueger', 'groupTitle': 'RPZ 19 1.9', 'birthday': '06.05.2003', 'isPass': false},
                {'fullName': 'Gareth Washington', 'groupTitle': 'RPZ 19 2.9', 'birthday': '07.02.2004', 'isPass': true},
            ],
            searchValue: '',
            newStudentFullName: '',
            newStudentGroupTitle: '',
            newStudentBirthday: '',
            newStudentIsPass: '',
            errorMessage: '',
            // age: 0,
            // msg: '',
            // message: '',
            blockColor: 'red',
        }
    },
    mounted: function () {
        axios.get('http://34.82.81.113:3000/students').then((response) => {
            this.students = response.data()
        })
    },
    methods: {
        removeStudent(index) {
            this.students.splice(index, 1)
        },
        filterStudents() {
            return this.students.filter((student) => {
                return student.fullName.toLowerCase().includes(this.searchValue.toLowerCase())
            })
        },
        addStudent() {
            if (this.newStudentFullName !== '') {
                if (this.newStudentGroupTitle !== '') {
                    if (this.newStudentBirthday !== '') {
                        this.students.push({
                            'fullName': this.newStudentFullName,
                            'groupTitle': this.newStudentGroupTitle,
                            'birthday': this.newStudentBirthday,
                            'isPass': this.newStudentIsPass,
                        })

                        this.newStudentFullName = ''
                        this.newStudentGroupTitle = ''
                        this.newStudentBirthday = ''
                        this.newStudentIsPass = ''

                        this.errorMessage = ''
                    } else {
                        this.errorMessage = 'Enter the birthday!'
                    }
                } else {
                    this.errorMessage = 'Choose the group!'
                }
            } else {
                this.errorMessage = 'Enter the full name!'
            }
        },
        blockOnMouseOver() {
            this.blockColor = 'green'
        },
        blockOnMouseOut() {
            this.blockColor = 'red'
        },
    }
}).mount('#app')