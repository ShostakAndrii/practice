<template>
  <div class="students">
    <input type="text" placeholder="Search:" v-model="searchValue">
    <hr>
    <div class="studentData" v-for="student in filterStudents()" v-bind:key="student._id">
      <template v-if="student._id===editId">
        <input type="text" v-model="student.name">
        <p :style="searchValue ? 'color: red' : 'color: black'">{{ student.group}}</p>
        <p :style="searchValue ? 'color: red' : 'color: black'">{{ student.mark}}</p>
        <input type="checkbox" v-model="student.isDonePr">
        <input type="button" @click="updateStudent(editId)" value="Update">
      </template>
      <template v-else>
        <p :style="searchValue ? 'color: red' : 'color: black'">{{ student.name }}</p>
        <p :style="searchValue ? 'color: red' : 'color: black'">{{ student.group}}</p>
        <p :style="searchValue ? 'color: red' : 'color: black'">{{ student.mark}}</p>
        <input type="checkbox" v-model="student.isDonePr">
        <a href="#" @click.prevent="rplForm(student._id)">Update</a>
      </template>
      <button @click="deleteStudent(student._id)">Delete</button>
    </div>
    <p v-if="students.length <= 0">Students doesn't exists</p>

    <hr>

    <div class="addStudentBlock">
<!--      <input type="text" placeholder="Enter id:" v-model="student._id">-->
      <input type="text" placeholder="Enter full name:" v-model="student.name">
      <select v-model="student.group">
        <option value="">Choose group:</option>
        <option value="RPZ 19 1.9">RPZ 19 1.9</option>
        <option value="RPZ 19 2.9">RPZ 19 2.9</option>
      </select>
      <input type="number" v-model="student.mark">
      <input type="text" placeholder="Enter photo url:" v-model="student.photo">
      <input type="checkbox" v-model="student.isDonePr">
      <button @click="addStudent()">Add</button>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    data() {
      return {
        students: [],
        searchValue: '',
        student: {
          // '_id': '',
          'name': '',
          'group': '',
          'photo': '',
          'mark': 0,
          'isDonePr': false,
          '__v': 0
        },
        editId: ''
      }
    },
    mounted() {
      axios.get('http://34.82.81.113:3000/students')
          .then(data => {
            this.students = data.data
            console.log(this.students)
          })
    },
    methods: {
      deleteStudent(id) {
        axios.delete(`http://34.82.81.113:3000/students/${id}`)
            .then(data => {
              this.students.splice(this.students.indexOf(data.data), 1)
            })
      },
      filterStudents() {
        return this.students.filter((current_student) => {
          return current_student.name.toLowerCase().includes(this.searchValue.toLowerCase())
        })
      },
      addStudent() {
        console.log(this.student)
        axios.post('http://34.82.81.113:3000/students/', this.student)
            .then(data => {
              this.students.push(data.data)
            })

        this.student._id = ''
        this.student.name = ''
        this.student.group = ''
        this.student.photo = ''
        this.student.mark = 0
        this.student.isDonePr = false
        this.student.__v = 0
      },
      updateStudent(_id) {
        let foundStudent = this.students.find((element) => {
          return element._id === _id
        })

        axios.put('http://34.82.81.113:3000/students/'+_id, {
          name: foundStudent.name,
          group: foundStudent.group,
          isDonePr: foundStudent.isDonePr,
        }).then((response) => {
          console.log(response.data)
        })

        this.editId = ''
      },
      rplForm(_id) {
        this.editId = _id
      },
    },
  }
</script>

<style scopped>

</style>