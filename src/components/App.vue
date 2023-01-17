<template>
  <div class="students">
    <input type="text" placeholder="Search:" v-model="searchValue">
    <hr>
    <div class="studentData" v-for="(student, index) in filterStudents()">
      <p :style="searchValue ? 'color: red' : 'color: black'">{{ student.fullName }}</p>
      <p :style="searchValue ? 'color: red' : 'color: black'">{{ student.groupTitle }}</p>
      <p :style="searchValue ? 'color: red' : 'color: black'">{{ student.birthday }}</p>
      <input type="checkbox" v-model="student.isPass">
      <button @click="removeStudent(index)">Delete</button>
    </div>
    <p v-if="students.length <= 0">Students doesn't exists</p>

    <hr>

    <div class="addStudentBlock">
      <input type="text" placeholder="Enter full name:" v-model="newStudentFullName">
      <select v-model="newStudentGroupTitle">
        <option value="">Choose group:</option>
        <option value="RPZ 19 1.9">RPZ 19 1.9</option>
        <option value="RPZ 19 2.9">RPZ 19 2.9</option>
      </select>
      <input type="date" max="2023-01-10" v-model="newStudentBirthday">
      <input type="checkbox" v-model="newStudentIsPass">
      <button @click="addStudent()">Add</button>
    </div>
    <p>{{ errorMessage }}</p>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    data() {
      return {
        students: [],
        searchValue: '',
        newStudentFullName: '',
        newStudentGroupTitle: '',
        newStudentBirthday: '',
        newStudentIsPass: '',
        errorMessage: '',
        // age: 0,
        // msg: '',
        // message: '',
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
    }
  }
</script>

<style scopped>

</style>