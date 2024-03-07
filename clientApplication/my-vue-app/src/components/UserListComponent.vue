<template>
    <div>
      <h2>User List</h2>
      <button @click="fetch_data"> fetch user list</button>
      <div class="user-list" style="margin-top: 1em;">
        <div v-for="user in users" :key="user.id" class="user-item">
          <div class="user-info">
            <span class="user-id">User ID: {{ user.id }}</span>
            <span class="user-name">user info : {{ user.firstName }}  {{ user.lastName }}</span>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        users: []
      };
    },
    methods: {
      async fetch_data() {
        try {
        const response = await axios.get('http://localhost:3000/users');
        this.users = response.data.users;
        alert('success fetch')
      } catch (error) {
        console.error('Error fetching users:', error);
        alert('Error fetching users')
      }
      }
    },
    async created() {
      try {
        const response = await axios.get('http://localhost:3000/users');
        this.users = response.data.users;
        alert('success fetch')
      } catch (error) {
        console.error('Error fetching users:', error);
        alert('Error fetching users')
      }
    }
  };
  </script>
  
  <style>
  .user-list {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .user-item {
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 10px;
    width: 300px;
  }
  
  .user-info {
    display: flex;
    flex-direction: column;
  }
  
  .user-id {
    font-weight: bold;
  }
  
  .user-name {
    margin-top: 5px;
  }

  button {
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
  </style>
  