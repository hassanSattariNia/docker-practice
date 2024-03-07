<template>
  <div class="user-form">
    <input v-model="firstName" type="text" placeholder="First Name" class="input-field" />
    <input v-model="lastName" type="text" placeholder="Last Name" class="input-field" />
    <button @click="addUser" class="add-user-button">Add User</button>
  </div>
</template>


  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        firstName: '',
        lastName: ''
      };
    },
    methods: {
      async addUser() {
        if(!this.firstName || !this.lastName)
        {
          alert('can not empty firstName and lastName!')
          return 
        }
        try {
          await axios.post('http://localhost:3000/users', {
            firstName: this.firstName,
            lastName: this.lastName
          });
          // Clear input fields after successful submission
          this.firstName = '';
          this.lastName = '';
          alert('success insert')
        } catch (error) {
          console.error('Error adding user:', error);
          alert(`failed insert data !${error}`)
        }
      }
    }
  };
  </script>
  
<style scoped>
.user-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.input-field {
  margin: 0.5em;
  padding: 0.5em;
  width: 200px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
}

.add-user-button {
  margin-top: 1em;
  padding: 0.5em 1em;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.add-user-button:hover {
  background-color: #0056b3;
}
</style>
  
